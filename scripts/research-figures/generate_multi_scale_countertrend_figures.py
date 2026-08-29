#!/usr/bin/env python3
"""Regenerate lab PNG figures for 01_multi_scale_countertrend.md."""
from __future__ import annotations

import json
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parents[3]
PROC = ROOT / "research_notes/market_processes/processes/multi_scale_countertrend/out"
OUT = ROOT / "docs/research/assets/multi_scale_countertrend"

BLUE, GREEN, RED, ORANGE, GRAY = "#2c6e9b", "#3a7d44", "#c44e52", "#dd8452", "#888888"


def _style() -> None:
    plt.rcParams.update(
        {
            "font.size": 11,
            "axes.titlesize": 12,
            "axes.labelsize": 11,
            "xtick.labelsize": 10,
            "ytick.labelsize": 10,
            "legend.fontsize": 9,
            "figure.dpi": 160,
            "savefig.dpi": 160,
            "axes.spines.top": False,
            "axes.spines.right": False,
        }
    )


def _save(fig: plt.Figure, name: str) -> None:
    fig.tight_layout()
    fig.savefig(OUT / name, dpi=160, bbox_inches="tight", facecolor="white")
    plt.close(fig)


def plot_cumulative_hazard() -> None:
    def load(path: Path) -> pd.DataFrame:
        df = pd.read_csv(path)
        df = df[df["age"] >= 3].copy()
        df["cum_h_R"] = df["h_R"].cumsum()
        df["cum_h_F"] = df["h_F"].cumsum()
        return df

    h_disc = load(PROC / "hazard_RF_disc.csv")
    h_dev = load(PROC / "hazard_RF_dev.csv")
    max_age = min(h_disc["age"].max(), h_dev["age"].max(), 32)
    fig, ax = plt.subplots(figsize=(7.5, 4.5))
    for df, split, ls in [(h_disc, "disc", "-"), (h_dev, "dev (OOS)", "--")]:
        sub = df[df["age"] <= max_age]
        ax.plot(sub["age"], sub["cum_h_R"], color=GREEN, ls=ls, lw=2, label=f"Resume — {split}")
        ax.plot(sub["age"], sub["cum_h_F"], color=RED, ls=ls, lw=2, label=f"Fail — {split}")
    ax.set_xlabel("Episode age (bars)")
    ax.set_ylabel("Cumulative hazard H(k)")
    ax.set_title("Gate 1 — Competing risks: cumulative hazard by episode age")
    ax.legend(frameon=True, ncol=2, loc="upper left", fontsize=8.5)
    ax.grid(alpha=0.35, linestyle="--")
    _save(fig, "cumulative_hazard_RF.png")


def plot_score_weights() -> None:
    weights = json.loads((PROC / "gate2_weights_disc.json").read_text())
    items = sorted(weights.items(), key=lambda x: x[1])
    fig, ax = plt.subplots(figsize=(7.5, 4.2))
    vals = [v for _, v in items]
    ax.barh([k for k, _ in items], vals, color=[GREEN if v > 0 else RED for v in vals], height=0.65)
    ax.axvline(0, color="black", lw=0.9)
    ax.set_xlabel("Frozen weight (disc)")
    ax.set_title("Gate 2 — Causal score weights (fit on disc)")
    ax.grid(axis="x", alpha=0.35, linestyle="--")
    _save(fig, "score_weights_disc.png")


def plot_gate4_heatmap() -> None:
    front = pd.read_csv(PROC / "gate4_frontiers.csv")
    fig, axes = plt.subplots(1, 2, figsize=(10, 4.2), sharey=True)
    im = None
    for ax, split, title in zip(axes, ["disc", "dev"], ["In-sample (disc)", "OOS (dev)"]):
        sub = front[(front["split"] == split) & (front["q"] == 0.8)]
        pivot = sub.pivot(index="delay", columns="time_cap", values="ev_net_pips").sort_index()
        im = ax.imshow(pivot.values, aspect="auto", cmap="RdYlGn", vmin=-0.6, vmax=0.3, origin="lower")
        ax.set_xticks(range(len(pivot.columns)))
        ax.set_xticklabels([str(int(c)) for c in pivot.columns])
        ax.set_yticks(range(len(pivot.index)))
        ax.set_yticklabels([str(int(i)) for i in pivot.index])
        ax.set_xlabel("Time cap (bars)")
        ax.set_ylabel("Entry delay d")
        ax.set_title(title)
        for i in range(pivot.shape[0]):
            for j in range(pivot.shape[1]):
                v = pivot.values[i, j]
                ax.text(j, i, f"{v:+.2f}", ha="center", va="center", fontsize=8, color="black" if abs(v) < 0.35 else "white")
    fig.suptitle("Gate 4 — Net EV frontier (score quantile q=0.8)", y=1.02, fontsize=13)
    fig.colorbar(im, ax=axes.ravel().tolist(), label="Net EV (pips / trade)", shrink=0.9)
    fig.savefig(OUT / "gate4_ev_heatmap_q08.png", dpi=160, bbox_inches="tight", facecolor="white")
    plt.close(fig)


