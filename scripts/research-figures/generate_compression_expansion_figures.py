#!/usr/bin/env python3
"""Regenerate lab PNG figures for 04_compression_expansion.md."""
from __future__ import annotations

import json
import sys
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _plot_style import BLUE, GRAY, GREEN, ORANGE, RED, REPO_ROOT, apply_style, save_fig

PROC = REPO_ROOT / "research_notes/compression_expansion/out"
OUT = REPO_ROOT / "docs/research/assets/compression_expansion"


def plot_event_centered() -> None:
    d = json.loads((PROC / "v1_diagnostics.json").read_text())
    ec = d["detectors"]["std_logp"]["event_centered"]
    tau = np.array(ec["tau"])
    fig, ax = plt.subplots(figsize=(8, 4.5))
    ax.plot(tau, ec["median_event"], color=BLUE, lw=2, label="Event median")
    ax.plot(tau, ec["median_null"], color=GRAY, lw=2, ls="--", label="Matched null median")
    ax.fill_between(tau, ec["q25_event"], ec["q75_event"], color=BLUE, alpha=0.15)
    ax.axvline(0, color=RED, ls="--", lw=1.2, label="Onset τ=0")
    ax.set_xlabel("Event-centered lag τ (bars)")
    ax.set_ylabel("Median displacement proxy")
    ax.set_title("Detection lag: event-centered median Y vs τ (std_logp)")
    ax.legend(frameon=True, fontsize=8)
    ax.grid(alpha=0.35, linestyle="--")
    # annotate AUC pre/post
    auc = d["detectors"]["std_logp"]["auc"]
    ax.text(0.02, 0.98, f"AUCΔ pre={auc['auc_delta_pre']:.0f}\nAUCΔ post={auc['auc_delta_post']:.0f}", transform=ax.transAxes, va="top", fontsize=9, bbox=dict(boxstyle="round", facecolor="white", alpha=0.85))
    save_fig(fig, OUT, "event_centered_std_logp.png")


def plot_ablation_matching() -> None:
    ab = json.loads((PROC / "v1_ablation.json").read_text())["detectors"]["std_logp"]["ablation"]
    labels = ["N_A\n(tod)", "N_B\n(compression)", "N_C\n(comp+Dpre)"]
    keys = ["N_A_tod", "N_B_compression", "N_C_compression_dpre"]
    mfe = [ab[k]["by_horizon"]["10"]["delta_median_mfe"] for k in keys]
    auc_pre = [ab[k]["auc_delta_pre"] for k in keys]
    auc_post = [ab[k]["auc_delta_post"] for k in keys]
    x = np.arange(len(labels))
    fig, axes = plt.subplots(1, 2, figsize=(10, 4.2))
    axes[0].bar(x, mfe, color=ORANGE, edgecolor="white", width=0.6)
    axes[0].set_xticks(x)
    axes[0].set_xticklabels(labels)
    axes[0].set_ylabel("Δ median MFE/σ (H=10)")
    axes[0].set_title("Ablation: Δ MFE₅₀ vs null tier")
    axes[0].grid(axis="y", alpha=0.35, linestyle="--")
    for i, v in enumerate(mfe):
        axes[0].text(i, v + 0.005, f"{v:.2f}", ha="center", fontsize=9)
    w = 0.35
    axes[1].bar(x - w / 2, auc_pre, w, label="AUCΔ pre", color=BLUE, edgecolor="white")
    axes[1].bar(x + w / 2, auc_post, w, label="AUCΔ post", color=GREEN, edgecolor="white")
    axes[1].set_xticks(x)
    axes[1].set_xticklabels(labels)
    axes[1].set_ylabel("AUC of Δ(event−null)")
    axes[1].set_title("Ablation: pre vs post onset AUCΔ")
    axes[1].legend(frameon=True, fontsize=8)
    axes[1].grid(axis="y", alpha=0.35, linestyle="--")
    fig.suptitle("Matching ablation N_A → N_C (std_logp)", y=1.02, fontsize=13)
    save_fig(fig, OUT, "ablation_matching_mfe.png")


