'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProjectImportance } from '@/types/project';

interface ProjectImportanceBadgeProps {
  importance: ProjectImportance;
  className?: string;
}

const TIER_CLASS: Partial<Record<ProjectImportance, string>> = {
  5: 'text-amber-500',
  4: 'text-slate-400',
  3: 'text-amber-700',
};

export function ProjectImportanceBadge({
  importance,
  className,
}: ProjectImportanceBadgeProps): React.JSX.Element | null {
  if (importance === 0) {
    return null;
  }

  const tierClass = TIER_CLASS[importance] ?? 'text-primary';

  return (
    <div
      className={cn('flex items-center gap-0.5', tierClass, className)}
      aria-label={`${importance} / 5`}
      title={`${importance} / 5`}
    >
      {Array.from({ length: importance }, (_, index) => (
        <Star key={index} className="h-3.5 w-3.5 fill-current" aria-hidden />
      ))}
    </div>
  );
}
