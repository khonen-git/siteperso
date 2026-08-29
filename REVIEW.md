# Revue site — état au 2026-08-29

Inventaire technique et éditorial du dépôt `siteperso`. Priorités P0 → P2.

---

## Migration lab eurusd-lab

Le dossier **`/showcase`** était un lab local temporaire — **hors site**, ignoré par git (`.gitignore`). Le contenu utile a été déplacé :

| Élément                         | Emplacement                                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------------------------- |
| Protocoles intégraux (5 études) | `docs/research/0N_*.md` — voir [`docs/research/README.md`](docs/research/README.md)                |
| Scripts figures matplotlib      | `scripts/research-figures/` → sortie `docs/research/assets/<slug>/`                                |
| Articles publics (synthèse)     | `src/content/{fr,en}/blog/` — 5 paires, `kind: research`, tag `eurusd-lab`                         |
| Figures site                    | Composants React inline dans `src/components/blog/figures/` (enregistrés dans `MDXComponents.tsx`) |

**Reste à faire par l'auteur** : réécriture éditoriale des articles blog ; suppression manuelle du dossier `showcase/` local si encore présent.

---

## P0 — Bloquant / dette critique

### Knowledge (109 MDX/locale, dont 79 `index.mdx`)

| Métrique                  | FR  | EN  |
| ------------------------- | --- | --- |
| Total MDX                 | 109 | 109 |
| Stubs auto-générés        | 54  | 54  |
| Pages avec contenu        | 55  | 55  |
| Hubs `index.mdx` complets | 25  | 25  |

- **~68 % des hubs** (`index.mdx`) sont des stubs (« Ce contenu est en cours de rédaction »), générés via `scripts/knowledge-stub-manifest.json` (83 entrées) + `scripts/generate-knowledge-stubs.mjs`.
- **Piliers entièrement stub** : Outils (5), Finance quantitative (hubs), Machine Learning (hubs), Ingénierie (hubs sauf design patterns), Mathématiques (linear-algebra, numerical-methods, information-theory), Statistiques (descriptive, time-series, feuilles tests param./non-param.).
- **Contenu réel concentré** : probabilités (fundamentals + lois discrètes + normale), analyse & optimisation (math), régression + hub tests statistiques, 23 design patterns + 4 hubs, random-forest/xgboost, 2 pages marchés (`asset-classes`, `contract-types` — hors manifest).
- **Hubs partiels** : `statistics/inference` (« Notions clés à venir »), `mathematics/optimization` (Newton/quasi-Newton à venir).
- **Écarts vs `KNOWLEDGE-STRUCTURE.md`** : quasi tout le toctree planifié (GARCH, Black-Scholes, deep learning, CUDA, séries temporelles, microstructure, backtesting, etc.) reste vide.

### ESLint / build

- `next.config.js` : `eslint.ignoreDuringBuilds: false` — gate active.
- `npm run lint` : **0 erreur**, **0 warning**. Voir [`LINT-BUILD.md`](LINT-BUILD.md).
- `npm run build` : **OK** (~78 s, 174 pages SSG). Voir [`LINT-BUILD.md`](LINT-BUILD.md).
- TypeScript au build : OK (`ignoreBuildErrors: false`).

### References / Contact

- **References** : **34 entrées** dans `src/content/{fr,en}/references.json` ; UI i18n (`messages/*/references.json`) ; filtre/recherche/tri via `ReferencesPageClient`.
- **Contact** : mailto + GitHub + LinkedIn uniquement (pas de formulaire).

---

## P1 — Important, non bloquant

### Blog FR/EN

| Élément                    | État                                                                                                                       |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Articles recherche publiés | 5 (`compression-expansion`, `multi-scale-countertrend`, `hmm-slope-denoise`, `tr8dr-trend-labels`, `stoch-event-sampling`) |
| Parité FR/EN               | **Oui** — 5 paires traduites, `kind: research`, tag `eurusd-lab`                                                           |
| Templates                  | `template-pensee`, `template-recherche` — `visible: false`                                                                 |
| i18n UI                    | `messages/fr                                                                                                               | en/blog.json` (header, kinds, empty, backToList) |
| Protocoles                 | Liens vers `docs/research/0N_*.md` en bas de chaque article                                                                |
| Tests                      | `src/lib/blog/content.test.ts` — couvre FR + EN (≥5 posts, slug `stoch-event-sampling`)                                    |

### Projets

