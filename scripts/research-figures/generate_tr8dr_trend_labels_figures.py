#!/usr/bin/env python3
"""Regenerate lab PNG figures for 03_tr8dr_trend_labels.md."""
from __future__ import annotations

import json
import sys
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _plot_style import BLUE, GRAY, GREEN, ORANGE, RED, REPO_ROOT, apply_style, save_fig

PROC = REPO_ROOT / "research_notes/tr8dr_trend/out"
OUT = REPO_ROOT / "docs/research/assets/tr8dr_trend_labels"


def plot_occupancy() -> None:
    c = json.loads((PROC / "census_summary.json").read_text())
    occ = c["baseline"]["occupancy"]
    labels = ["up", "neutral", "down"]
    vals = [occ["frac_up"], occ["frac_neutral"], occ["frac_down"]]
    colors = [GREEN, GRAY, RED]
    fig, ax = plt.subplots(figsize=(6.5, 4.2))
    bars = ax.bar(labels, vals, color=colors, edgecolor="white", width=0.6)
    ax.set_ylabel("Fraction of bars")
    ax.set_ylim(0, 0.6)
    ax.set_title(f"Label occupancy (signed={occ['frac_signed']:.1%}, n={occ['n_bars']:,})")
    for b, v in zip(bars, vals):
        ax.text(b.get_x() + b.get_width() / 2, v + 0.015, f"{v:.1%}", ha="center", fontsize=10, fontweight="bold")
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "occupancy_stacked.png")


def plot_grid_heatmap() -> None:
    c = json.loads((PROC / "census_summary.json").read_text())
    rows = []
    for g in c["grid"]:
        rows.append({"minamp": g["minamp"], "tinactive": g["tinactive"], "match": g["vs_baseline"]["match_rate"]})
    df = pd.DataFrame(rows)
    pivot = df.pivot(index="minamp", columns="tinactive", values="match").sort_index(ascending=False)
    fig, ax = plt.subplots(figsize=(6.5, 4.5))
    im = ax.imshow(pivot.values, aspect="auto", cmap="YlGn", vmin=0.6, vmax=1.0)
    ax.set_xticks(range(len(pivot.columns)))
    ax.set_xticklabels([str(int(c_)) for c_ in pivot.columns])
    ax.set_yticks(range(len(pivot.index)))
    ax.set_yticklabels([str(int(i)) for i in pivot.index])
    ax.set_xlabel("Tinactive (bars)")
    ax.set_ylabel("minamp (bps)")
    ax.set_title("Parameter grid match rate vs baseline a15/T60")
    for i in range(pivot.shape[0]):
        for j in range(pivot.shape[1]):
            ax.text(j, i, f"{pivot.values[i, j]:.2f}", ha="center", va="center", fontsize=9)
    fig.colorbar(im, ax=ax, label="Match rate", shrink=0.85)
    save_fig(fig, OUT, "grid_sensitivity_heatmap.png")


def plot_delta_hit() -> None:
    df = pd.read_csv(PROC / "label_fwd_returns_validity.csv")
    fig, ax = plt.subplots(figsize=(7.5, 4.2))
    ax.plot(df["h"], df["delta_hit"], marker="o", color=BLUE, lw=2)
    ax.fill_between(df["h"], df["delta_hit_lo"], df["delta_hit_hi"], color=BLUE, alpha=0.2)
    ax.axhline(0, color=GRAY, ls="--", lw=1)
    ax.set_xscale("log", base=2)
    ax.set_xlabel("Horizon h (bars, log₂)")
    ax.set_ylabel("Δ hit = P(up) − P(down)")
    ax.set_title("Forward hit gap D(h) with 95% CI")
    peak = df.loc[df["delta_hit"].idxmax()]
    ax.annotate(f"peak h={int(peak.h)}\nD={peak.delta_hit:.3f}", xy=(peak.h, peak.delta_hit), xytext=(peak.h * 2, peak.delta_hit - 0.08), fontsize=9, arrowprops=dict(arrowstyle="->", color="black"))
    ax.grid(alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "delta_hit_vs_horizon.png")


def plot_frac_pos() -> None:
    df = pd.read_csv(PROC / "label_fwd_returns_by_h.csv")
    fig, ax = plt.subplots(figsize=(7.5, 4.2))
    for label, color in [("up", GREEN), ("neu", GRAY), ("down", RED)]:
        sub = df[df["label"] == label]
        ax.plot(sub["h"], sub["frac_pos"], marker="o", color=color, lw=2, label=label)
    ax.axhline(0.5, color="black", ls="--", lw=0.8)
    ax.set_xscale("log", base=2)
    ax.set_xlabel("Horizon h (bars, log₂)")
    ax.set_ylabel("frac_pos (forward return > 0)")
    ax.set_title("frac_pos by label vs horizon")
    ax.legend(frameon=True)
    ax.grid(alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "frac_pos_by_label_horizon.png")


