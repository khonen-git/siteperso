import type { ReactNode } from 'react';

export interface MathProps {
  children: string;
  className?: string;
}

export interface CodeBlockProps {
  children: ReactNode;
  language?: string;
  className?: string;
  autoRun?: boolean;
}
