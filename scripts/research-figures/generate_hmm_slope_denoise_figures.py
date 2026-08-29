#!/usr/bin/env python3
"""Regenerate lab PNG figures for 02_hmm_slope_denoise.md."""
from __future__ import annotations

import json
import sys
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.metrics import roc_auc_score

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _plot_style import BLUE, GRAY, GREEN, ORANGE, RED, REPO_ROOT, apply_style, save_fig

PROC = REPO_ROOT / "research_notes/hmm_slope_denoise/out"
OUT = REPO_ROOT / "docs/research/assets/hmm_slope_denoise"


def plot_emission_means() -> None:
    d = json.loads((PROC / "hmm2_slope_summary.json").read_text())
    windows = [16, 32, 64, 128]
    downs = [d["models"][f"w_{w}"]["means"][0] for w in windows]
    neuts = [d["models"][f"w_{w}"]["means"][1] for w in windows]
    ups = [d["models"][f"w_{w}"]["means"][2] for w in windows]
    x = np.arange(len(windows))
    w = 0.25
    fig, ax = plt.subplots(figsize=(7.5, 4.2))
    ax.bar(x - w, downs, w, label="μ_down", color=RED, edgecolor="white")
    ax.bar(x, neuts, w, label="μ_neutral", color=GRAY, edgecolor="white")
    ax.bar(x + w, ups, w, label="μ_up", color=GREEN, edgecolor="white")
    ax.axhline(0, color="black", lw=0.8)
    ax.set_xticks(x)
    ax.set_xticklabels([str(w_) for w_ in windows])
    ax.set_xlabel("OLS t-stat window (bars)")
    ax.set_ylabel("Emission mean")
    ax.set_title("Gate 0 — Learned emission means by horizon (K=3)")
    ax.legend(frameon=True)
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "emission_means_by_horizon.png")


def plot_align_soft_hist() -> None:
    d = json.loads((PROC / "hmm2_p0_ablation_summary.json").read_text())
    hist = d["by_duration"]["ed_40"]["diagnostics"]["multi_horizon"]["alignment_count_hist"]
    xs = list(range(5))
    ys = [hist[str(i)] for i in xs]
    fig, ax = plt.subplots(figsize=(7, 4.2))
    bars = ax.bar([str(i) for i in xs], ys, color=BLUE, edgecolor="white", width=0.65)
    ax.set_xlabel("Number of horizons aligned with soft majority (0–4)")
    ax.set_ylabel("Fraction of bars")
    ax.set_title("Gate 1 — Multi-horizon soft alignment distribution")
    ax.set_ylim(0, max(ys) * 1.2)
    for b, v in zip(bars, ys):
        ax.text(b.get_x() + b.get_width() / 2, v + 0.005, f"{v:.1%}", ha="center", fontsize=9)
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "align_soft_histogram.png")


def plot_cif() -> None:
    d = json.loads((PROC / "hmm2_soft_fade_survival_summary.json").read_text())
    fig, axes = plt.subplots(1, 2, figsize=(10, 4.2), sharey=True)
    for ax, key, title in zip(
        axes,
        ["IS_2023_postcalib", "OOS_2024"],
        ["IS (2023 post-calib)", "OOS (2024)"],
    ):
        curve = d[key]["all"]["curve"]
        ages = [r["age"] for r in curve if r["age"] <= 40]
        for cause, color, label in [
            ("resolve", GREEN, "Resolve (R)"),
            ("escalate", ORANGE, "Escalate (E)"),
            ("break", RED, "Break (B)"),
        ]:
            ax.plot(ages, [r[f"CIF_{cause}"] for r in curve if r["age"] <= 40], color=color, lw=2, label=label)
        ax.set_xlabel("Episode age (bars)")
        ax.set_title(title)
        ax.grid(alpha=0.35, linestyle="--")
        ax.legend(frameon=True, fontsize=8)
    axes[0].set_ylabel("Cumulative incidence F(k)")
    fig.suptitle("Gate 1 — CIF by episode age (R / E / B)", y=1.02, fontsize=13)
    save_fig(fig, OUT, "cif_by_age_IS_OOS.png")


