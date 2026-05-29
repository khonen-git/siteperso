import type { TreeItem } from './types';

export const navigationData: TreeItem[] = [
  {
    title: 'Mathematics',
    href: '/knowledge/mathematics',
    children: [
      {
        title: 'Probability',
        href: '/knowledge/mathematics/probability',
        children: [
          {
            title: 'Fundamentals',
            href: '/knowledge/mathematics/probability/fundamentals',
            children: [
              {
                title: 'General principles',
                href: '/knowledge/mathematics/probability/fundamentals/principles',
                children: [
                  {
                    title: 'Probability axioms',
                    href: '/knowledge/mathematics/probability/fundamentals/principles/axioms',
                  },
                  {
                    title: 'Probability space',
                    href: '/knowledge/mathematics/probability/fundamentals/principles/space',
                  },
                  {
                    title: 'Expectation',
                    href: '/knowledge/mathematics/probability/fundamentals/principles/expectation',
                  },
                ],
              },
            ],
          },
          {
            title: 'Distributions',
            href: '/knowledge/mathematics/probability/distributions',
            children: [
              {
                title: 'Continuous distributions',
                href: '/knowledge/mathematics/probability/distributions/continuous',
                children: [
                  {
                    title: 'Normal distribution',
                    href: '/knowledge/mathematics/probability/distributions/continuous/normal',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'Statistics',
        href: '/knowledge/mathematics/statistics',
        children: [
          {
            title: 'Descriptive statistics',
            href: '/knowledge/mathematics/statistics/descriptive',
            children: [
              {
                title: 'Fundamentals',
                href: '/knowledge/mathematics/statistics/descriptive/fundamentals',
              },
              {
                title: 'Visualization',
                href: '/knowledge/mathematics/statistics/descriptive/visualization',
              },
            ],
          },
          {
            title: 'Inferential statistics',
            href: '/knowledge/mathematics/statistics/inductive',
            children: [
              {
                title: 'Fundamentals',
                href: '/knowledge/mathematics/statistics/inductive/fundamentals',
              },
              {
                title: 'Statistical tests',
                href: '/knowledge/mathematics/statistics/inductive/statistical-tests',
                children: [
                  {
                    title: 'Parametric tests',
                    href: '/knowledge/mathematics/statistics/inductive/statistical-tests/parametric',
                    children: [
                      {
                        title: "Student's t-test",
                        href: '/knowledge/mathematics/statistics/inductive/statistical-tests/parametric/t-test',
                      },
                      {
                        title: "Welch's t-test",
                        href: '/knowledge/mathematics/statistics/inductive/statistical-tests/parametric/t-test-welch',
                      },
                    ],
                  },
                  {
                    title: 'Non-parametric tests',
                    href: '/knowledge/mathematics/statistics/inductive/statistical-tests/non-parametric',
                    children: [
                      {
                        title: 'Mann-Whitney test',
                        href: '/knowledge/mathematics/statistics/inductive/statistical-tests/non-parametric/mann-whitney',
                      },
                      {
                        title: 'Wilcoxon test',
                        href: '/knowledge/mathematics/statistics/inductive/statistical-tests/non-parametric/wilcoxon',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'Information theory',
        href: '/knowledge/mathematics/information-theory',
      },
    ],
  },
  {
    title: 'Programming',
    href: '/knowledge/programming',
    children: [
      {
        title: 'Python',
        href: '/knowledge/programming/python',
        children: [
          {
            title: 'Fundamentals',
            href: '/knowledge/programming/python/fundamentals',
            children: [
              {
                title: 'Variables',
                href: '/knowledge/programming/python/fundamentals/variables',
              },
              {
                title: 'Functions',
                href: '/knowledge/programming/python/fundamentals/functions',
              },
            ],
          },
          {
            title: 'Typing',
            href: '/knowledge/programming/python/typing',
          },
          {
            title: 'Environments',
            href: '/knowledge/programming/python/environment',
          },
        ],
      },
      {
        title: 'Data structures',
        href: '/knowledge/programming/data-structures',
      },
      {
        title: 'Hardware',
        href: '/knowledge/programming/hardware',
        children: [
          {
            title: 'CPU architecture',
            href: '/knowledge/programming/hardware/cpu-architecture',
          },
          {
            title: 'GPU architecture',
            href: '/knowledge/programming/hardware/gpu-architecture',
          },
        ],
      },
      {
        title: 'Design patterns',
        href: '/knowledge/programming/design-patterns',
        children: [
          {
            title: 'Creational',
            href: '/knowledge/programming/design-patterns/creational',
            children: [
              {
                title: 'Abstract Factory',
                href: '/knowledge/programming/design-patterns/creational/abstract-factory',
              },
              {
                title: 'Builder',
                href: '/knowledge/programming/design-patterns/creational/builder',
              },
              {
                title: 'Factory Method',
                href: '/knowledge/programming/design-patterns/creational/factory-method',
              },
              {
                title: 'Prototype',
                href: '/knowledge/programming/design-patterns/creational/prototype',
              },
              {
                title: 'Singleton',
                href: '/knowledge/programming/design-patterns/creational/singleton',
              },
            ],
          },
          {
            title: 'Structural',
            href: '/knowledge/programming/design-patterns/structural',
            children: [
              {
                title: 'Adapter',
                href: '/knowledge/programming/design-patterns/structural/adapter',
              },
              {
                title: 'Bridge',
                href: '/knowledge/programming/design-patterns/structural/bridge',
              },
              {
                title: 'Composite',
                href: '/knowledge/programming/design-patterns/structural/composite',
              },
              {
                title: 'Decorator',
                href: '/knowledge/programming/design-patterns/structural/decorator',
              },
              {
                title: 'Facade',
                href: '/knowledge/programming/design-patterns/structural/facade',
              },
              {
                title: 'Flyweight',
                href: '/knowledge/programming/design-patterns/structural/flyweight',
              },
              {
                title: 'Proxy',
                href: '/knowledge/programming/design-patterns/structural/proxy',
              },
            ],
          },
          {
            title: 'Behavioral',
            href: '/knowledge/programming/design-patterns/behavioral',
            children: [
              {
                title: 'Chain of Responsibility',
                href: '/knowledge/programming/design-patterns/behavioral/chain-of-responsibility',
              },
              {
                title: 'Command',
                href: '/knowledge/programming/design-patterns/behavioral/command',
              },
              {
                title: 'Interpreter',
                href: '/knowledge/programming/design-patterns/behavioral/interpreter',
              },
              {
                title: 'Iterator',
                href: '/knowledge/programming/design-patterns/behavioral/iterator',
              },
              {
                title: 'Mediator',
                href: '/knowledge/programming/design-patterns/behavioral/mediator',
              },
              {
                title: 'Memento',
                href: '/knowledge/programming/design-patterns/behavioral/memento',
              },
              {
                title: 'Observer',
                href: '/knowledge/programming/design-patterns/behavioral/observer',
              },
              {
                title: 'State',
                href: '/knowledge/programming/design-patterns/behavioral/state',
              },
              {
                title: 'Strategy',
                href: '/knowledge/programming/design-patterns/behavioral/strategy',
              },
              {
                title: 'Template Method',
                href: '/knowledge/programming/design-patterns/behavioral/template-method',
              },
              {
                title: 'Visitor',
                href: '/knowledge/programming/design-patterns/behavioral/visitor',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Finance',
    href: '/knowledge/finance',
    children: [
      {
        title: 'Asset classes',
        href: '/knowledge/finance/asset-classes',
      },
      {
        title: 'Contract types',
        href: '/knowledge/finance/contract-types',
      },
      {
        title: 'Options (put/call and strategies)',
        href: '/knowledge/finance/options',
      },
      {
        title: 'Black-Scholes',
        href: '/knowledge/finance/black-scholes',
      },
      {
        title: 'Implied and realized volatility',
        href: '/knowledge/finance/volatility',
      },
    ],
  },
  {
    title: 'Data Science',
    href: '/knowledge/data-science',
    children: [
      {
        title: 'Machine Learning',
        href: '/knowledge/data-science/machine-learning',
        children: [
          {
            title: 'Supervised learning',
            href: '/knowledge/data-science/machine-learning/supervised',
            children: [
              {
                title: 'Random Forest',
                href: '/knowledge/data-science/machine-learning/supervised/random-forest',
              },
              {
                title: 'XGBoost',
                href: '/knowledge/data-science/machine-learning/supervised/xgboost',
              },
            ],
          },
          {
            title: 'Unsupervised learning',
            href: '/knowledge/data-science/machine-learning/unsupervised',
            children: [
              {
                title: 'HMM',
                href: '/knowledge/data-science/machine-learning/unsupervised/hmm',
              },
            ],
          },
        ],
      },
      {
        title: 'Cross-validation',
        href: '/knowledge/data-science/cross-validation',
      },
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
