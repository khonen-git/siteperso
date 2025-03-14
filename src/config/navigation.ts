export interface TreeItem {
  title: string;
  href?: string;
  children?: TreeItem[];
}

export const navigationData: TreeItem[] = [
  {
    title: "Mathématiques",
    href: "/knowledge/mathematics",
    children: [
      {
        title: "Probabilités",
        href: "/knowledge/mathematics/probability",
        children: [
          {
            title: "Fondamentaux",
            href: "/knowledge/mathematics/probability/fundamentals",
            children: [
              {
                title: "Principes généraux",
                href: "/knowledge/mathematics/probability/fundamentals/principles",
                children: [
                  { title: "Axiomes des probabilités", href: "/knowledge/mathematics/probability/fundamentals/principles/axioms" },
                  { title: "Espace probabilisable", href: "/knowledge/mathematics/probability/fundamentals/principles/space" },
                  { title: "Espérance", href: "/knowledge/mathematics/probability/fundamentals/principles/expectation" }
                ]
              }
            ]
          },
          {
            title: "Distributions",
            href: "/knowledge/mathematics/probability/distributions",
            children: [
              {
                title: "Distributions continues",
                href: "/knowledge/mathematics/probability/distributions/continuous",
                children: [
                  { title: "Loi Normale", href: "/knowledge/mathematics/probability/distributions/continuous/normal" }
                ]
              }
            ]
          }
        ]
      },
      {
        title: "Statistiques",
        href: "/knowledge/mathematics/statistics",
        children: [
          {
            title: "Statistiques descriptives",
            href: "/knowledge/mathematics/statistics/descriptive",
            children: [
              { title: "Fondamentaux", href: "/knowledge/mathematics/statistics/descriptive/fundamentals" },
              { title: "Visualisation", href: "/knowledge/mathematics/statistics/descriptive/visualization" }
            ]
          },
          {
            title: "Statistiques inductives",
            href: "/knowledge/mathematics/statistics/inductive",
            children: [
              { title: "Fondamentaux", href: "/knowledge/mathematics/statistics/inductive/fundamentals" },
              { 
                title: "Tests statistiques",
                href: "/knowledge/mathematics/statistics/inductive/tests",
                children: [
                  { title: "Tests paramétriques",
                    href: "/knowledge/mathematics/statistics/inductive/tests/parametric",
                    children: [
                      { title: "Test t de Student", href: "/knowledge/mathematics/statistics/inductive/tests/parametric/t-test" },
                      { title: "Test t de Welch", href: "/knowledge/mathematics/statistics/inductive/tests/parametric/t-test-welch" }
                    ]
                  },
                  { title: "Tests non paramétriques",
                    href: "/knowledge/mathematics/statistics/inductive/tests/non-parametric",
                    children: [
                      { title: "Test de Mann-Whitney", href: "/knowledge/mathematics/statistics/inductive/tests/non-parametric/mann-whitney" },
                      { title: "Test de Wilcoxon", href: "/knowledge/mathematics/statistics/inductive/tests/non-parametric/wilcoxon" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Programmation",
    href: "/knowledge/programming",
    children: [
      {
        title: "Python",
        href: "/knowledge/programming/python",
        children: [
          {
            title: "Fondamentaux",
            href: "/knowledge/programming/python/fundamentals",
            children: [
              { title: "Variables", href: "/knowledge/programming/python/fundamentals/variables" },
              { title: "Fonctions", href: "/knowledge/programming/python/fundamentals/functions" }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Data Analytics",
    href: "/knowledge/data-analytics",
    children: [
      {
        title: "Fondamentaux",
        href: "/knowledge/data-analytics/fundamentals",
        children: [
          { title: "Collecte des données", href: "/knowledge/data-analytics/fundamentals/data-collection" },
          { title: "Traitement des données", href: "/knowledge/data-analytics/fundamentals/data-processing" },
          { title: "Analyse des données", href: "/knowledge/data-analytics/fundamentals/data-analysis" }
        ]
      }
    ]
  },
  {
    title: "Data Science",
    href: "/knowledge/data-science",
    children: [
      {
        title: "Machine Learning",
        href: "/knowledge/data-science/machine-learning",
        children: [
          { title: "Apprentissage supervisé", href: "/knowledge/data-science/machine-learning/supervised" },
          { title: "Apprentissage non supervisé", href: "/knowledge/data-science/machine-learning/unsupervised" }
        ]
      }
    ]
  },
  {
    title: "Outils",
    href: "/knowledge/tools",
    children: [
      { title: "Visual Studio Code", href: "/knowledge/tools/vscode" },
      { title: "Git & GitHub", href: "/knowledge/tools/git-github" },
      { title: "Power BI", href: "/knowledge/tools/power-bi" },
      { title: "Jupyter Notebook", href: "/knowledge/tools/jupyter-notebook" }
    ]
  }
]; 