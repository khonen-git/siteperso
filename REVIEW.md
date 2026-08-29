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
- `npm run lint` : **0 erreur**, ~171 warnings (types de retour, etc.).
- `npm run build` : **OK** (~78 s, 174 pages SSG). Voir [`LINT-BUILD.md`](LINT-BUILD.md).
- TypeScript au build : OK (`ignoreBuildErrors: false`).

### Pyodide

- Mentionné dans `website-creation.mdx`, `CDC.md`, `DEVBOOK.md`.
- **Aucune implémentation** dans `src/` (pas de dépendance, pas de composant runtime).

### Activity / References / Contact

- **Activity** (`src/app/[locale]/activity/page.tsx`) : 5 entrées **hardcodées**, dates fictives 2024-02, **sans i18n**, sans lien vers détail ; ne reflète pas le déploiement ni la migration blog.
- **References** : 14 entrées inline (asyncio, pandas, Tr8dr, etc.) ; UI filtre/tri OK ; liste insuffisante vs TODO.
- **Contact** : infos mail/GitHub/LinkedIn OK ; **formulaire commenté / désactivé** ; `handleSubmit` = `console.log` + TODO.

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
- Contenu OC : résumés OpenClassrooms, disclaimer pas de livrables publics ; images **placeholder** (`placehold.co`).
- TODO ouvert : étoiles importance, images thématiques, rework `TechnologiesSection`, composant références projets.
- `data/projectsList.ts` : **absent** du repo (mention TODO obsolète).

### MDX / MathInline

- Composants : `MathBlock` / `MathInline` — KaTeX, erreurs **throw** (pas de boîte rouge silencieuse) ; helper `mathStringFromChildren` pour nœuds texte MDX.
- **Pattern recommandé** : `<MathInline>{"\\LaTeX"}</MathInline>` (blog + tables normale).
- **Pattern mixte** : identifiants simples `<MathInline>P</MathInline>`, `<MathInline>n</MathInline>` dans probabilités / lois discrètes — fonctionne via nœuds texte, mais incohérent ; risque si caractères spéciaux TeX.
- **Cas limite** : `taylor-series` — `<MathInline>n</MathInline>` imbriqué dans du gras Markdown ; à surveiller au rendu.
- Figures blog : composants React inline (plus de SVG morts dans `public/blog/`).

### Dette code / layouts

- **Double `KnowledgeLayout`** :
  - Actif : `src/components/layouts/KnowledgeLayout.tsx` (via `KnowledgeArticle.tsx`).
  - Mort : `src/components/layout/knowledge/index.tsx` (ScrollArea différent, pas d'import trouvé).
- `distributionStore.ts` : utilisé (PresetManager, tests visualiseur) — **pas mort**.
- `TechnologiesSection` : utilisé dans `website-creation.mdx` ; candidat simplification (TODO).
- Tests MDX visualiseurs : dossier `src/components/mdx/__tests__/` **exclu** de Jest.

---

## P2 — Backlog / polish

### Knowledge — prochaines priorités éditoriales

1. Finance quantitative (Black-Scholes, vol, backtesting) — cœur identité site.
2. Machine Learning (cross-validation stub, deep learning stub, market-ml).
3. Statistiques — feuilles tests (t-test, Mann-Whitney, etc.) + time-series.
4. Ingénierie Python / data-engineering.
5. Design patterns — contenu marqué « généré par IA », à réécrire.
6. Outils (vscode, git, jupyter, power-bi) — stubs.

### Activity / References — features manquantes

- Activity : pages détail, catégories/tags, historique réel (déploiement, publications OC, série blog recherche).
- References : enrichir la liste (TODO).
- Contact : brancher envoi formulaire (API route ou service tiers).

### Tooling / tests (cf. `docs/todo-later.md`)

- Passer ESLint au build après passe Prettier/LF. ~~**Fait** — voir `LINT-BUILD.md`.~~
- Migrations majeures séparées : ESLint 9, React 19, Next 16.
- Playwright multi-viewport (home, knowledge, projects).
- Drawer sidebar Knowledge mobile (`lg` breakpoint).

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
| Blog       | **Production-ready** (5×2 articles recherche + templates)                          |
| Projets    | Contenu OC présent ; polish visuel / ranking manquant                              |
| Activity   | **Prototype** — données fictives                                                   |
| References | **MVP** — 14 liens                                                                 |
| Contact    | **Partiel** — pas de formulaire actif                                              |
| Tooling    | TS strict ; ESLint actif au build ; ~171 warnings ; build ~78 s / 174 pages        |
