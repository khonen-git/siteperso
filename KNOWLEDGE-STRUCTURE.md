# Structure du toctree Knowledge

Document de référence pour l'organisation de la section **Connaissances** du site.  
Décisions validées — ne pas modifier le code tant que ce document n'est pas explicitement mis à jour.

---

## Décisions structurantes

| Sujet | Décision |
|-------|----------|
| Mathématiques / Probabilités / Statistiques | **3 piliers séparés** (top-level) |
| Finance | Pilier **Finance quantitative** (`/knowledge/quantitative-finance`) |
| Programmation & Data | Pilier **Ingénierie & Programmation** (socle technique unifié) |
| Théorie de l'information | Reste sous **Mathématiques** |
| HMM | Page canonique en **Économétrie financière** (régimes) ; lien depuis Machine Learning |
| Design patterns | **Inchangé** — 1 page par pattern, arbre complet conservé |
| Data Science | Renommé en **Machine Learning** |

---

## Principes d'organisation

### Profondeur du toctree (sidebar)

- **Maximum 3–4 niveaux** dans la sidebar.
- La sidebar liste les **pages navigables** ; le toctree de droite (H2/H3 du MDX) porte le détail à l'intérieur d'une page.
- **Exception** : les design patterns conservent 4 niveaux (catalogue de référence).

### Granularité des pages

| Type de contenu | Granularité | Exemples |
|-----------------|-------------|----------|
| **Catalogue / référence** | 1 entrée = 1 concept nommé | Design patterns, distributions (optionnel), Greeks |
| **Chapitre théorique** | 1 page = 1 idée, sections H2/H3 | Convexité, VaR, ACF/PACF |
| **Famille technique homogène** | 1 page, sections H2 | Métriques ML, estimateurs de vol, tests mineurs |

**Regrouper sur 1 page** quand :
- concepts atomiques liés (bid/ask/spread/slippage) ;
- familles homogènes (Greeks, métriques ML, rendements) ;
- définitions courtes sans visualisation dédiée (ITM/ATM/OTM sur « Bases des options »).

**Page dédiée** quand :
- formules, preuves ou visualisations interactives (SVD, Black-Scholes, Kalman) ;
- modèle complet (Heston, Almgren-Chriss, ARIMA) ;
- sujet recherché par nom propre (CNN, Transformer, LSTM).

### Anti-doublon : page canonique + liens

| Concept | Page canonique | Liens depuis |
|---------|----------------|--------------|
| Stationnarité | Séries temporelles (Statistiques) | Économétrie financière, Processus stochastiques |
| Martingale | Processus stochastiques (Probabilités) | Calcul stochastique, Pricing |
| Régularisation | Optimisation (Mathématiques) | Machine Learning, Régression |
| Volatilité (réalisée / implicite) | Volatilité & modèles GARCH (Finance quantitative) | Options, Risque, Microstructure |
| Cross-validation / walk-forward | ML — Concepts généraux | Backtesting |
| Matrices de covariance | Algèbre linéaire (Mathématiques) | Statistiques, Portfolio, Facteurs |
| HMM | Économétrie financière — Régimes & HMM | Machine Learning (non supervisé) |

---

## Architecture top-level (7 piliers)

```
Knowledge
├── 1. Mathématiques                    /knowledge/mathematics
├── 2. Probabilités                     /knowledge/probability
├── 3. Statistiques                     /knowledge/statistics
├── 4. Machine Learning                 /knowledge/machine-learning
├── 5. Finance quantitative             /knowledge/quantitative-finance
├── 6. Ingénierie & Programmation       /knowledge/engineering
└── 7. Outils                           /knowledge/tools
```

### Parcours lecteur typique

```
Mathématiques → Probabilités → Statistiques → Machine Learning → Finance quantitative
                                                      ↑
                              Ingénierie & Programmation (transversal)
```

---

## 1. Mathématiques (`/knowledge/mathematics`)

```
Mathématiques
├── Algèbre linéaire
│   ├── Vecteurs & matrices
│   ├── Produit scalaire & normes
│   ├── Valeurs propres & décomposition spectrale
│   ├── SVD
│   ├── Matrices définies positives          (inclut matrices de covariance)
│   └── Projection orthogonale & moindres carrés
├── Analyse
│   ├── Dérivées, gradient & Hessienne
│   ├── Convexité
│   ├── Séries de Taylor
│   ├── Équations différentielles ordinaires (EDO)
│   └── Équations aux dérivées partielles (EDP)   → lien pricing PDE
├── Optimisation
│   ├── Gradient descent
│   ├── Newton & quasi-Newton
│   ├── Optimisation convexe                     (inclut contraintes & multiplicateurs de Lagrange)
│   ├── Régularisation                           → lien ML
│   ├── Optimisation quadratique
│   ├── Optimisation de portefeuille             → lien Gestion de portefeuille
│   └── Problèmes mal conditionnés
├── Calcul numérique
│   ├── Monte Carlo & réduction de variance
│   ├── Intégration numérique & recherche de racines
│   ├── Différences finies & stabilité des schémas
│   ├── Interpolation, extrapolation & splines
│   └── Calibration
└── Théorie de l'information                     [existant]
```

