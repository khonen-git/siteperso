'use client';

import * as React from 'react';
import { ImpliedVolHeatmap } from '@/components/dashboards/ImpliedVolHeatmap';
import { ImpliedVolSurface3DChart } from '@/components/dashboards/ImpliedVolSurface3DChart';
import { cn } from '@/lib/utils';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

interface SurfaceLabels {
  moneyness: string;
  daysToExpiry: string;
  iv: string;
}

interface ImpliedVolSurfaceChartProps {
  snapshot: ImpliedVolSnapshot;
  labels: SurfaceLabels;
  compact?: boolean;
  onExpirySelect?: (expiry: string) => void;
}

export function ImpliedVolSurfaceChart({
  snapshot,
  labels,
  compact = false,
  onExpirySelect,
}: ImpliedVolSurfaceChartProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'relative flex min-h-0 flex-1 flex-col',
        compact ? 'h-[140px] shrink-0' : 'h-full min-h-[280px]'
      )}
    >
      {compact ? (
        <ImpliedVolHeatmap
          snapshot={snapshot}
          labels={labels}
          compact
          onCellClick={onExpirySelect}
        />
      ) : (
        <ImpliedVolSurface3DChart
          snapshot={snapshot}
          labels={labels}
          onExpirySelect={onExpirySelect}
        />
      )}
    </div>
  );
}