def plot_v1_vs_v1b() -> None:
    d = json.loads((PROC / "v1b_structural.json").read_text())["detectors"]["std_logp"]
    fig, axes = plt.subplots(1, 2, figsize=(10, 4.2))
    # displacement profiles
    ax = axes[0]
    for ver, color, ls in [("v1", RED, "-"), ("v1b", BLUE, "-")]:
        prof = d[ver]["structural"]["d_profile"]
        ks = [1, 2, 3, 5, 8]
        minus = [prof[f"D_minus_{k}"] for k in ks]
        plus = [prof[f"D_plus_{k}"] for k in ks]
        ax.plot([-k for k in ks], minus, marker="o", color=color, ls=ls, label=f"{ver} D⁻")
        ax.plot(ks, plus, marker="s", color=color, ls="--", alpha=0.85, label=f"{ver} D⁺")
    ax.axvline(0, color=GRAY, lw=0.8)
    ax.set_xlabel("Lag k (bars)")
    ax.set_ylabel("Median |displacement|")
    ax.set_title("Pre/post displacement profiles")
    ax.legend(fontsize=7, ncol=2, frameon=True)
    ax.grid(alpha=0.35, linestyle="--")
    # clustering
    ax = axes[1]
    fracs = [d["v1"]["structural"]["clustering_H40"]["frac_gap_lt_H"], d["v1b"]["structural"]["clustering_H40"]["frac_gap_lt_H"]]
    bars = ax.bar(["V1", "V1b"], fracs, color=[RED, BLUE], edgecolor="white", width=0.55)
    ax.set_ylabel("Fraction of gaps < 40 bars")
    ax.set_title("Inter-event clustering")
    ax.set_ylim(0, 0.7)
    for b, v in zip(bars, fracs):
        ax.text(b.get_x() + b.get_width() / 2, v + 0.02, f"{v:.1%}", ha="center", fontsize=10, fontweight="bold")
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    fig.suptitle("V1 vs V1b structural comparison", y=1.02, fontsize=13)
    save_fig(fig, OUT, "v1_vs_v1b_profiles.png")


def plot_incremental_ablation() -> None:
    ab = json.loads((PROC / "v1b_incremental_ablation.json").read_text())["ablation"]["std_logp_v1b"]
    fig, ax = plt.subplots(figsize=(7, 4.2))
    labels = ["Δ log-loss\n(base+vol − base)", "Δ Brier", "Δ R²"]
    vals = [ab["delta_log_loss"], ab["delta_brier"], ab["delta_r2"]]
    colors = [RED if v < 0 else GREEN for v in vals]
    bars = ax.bar(labels, vals, color=colors, edgecolor="white", width=0.55)
    ax.axhline(0, color="black", lw=0.9)
    ax.set_ylabel("Incremental metric (vol features)")
    ax.set_title("Incremental ablation: vol surplus ≈ 0 (vs slope+ER base)")
    for b, v in zip(bars, vals):
        ax.text(b.get_x() + b.get_width() / 2, v + (0.0003 if v >= 0 else -0.0004), f"{v:+.4f}", ha="center", fontsize=9, fontweight="bold")
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "incremental_ablation_bars.png")


def plot_acf_z_null() -> None:
    d = json.loads((PROC / "filter_null_onset_2023.json").read_text())
    zn = d["bars"]["tick_imbalance_10_fixed"]["windows"]["20"]["z_null"]
    lags = [1, 2, 3, 5, 10, 20]
    real = [zn["real"]["acf_z"][str(L)] for L in lags]
    # approximate null mean from available keys for lag 1 and 5, else interpolate note
    null_means = []
    for L in lags:
        key = f"acf_z{L}"
        if key in zn["null_iid_rw"]:
            null_means.append(zn["null_iid_rw"][key]["mean"])
        else:
            null_means.append(np.nan)
    fig, ax = plt.subplots(figsize=(7.5, 4.2))
    ax.plot(lags, real, marker="o", color=BLUE, lw=2, label="Real rolling z ACF")
    # plot available null points
    lags_n = [L for L, m in zip(lags, null_means) if not np.isnan(m)]
    means_n = [m for m in null_means if not np.isnan(m)]
    ax.plot(lags_n, means_n, marker="s", color=ORANGE, lw=2, ls="--", label="IID-RW null mean")
    excess = zn["excess_vs_null_mean"]
    ax.set_xlabel("Lag")
    ax.set_ylabel("ACF")
    ax.set_title(f"Rolling z-score ACF vs IID-RW null (excess@1={excess['acf_z1']:+.3f})")
    ax.legend(frameon=True)
    ax.grid(alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "acf_z_vs_iid_null.png")


