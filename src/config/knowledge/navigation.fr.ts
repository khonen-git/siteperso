import { getDesignPatternsNav } from './design-patterns-nav';
import type { TreeItem } from './types';

/** Chemins legacy — contenu MDX inchangé jusqu'à PR2. */
const LEGACY_PROGRAMMING = '/knowledge/programming';
const LEGACY_FINANCE = '/knowledge/finance';
const LEGACY_DATA_SCIENCE = '/knowledge/data-science';
const LEGACY_PROBABILITY = '/knowledge/mathematics/probability';
const LEGACY_STATISTICS = '/knowledge/mathematics/statistics';

export const navigationData: TreeItem[] = [
  {
    title: 'Mathématiques',
    href: '/knowledge/mathematics',
    children: [
      { title: 'Algèbre linéaire', href: '/knowledge/mathematics/linear-algebra' },
      { title: 'Analyse', href: '/knowledge/mathematics/analysis' },
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
            title: 'Loi normale',
            href: `${LEGACY_PROBABILITY}/distributions/continuous/normal`,
          },
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
          {
            title: 'Fondamentaux',
            href: `${LEGACY_STATISTICS}/descriptive/fundamentals`,
          },
          {
            title: 'Visualisation',
            href: `${LEGACY_STATISTICS}/descriptive/visualization`,
          },
        ],
      },
      {
        title: 'Inférence statistique',
        href: '/knowledge/statistics/inference',
        children: [
          {
            title: 'Tests d\'hypothèses',
            href: `${LEGACY_STATISTICS}/inductive/statistical-tests`,
            children: [
              {
                title: 'Tests paramétriques',
                href: `${LEGACY_STATISTICS}/inductive/statistical-tests/parametric`,
                children: [
                  {
                    title: 'Test t de Student',
                    href: `${LEGACY_STATISTICS}/inductive/statistical-tests/parametric/t-test`,
                  },
                  {
                    title: 'Test t de Welch',
                    href: `${LEGACY_STATISTICS}/inductive/statistical-tests/parametric/t-test-welch`,
                  },
                ],
              },
              {
                title: 'Tests non paramétriques',
                href: `${LEGACY_STATISTICS}/inductive/statistical-tests/non-parametric`,
                children: [
                  {
                    title: 'Test de Mann-Whitney',
                    href: `${LEGACY_STATISTICS}/inductive/statistical-tests/non-parametric/mann-whitney`,
                  },
                  {
                    title: 'Test de Wilcoxon',
                    href: `${LEGACY_STATISTICS}/inductive/statistical-tests/non-parametric/wilcoxon`,
                  },
                ],
              },
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
          {
            title: 'Validation croisée',
            href: `${LEGACY_DATA_SCIENCE}/cross-validation`,
          },
        ],
      },
      {
        title: 'Modèles classiques',
        href: '/knowledge/machine-learning/classical-models',
        children: [
          {
            title: 'Random Forest',
            href: `${LEGACY_DATA_SCIENCE}/machine-learning/supervised/random-forest`,
          },
          {
            title: 'XGBoost',
            href: `${LEGACY_DATA_SCIENCE}/machine-learning/supervised/xgboost`,
          },
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
          { title: 'Produits financiers', href: `${LEGACY_FINANCE}/asset-classes` },
          { title: 'Types de contrats', href: `${LEGACY_FINANCE}/contract-types` },
        ],
      },
      {
        title: 'Options & dérivés',
        href: '/knowledge/quantitative-finance/options-derivatives',
        children: [
          { title: 'Bases des options', href: `${LEGACY_FINANCE}/options` },
          { title: 'Black-Scholes', href: `${LEGACY_FINANCE}/black-scholes` },
        ],
      },
      {
        title: 'Volatilité',
        href: '/knowledge/quantitative-finance/volatility',
        children: [
          { title: 'Implicite vs réalisée', href: `${LEGACY_FINANCE}/volatility` },
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
          {
            title: 'Régimes & HMM',
            href: `${LEGACY_DATA_SCIENCE}/machine-learning/unsupervised/hmm`,
          },
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
        href: `${LEGACY_PROGRAMMING}/python`,
        children: [
          {
            title: 'Fondamentaux',
            href: `${LEGACY_PROGRAMMING}/python/fundamentals`,
            children: [
              {
                title: 'Variables',
                href: `${LEGACY_PROGRAMMING}/python/fundamentals/variables`,
              },
              {
                title: 'Fonctions',
                href: `${LEGACY_PROGRAMMING}/python/fundamentals/functions`,
              },
            ],
          },
          { title: 'Typage', href: `${LEGACY_PROGRAMMING}/python/typing` },
          { title: 'Environnements', href: `${LEGACY_PROGRAMMING}/python/environment` },
        ],
      },
      { title: 'C++ & performance', href: '/knowledge/engineering/cpp-performance' },
      {
        title: 'CUDA / GPU',
        href: `${LEGACY_PROGRAMMING}/hardware`,
        children: [
          {
            title: 'Architecture GPU',
            href: `${LEGACY_PROGRAMMING}/hardware/gpu-architecture`,
          },
          { title: 'Programmation CUDA', href: '/knowledge/engineering/cuda' },
        ],
      },
      { title: 'Structures de données', href: `${LEGACY_PROGRAMMING}/data-structures` },
      {
        title: 'Hardware',
        href: `${LEGACY_PROGRAMMING}/hardware`,
        children: [
          {
            title: 'Architecture CPU',
            href: `${LEGACY_PROGRAMMING}/hardware/cpu-architecture`,
          },
        ],
      },
      getDesignPatternsNav(LEGACY_PROGRAMMING, {
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
