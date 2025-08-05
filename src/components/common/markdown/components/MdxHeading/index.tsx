import React from 'react';
import { cn } from '@/lib/utils';
import type { MdxHeadingProps } from '../../types';

/**
 * MdxHeading - Titres avec ancres pour la navigation
 */
export function MdxHeading({ level = 1, id, children, className }: MdxHeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  const styles = {
    1: "mt-8 mb-4 text-3xl font-bold scroll-m-20",
    2: "mt-8 mb-4 text-2xl font-bold scroll-m-20",
    3: "mt-6 mb-3 text-xl font-bold scroll-m-20",
    4: "mt-4 mb-2 text-lg font-bold scroll-m-20",
    5: "mt-4 mb-2 text-base font-bold scroll-m-20",
    6: "mt-4 mb-2 text-sm font-bold scroll-m-20",
  };

  return (
    <Component
      id={id}
      className={cn(styles[level], className)}
    >
      {children}
      {id && (
        <a
          href={`#${id}`}
          className="ml-2 text-muted-foreground opacity-0 transition-opacity hover:opacity-100"
          aria-label={`Lien vers ${children}`}
        >
          #
        </a>
      )}
    </Component>
  );
}