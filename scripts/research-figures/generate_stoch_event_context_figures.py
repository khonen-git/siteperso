#!/usr/bin/env python3
"""Regenerate lab PNG figures for 05_stoch_event_context.md."""
from __future__ import annotations

import json
import sys
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _plot_style import BLUE, GRAY, GREEN, ORANGE, RED, REPO_ROOT, apply_style, save_fig

PROC = REPO_ROOT / "research_notes/stoch_event_context/out"
OUT = REPO_ROOT / "docs/research/assets/stoch_event_context"
FOCUS = "stoch_32_10_90"


def _load_multi(mode: str) -> pd.DataFrame:
    return pd.read_csv(PROC / mode / "multi_stoch_events.csv")


def plot_auc_raw_vs_alt() -> None:
    frames = []
    for mode, label in [("raw_v1", "raw"), ("alt_overlap", "alt_overlap"), ("alt_no_overlap", "alt_no_overlap")]:
        df = _load_multi(mode)
        sub = df[df["universe"] == FOCUS].copy()
        sub["mode"] = label
        frames.append(sub)
    all_df = pd.concat(frames, ignore_index=True)
    tasks = ["C_event", "A_leg", "A_fwd"]
    modes = ["raw", "alt_overlap", "alt_no_overlap"]
    colors = [RED, ORANGE, BLUE]
    x = np.arange(len(tasks))
    w = 0.25
    fig, ax = plt.subplots(figsize=(8, 4.5))
    for i, (mode, color) in enumerate(zip(modes, colors)):
        vals = [float(all_df[(all_df["mode"] == mode) & (all_df["task"] == t)]["valid_auc"].iloc[0]) for t in tasks]
        bars = ax.bar(x + (i - 1) * w, vals, w, label=mode, color=color, edgecolor="white")
        for b, v in zip(bars, vals):
            ax.text(b.get_x() + b.get_width() / 2, v + 0.01, f"{v:.2f}", ha="center", fontsize=8)
    ax.axhline(0.5, color=GRAY, ls="--", lw=1)
    ax.set_xticks(x)
    ax.set_xticklabels(tasks)
    ax.set_ylabel("Valid AUC")
    ax.set_ylim(0.45, 0.95)
    ax.set_title(f"AUC by task: raw vs alt ({FOCUS})")
    ax.legend(frameon=True)
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "auc_raw_vs_alt.png")


def plot_event_counts() -> None:
    counts = {}
    for mode, label in [("raw_v1", "raw"), ("alt_overlap", "alt_overlap"), ("alt_no_overlap", "alt_no_overlap")]:
        d = json.loads((PROC / mode / "stoch_event_pops_summary.json").read_text())
        counts[label] = d["universes"][FOCUS]["n_events"]
    fig, ax = plt.subplots(figsize=(7, 4.2))
    labels = list(counts.keys())
    vals = [counts[k] for k in labels]
    bars = ax.bar(labels, vals, color=[RED, ORANGE, BLUE], edgecolor="white", width=0.6)
    ax.set_ylabel("Number of events")
    ax.set_title(f"Event counts by sampling universe ({FOCUS})")
    for b, v in zip(bars, vals):
        ax.text(b.get_x() + b.get_width() / 2, v + max(vals) * 0.02, f"{v:,}", ha="center", fontsize=10, fontweight="bold")
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "event_counts_by_universe.png")


def plot_auc_by_stoch_params() -> None:
    df = _load_multi("alt_overlap")
    sub = df[df["task"] == "C_event"].copy()
    sub["label"] = sub.apply(lambda r: f"p={int(r.period)}\n[{r.lo:.0f},{r.hi:.0f}]", axis=1)
    fig, ax = plt.subplots(figsize=(7.5, 4.2))
    bars = ax.bar(sub["label"], sub["valid_auc"], color=BLUE, edgecolor="white", width=0.65)
    ax.axhline(0.5, color=GRAY, ls="--", lw=1)
    ax.set_ylabel("Valid AUC (C_event)")
    ax.set_title("C_event AUC by stoch period and band (alt_overlap)")
    ax.set_ylim(0.5, max(sub["valid_auc"]) * 1.12)
    for b, v in zip(bars, sub["valid_auc"]):
        ax.text(b.get_x() + b.get_width() / 2, v + 0.005, f"{v:.3f}", ha="center", fontsize=9)
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "auc_by_stoch_params.png")


def plot_univariate_c_event() -> None:
    uni = pd.read_csv(PROC / "alt_overlap/uni_stoch_events.csv")
    sub = uni[(uni["universe"] == FOCUS) & (uni["task"] == "C_event") & (uni["split"] == "valid")].copy()
    sub = sub.sort_values("auc", ascending=True)
    fig, ax = plt.subplots(figsize=(7.5, 4.5))
    colors = [GREEN if v > 0.55 else BLUE if v > 0.5 else GRAY for v in sub["auc"]]
    ax.barh(sub["feature"], sub["auc"], color=colors, edgecolor="white", height=0.7)
    ax.axvline(0.5, color=RED, ls="--", lw=1.2)
    ax.set_xlabel("Valid AUC")
    ax.set_title(f"Univariate AUC for C_event ({FOCUS}, alt_overlap)")
    ax.grid(axis="x", alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "univariate_c_event_features.png")


