'use client';

import * as React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { getGlossaryDefinition } from '@/config/knowledge/glossary';
import { useKnowledgeMdxLocale } from '@/components/mdx/KnowledgeMdxContext';
import { cn } from '@/lib/utils';

export interface TermTipProps {
  children: React.ReactNode;
  /** Clé du glossaire partagé (ex. `bagging`, `concept-drift`). */
  term?: string;
  /** Définition inline ; prioritaire sur le glossaire. */
  definition?: string;
  className?: string;
}

export function TermTip({
  children,
  term,
  definition,
  className,
}: TermTipProps): React.JSX.Element {
  const locale = useKnowledgeMdxLocale();
  const resolvedDefinition =
    definition ?? (term ? getGlossaryDefinition(locale, term) : undefined);

  if (!resolvedDefinition) {
    return <>{children}</>;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          tabIndex={0}
          className={cn(
            'cursor-help border-b border-dotted border-muted-foreground/70 font-[inherit] text-inherit',
            'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
            className
          )}
        >
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={6}
        className="max-w-sm bg-card p-3 text-sm leading-relaxed text-card-foreground"
      >
        {resolvedDefinition}
      </TooltipContent>
    </Tooltip>
  );
}
