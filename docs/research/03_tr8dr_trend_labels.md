---
title: "Labels Tr8dr — existence, screening, permission live OOS"
date: 2026-08-21
universe: EURUSD · tick_imbalance_10_fixed · 2023–2024
tags: [tr8dr, amplitude-based, permission, causal, oos]
status: draft
---

# Labels Tr8dr : un \(y\) d'abord, une permission ensuite

Avant tout modèle riche, il faut un label **amplitude-based** stable : segments directionnels offline (Tr8dr). Cette note suit le pipeline lab :

1. **Census L0** — le label existe-t-il (occupancy, durée, grille) ?
2. **Validité économique** — \(\Delta_{\mathrm{hit}}(h)\) sépare-t-il up vs down ?
3. **Screening univarié** — quelles features causales liftent T2 / T5 ?
4. **Stack contexte C4** — permission live \(R\) via têtes A/B/C ?
5. **OOS 2024** — la permission survit-elle hors sample ?

Verdict : label **GO** ; permission C4 **GO partiel** (R valid 0.56 → OOS **0.34**).

### Lexique

| Terme | Signification |
|-------|----------------|
| **AmplitudeBased / Tr8dr** | Label de segments : amplitude min (`minamp`) + timeout d'inactivité (`Tinactive`). |
| **a15/T60** | Baseline gelée : 15 bps × 60 bars. |
| **T1–T6** | Tâches de screening (reconstruction, onset, direction, survie, terminaison…). |
| **FFD** | *Fractional differentiation* (ici \(d=0.3\) sur slope). |
| **heads A/B/C** | Direction (T3), exit/range (T6b), gate de permission jambe. |
| **live permission \(R\)** | Score composite de la stack sur la population « live ». |
| **disc/dev vs OOS** | Fit H1-2023 ; valid H2-2023 ; lock **2024**. |
| **TIMB** | *Tick Imbalance Bars*. |

---

## Setup

| Paramètre | Valeur |
|-----------|--------|
| Actif / barrière | EURUSD · TIMB |
| Label | AmplitudeBased **minamp=15 bps**, **Tinactive=60** |
| Bars 2023 | 335 929 |
| Context C4 | Fit H1-2023 · valid H2 · OOS 2024 |

---

## Définition du label

Un segment directionnel démarre quand le prix parcourt au moins \(\alpha\) bps sans revenir, et se termine après \(T\) bars d'inactivité (ou flip) :

$$
y_t \in \{\mathrm{up},\ \mathrm{neutral},\ \mathrm{down}\}
$$

Validité économique à horizon \(h\) :

$$
D(h) = \Delta_{\mathrm{hit}}(h) = P(r_{t\to t+h}>0 \mid y=\mathrm{up}) - P(r_{t\to t+h}>0 \mid y=\mathrm{down})
$$

---

## Protocole

```mermaid
flowchart LR
  L0[L0 Census] --> Fwd[Fwd returns D(h)]
  Fwd --> P1[Univariate T2/T5]
  P1 --> C4[Context A+B+C]
  C4 --> OOS[OOS 2024]
```

---

## Résultats

### L0 — Existence

![Occupancy](assets/tr8dr_trend_labels/occupancy_stacked.png)

![Durées de segments](assets/tr8dr_trend_labels/segment_duration_dist.png)

![Grille minamp × Tinactive](assets/tr8dr_trend_labels/grid_sensitivity_heatmap.png)

![Signed fraction par session UTC](assets/tr8dr_trend_labels/tod_signed_fraction.png)

| Métrique | Valeur |
|----------|-------:|
| Occupancy signed | **48.6 %** |
| Segments | 1 607 (~5.2 / jour) |
| Durée p50 / p90 | **83** / 206 bars |
| Match grille vs baseline (médiane) | **0.73** |

Session 08–16 UTC plus directionnelle — contexte pour features, pas retune du label.

**Décision : GO.**

---

### Validité économique — \(D(h)\)

![Δ hit vs horizon](assets/tr8dr_trend_labels/delta_hit_vs_horizon.png)

![frac_pos par label](assets/tr8dr_trend_labels/frac_pos_by_label_horizon.png)