def plot_delta_ll() -> None:
    df = _load_multi("alt_overlap")
    sub = df[df["universe"] == FOCUS].copy()
    fig, ax = plt.subplots(figsize=(7, 4.2))
    colors = [BLUE, ORANGE, GREEN]
    bars = ax.bar(sub["task"], sub["delta_ll"], color=colors, edgecolor="white", width=0.6)
    ax.axhline(0, color="black", lw=0.8)
    ax.set_ylabel("Δ log-likelihood vs prior")
    ax.set_title(f"Delta log-likelihood vs prior (alt_overlap, {FOCUS})")
    for b, v in zip(bars, sub["delta_ll"]):
        ax.text(b.get_x() + b.get_width() / 2, v - 0.004 if v < 0 else v + 0.002, f"{v:+.3f}", ha="center", fontsize=9)
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "delta_ll_vs_prior.png")


def plot_multi_task_summary() -> None:
    df = _load_multi("alt_overlap")
    # best AUC per task across universes
    best = df.loc[df.groupby("task")["valid_auc"].idxmax()].sort_values("task")
    fig, ax = plt.subplots(figsize=(7, 4.2))
    bars = ax.bar(best["task"], best["valid_auc"], color=[BLUE, ORANGE, GREEN], edgecolor="white", width=0.6)
    ax.axhline(0.5, color=GRAY, ls="--", lw=1)
    ax.set_ylabel("Best valid AUC (alt_overlap)")
    ax.set_title("Multi-task valid AUC summary (best universe per task)")
    ax.set_ylim(0.45, max(best["valid_auc"]) * 1.15)
    for b, v, u in zip(bars, best["valid_auc"], best["universe"]):
        ax.text(b.get_x() + b.get_width() / 2, v + 0.01, f"{v:.2f}\n{u.replace('stoch_', '')}", ha="center", fontsize=8)
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "multi_task_summary_bars.png")


def plot_sampling_bias_schematic() -> None:
    fig, ax = plt.subplots(figsize=(8, 4.2))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 5)
    ax.axis("off")
    ax.set_title("Sampling bias: same-side spam inside a trend leg", fontsize=13, pad=8)

    def box(x, y, w, h, text, color):
        ax.add_patch(plt.Rectangle((x, y), w, h, facecolor=color, edgecolor="black", alpha=0.85, lw=1))
        ax.text(x + w / 2, y + h / 2, text, ha="center", va="center", fontsize=9, color="white", fontweight="bold")

    box(0.4, 3.2, 3.2, 1.2, "Tr8dr up-leg\n(trend continues)", GREEN)
    box(4.0, 3.2, 2.8, 1.2, "Raw stoch crosses\nsame-side spam", RED)
    box(7.2, 3.2, 2.4, 1.2, "AUC A_leg\n~0.85 (biased)", ORANGE)
    box(0.4, 0.6, 3.2, 1.2, "Alt universe\nalternate sides", BLUE)
    box(4.0, 0.6, 2.8, 1.2, "Tradable events\nn ÷ 5", GRAY)
    box(7.2, 0.6, 2.4, 1.2, "AUC A_leg\n~0.59–0.63", GREEN)
    ax.annotate("", xy=(4.0, 3.8), xytext=(3.6, 3.8), arrowprops=dict(arrowstyle="->", lw=1.2))
    ax.annotate("", xy=(7.2, 3.8), xytext=(6.8, 3.8), arrowprops=dict(arrowstyle="->", lw=1.2))
    ax.annotate("", xy=(4.0, 1.2), xytext=(3.6, 1.2), arrowprops=dict(arrowstyle="->", lw=1.2))
    ax.annotate("", xy=(7.2, 1.2), xytext=(6.8, 1.2), arrowprops=dict(arrowstyle="->", lw=1.2))
    ax.annotate("", xy=(2.0, 1.8), xytext=(2.0, 3.2), arrowprops=dict(arrowstyle="->", lw=1.2, color="black"))
    ax.text(2.3, 2.4, "fix sampling", fontsize=8, rotation=90, va="center")
    fig.tight_layout()
    fig.savefig(OUT / "sampling_bias_schematic.png", dpi=160, bbox_inches="tight", facecolor="white")
    plt.close(fig)


def main() -> None:
    apply_style()
    OUT.mkdir(parents=True, exist_ok=True)
    plot_auc_raw_vs_alt()
    plot_event_counts()
    plot_auc_by_stoch_params()
    plot_univariate_c_event()
    plot_delta_ll()
    plot_multi_task_summary()
    plot_sampling_bias_schematic()
    print(f"Wrote {len(list(OUT.glob('*.png')))} figures to {OUT}")


if __name__ == "__main__":
    main()
