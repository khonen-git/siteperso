import { TreeItem } from '@/config/navigation';

// Types pour la visualisation
export interface DistributionVisualizerProps {
  distribution: {
    name: string;
    range: { min: number; max: number };
    parameters: Record<string, number>;
    pdf: (x: number) => number;
    cdf: (x: number) => number;
  };
  className?: string;
}

export interface DistributionPlotProps {
  distribution: DistributionVisualizerProps['distribution'];
  calculator: {
    pdf: (x: number) => number;
    cdf: (x: number) => number;
  };
  cache: {
    get: (key: string) => number | null;
    set: (key: string, value: number) => void;
  };
  className?: string;
}

export interface CurveCalculatorProps {
  distribution: DistributionVisualizerProps['distribution'];
  calculator: DistributionPlotProps['calculator'];
  className?: string;
}

// Types pour la navigation
export interface KnowledgeSidebarProps {
  className?: string;
}

export interface TableOfContentsProps {
  className?: string;
}

export interface TreeViewProps {
  items: TreeItem[];
  level?: number;
}

// Types pour les composants mathématiques
export interface MathProps {
  children: string;
  className?: string;
}

export interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
}

// Types pour les sections
export interface KnowledgeSectionProps {
  title: string;
  description: string;
  icon?: keyof typeof import('@/components/ui/icons').Icons;
  className?: string;
}