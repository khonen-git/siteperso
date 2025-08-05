import React from 'react';
import { cn } from '@/lib/utils';
import type { ProjectContentProps } from '../../types';

/**
 * ProjectContent - Contenu principal d'un projet
 * Affiche le contenu MDX avec les styles appropriés
 */
export function ProjectContent({ content, className }: ProjectContentProps) {
  return (
    <article 
      className={cn(
        "container py-16",
        "prose prose-slate dark:prose-invert",
        "prose-headings:scroll-m-20",
        "prose-p:leading-7",
        "prose-li:marker:text-muted-foreground",
        "prose-code:rounded-md prose-code:bg-muted prose-code:p-1",
        "prose-pre:rounded-lg prose-pre:border",
        className
      )}
    >
      {content}
    </article>
  );
}