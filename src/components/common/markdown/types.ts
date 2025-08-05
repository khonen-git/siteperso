import { DistributionVisualizerProps } from '@/components/features/knowledge/types';

export interface MarkdownProps {
  children: React.ReactNode;
  className?: string;
}

export interface MdxCardProps extends MarkdownProps {
  title?: string;
}

export interface MdxCodeProps extends MarkdownProps {
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export interface MdxImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export interface MdxTableProps extends MarkdownProps {
  headers?: string[];
  compact?: boolean;
}

export interface MdxDistributionVisualizerProps {
  distribution: DistributionVisualizerProps['distribution'];
  className?: string;
}

export interface MdxLinkProps extends MarkdownProps {
  href: string;
  external?: boolean;
}

export interface MdxHeadingProps extends MarkdownProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  id?: string;
}