**Regroupements prévus** : gradient + Hessienne ; contraintes + Lagrange ; Monte Carlo + variance reduction.

---

## 2. Probabilités (`/knowledge/probability`)

Migration : aplatir l'arbre actuel `fundamentals/principles/*` → page **Fondamentaux** avec ancres internes.

```
Probabilités
├── Fondamentaux                                 [fusion axiomes / espace / espérance existants]
│   └── sections : VA, distribution, espérance, variance, covariance, corrélation,
│       moments, skewness, kurtosis, loi conditionnelle, indépendance, LGN, TCL
├── Distributions
│   ├── Discrètes                                (Bernoulli, Binomiale, Poisson)
│   ├── Continues univariées                     (Uniforme, Normale, Log-normale,
│   │                                               Exponentielle, Gamma, Student, Chi²)
│   └── Multivariées                             (Normale multivariée)
└── Processus stochastiques
    ├── Marche aléatoire & mouvement brownien
    ├── Mouvement brownien géométrique (GBM)     → lien Calcul stochastique
    ├── Martingales                                → lien Calcul stochastique
    ├── Chaînes de Markov
    ├── Processus de Poisson
    ├── Ornstein-Uhlenbeck & mean reversion
    ├── Processus de Lévy & sauts
    └── Stationnarité                            → lien Séries temporelles
```

**Note** : la page Loi normale existante (`…/distributions/continuous/normal`) peut rester une page dédiée (visualisation interactive) ou devenir une section de « Continues univariées ».

---

## 3. Statistiques (`/knowledge/statistics`)

```
Statistiques
├── Statistiques descriptives                    [existant]
│   ├── Fondamentaux                             [existant]
│   └── Visualisation                            [existant]
├── Inférence statistique
│   ├── Estimateurs & propriétés                 (biais, variance, MSE, consistance)
│   ├── Maximum de vraisemblance (MLE)
│   ├── Méthode des moments
│   ├── Intervalles de confiance
│   └── Tests d'hypothèses
│       ├── Fondements                           (p-value, t-stat, z-score)
│       ├── Test t de Student                    [existant]
│       ├── Test t de Welch                        [existant]
│       ├── Test de Mann-Whitney                   [existant]
│       ├── Test de Wilcoxon                       [existant]
│       ├── Test du chi-carré
│       ├── Tests de normalité
│       └── Tests de stationnarité               → lien Séries temporelles
├── Régression
│   ├── Régression linéaire simple & multiple    (OLS, hypothèses, résidus, R²)
│   ├── Diagnostics du modèle linéaire           (multicolinéarité, hétéroscédasticité,
│   │                                               autocorrélation des résidus)
│   ├── Régression régularisée                   (Ridge, Lasso, Elastic Net)
│   └── Régression logistique                    → lien ML
└── Séries temporelles
    ├── Fondamentaux                             (ACF, PACF, stationnarité)
    ├── Tests ADF & KPSS
    ├── Modèles AR, MA, ARMA & ARIMA
    ├── SARIMA
    ├── VAR & causalité de Granger
    ├── Cointégration                            → lien Économétrie financière
    └── Filtre de Kalman & modèles state-space   → lien Économétrie financière
```

**Chevauchement volontaire** : séries temporelles = canonique ici ; économétrie financière = applications marché + extensions.

---

## 4. Machine Learning (`/knowledge/machine-learning`)

Renommage de `data-science` → `machine-learning`. Pages existantes à migrer : Random Forest, XGBoost, HMM (lien), Cross-validation.