def plot_onset_benchmark() -> None:
    onset = json.loads((PROC / "filter_null_onset_2023.json").read_text())["bars"]["tick_imbalance_10_fixed"]["windows"]["20"]["onset"]["detection"]
    names = ["delta", "slope5", "fd_0.4", "level"]
    labels = ["Δv", "slope5", "FD 0.4", "level"]
    recall = [onset[n]["recall"] for n in names]
    fa = [onset[n]["fa_rate"] for n in names]
    delay = [onset[n]["delay_median"] for n in names]
    x = np.arange(len(names))
    fig, axes = plt.subplots(1, 2, figsize=(10, 4.2))
    axes[0].bar(x - 0.2, recall, 0.4, label="Recall", color=GREEN, edgecolor="white")
    axes[0].bar(x + 0.2, fa, 0.4, label="FA rate", color=RED, edgecolor="white")
    axes[0].set_xticks(x)
    axes[0].set_xticklabels(labels)
    axes[0].set_ylim(0, 1.05)
    axes[0].set_title("Recall vs false-alarm rate")
    axes[0].legend(frameon=True, fontsize=8)
    axes[0].grid(axis="y", alpha=0.35, linestyle="--")
    bars = axes[1].bar(labels, delay, color=BLUE, edgecolor="white", width=0.55)
    axes[1].axhline(0, color="black", lw=0.8)
    axes[1].set_ylabel("Median detection delay (bars)")
    axes[1].set_title("Negative = early vs EWMA episode")
    for b, v in zip(bars, delay):
        axes[1].text(b.get_x() + b.get_width() / 2, v + (0.3 if v >= 0 else -0.8), f"{v:+.0f}", ha="center", fontsize=9)
    axes[1].grid(axis="y", alpha=0.35, linestyle="--")
    fig.suptitle("Onset benchmark vs EWMA vol episodes", y=1.02, fontsize=13)
    save_fig(fig, OUT, "onset_benchmark_recall_delay.png")


def plot_escape_scoreboard() -> None:
    bh = json.loads((PROC / "v1_event_study.json").read_text())["detectors"]["std_logp"]["by_horizon"]
    horizons = sorted(bh.keys(), key=int)
    ev = [bh[h]["event"]["p_escape"] for h in horizons]
    nu = [bh[h]["matched_null"]["p_escape"] for h in horizons]
    x = np.arange(len(horizons))
    w = 0.35
    fig, ax = plt.subplots(figsize=(7.5, 4.2))
    ax.bar(x - w / 2, ev, w, label="Event", color=BLUE, edgecolor="white")
    ax.bar(x + w / 2, nu, w, label="Matched null", color=GRAY, edgecolor="white")
    ax.set_xticks(x)
    ax.set_xticklabels([f"H={h}" for h in horizons])
    ax.set_ylabel("P(escape)")
    ax.set_ylim(0.7, 1.0)
    ax.set_title("V1 escape rates: event vs matched null (already high at null)")
    ax.legend(frameon=True)
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    save_fig(fig, OUT, "v1_escape_scoreboard.png")


def plot_gap_clustering() -> None:
    # reuse v1 vs v1b clustering as dedicated figure
    d = json.loads((PROC / "v1b_structural.json").read_text())["detectors"]["std_logp"]
    fig, ax = plt.subplots(figsize=(6.5, 4.2))
    metrics = ["frac gaps<40", "median gap", "max cluster run"]
    v1 = d["v1"]["structural"]["clustering_H40"]
    v1b = d["v1b"]["structural"]["clustering_H40"]
    # normalize for display: show three panels conceptually via twin - better simple grouped for frac only + annotate
    vals_v1 = [v1["frac_gap_lt_H"], v1["median_gap_bars"] / 200, v1["max_cluster_run"] / 20]
    vals_v1b = [v1b["frac_gap_lt_H"], v1b["median_gap_bars"] / 200, v1b["max_cluster_run"] / 20]
    x = np.arange(3)
    w = 0.35
    ax.bar(x - w / 2, vals_v1, w, label="V1", color=RED, edgecolor="white")
    ax.bar(x + w / 2, vals_v1b, w, label="V1b", color=BLUE, edgecolor="white")
    ax.set_xticks(x)
    ax.set_xticklabels(["Frac gaps < 40\n(raw)", "Median gap / 200", "Max cluster / 20"])
    ax.set_ylabel("Scaled metric")
    ax.set_title(f"Clustering: V1 median gap={v1['median_gap_bars']:.0f} vs V1b={v1b['median_gap_bars']:.0f}")
    ax.legend(frameon=True)
    ax.grid(axis="y", alpha=0.35, linestyle="--")
    # raw annotations
    ax.text(0, max(vals_v1[0], vals_v1b[0]) + 0.03, f"{v1['frac_gap_lt_H']:.0%} vs {v1b['frac_gap_lt_H']:.0%}", ha="center", fontsize=8)
    save_fig(fig, OUT, "gap_clustering_frac.png")


def main() -> None:
    apply_style()
    OUT.mkdir(parents=True, exist_ok=True)
    plot_event_centered()
    plot_ablation_matching()
    plot_v1_vs_v1b()
    plot_incremental_ablation()
    plot_acf_z_null()
    plot_onset_benchmark()
    plot_escape_scoreboard()
    plot_gap_clustering()
    print(f"Wrote {len(list(OUT.glob('*.png')))} figures to {OUT}")


if __name__ == "__main__":
    main()
