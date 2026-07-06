import { getDesignPatternsNav } from './design-patterns-nav';
import type { TreeItem } from './types';

const ENGINEERING = '/knowledge/engineering';
const QF = '/knowledge/quantitative-finance';
const ML = '/knowledge/machine-learning';
const STATS = '/knowledge/statistics';

export const navigationData: TreeItem[] = [
  {
    title: 'Mathématiques',
    href: '/knowledge/mathematics',
    children: [
      { title: 'Algèbre linéaire', href: '/knowledge/mathematics/linear-algebra' },
      {
        title: 'Analyse',
        href: '/knowledge/mathematics/analysis',
        children: [
          { title: 'Convexité', href: '/knowledge/mathematics/analysis/convexity' },
        ],
      },
      { title: 'Optimisation', href: '/knowledge/mathematics/optimization' },
      { title: 'Calcul numérique', href: '/knowledge/mathematics/numerical-methods' },
      { title: 'Théorie de l\'information', href: '/knowledge/mathematics/information-theory' },
    ],
  },
  {
    title: 'Probabilités',
    href: '/knowledge/probability',
    children: [
      { title: 'Fondamentaux', href: '/knowledge/probability/fundamentals' },
      {
        title: 'Distributions',
        href: '/knowledge/probability/distributions',
        children: [
          {
            title: 'Discrètes',
            href: '/knowledge/probability/distributions/discrete',
            children: [
              { title: 'Bernoulli', href: '/knowledge/probability/distributions/discrete/bernoulli' },
              { title: 'Binomiale', href: '/knowledge/probability/distributions/discrete/binomial' },
              { title: 'Poisson', href: '/knowledge/probability/distributions/discrete/poisson' },
            ],
          },
          { title: 'Continues univariées', href: '/knowledge/probability/distributions/continuous-univariate' },
          { title: 'Loi normale', href: '/knowledge/probability/distributions/normal' },
          { title: 'Multivariées', href: '/knowledge/probability/distributions/multivariate' },
        ],
      },
      { title: 'Processus stochastiques', href: '/knowledge/probability/stochastic-processes' },
    ],
  },
  {
    title: 'Statistiques',
    href: '/knowledge/statistics',
    children: [
      {
        title: 'Statistiques descriptives',
        href: '/knowledge/statistics/descriptive',
        children: [
          { title: 'Fondamentaux', href: `${STATS}/descriptive/fundamentals` },
          { title: 'Visualisation', href: `${STATS}/descriptive/visualization` },
        ],
      },
      {
        title: 'Inférence statistique',
        href: '/knowledge/statistics/inference',
        children: [
          {
            title: 'Tests d\'hypothèses',
            href: `${STATS}/inference/statistical-tests`,
            children: [
              { title: 'Test t de Student', href: `${STATS}/inference/statistical-tests/parametric/t-test` },
              { title: 'Test t de Welch', href: `${STATS}/inference/statistical-tests/parametric/t-test-welch` },
              { title: 'Test de Mann-Whitney', href: `${STATS}/inference/statistical-tests/non-parametric/mann-whitney` },
              { title: 'Test de Wilcoxon', href: `${STATS}/inference/statistical-tests/non-parametric/wilcoxon` },
            ],
          },
        ],
      },
      { title: 'Régression', href: '/knowledge/statistics/regression' },
      { title: 'Séries temporelles', href: '/knowledge/statistics/time-series' },
    ],
  },
  {
    title: 'Machine Learning',
    href: '/knowledge/machine-learning',
    children: [
      {
        title: 'Concepts généraux',
        href: '/knowledge/machine-learning/general-concepts',
        children: [
          { title: 'Validation croisée', href: `${ML}/general-concepts/cross-validation` },
        ],
      },
      {
        title: 'Modèles classiques',
        href: '/knowledge/machine-learning/classical-models',
        children: [
          { title: 'Random Forest', href: `${ML}/classical-models/random-forest` },
          { title: 'XGBoost', href: `${ML}/classical-models/xgboost` },
        ],
      },
      { title: 'Deep Learning', href: '/knowledge/machine-learning/deep-learning' },
      { title: 'Reinforcement Learning', href: '/knowledge/machine-learning/reinforcement-learning' },
      { title: 'ML appliqué aux marchés', href: '/knowledge/machine-learning/market-ml' },
    ],
  },
  {
    title: 'Finance quantitative',
    href: '/knowledge/quantitative-finance',
    children: [
      {
        title: 'Marchés & produits',
        href: '/knowledge/quantitative-finance/markets-products',
        children: [
          { title: 'Produits financiers', href: `${QF}/markets-products/asset-classes` },
          { title: 'Types de contrats', href: `${QF}/markets-products/contract-types` },
        ],
      },
      {
        title: 'Options & dérivés',
        href: '/knowledge/quantitative-finance/options-derivatives',
        children: [
          { title: 'Bases des options', href: `${QF}/options-derivatives/options` },
          { title: 'Black-Scholes', href: `${QF}/options-derivatives/black-scholes` },
        ],
      },
      {
        title: 'Volatilité',
        href: '/knowledge/quantitative-finance/volatility',
        children: [
          { title: 'Implicite vs réalisée', href: `${QF}/volatility/implied-vs-realized` },
        ],
      },
      { title: 'Calcul stochastique', href: '/knowledge/quantitative-finance/stochastic-calculus' },
      { title: 'Gestion du risque', href: '/knowledge/quantitative-finance/risk-management' },
      { title: 'Gestion de portefeuille', href: '/knowledge/quantitative-finance/portfolio-management' },
      { title: 'Modèles factoriels', href: '/knowledge/quantitative-finance/factor-models' },
      { title: 'Microstructure de marché', href: '/knowledge/quantitative-finance/market-microstructure' },
      {
        title: 'Économétrie financière',
        href: '/knowledge/quantitative-finance/financial-econometrics',
        children: [
          { title: 'Régimes & HMM', href: `${QF}/financial-econometrics/regimes-hmm` },
        ],
      },
      { title: 'Backtesting & recherche systématique', href: '/knowledge/quantitative-finance/backtesting' },
    ],
  },
  {
    title: 'Ingénierie & Programmation',
    href: '/knowledge/engineering',
    children: [
      {
        title: 'Python',
        href: `${ENGINEERING}/python`,
        children: [
          {
            title: 'Fondamentaux',
            href: `${ENGINEERING}/python/fundamentals`,
            children: [
              { title: 'Variables', href: `${ENGINEERING}/python/fundamentals/variables` },
              { title: 'Fonctions', href: `${ENGINEERING}/python/fundamentals/functions` },
            ],
          },
          { title: 'Typage', href: `${ENGINEERING}/python/typing` },
          { title: 'Environnements', href: `${ENGINEERING}/python/environment` },
        ],
      },
      { title: 'C++ & performance', href: '/knowledge/engineering/cpp-performance' },
      {
        title: 'CUDA / GPU',
        href: `${ENGINEERING}/hardware`,
        children: [
          { title: 'Architecture GPU', href: `${ENGINEERING}/hardware/gpu-architecture` },
          { title: 'Programmation CUDA', href: '/knowledge/engineering/cuda' },
        ],
      },
      { title: 'Structures de données', href: `${ENGINEERING}/data-structures` },
      {
        title: 'Hardware',
        href: `${ENGINEERING}/hardware`,
        children: [
          { title: 'Architecture CPU', href: `${ENGINEERING}/hardware/cpu-architecture` },
        ],
      },
      getDesignPatternsNav(ENGINEERING, {
        title: 'Design patterns',
        creational: 'Créationnels',
        structural: 'Structurels',
        behavioral: 'Comportementaux',
        abstractFactory: 'Abstract Factory',
        builder: 'Builder',
        factoryMethod: 'Factory Method',
        prototype: 'Prototype',
        singleton: 'Singleton',
        adapter: 'Adapter',
        bridge: 'Bridge',
        composite: 'Composite',
        decorator: 'Decorator',
        facade: 'Facade',
        flyweight: 'Flyweight',
        proxy: 'Proxy',
        chainOfResponsibility: 'Chain of Responsibility',
        command: 'Command',
        interpreter: 'Interpreter',
        iterator: 'Iterator',
        mediator: 'Mediator',
        memento: 'Memento',
        observer: 'Observer',
        state: 'State',
        strategy: 'Strategy',
        templateMethod: 'Template Method',
        visitor: 'Visitor',
      }),
      { title: 'Data engineering', href: '/knowledge/engineering/data-engineering' },
    ],
  },
  {
    title: 'Outils',
    href: '/knowledge/tools',
    children: [
      { title: 'Visual Studio Code', href: '/knowledge/tools/vscode' },
      { title: 'Git & GitHub', href: '/knowledge/tools/git-github' },
      { title: 'Power BI', href: '/knowledge/tools/power-bi' },
      { title: 'Jupyter Notebook', href: '/knowledge/tools/jupyter-notebook' },
    ],
  },
];
