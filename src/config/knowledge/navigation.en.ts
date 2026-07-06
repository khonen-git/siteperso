import { getDesignPatternsNav } from './design-patterns-nav';
import type { TreeItem } from './types';

const ENGINEERING = '/knowledge/engineering';
const QF = '/knowledge/quantitative-finance';
const ML = '/knowledge/machine-learning';
const STATS = '/knowledge/statistics';

export const navigationData: TreeItem[] = [
  {
    title: 'Mathematics',
    href: '/knowledge/mathematics',
    children: [
      { title: 'Linear algebra', href: '/knowledge/mathematics/linear-algebra' },
      {
        title: 'Analysis',
        href: '/knowledge/mathematics/analysis',
        children: [
          { title: 'Convexity', href: '/knowledge/mathematics/analysis/convexity' },
        ],
      },
      { title: 'Optimization', href: '/knowledge/mathematics/optimization' },
      { title: 'Numerical methods', href: '/knowledge/mathematics/numerical-methods' },
      { title: 'Information theory', href: '/knowledge/mathematics/information-theory' },
    ],
  },
  {
    title: 'Probability',
    href: '/knowledge/probability',
    children: [
      { title: 'Fundamentals', href: '/knowledge/probability/fundamentals' },
      {
        title: 'Distributions',
        href: '/knowledge/probability/distributions',
        children: [
          {
            title: 'Discrete',
            href: '/knowledge/probability/distributions/discrete',
            children: [
              { title: 'Bernoulli', href: '/knowledge/probability/distributions/discrete/bernoulli' },
              { title: 'Binomial', href: '/knowledge/probability/distributions/discrete/binomial' },
              { title: 'Poisson', href: '/knowledge/probability/distributions/discrete/poisson' },
            ],
          },
          { title: 'Continuous univariate', href: '/knowledge/probability/distributions/continuous-univariate' },
          { title: 'Normal distribution', href: '/knowledge/probability/distributions/normal' },
          { title: 'Multivariate', href: '/knowledge/probability/distributions/multivariate' },
        ],
      },
      { title: 'Stochastic processes', href: '/knowledge/probability/stochastic-processes' },
    ],
  },
  {
    title: 'Statistics',
    href: '/knowledge/statistics',
    children: [
      {
        title: 'Descriptive statistics',
        href: '/knowledge/statistics/descriptive',
        children: [
          { title: 'Fundamentals', href: `${STATS}/descriptive/fundamentals` },
          { title: 'Visualization', href: `${STATS}/descriptive/visualization` },
        ],
      },
      {
        title: 'Statistical inference',
        href: '/knowledge/statistics/inference',
        children: [
          {
            title: 'Hypothesis tests',
            href: `${STATS}/inference/statistical-tests`,
            children: [
              { title: "Student's t-test", href: `${STATS}/inference/statistical-tests/parametric/t-test` },
              { title: "Welch's t-test", href: `${STATS}/inference/statistical-tests/parametric/t-test-welch` },
              { title: 'Mann-Whitney test', href: `${STATS}/inference/statistical-tests/non-parametric/mann-whitney` },
              { title: 'Wilcoxon test', href: `${STATS}/inference/statistical-tests/non-parametric/wilcoxon` },
            ],
          },
        ],
      },
      { title: 'Regression', href: '/knowledge/statistics/regression' },
      { title: 'Time series', href: '/knowledge/statistics/time-series' },
    ],
  },
  {
    title: 'Machine Learning',
    href: '/knowledge/machine-learning',
    children: [
      {
        title: 'General concepts',
        href: '/knowledge/machine-learning/general-concepts',
        children: [
          { title: 'Cross-validation', href: `${ML}/general-concepts/cross-validation` },
        ],
      },
      {
        title: 'Classical models',
        href: '/knowledge/machine-learning/classical-models',
        children: [
          { title: 'Random Forest', href: `${ML}/classical-models/random-forest` },
          { title: 'XGBoost', href: `${ML}/classical-models/xgboost` },
        ],
      },
      { title: 'Deep Learning', href: '/knowledge/machine-learning/deep-learning' },
      { title: 'Reinforcement Learning', href: '/knowledge/machine-learning/reinforcement-learning' },
      { title: 'ML for markets', href: '/knowledge/machine-learning/market-ml' },
    ],
  },
  {
    title: 'Quantitative finance',
    href: '/knowledge/quantitative-finance',
    children: [
      {
        title: 'Markets & products',
        href: '/knowledge/quantitative-finance/markets-products',
        children: [
          { title: 'Financial products', href: `${QF}/markets-products/asset-classes` },
          { title: 'Contract types', href: `${QF}/markets-products/contract-types` },
        ],
      },
      {
        title: 'Options & derivatives',
        href: '/knowledge/quantitative-finance/options-derivatives',
        children: [
          { title: 'Options basics', href: `${QF}/options-derivatives/options` },
          { title: 'Black-Scholes', href: `${QF}/options-derivatives/black-scholes` },
        ],
      },
      {
        title: 'Volatility',
        href: '/knowledge/quantitative-finance/volatility',
        children: [
          { title: 'Implied vs realized', href: `${QF}/volatility/implied-vs-realized` },
        ],
      },
      { title: 'Stochastic calculus', href: '/knowledge/quantitative-finance/stochastic-calculus' },
      { title: 'Risk management', href: '/knowledge/quantitative-finance/risk-management' },
      { title: 'Portfolio management', href: '/knowledge/quantitative-finance/portfolio-management' },
      { title: 'Factor models', href: '/knowledge/quantitative-finance/factor-models' },
      { title: 'Market microstructure', href: '/knowledge/quantitative-finance/market-microstructure' },
      {
        title: 'Financial econometrics',
        href: '/knowledge/quantitative-finance/financial-econometrics',
        children: [
          { title: 'Regimes & HMM', href: `${QF}/financial-econometrics/regimes-hmm` },
        ],
      },
      { title: 'Backtesting & systematic research', href: '/knowledge/quantitative-finance/backtesting' },
    ],
  },
  {
    title: 'Engineering & Programming',
    href: '/knowledge/engineering',
    children: [
      {
        title: 'Python',
        href: `${ENGINEERING}/python`,
        children: [
          {
            title: 'Fundamentals',
            href: `${ENGINEERING}/python/fundamentals`,
            children: [
              { title: 'Variables', href: `${ENGINEERING}/python/fundamentals/variables` },
              { title: 'Functions', href: `${ENGINEERING}/python/fundamentals/functions` },
            ],
          },
          { title: 'Typing', href: `${ENGINEERING}/python/typing` },
          { title: 'Environments', href: `${ENGINEERING}/python/environment` },
        ],
      },
      { title: 'C++ & performance', href: '/knowledge/engineering/cpp-performance' },
      {
        title: 'CUDA / GPU',
        href: `${ENGINEERING}/hardware`,
        children: [
          { title: 'GPU architecture', href: `${ENGINEERING}/hardware/gpu-architecture` },
          { title: 'CUDA programming', href: '/knowledge/engineering/cuda' },
        ],
      },
      { title: 'Data structures', href: `${ENGINEERING}/data-structures` },
      {
        title: 'Hardware',
        href: `${ENGINEERING}/hardware`,
        children: [
          { title: 'CPU architecture', href: `${ENGINEERING}/hardware/cpu-architecture` },
        ],
      },
      getDesignPatternsNav(ENGINEERING, {
        title: 'Design patterns',
        creational: 'Creational',
        structural: 'Structural',
        behavioral: 'Behavioral',
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
    title: 'Tools',
    href: '/knowledge/tools',
    children: [
      { title: 'Visual Studio Code', href: '/knowledge/tools/vscode' },
      { title: 'Git & GitHub', href: '/knowledge/tools/git-github' },
      { title: 'Power BI', href: '/knowledge/tools/power-bi' },
      { title: 'Jupyter Notebook', href: '/knowledge/tools/jupyter-notebook' },
    ],
  },
];