def plot_hazards() -> None:
    d = json.loads((PROC / "hmm2_soft_fade_survival_summary.json").read_text())
    fig, ax = plt.subplots(figsize=(7.5, 4.2))
    for key, ls, label in [("IS_2023_postcalib", "-", "IS"), ("OOS_2024", "--", "OOS")]:
        curve = [r for r in d[key]["all"]["curve"] if 1 <= r["age"] <= 24]
        ages = [r["age"] for r in curve]
        ax.plot(ages, [r["lambda_escalate"] for r in curve], color=ORANGE, ls=ls, lw=2, label=f"λ_E — {label}")
        ax.plot(ages, [r["lambda_resolve"] for r in curve], color=GREEN, ls=ls, lw=2, label=f"λ_R — {label}")
    ax.set_xlabel("Episode age (bars)")
    ax.set_ylabel("Cause-specific hazard")
    ax.set_title("Gate 1 — Cause-specific hazards (E early, R later)")
    ax.legend(frameon=True, ncol=2, fontsize=8)
    ax.grid(alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "cause_specific_hazards.png")


def plot_pnl_by_exit() -> None:
    tr = pd.read_parquet(PROC / "hmm2_oos_soft_fade_trades.parquet")
    order = ["resolve", "escalate", "break"]
    colors = [GREEN, ORANGE, RED]
    fig, axes = plt.subplots(1, 2, figsize=(10, 4.2), sharey=True)
    for ax, split, title in zip(axes, ["IS_2023_postcalib", "OOS_2024"], ["IS", "OOS"]):
        sub = tr[tr["set"] == split]
        means = [sub.loc[sub["outcome"] == o, "ret_pips"].mean() for o in order]
        ns = [int((sub["outcome"] == o).sum()) for o in order]
        bars = ax.bar([o.capitalize() for o in order], means, color=colors, edgecolor="white", width=0.65)
        ax.axhline(0, color="black", lw=0.8)
        ax.set_title(f"{title} (n={len(sub)})")
        ax.set_ylabel("Mean PnL (pips)" if ax is axes[0] else "")
        for b, v, n in zip(bars, means, ns):
            ax.text(b.get_x() + b.get_width() / 2, v + (0.15 if v >= 0 else -0.35), f"{v:+.2f}\nn={n}", ha="center", va="bottom" if v >= 0 else "top", fontsize=8)
        ax.grid(axis="y", alpha=0.35, linestyle="--")
    fig.suptitle("Gate 4 — Ex-ante soft-fade PnL by exit type (0 cost)", y=1.02, fontsize=13)
    save_fig(fig, OUT, "pnl_by_exit_type.png")


def plot_onset_safety() -> None:
    d = json.loads((PROC / "hmm2_soft_fade_p3a1_summary.json").read_text())
    qs = d["quantile_by_safety_OOS"]
    fig, ax = plt.subplots(figsize=(7, 4.2))
    xs = [r["q"] for r in qs]
    ax.plot(xs, [r["P_escalate"] for r in qs], marker="o", color=ORANGE, lw=2, label="P(Escalate)")
    ax.plot(xs, [r["P_resolve"] for r in qs], marker="s", color=GREEN, lw=2, label="P(Resolve)")
    ax.set_xlabel("Safety score quantile (1 = safest)")
    ax.set_ylabel("Empirical rate (OOS)")
    ax.set_title("Gate 2 — Onset-only safety quantiles (non-monotone OOS)")
    ax.legend(frameon=True)
    ax.grid(alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "onset_safety_quantiles.png")


def plot_dynamic_auc_by_age() -> None:
    pp = pd.read_parquet(PROC / "hmm2_soft_fade_p3a2_person_period.parquet")
    oos = pp[pp["split"] == "OOS"].copy()
    oos["y_E"] = (oos["y"] == "escalate").astype(int)
    buckets = ["a1_2", "a3_4", "a5_8", "a9_12", "a13_16", "a17_24", "a25_32", "a33_64"]
    labels, aucs, ns = [], [], []
    for b in buckets:
        sub = oos[oos["age_bucket"] == b]
        if sub["y_E"].nunique() < 2 or len(sub) < 50:
            continue
        labels.append(b.replace("a", ""))
        aucs.append(roc_auc_score(sub["y_E"], sub["p_escalate"]))
        ns.append(len(sub))
    fig, ax = plt.subplots(figsize=(7.5, 4.2))
    ax.plot(labels, aucs, marker="o", color=BLUE, lw=2.2, markersize=7)
    ax.axhline(0.5, color=GRAY, ls="--", lw=1)
    ax.set_xlabel("Episode age bucket (bars)")
    ax.set_ylabel("AUC (Escalate vs rest)")
    ax.set_title(f"Gate 3 — Dynamic hazard AUC by age (OOS person-period, n={len(oos):,})")
    ax.set_ylim(0.45, max(aucs) * 1.08 if aucs else 1)
    for x, y, n in zip(labels, aucs, ns):
        ax.annotate(f"{y:.2f}", (x, y), textcoords="offset points", xytext=(0, 8), ha="center", fontsize=8)
    ax.grid(alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "dynamic_hazard_auc_by_age.png")


