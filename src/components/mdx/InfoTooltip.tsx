'use client';

import * as React from 'react';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface InfoTooltipProps {
  children: React.ReactNode;
  /** Accessible label for the trigger button */
  label?: string;
}

export function InfoTooltip({
  children,
  label = "Plus d'informations",
}: InfoTooltipProps): React.JSX.Element {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex shrink-0 rounded-full bg-foreground p-1 transition-colors hover:bg-foreground/90 dark:bg-background dark:hover:bg-background/90"
          aria-label={label}
        >
          <Info className="h-4 w-4 text-background dark:text-foreground" />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className="max-w-xs bg-card p-3 text-sm leading-relaxed text-card-foreground"
      >
        {children}
      </TooltipContent>
    </Tooltip>
  );
}

export function InfoTooltipProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <TooltipProvider>{children}</TooltipProvider>;
}
