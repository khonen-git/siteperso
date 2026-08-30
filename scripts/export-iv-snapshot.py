#!/usr/bin/env python3
"""Export SPY implied-vol snapshot via ivsurface + yfinance (optional)."""
from __future__ import annotations

import json
import os
import sys
from datetime import date, datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "data" / "dashboards" / "implied-vol" / "spy.json"

# Optional per-point fields (future): bid, ask, openInterest on each ivPoints entry.


def main() -> int:
    try:
        from ivsurface.pipeline import prepare_options_chain, run_svi_pipeline
    except ImportError:
        print("ivsurface not installed — pip install -e path/to/ImpliedVolatilitySurface", file=sys.stderr)
        return 1

    symbol = os.environ.get("IV_SYMBOL", "SPY")
    chain = prepare_options_chain(symbol)
    if chain is None or chain.empty:
        print(f"No options chain for {symbol}", file=sys.stderr)
        return 1

    result = run_svi_pipeline(chain)
    spot = float(result.get("spot", chain["spot"].iloc[0] if "spot" in chain.columns else 0))

    slices = []
    for expiry, group in result.get("slices", {}).items():
        iv_points = [
            {
                "strike": float(row["strike"]),
                "iv": float(row["iv"]),
                "moneyness": float(row.get("moneyness", row["strike"] / spot)),
                # "bid": float(row["bid"]) if row.get("bid") else None,
                # "ask": float(row["ask"]) if row.get("ask") else None,
                # "openInterest": int(row["openInterest"]) if row.get("openInterest") else None,
            }
            for _, row in group.iterrows()
            if row.get("iv") and row["iv"] > 0
        ]
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
        print("No valid slices", file=sys.stderr)
        return 1

    snapshot = {
        "metadata": {
            "symbol": symbol,
            "spot": spot,
            "asOf": date.today().isoformat(),
            "fetchedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
            "source": "Yahoo Finance via yfinance (delayed)",
            "sourceDisclaimer": (
                "Educational demo only. Data may be delayed ~15 min. Not investment advice."
            ),
        },
        "slices": slices,
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(snapshot, indent=2), encoding="utf-8")
    print(f"Wrote {OUT} ({len(slices)} slices)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
