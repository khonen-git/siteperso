export interface MathProps {
  children: string;
  className?: string;
}

export interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
  autoRun?: boolean;
}