def plot_onset_delta_hit() -> None:
    onset = pd.read_csv(PROC / "gate2_onset_curve_dev.csv")
    fig, ax = plt.subplots(figsize=(7, 4.2))
    labels = [f"q={row.quantile:.1f}" for row in onset.itertuples()]
    bars = ax.bar(labels, onset["delta_hit"], color=ORANGE, edgecolor="white", width=0.6)
    ax.axhline(0, color="black", lw=0.8)
    ax.set_ylabel("Δ p(Resume) vs baseline")
    ax.set_xlabel("Score threshold (frozen disc quantile)")
    ax.set_title("Gate 2 — Onset lift by score threshold (OOS dev)")
    for b, v in zip(bars, onset["delta_hit"]):
        ax.text(b.get_x() + b.get_width() / 2, v + 0.002, f"+{v:.3f}", ha="center", va="bottom", fontsize=9)
    ax.set_ylim(0, onset["delta_hit"].max() * 1.25)
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    _save(fig, "onset_delta_hit_dev.png")


def plot_gate4_excursion() -> None:
    g4 = json.loads((PROC / "gate4_summary.json").read_text())
    cell = g4["best_disc_cell"]
    fig, ax = plt.subplots(figsize=(6.5, 4.2))
    metrics = ["MFE mean", "MAE mean", "P10", "P50", "P90"]
    vals = [cell["mfe_mean"], cell["mae_mean"], cell["p10"], cell["p50"], cell["p90"]]
    bars = ax.bar(metrics, vals, color=[GREEN, RED, GRAY, BLUE, GRAY], edgecolor="white", width=0.6)
    ax.axhline(0, color="black", lw=0.9)
    ax.set_ylabel("Excursion (pips)")
    ax.set_title(f"Gate 4 — Trade excursion profile (best in-sample cell, n={cell['n']})")
    for b, v in zip(bars, vals):
        offset = 0.15 if v >= 0 else -0.35
        ax.text(b.get_x() + b.get_width() / 2, v + offset, f"{v:+.2f}", ha="center", va="bottom" if v >= 0 else "top", fontsize=9, fontweight="bold")
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    _save(fig, "gate4_excursion_profile.png")


def plot_stability() -> None:
    g1 = json.loads((PROC / "gate1_process_summary.json").read_text())
    g3 = json.loads((PROC / "gate3_summary.json").read_text())
    panels = [
        ("p(Resume | R,F)", [g1["splits"]["disc"]["R_given_RF"], g1["splits"]["dev"]["R_given_RF"]], (0.75, 0.82), "{:.3f}"),
        ("Median episode duration (bars)", [g1["splits"]["disc"]["median_duration"], g1["splits"]["dev"]["median_duration"]], (9, 12), "{:.0f}"),
        ("ΔLL onset vs vol context", [g3["disc"]["onset"]["delta_ll_vs_context"], g3["dev"]["onset"]["delta_ll_vs_context"]], (0, 55), "{:.0f}"),
        ("ΔLL age 4 vs vol context", [g3["disc"]["age_4"]["nested_vs_vol_context"]["delta_ll_vs_context"], g3["dev"]["age_4"]["nested_vs_vol_context"]["delta_ll_vs_context"]], (0, 210), "{:.0f}"),
    ]
    fig, axes = plt.subplots(2, 2, figsize=(8, 5.5))
    for ax, (title, vals, ylim, fmt) in zip(axes.flat, panels):
        bars = ax.bar(["disc", "dev"], vals, color=[BLUE, ORANGE], edgecolor="white", width=0.55)
        ax.set_title(title, fontsize=11)
        ax.set_ylim(*ylim)
        for b, v in zip(bars, vals):
            ax.text(b.get_x() + b.get_width() / 2, v + (ylim[1] - ylim[0]) * 0.02, fmt.format(v), ha="center", va="bottom", fontsize=10, fontweight="bold")
        ax.grid(axis="y", alpha=0.35, linestyle="--")
    fig.suptitle("Cross-split stability (disc → dev)", y=1.01, fontsize=13)
    _save(fig, "stability_disc_dev.png")


