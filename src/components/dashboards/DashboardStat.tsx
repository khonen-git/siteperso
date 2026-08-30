'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface DashboardStatProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export function DashboardStat({ label, value, className }: DashboardStatProps): React.JSX.Element {
  return (
    <div className={cn('flex flex-col gap-0.5', className)}>
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold tabular-nums">{value}</span>
    </div>
  );
}