```
Machine Learning
├── Concepts généraux
│   ├── Split, validation & data leakage         (train/val/test, CV, walk-forward,
│   │                                               purged CV, embargo)
│   ├── Biais-variance & overfitting
│   ├── Feature engineering & feature selection
│   ├── Scaling & preprocessing
│   ├── Régularisation & hyperparamètres         (grid search, random search, Bayesian opt.)
│   └── Métriques                                (accuracy, precision, recall, F1, ROC AUC,
│                                                   PR AUC, log loss, Brier, confusion matrix,
│                                                   RMSE, MAE, MSE, R², IC, hit ratio)
├── Modèles classiques
│   ├── Régression linéaire & logistique         → liens Statistiques
│   ├── KNN & Naive Bayes
│   ├── SVM
│   ├── Arbres de décision
│   ├── Random Forest & Extra Trees              [existant — random-forest]
│   └── Gradient Boosting                        [existant — xgboost]
│       (XGBoost, LightGBM, CatBoost)
├── Deep Learning
│   ├── Perceptron, MLP & backpropagation
│   ├── Fonctions d'activation, dropout & batch normalization
│   ├── CNN
│   ├── RNN, LSTM & GRU
│   ├── Transformer & mécanisme d'attention
│   └── Autoencodeurs
├── Reinforcement Learning
│   ├── Fondamentaux                             (agent, environnement, état, action, reward)
│   ├── Value-based                              (Q-learning, DQN)
│   ├── Policy gradient & actor-critic
│   ├── PPO
│   └── Exploration, exploitation & offline RL
└── ML appliqué aux marchés
    ├── Labeling                                 (triple barrier, meta-labeling)
    ├── Feature importance                       (permutation, SHAP)
    ├── Bet sizing & class imbalance
    ├── Non-iid & concept drift
    └── Backtest overfitting                     → lien Backtesting
```

---

## 5. Finance quantitative (`/knowledge/quantitative-finance`)

Absorbe et restructure l'actuel pilier Finance. 10 chapitres de niveau 2.

```
Finance quantitative
├── Marchés & produits
│   ├── Produits financiers                      [existant — asset-classes, enrichir]
│   ├── Mécanismes de marché                     (bid/ask, spread, slippage, liquidité,
│   │                                               order book, ordres, tick/lot size, levier, marge)
│   ├── PnL & mark-to-market                     (PnL, realized/unrealized, funding)
│   └── Rendements & métriques de performance    (simple/log/cumulative/excess return,
│                                                   risk-free rate, drawdown, volatilité,
│                                                   Sharpe, Sortino, Calmar, IR, alpha, beta)
├── Options & dérivés
│   ├── Bases des options                        [existant — options.mdx, enrichir]
│   ├── Pricing fondamental                      (no-arbitrage, risk-neutral, discounting,
│   │                                               forward price, put-call parity)
│   ├── Black-Scholes                            [existant]
│   ├── Arbres binomiaux & Monte Carlo
│   ├── PDE & différences finies                 → lien Calcul numérique
│   ├── Volatilité locale & stochastique
│   └── Greeks & hedging                         (delta, gamma, vega, theta, rho, vanna,
│                                                   volga, charm, speed, color,
│                                                   agrégation portefeuille, delta hedging,
│                                                   gamma scalping)
├── Volatilité
│   ├── Implicite vs réalisée                    [existant — volatility.mdx, enrichir]
│   ├── Smile, skew & term structure
│   ├── Estimateurs de volatilité réalisée       (rolling std, EWMA, Parkinson, Garman-Klass,
│   │                                               Rogers-Satchell, Yang-Zhang)
│   ├── Modèles GARCH                            (ARCH, GARCH, EGARCH, GJR-GARCH)
│   ├── HAR & volatility clustering
│   ├── Modèles avancés                          (SABR, Heston, SVI calibration)
│   └── Produits de volatilité                   (variance swap, VRP, VIX)
├── Calcul stochastique
│   ├── Fondamentaux                             (filtration, processus adapté)
│   ├── Intégrale d'Itô & lemme d'Itô
│   ├── EDS & GBM
│   ├── Changement de mesure & théorème de Girsanov
│   ├── Feynman-Kac & mesure risque-neutre
│   ├── PDE Black-Scholes                        → lien Options
│   └── Sauts, vol stochastique & processus de diffusion
├── Gestion du risque
│   ├── VaR & Expected Shortfall
│   ├── Stress testing & scenario analysis
│   ├── Sensibilités & factor exposure
│   ├── Risque de portefeuille                   (diversification, hedging, net/gross exposure,
│   │                                               concentration, drawdown control)
│   ├── Contribution au risque & risk parity
│   ├── Kelly criterion & position sizing
│   └── Risques pratiques                        (liquidité, exécution, modèle, contrepartie,
│                                                   opérationnel, regime shift, crowded trade)
├── Gestion de portefeuille
│   ├── Mean-variance & frontière efficiente
│   ├── Portefeuilles classiques                 (Markowitz, min variance, max Sharpe,
│   │                                               equal weight, risk parity)
│   ├── CAPM & APT
│   ├── Black-Litterman
│   ├── Factor investing                         → lien Modèles factoriels
│   ├── Hierarchical Risk Parity (HRP)
│   └── Rebalancing, coûts de transaction & turnover
├── Modèles factoriels
│   ├── Facteurs classiques                      (market, size, value, momentum, quality,
│   │                                               low vol, carry, term structure)
│   ├── Fama-French & modèles Barra
│   ├── Facteurs statistiques (PCA)
│   └── Neutralisation, exposition & decay des facteurs
├── Microstructure de marché
│   ├── Carnet d'ordres & bid-ask spread
│   ├── Order flow & imbalance
│   ├── Données tick & classification des trades  (Lee-Ready)
│   ├── Adverse selection & inventory risk
│   ├── Impact de marché                         (temporaire, permanent)
│   └── Exécution optimale                       (VWAP, TWAP, implementation shortfall,
│                                                   Almgren-Chriss)
├── Économétrie financière
│   ├── Stationnarité & racines unitaires        → lien Séries temporelles
│   ├── Cointégration & VECM
│   ├── Régimes & HMM                            [canonique HMM — lien ML]
│   ├── Corrélation dynamique (DCC)
│   └── Copulas, dépendance de queue & EVT
└── Backtesting & recherche systématique
    ├── Pipeline signal / feature / label
    ├── Biais de recherche                       (target leakage, look-ahead, survivorship,
    │                                               selection bias, data snooping)
    ├── Coûts, slippage & latence
    ├── Walk-forward & out-of-sample testing
    ├── Paper trading, live trading & capacity
    ├── Robustesse & stabilité des paramètres
    ├── Monte Carlo & bootstrap
    └── Métriques de sur-ajustement              (deflated Sharpe ratio, PBO)
```