def plot_core_figures() -> None:
    g2 = json.loads((PROC / "gate2_summary.json").read_text())
    g3 = json.loads((PROC / "gate3_summary.json").read_text())
    g4 = json.loads((PROC / "gate4_summary.json").read_text())

    ages = [1, 2, 4, 8]
    deltas = [g3["dev"][f"age_{a}"]["nested_vs_vol_context"]["delta_ll_vs_context"] for a in ages]
    fig, ax = plt.subplots(figsize=(7, 4.2))
    bars = ax.bar([str(a) for a in ages], deltas, color=BLUE, edgecolor="white", width=0.65)
    ax.set_xlabel("Episode age (bars)")
    ax.set_ylabel("Δ log-likelihood vs vol context")
    ax.set_title("Gate 3 — OOS dev: predictive gain by episode age")
    ax.set_ylim(0, max(deltas) * 1.18)
    for b, v in zip(bars, deltas):
        ax.text(b.get_x() + b.get_width() / 2, v + max(deltas) * 0.02, f"{v:.0f}", ha="center", va="bottom", fontsize=10, fontweight="bold")
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    _save(fig, "delta_ll_by_age_dev.png")

    quint = g3["quintile_lift_dev"]
    pR = [q["p_R"] for q in quint]
    base = g3["dev"]["onset"]["base_rate"]
    fig, ax = plt.subplots(figsize=(7, 4.2))
    bars = ax.bar([f"Q{i+1}" for i in range(len(quint))], pR, color=GREEN, edgecolor="white", width=0.65)
    ax.axhline(base, color=RED, ls="--", lw=1.5, label=f"Baseline p(Resume) = {base:.3f}")
    ax.set_ylim(0.72, 0.86)
    ax.set_ylabel("p(Resume)")
    ax.set_xlabel("Score quintile (dev, onset)")
    ax.set_title("Gate 3 — Resume rate by score quintile")
    ax.legend(frameon=True, loc="lower right")
    for b, v in zip(bars, pR):
        ax.text(b.get_x() + b.get_width() / 2, v + 0.004, f"{v:.3f}", ha="center", va="bottom", fontsize=9)
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    _save(fig, "quintiles_p_resume_dev.png")

    by_age = g2["dev"]["by_age"]
    ages2 = [r["age"] for r in by_age]
    dR = [r["delta_R_top20"] for r in by_age]
    fig, ax = plt.subplots(figsize=(7, 4.2))
    ax.plot(ages2, dR, marker="o", color=ORANGE, lw=2.2, markersize=7, markeredgecolor="white", markeredgewidth=1.2)
    ax.set_xlabel("Episode age (bars)")
    ax.set_ylabel("Δ p(Resume): top 20% vs baseline")
    ax.set_title("Gate 2 — Intra-episode detectability (OOS dev)")
    ax.set_xticks(ages2)
    ax.set_ylim(0, max(dR) * 1.15)
    for x, y in zip(ages2, dR):
        ax.annotate(f"+{y:.2f}", (x, y), textcoords="offset points", xytext=(0, 8), ha="center", fontsize=9)
    ax.grid(alpha=0.35, linestyle="--")
    _save(fig, "detectability_delta_R_dev.png")

    evs = [g4["best_disc_cell"]["ev_net_pips"], g4["dev_same_cell_ev_net"]]
    fig, ax = plt.subplots(figsize=(6.5, 4.2))
    bars = ax.bar(["In-sample (disc)", "OOS (dev)"], evs, color=[GREEN, RED], edgecolor="white", width=0.55)
    ax.axhline(0, color="black", lw=0.9)
    ax.set_ylabel("Net EV (pips / trade)")
    ax.set_title("Gate 4 — Same policy cell (q=0.8, d=4, cap=32 bars)")
    ax.set_ylim(min(evs) - 0.12, max(evs) + 0.12)
    for b, v in zip(bars, evs):
        offset = 0.025 if v >= 0 else -0.045
        ax.text(b.get_x() + b.get_width() / 2, v + offset, f"{v:+.2f}", ha="center", va="bottom" if v >= 0 else "top", fontsize=11, fontweight="bold")
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    _save(fig, "gate4_ev_net_disc_vs_dev.png")


def main() -> None:
    _style()
    OUT.mkdir(parents=True, exist_ok=True)
    plot_cumulative_hazard()
    plot_score_weights()
    plot_gate4_heatmap()
    plot_onset_delta_hit()
    plot_gate4_excursion()
    plot_stability()
    plot_core_figures()
    print(f"Wrote {len(list(OUT.glob('*.png')))} figures to {OUT}")


if __name__ == "__main__":
    main()
