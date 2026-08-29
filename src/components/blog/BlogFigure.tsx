import * as React from 'react';
import { cn } from '@/lib/utils';

interface BlogFigureProps {
  caption: string;
  children: React.ReactNode;
  className?: string;
}

/** Figure blog — hors prose, légende unique (pas de alt dupliqué). */
export function BlogFigure({ caption, children, className }: BlogFigureProps): React.JSX.Element {
  return (
    <figure className={cn('not-prose my-8 space-y-2', className)}>
      <div className="overflow-hidden rounded-lg border border-border/60 bg-background [&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-3xl">
        {children}
      </div>
      <figcaption className="text-center text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
