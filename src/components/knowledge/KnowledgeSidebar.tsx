'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface TreeItem {
  title: string;
  href?: string;
  children?: TreeItem[];
}

const treeData: TreeItem[] = [
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

interface TreeNodeProps {
  item: TreeItem;
  level?: number;
  isExpanded?: boolean;
}

function TreeNode({ item, level = 0 }: TreeNodeProps) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isActive = item.href === pathname;

  const hasChildren = item.children && item.children.length > 0;

  return (
    <div>
      <div
        className={cn(
          "flex items-center justify-between py-2",
          level > 0 && "ml-4",
          isActive && "text-primary font-medium"
        )}
      >
        {item.href ? (
          <Link href={item.href} className="flex-1 hover:underline">
            {item.title}
          </Link>
        ) : (
          <span className="flex-1">{item.title}</span>
        )}
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-accent rounded-sm"
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "transform rotate-180"
              )}
            />
          </button>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="ml-2 border-l pl-2">
          {item.children?.map((child, index) => (
            <TreeNode key={index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function KnowledgeSidebar() {
  return (
    <nav className="p-4 space-y-2">
      {treeData.map((item, index) => (
        <TreeNode key={index} item={item} />
      ))}
    </nav>
  );
} 