**Pages existantes à repositionner** :

| Page actuelle | Destination |
|---------------|-------------|
| `/knowledge/finance/asset-classes` | Marchés & produits — Produits financiers |
| `/knowledge/finance/contract-types` | Marchés & produits — section ou page dédiée |
| `/knowledge/finance/options` | Options & dérivés — Bases des options |
| `/knowledge/finance/black-scholes` | Options & dérivés — Black-Scholes |
| `/knowledge/finance/volatility` | Volatilité — Implicite vs réalisée |

---

## 6. Ingénierie & Programmation (`/knowledge/engineering`)

```
Ingénierie & Programmation
├── Python
│   ├── Fondamentaux
│   │   ├── Variables                              [existant]
│   │   └── Fonctions                              [existant]
│   ├── Typage                                     [existant]
│   ├── Environnements                             [existant]
│   ├── Écosystème quant                           (NumPy, pandas, Polars, SciPy,
│   │                                               scikit-learn, statsmodels, matplotlib)
│   └── Performance Python                         (numba, vectorisation, multiprocessing,
│                                                   memory management, profiling, testing,
│                                                   logging, packaging)
├── C++ & performance
│   ├── Mémoire & cache                            (memory layout, cache efficiency)
│   ├── SIMD & multithreading
│   └── Précision numérique, latence & compilation
├── CUDA / GPU
│   ├── Architecture GPU                           [existant]
│   └── Programmation CUDA                         (threads, blocks, warps, shared/global memory,
│                                                   coalesced access, occupancy, kernels,
│                                                   parallel reduction, accélération Monte Carlo)
├── Structures de données                          [existant]
├── Hardware
│   └── Architecture CPU                           [existant]
├── Design patterns                                [INCHANGÉ — arbre complet]
│   ├── Créationnels                               [hub existant]
│   │   ├── Abstract Factory                       [existant]
│   │   ├── Builder                                [existant]
│   │   ├── Factory Method                         [existant]
│   │   ├── Prototype                              [existant]
│   │   └── Singleton                              [existant]
│   ├── Structurels                                [hub existant]
│   │   ├── Adapter                                [existant]
│   │   ├── Bridge                                 [existant]
│   │   ├── Composite                              [existant]
│   │   ├── Decorator                                [existant]
│   │   ├── Facade                                 [existant]
│   │   ├── Flyweight                              [existant]
│   │   └── Proxy                                  [existant]
│   └── Comportementaux                            [hub existant]
│       ├── Chain of Responsibility                [existant]
│       ├── Command                                [existant]
│       ├── Interpreter                            [existant]
│       ├── Iterator                               [existant]
│       ├── Mediator                               [existant]
│       ├── Memento                                [existant]
│       ├── Observer                               [existant]
│       ├── State                                  [existant]
│       ├── Strategy                               [existant]
│       ├── Template Method                        [existant]
│       └── Visitor                                [existant]
└── Data engineering
    ├── Nettoyage & qualité des données            (missing values, outliers, corporate actions)
    ├── Temps & alignement                         (time zones, timestamp alignment, resampling)
    ├── Données de marché                          (tick data, OHLCV, event-based sampling,
    │                                               dollar/volume/tick imbalance bars, CUSUM)
    ├── Pipelines & versioning                     (feature pipelines, dataset versioning)
    ├── Stockage & requêtes                        (Parquet, SQL)
    └── Validation & APIs                          (data validation, APIs)
```

