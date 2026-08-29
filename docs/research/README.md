# Protocoles recherche — eurusd-lab

Protocoles intégraux des études EURUSD / barres TIMB. Les articles publics du blog en sont des synthèses ; ce dossier conserve le détail méthodologique (features, splits, métriques, reproductibilité).

## Index

| Protocole                                                          | Article blog                                               |
| ------------------------------------------------------------------ | ---------------------------------------------------------- |
| [01_multi_scale_countertrend.md](./01_multi_scale_countertrend.md) | [Multi-scale countertrend](/blog/multi-scale-countertrend) |
| [02_hmm_slope_denoise.md](./02_hmm_slope_denoise.md)               | [HMM slope denoise](/blog/hmm-slope-denoise)               |
| [03_tr8dr_trend_labels.md](./03_tr8dr_trend_labels.md)             | [Tr8dr trend labels](/blog/tr8dr-trend-labels)             |
| [04_compression_expansion.md](./04_compression_expansion.md)       | [Compression → expansion](/blog/compression-expansion)     |
| [05_stoch_event_context.md](./05_stoch_event_context.md)           | [Stoch event sampling](/blog/stoch-event-sampling)         |

## Figures

- **Site** : composants React inline dans `src/components/blog/figures/` (rendu MDX).
- **Lab** (optionnel) : PNG générés par `scripts/research-figures/` → `docs/research/assets/<slug>/`.

## Régénérer les figures lab

Depuis la racine du dépôt, avec l'environnement `financial-ml` (micromamba) et les sorties dans `research_notes/` (hors repo) :

```bash
python scripts/research-figures/generate_multi_scale_countertrend_figures.py
python scripts/research-figures/generate_hmm_slope_denoise_figures.py
python scripts/research-figures/generate_tr8dr_trend_labels_figures.py
python scripts/research-figures/generate_compression_expansion_figures.py
python scripts/research-figures/generate_stoch_event_context_figures.py
```

## Note

Le dossier `/showcase` à la racine était un lab temporaire local (gitignored). Il ne fait **pas** partie du site ; le contenu utile vit ici et dans le blog.
