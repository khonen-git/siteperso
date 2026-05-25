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
        ],
      },
    ],
  },
  {
    title: 'Data Analytics',
    href: '/knowledge/data-analytics',
    children: [
      {
        title: 'Fundamentals',
        href: '/knowledge/data-analytics/fundamentals',
        children: [
          {
            title: 'Data collection',
            href: '/knowledge/data-analytics/fundamentals/data-collection',
          },
          {
            title: 'Data processing',
            href: '/knowledge/data-analytics/fundamentals/data-processing',
          },
          {
            title: 'Data analysis',
            href: '/knowledge/data-analytics/fundamentals/data-analysis',
          },
        ],
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
          },
          {
            title: 'Unsupervised learning',
            href: '/knowledge/data-science/machine-learning/unsupervised',
          },
        ],
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