def plot_frozen_vs_refit() -> None:
    d = json.loads((PROC / "hmm2_p1_summary.json").read_text())
    corr = d["oos"]["soft_corr_frozen_vs_refit_2024"]
    windows = [16, 32, 64, 128]
    vals = [corr[f"w_{w}"] for w in windows]
    fig, ax = plt.subplots(figsize=(7, 4.2))
    bars = ax.bar([str(w) for w in windows], vals, color=GREEN, edgecolor="white", width=0.65)
    ax.set_ylim(0.9, 1.01)
    ax.set_xlabel("Horizon window")
    ax.set_ylabel("corr(soft frozen, soft refit)")
    ax.set_title("Gate 0 — Frozen vs refit soft correlation (2023-H1 → 2024)")
    for b, v in zip(bars, vals):
        ax.text(b.get_x() + b.get_width() / 2, v + 0.002, f"{v:.3f}", ha="center", fontsize=10, fontweight="bold")
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "frozen_vs_refit_correlation.png")


def plot_outcome_tree() -> None:
    """Conceptual rates from RESULTATS_P2 / OOS books."""
    fig, ax = plt.subplots(figsize=(8, 4.5))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 6)
    ax.axis("off")
    ax.set_title("Gate 1 — Soft-fade paths: conditional re-alignment rates", fontsize=13, pad=12)

    def box(x, y, w, h, text, color):
        rect = plt.Rectangle((x, y), w, h, facecolor=color, edgecolor="black", linewidth=1, alpha=0.85)
        ax.add_patch(rect)
        ax.text(x + w / 2, y + h / 2, text, ha="center", va="center", fontsize=9, color="white", fontweight="bold")

    box(3.5, 4.5, 3, 0.9, "Soft-fade onset\ns16: +1→0 | s128=+1", BLUE)
    box(0.5, 2.4, 3.2, 1.0, "Stay / resolve path\n~90% re-align\n(among R∪B)", GREEN)
    box(6.3, 2.4, 3.2, 1.0, "Counter-move path\ns16→−1\n~60% re-align", ORANGE)
    box(0.5, 0.4, 3.2, 1.0, "Trading book\nEscalate ~68%\nResolve ~28% / Break ~4%", RED)
    box(6.3, 0.4, 3.2, 1.0, "Key caveat\n90% ≠ P(onset)\n= conditional R/(R+B)", GRAY)
    ax.annotate("", xy=(2.1, 3.4), xytext=(4.2, 4.5), arrowprops=dict(arrowstyle="->", color="black", lw=1.2))
    ax.annotate("", xy=(7.9, 3.4), xytext=(5.8, 4.5), arrowprops=dict(arrowstyle="->", color="black", lw=1.2))
    ax.annotate("", xy=(2.1, 1.4), xytext=(2.1, 2.4), arrowprops=dict(arrowstyle="->", color="black", lw=1.2))
    ax.annotate("", xy=(7.9, 1.4), xytext=(7.9, 2.4), arrowprops=dict(arrowstyle="->", color="black", lw=1.2))
    fig.tight_layout()
    fig.savefig(OUT / "episode_outcome_tree.png", dpi=160, bbox_inches="tight", facecolor="white")
    plt.close(fig)


def main() -> None:
    apply_style()
    OUT.mkdir(parents=True, exist_ok=True)
    plot_emission_means()
    plot_align_soft_hist()
    plot_cif()
    plot_hazards()
    plot_pnl_by_exit()
    plot_onset_safety()
    plot_dynamic_auc_by_age()
    plot_frozen_vs_refit()
    plot_outcome_tree()
    print(f"Wrote {len(list(OUT.glob('*.png')))} figures to {OUT}")


if __name__ == "__main__":
    main()
