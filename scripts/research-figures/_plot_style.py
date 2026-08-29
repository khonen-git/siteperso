"""Shared matplotlib style for research figure scripts."""
from __future__ import annotations

from pathlib import Path

import matplotlib.pyplot as plt

BLUE = "#2c6e9b"
GREEN = "#3a7d44"
RED = "#c44e52"
ORANGE = "#dd8452"
GRAY = "#888888"
PURPLE = "#7a5c9e"

REPO_ROOT = Path(__file__).resolve().parents[2]


def apply_style() -> None:
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


def save_fig(fig: plt.Figure, out_dir: Path, name: str) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    fig.tight_layout()
    fig.savefig(out_dir / name, dpi=160, bbox_inches="tight", facecolor="white")
    plt.close(fig)
