export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  zebra?: boolean;
  compact?: boolean;
}

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  fallback?: string;
}

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  className?: string;
}