- Peak \(D(h)\) à **H=32** : **+0.549** (IC95 [0.540, 0.558]).
- Decay ; IC croise 0 aux très longs horizons.
- up ≫ neu ≈ 0.5 ≫ down.

**Décision : GO** — le label n'est pas un bruit de coding.

---

### Screening univarié (P1)

![Top features T2 / T5](assets/tr8dr_trend_labels/univariate_top_features.png)

| Tâche | Lecture |
|-------|---------|
| **T2 onset** | Lifts modestes (vol/ATR ~0.55–0.65) — conditionnement, pas edge d'entrée isolé |
| **T5 terminaison** | Range / ewma_vol / dc_channel_width AUC **~0.63–0.69** |
| **T3 direction** (journal) | Beaucoup de signaux **inversés** (AUC < 0.5) — orientation à traiter avec soin |

**Décision : GO → features / contexte.**

---

### Context C4 — permission live

Stack figée : A = `slope_ffd_post` + OFI ; B = range + choppiness ; C = |slope| + range_bps + TOD.

![R vs quantile q](assets/tr8dr_trend_labels/live_R_vs_quantile.png)

| Config | \(R\) | live rate | AUC live |
|--------|------:|----------:|---------:|
| C1 ref (`C_base` q=0.7) | 0.272 | 30 % | 0.571 |
| Best C4 (`C_bps_slim` q=0.5) | **0.558** | 50 % | 0.606 |

Le gain \(R\) vient surtout d'un **seuil plus bas**, pas d'une feature miracle.

---

### OOS 2024

![Valid vs OOS](assets/tr8dr_trend_labels/valid_vs_oos_2024.png)

| Métrique | Valid C4 | OOS 2024 |
|----------|---------:|---------:|
| \(R\) | 0.558 | **0.344** |
| AUC live | 0.606 | **0.587** |
| Live rate | 0.497 | **0.442** |

Verdict lab : **GO** (signal présent, dégradé). Permission = **filtre de régime**, pas alpha d'exécution.

---

## Synthèse

| Question | Réponse |
|----------|---------|
| Le label Tr8dr est-il sain ? | Oui — occupancy ~49 %, \(D(h)\) peak +0.55 |
| Onset univarié ? | Faible — conditionnement |
| Permission live C4 ? | Oui in-sample (R 0.56) |
| OOS 2024 ? | Partiel — R **0.34**, AUC ~0.59 |

> Un bon label et une permission **dégradée mais positive** OOS ne font pas encore une stratégie — ils font un **socle** pour le reste du lab (HMM, process gates, scalp).

**Usage recommandé :** \(y\) AmplitudeBased gelé + score C comme **gate de régime** dans un stack aval.

---

## Banque de figures

| Fichier | Phase | Usage suggéré |
|---------|-------|----------------|
| `occupancy_stacked.png` | L0 | Existence / balance |
| `segment_duration_dist.png` | L0 | Échelle temporelle |
| `grid_sensitivity_heatmap.png` | L0 | Robustesse params |
| `tod_signed_fraction.png` | L0 | Session effect |
| `delta_hit_vs_horizon.png` | Validity | Qualité économique |
| `frac_pos_by_label_horizon.png` | Validity | Séparation up/neu/down |
| `univariate_top_features.png` | P1 | Detectability |
| `live_R_vs_quantile.png` | C4 | Trade-off R / live rate |
| `valid_vs_oos_2024.png` | OOS | Dégradation honnête |

```bash
micromamba run -n financial-ml python scripts/research-figures/generate_tr8dr_trend_labels_figures.py
```

---

## Reproductibilité

| Artefact | Chemin |
|----------|--------|
| README / SPEC | [`research_notes/tr8dr_trend/`](../../research_notes/tr8dr_trend/) |
| Journaux | `RESULTATS_L0.md`, `RESULTATS_L0_FWD_RETURNS.md`, `RESULTATS_UNIVARIATE_P1.md`, `RESULTATS_CONTEXT_C4.md`, `RESULTATS_CONTEXT_OOS_C4.md` |
| Artefacts | `out/census_summary.json`, `label_fwd_returns_*.csv`, `context_*_meta.json` |

---

*Article dérivé du journal lab — août 2026.*
