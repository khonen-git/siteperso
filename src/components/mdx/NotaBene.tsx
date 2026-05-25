import { cn } from '@/lib/utils';

interface NotaBeneProps {
  children: React.ReactNode;
  className?: string;
}

/** Note d’avertissement ou de contexte (style proche des pages projets OpenClassrooms). */
export function NotaBene({ children, className }: NotaBeneProps) {
  return (
    <p
      className={cn(
        'not-prose mb-6 text-sm italic leading-relaxed text-muted-foreground',
        className
      )}
    >
      {children}
    </p>
  );
}