- **14 MDX/locale** : OC1–OC13 + `website-creation` ; **OC13** `visible: false`.
- Contenu OC : résumés OpenClassrooms, disclaimer pas de livrables publics ; images **placeholder** (`placehold.co`) — contenu auteur.
- **Ranking** : frontmatter `importance` (0–5), tri par défaut, badge étoiles sur cartes + hero.
- **Références liées** : frontmatter `relatedReferences: ['id', …]` → section auto en bas de page détail.
- ~~TODO étoiles, composant références~~ — **Fait**.
- ~~`TechnologiesSection`~~ — retiré ; stack CV dans `website-creation.mdx`.
- ~~`data/projectsList.ts`~~ — absent, mention obsolète retirée.

### MDX / MathInline

- Convention : `<MathInline>{"\\LaTeX"}</MathInline>` — script `node scripts/normalize-math-inline.mjs` pour les identifiants simples.
- `MathBlock` / `MathInline` — KaTeX ; helper `mathStringFromChildren` pour nœuds texte MDX.
- Figures blog : composants React inline.

### Dette code / layouts

- ~~`TechnologiesSection`~~ — retiré ; stack CV dans `website-creation.mdx`.
- `distributionStore.ts` : utilisé (PresetManager, tests visualiseur) — **pas mort**.
- Tests MDX visualiseur : `src/__tests__/components/mdx/MdxDistributionVisualizer.test.tsx`.

---

## P2 — Backlog / polish

### Knowledge — prochaines priorités éditoriales

1. Finance quantitative (Black-Scholes, vol, backtesting) — cœur identité site.
2. Machine Learning (cross-validation stub, deep learning stub, market-ml).
3. Statistiques — feuilles tests (t-test, Mann-Whitney, etc.) + time-series.
4. Ingénierie Python / data-engineering.
5. Design patterns — contenu marqué « généré par IA », à réécrire.
6. Outils (vscode, git, jupyter, power-bi) — stubs.

### References — suite

- Enrichir ou retirer des entrées dans `references.json` au fil de l'eau.

### Tooling / tests (cf. `docs/todo-later.md`)

- Passer ESLint au build après passe Prettier/LF. ~~**Fait** — voir `LINT-BUILD.md`.~~
- Migrations majeures séparées : ESLint 9, React 19, Next 16.
- ~~Playwright multi-viewport (home, knowledge, projects).~~ **Fait** — `e2e/responsive-smoke.spec.ts`.
- ~~Drawer sidebar Knowledge mobile (`lg` breakpoint).~~ **Fait** — `KnowledgeSidebarDrawer`.

---

## Détail migration eurusd-lab

### Protocoles — `docs/research/`

| Fichier                          | Article blog                     |
| -------------------------------- | -------------------------------- |
| `01_multi_scale_countertrend.md` | `/blog/multi-scale-countertrend` |
| `02_hmm_slope_denoise.md`        | `/blog/hmm-slope-denoise`        |
| `03_tr8dr_trend_labels.md`       | `/blog/tr8dr-trend-labels`       |
| `04_compression_expansion.md`    | `/blog/compression-expansion`    |
| `05_stoch_event_context.md`      | `/blog/stoch-event-sampling`     |

Figures site = React ; PNG lab optionnels dans `docs/research/assets/<slug>/`.

### Scripts figures — `scripts/research-figures/`

- 5 scripts Python matplotlib + `_plot_style.py`.
- Données supposées dans `research_notes/` (hors dépôt, lab local).
- Env documenté : `financial-ml` / micromamba.

### Composants figures blog

- `StochSamplingBiasFigure`, `StochAucRawVsAltFigure`
- `MultiScaleGatesFigure`, `MultiScaleEvNetFigure`
- `HmmCifFigure`, `HmmAucOnsetMidFigure`
- `Tr8drDeltaHitFigure`, `Tr8drValidOosFigure`
- `CompressionV1V1bFigure`, `CompressionAblationFigure`

Knowledge touché : `normal/index.mdx`, `statistical-tests/index.mdx` (FR+EN). Index doc : `docs/README.md` → `research/`.

---

## Synthèse chiffrée

| Zone       | Maturité                                                                           |
| ---------- | ---------------------------------------------------------------------------------- |
| Knowledge  | ~50 % MDX avec contenu ; ~32 % hubs rédigés ; piliers finance/ML/engineering vides |
| Blog       | **Production-ready** — tests parité FR/EN, protocoles, figures                     |
| Projets    | Contenu OC présent ; ranking + refs dev OK ; images placeholder (contenu auteur) |
| References | **OK** — 34 liens, JSON + i18n ; curaté par l'auteur                               |
| Contact    | **OK** — mailto + liens sociaux                                                    |
| Tooling    | TS strict ; ESLint 0 warning ; build ~78 s / 174 pages                             |
