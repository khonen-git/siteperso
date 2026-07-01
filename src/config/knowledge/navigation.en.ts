import { getDesignPatternsNav } from './design-patterns-nav';
import type { TreeItem } from './types';

/** Legacy paths — MDX content unchanged until PR2. */
const LEGACY_PROGRAMMING = '/knowledge/programming';
const LEGACY_FINANCE = '/knowledge/finance';
const LEGACY_DATA_SCIENCE = '/knowledge/data-science';
const LEGACY_PROBABILITY = '/knowledge/mathematics/probability';
const LEGACY_STATISTICS = '/knowledge/mathematics/statistics';

export const navigationData: TreeItem[] = [
  {
    title: 'Mathematics',
    href: '/knowledge/mathematics',
    children: [
      { title: 'Linear algebra', href: '/knowledge/mathematics/linear-algebra' },
      { title: 'Analysis', href: '/knowledge/mathematics/analysis' },
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
            title: 'Normal distribution',
            href: `${LEGACY_PROBABILITY}/distributions/continuous/normal`,
          },
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
          {
            title: 'Fundamentals',
            href: `${LEGACY_STATISTICS}/descriptive/fundamentals`,
          },
          {
            title: 'Visualization',
            href: `${LEGACY_STATISTICS}/descriptive/visualization`,
          },
        ],
      },
      {
        title: 'Statistical inference',
        href: '/knowledge/statistics/inference',
        children: [
          {
            title: 'Hypothesis tests',
            href: `${LEGACY_STATISTICS}/inductive/statistical-tests`,
            children: [
              {
                title: 'Parametric tests',
                href: `${LEGACY_STATISTICS}/inductive/statistical-tests/parametric`,
                children: [
                  {
                    title: "Student's t-test",
                    href: `${LEGACY_STATISTICS}/inductive/statistical-tests/parametric/t-test`,
                  },
                  {
                    title: "Welch's t-test",
                    href: `${LEGACY_STATISTICS}/inductive/statistical-tests/parametric/t-test-welch`,
                  },
                ],
              },
              {
                title: 'Non-parametric tests',
                href: `${LEGACY_STATISTICS}/inductive/statistical-tests/non-parametric`,
                children: [
                  {
                    title: 'Mann-Whitney test',
                    href: `${LEGACY_STATISTICS}/inductive/statistical-tests/non-parametric/mann-whitney`,
                  },
                  {
                    title: 'Wilcoxon test',
                    href: `${LEGACY_STATISTICS}/inductive/statistical-tests/non-parametric/wilcoxon`,
                  },
                ],
              },
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
          {
            title: 'Cross-validation',
            href: `${LEGACY_DATA_SCIENCE}/cross-validation`,
          },
        ],
      },
      {
        title: 'Classical models',
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
          { title: 'Financial products', href: `${LEGACY_FINANCE}/asset-classes` },
          { title: 'Contract types', href: `${LEGACY_FINANCE}/contract-types` },
        ],
      },
      {
        title: 'Options & derivatives',
        href: '/knowledge/quantitative-finance/options-derivatives',
        children: [
          { title: 'Options basics', href: `${LEGACY_FINANCE}/options` },
          { title: 'Black-Scholes', href: `${LEGACY_FINANCE}/black-scholes` },
        ],
      },
      {
        title: 'Volatility',
        href: '/knowledge/quantitative-finance/volatility',
        children: [
          { title: 'Implied vs realized', href: `${LEGACY_FINANCE}/volatility` },
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
          {
            title: 'Regimes & HMM',
            href: `${LEGACY_DATA_SCIENCE}/machine-learning/unsupervised/hmm`,
          },
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
        href: `${LEGACY_PROGRAMMING}/python`,
        children: [
          {
            title: 'Fundamentals',
            href: `${LEGACY_PROGRAMMING}/python/fundamentals`,
            children: [
              {
                title: 'Variables',
                href: `${LEGACY_PROGRAMMING}/python/fundamentals/variables`,
              },
              {
                title: 'Functions',
                href: `${LEGACY_PROGRAMMING}/python/fundamentals/functions`,
              },
            ],
          },
          { title: 'Typing', href: `${LEGACY_PROGRAMMING}/python/typing` },
          { title: 'Environments', href: `${LEGACY_PROGRAMMING}/python/environment` },
        ],
      },
      { title: 'C++ & performance', href: '/knowledge/engineering/cpp-performance' },
      {
        title: 'CUDA / GPU',
        href: `${LEGACY_PROGRAMMING}/hardware`,
        children: [
          {
            title: 'GPU architecture',
            href: `${LEGACY_PROGRAMMING}/hardware/gpu-architecture`,
          },
          { title: 'CUDA programming', href: '/knowledge/engineering/cuda' },
        ],
      },
      { title: 'Data structures', href: `${LEGACY_PROGRAMMING}/data-structures` },
      {
        title: 'Hardware',
        href: `${LEGACY_PROGRAMMING}/hardware`,
        children: [
          {
            title: 'CPU architecture',
            href: `${LEGACY_PROGRAMMING}/hardware/cpu-architecture`,
          },
        ],
      },
      getDesignPatternsNav(LEGACY_PROGRAMMING, {
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