### Design patterns — règles spécifiques

- **1 page = 1 pattern** : format fiche de référence (intention, exemple Python, quand l'utiliser).
- **Pas de fusion** par famille ou cluster sémantique.
- **4 niveaux** dans la sidebar : autorisés uniquement pour ce sous-arbre.
- **Améliorations futures** (sans restructurer) :
  - tableaux « patterns souvent confondus » sur les pages hub ;
  - section « Patterns liés » en bas de chaque fiche ;
  - pages comparaison optionnelles (`strategy-vs-state`, etc.).

---

## 7. Outils (`/knowledge/tools`)

Inchangé.

```
Outils
├── Visual Studio Code                             [existant]
├── Git & GitHub                                   [existant]
├── Power BI                                       [existant]
└── Jupyter Notebook                               [existant]
```

---

## Estimation volumétrique

| Pilier | Pages estimées | Dont existantes |
|--------|----------------|-----------------|
| Mathématiques | ~21 | 1 (théorie de l'info) |
| Probabilités | ~12 | ~4 (à fusionner/aplatir) |
| Statistiques | ~18 | ~8 |
| Machine Learning | ~22 | ~4 |
| Finance quantitative | ~45 | ~5 |
| Ingénierie & Programmation | ~25 | ~35 (design patterns, Python, hardware…) |
| Outils | 4 | 4 |
| **Total** | **~147 pages** | **~57 existantes / à migrer** |

---

## Plan de migration (code)

### PR1 — Fondations ✅

- [x] Nouveaux piliers top-level dans `navigation.fr.ts` / `navigation.en.ts`
- [x] Pages hub stub (`index.mdx`) via `npm run knowledge:stubs`
- [x] Redirect legacy `statistical-hypothesis-test` → `statistical-tests`
- [x] Suppression des `page.tsx` dédiés (normal, statistical-hypothesis-test)
- [x] Mise à jour `KnowledgeHome` et i18n (`messages/*/knowledge.json`)
- [x] Chemins legacy conservés pour le contenu MDX existant

### PR2 — Migration des chemins ✅

- [x] Déplacer `programming/*` → `engineering/*`
- [x] Déplacer `finance/*` → `quantitative-finance/*` (sous-chapitres)
- [x] Déplacer `data-science/*` → `machine-learning/*` et HMM → économétrie
- [x] Déplacer `mathematics/probability/*` → `probability/*`
- [x] Déplacer `mathematics/statistics/*` → `statistics/*`
- [x] Redirects actifs dans `next.config.js`
- [x] Navigation et liens MDX mis à jour

### PR3 — Restructuration contenu ✅

- [x] Page unique **Fondamentaux** (axiomes, espace, espérance, TCL…)
- [x] Hub **Distributions** avec familles (discrètes, continues, multivariées)
- [x] Aplatissement inférence statistique (tests listés directement, sans niveau paramétrique/non paramétrique)
- [x] Redirects anciens chemins probabilités et inférence

## Priorisation de rédaction

### Vague 1 — Socle

- Algèbre linéaire (vecteurs/matrices, SVD)
- Probabilités — Fondamentaux (fusion des pages existantes)
- Statistiques — Inférence & Régression
- ML — Concepts généraux
- Finance quantitative — Marchés & produits, Rendements & métriques

### Vague 2 — Cœur quant

- Options (enrichir l'existant), Calcul stochastique
- Séries temporelles, Volatilité & GARCH
- Backtesting & recherche systématique

### Vague 3 — Approfondissement

- Gestion de portefeuille, Modèles factoriels
- Microstructure, Deep Learning / RL
- Data engineering, C++ / CUDA

---

## Références

- Navigation actuelle : `src/config/knowledge/navigation.fr.ts`, `navigation.en.ts`
- Contenu MDX : `src/content/{fr,en}/knowledge/`
- Cahier des charges initial : `CDC.md` (section Connaissances)
