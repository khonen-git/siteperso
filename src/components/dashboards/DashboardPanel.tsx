'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface DashboardPanelProps {
  title: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  onClick?: () => void;
  'data-testid'?: string;
}

export function DashboardPanel({
  title,
  actions,
  children,
  className,
  bodyClassName,
  onClick,
  'data-testid': testId,
}: DashboardPanelProps): React.JSX.Element {
  const interactive = Boolean(onClick);

  return (
    <section
      data-testid={testId}
      className={cn(
        'flex min-h-0 flex-col overflow-hidden rounded-lg border border-border/60 bg-card',
        interactive && 'cursor-pointer transition-colors hover:border-border hover:bg-accent/30',
        className
      )}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      <header className="flex shrink-0 items-center justify-between gap-2 border-b border-border/40 px-3 py-2">
        <h2 className="min-w-0 truncate text-xs font-medium sm:text-sm">{title}</h2>
        {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
      </header>
      <div className={cn('min-h-0 flex-1 p-2', bodyClassName)}>{children}</div>
    </section>
  );
}
