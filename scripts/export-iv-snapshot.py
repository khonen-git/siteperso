#!/usr/bin/env python3
"""Export implied-vol snapshot: ivsurface pipeline or yfinance fallback."""
from __future__ import annotations

import json
import math
import os
import sys
from datetime import date, datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "data" / "dashboards" / "implied-vol"
HISTORY_DIR = OUT_DIR / "history"


def realized_vol_20d(symbol: str) -> float | None:
    try:
        import yfinance as yf
    except ImportError:
        return None
    try:
        hist = yf.Ticker(symbol).history(period="3mo")
        if hist is None or len(hist) < 21:
            return None
        closes = hist["Close"].astype(float)
        log_ret = (closes / closes.shift(1)).apply(lambda x: math.log(x) if x and x > 0 else float("nan"))
        log_ret = log_ret.dropna()
        if len(log_ret) < 20:
            return None
        window = log_ret.tail(20)
        return float(window.std() * math.sqrt(252))
    except Exception:
        return None


def export_ivsurface(symbol: str) -> dict | None:
    try:
        from ivsurface.pipeline import prepare_options_chain, run_svi_pipeline
    except ImportError:
        return None

    chain = prepare_options_chain(symbol)
    if chain is None or chain.empty:
        return None

    result = run_svi_pipeline(chain)
    spot = float(result.get("spot", chain["spot"].iloc[0] if "spot" in chain.columns else 0))

    slices = []
    for expiry, group in result.get("slices", {}).items():
        iv_points = []
        for _, row in group.iterrows():
            iv = row.get("iv")
            if not iv or float(iv) <= 0:
                continue
            pt: dict = {
                "strike": float(row["strike"]),
                "iv": float(iv),
                "moneyness": float(row.get("moneyness", row["strike"] / spot)),
            }
            for key, out_key in (
                ("bid", "bid"),
                ("ask", "ask"),
                ("openInterest", "openInterest"),
                ("volume", "volume"),
            ):
                val = row.get(key)
                if val is not None and not (isinstance(val, float) and math.isnan(val)):
                    pt[out_key] = float(val) if out_key != "openInterest" else int(val)
            opt_type = row.get("optionType") or row.get("type")
            if opt_type in ("call", "put", "c", "p"):
                pt["optionType"] = "call" if str(opt_type).lower().startswith("c") else "put"
            iv_points.append(pt)

        if not iv_points:
            continue
        dte = int(group["daysToExpiry"].iloc[0]) if "daysToExpiry" in group.columns else 30
        slice_obj: dict = {
            "expiry": str(expiry),
            "daysToExpiry": dte,
            "ivPoints": sorted(iv_points, key=lambda p: p["moneyness"]),
        }
        if "ssvi" in group.attrs:
            slice_obj["ssvi"] = group.attrs["ssvi"]
        slices.append(slice_obj)

    slices.sort(key=lambda s: s["daysToExpiry"])
    if not slices:
        return None

    rv = realized_vol_20d(symbol)
    meta = {
        "symbol": symbol,
        "spot": spot,
        "asOf": date.today().isoformat(),
        "fetchedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "source": "Yahoo Finance via yfinance + ivsurface (delayed)",
        "sourceDisclaimer": (
            "Educational demo only. Data may be delayed ~15 min. Not investment advice."
        ),
    }
    if rv is not None:
        meta["realizedVol20d"] = round(rv, 6)

    return {"metadata": meta, "slices": slices}


def export_yfinance_fallback(symbol: str) -> dict | None:
    try:
        import yfinance as yf
    except ImportError:
        print("yfinance not installed", file=sys.stderr)
        return None

    ticker = yf.Ticker(symbol)
    spot = float(ticker.fast_info.get("lastPrice") or ticker.history(period="1d")["Close"].iloc[-1])

    expiries = ticker.options
    if not expiries:
        return None

    slices = []
    today = date.today()
    for exp_str in expiries[:8]:
        try:
            chain = ticker.option_chain(exp_str)
        except Exception:
            continue
        exp_date = date.fromisoformat(exp_str)
        dte = max((exp_date - today).days, 1)
        iv_points = []

        for side, frame in (("call", chain.calls), ("put", chain.puts)):
            for _, row in frame.iterrows():
                iv = row.get("impliedVolatility")
                if iv is None or (isinstance(iv, float) and (math.isnan(iv) or iv <= 0)):
                    continue
                strike = float(row["strike"])
                pt: dict = {
                    "strike": strike,
                    "iv": float(iv),
                    "moneyness": round(strike / spot, 4),
                    "optionType": side,
                }
                for col, key in (("bid", "bid"), ("ask", "ask"), ("openInterest", "openInterest"), ("volume", "volume")):
                    if col in row and row[col] == row[col]:
                        pt[key] = int(row[col]) if key == "openInterest" else float(row[col])
                iv_points.append(pt)

        if len(iv_points) < 5:
            continue
        slices.append(
            {
                "expiry": exp_str,
                "daysToExpiry": dte,
                "ivPoints": sorted(iv_points, key=lambda p: p["moneyness"]),
            }
        )

    if not slices:
        return None

    slices.sort(key=lambda s: s["daysToExpiry"])
    rv = realized_vol_20d(symbol)
    meta = {
        "symbol": symbol,
        "spot": round(spot, 4),
        "asOf": today.isoformat(),
        "fetchedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "source": "Yahoo Finance via yfinance (delayed, no SSVI fit)",
        "sourceDisclaimer": (
            "Educational demo only. Data may be delayed ~15 min. Not investment advice."
        ),
    }
    if rv is not None:
        meta["realizedVol20d"] = round(rv, 6)

    return {"metadata": meta, "slices": slices}


def main() -> int:
    symbol = os.environ.get("IV_SYMBOL", "SPY").upper()
    snapshot = export_ivsurface(symbol) or export_yfinance_fallback(symbol)
    if not snapshot:
        print("Export failed — install ivsurface or yfinance", file=sys.stderr)
        return 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = OUT_DIR / f"{symbol.lower()}.json"
    out_path.write_text(json.dumps(snapshot, indent=2), encoding="utf-8")
    print(f"Wrote {out_path} ({len(snapshot['slices'])} slices)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