def plot_univariate_top() -> None:
    rows = json.loads((PROC / "profile_univariate_p1.json").read_text())["rows"]
    df = pd.DataFrame(rows)
    fig, axes = plt.subplots(1, 2, figsize=(11, 5))
    for ax, col, title in zip(axes, ["t2_auc", "t5_auc"], ["T2 onset", "T5 termination"]):
        top = df.nlargest(8, col).iloc[::-1]
        labels = [f"{r.feature} {r.params}".strip() for r in top.itertuples()]
        ax.barh(labels, top[col], color=BLUE if col == "t2_auc" else GREEN, edgecolor="white")
        ax.axvline(0.5, color=RED, ls="--", lw=1)
        ax.set_xlabel("AUC")
        ax.set_title(title)
        ax.set_xlim(0.45, max(top[col]) * 1.05)
        ax.grid(axis="x", alpha=0.35, linestyle="--")
    fig.suptitle("Top univariate features (P1 screening)", y=1.02, fontsize=13)
    save_fig(fig, OUT, "univariate_top_features.png")


def plot_live_R_vs_q() -> None:
    c4 = json.loads((PROC / "context_c4_meta.json").read_text())
    df = pd.DataFrame(c4["live_sweep"])
    fig, ax = plt.subplots(figsize=(7.5, 4.5))
    for c_set, color in [("C_base", GRAY), ("C_bps_slim", BLUE), ("C_activity", ORANGE)]:
        sub = df[df["c_set"] == c_set].sort_values("q")
        if sub.empty:
            continue
        ax.plot(sub["q"], sub["R"], marker="o", color=color, lw=2, label=c_set)
    ax.axhline(c4["base_ref_q70_C_base"]["R"], color=RED, ls="--", lw=1.2, label="C1 ref (C_base q=0.7)")
    ax.set_xlabel("Permission quantile q")
    ax.set_ylabel("Live permission score R")
    ax.set_title("Live permission R vs score quantile q (valid 2023)")
    ax.legend(frameon=True, fontsize=8)
    ax.grid(alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "live_R_vs_quantile.png")


def plot_valid_vs_oos() -> None:
    c4 = json.loads((PROC / "context_c4_meta.json").read_text())
    oos = json.loads((PROC / "context_oos_c4_meta.json").read_text())
    metrics = ["R", "AUC live", "Live rate"]
    valid = [c4["best_live"]["R"], c4["best_live"]["auc_live"], c4["best_live"]["live_rate"]]
    oos_v = [oos["R_oos"], oos["auc_live"], oos["live_rate_2024"]]
    x = np.arange(len(metrics))
    w = 0.35
    fig, ax = plt.subplots(figsize=(7.5, 4.5))
    b1 = ax.bar(x - w / 2, valid, w, label="Valid (C4)", color=BLUE, edgecolor="white")
    b2 = ax.bar(x + w / 2, oos_v, w, label="OOS 2024", color=ORANGE, edgecolor="white")
    ax.set_xticks(x)
    ax.set_xticklabels(metrics)
    ax.set_ylim(0, 0.7)
    ax.set_title("Valid vs OOS 2024 — frozen C4 stack")
    ax.legend(frameon=True)
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    for bars in (b1, b2):
        for b in bars:
            ax.text(b.get_x() + b.get_width() / 2, b.get_height() + 0.015, f"{b.get_height():.3f}", ha="center", fontsize=8)
    save_fig(fig, OUT, "valid_vs_oos_2024.png")


def plot_segment_duration() -> None:
    seg = json.loads((PROC / "census_summary.json").read_text())["baseline"]["segments"]["duration"]
    labels = ["mean", "p50", "p90", "p99"]
    vals = [seg["mean"], seg["p50"], seg["p90"], seg["p99"]]
    fig, ax = plt.subplots(figsize=(6.5, 4.2))
    bars = ax.bar(labels, vals, color=BLUE, edgecolor="white", width=0.6)
    ax.set_ylabel("Duration (bars)")
    ax.set_title(f"Segment duration distribution (n={int(seg['n'])} segments)")
    for b, v in zip(bars, vals):
        ax.text(b.get_x() + b.get_width() / 2, v + 3, f"{v:.0f}", ha="center", fontsize=10, fontweight="bold")
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "segment_duration_dist.png")


def plot_tod_signed() -> None:
    tod = json.loads((PROC / "census_summary.json").read_text())["baseline"]["temporal"]["by_tod_utc"]
    buckets = ["00-08", "08-16", "16-24"]
    signed = [tod[b]["frac_up"] + tod[b]["frac_down"] for b in buckets]
    fig, ax = plt.subplots(figsize=(6.5, 4.2))
    bars = ax.bar(buckets, signed, color=ORANGE, edgecolor="white", width=0.55)
    ax.set_ylabel("Signed fraction (up+down)")
    ax.set_xlabel("UTC session bucket")
    ax.set_title("Signed fraction by UTC session")
    ax.set_ylim(0.35, 0.6)
    for b, v in zip(bars, signed):
        ax.text(b.get_x() + b.get_width() / 2, v + 0.008, f"{v:.1%}", ha="center", fontsize=10, fontweight="bold")
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "tod_signed_fraction.png")


def main() -> None:
    apply_style()
    OUT.mkdir(parents=True, exist_ok=True)
    plot_occupancy()
    plot_grid_heatmap()
    plot_delta_hit()
    plot_frac_pos()
    plot_univariate_top()
    plot_live_R_vs_q()
    plot_valid_vs_oos()
    plot_segment_duration()
    plot_tod_signed()
    print(f"Wrote {len(list(OUT.glob('*.png')))} figures to {OUT}")


if __name__ == "__main__":
    main()
