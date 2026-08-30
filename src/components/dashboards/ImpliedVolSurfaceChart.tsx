'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { ImpliedVolHeatmap } from '@/components/dashboards/ImpliedVolHeatmap';
import { cn } from '@/lib/utils';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

const ImpliedVolSurface3DChart = dynamic(
  () =>
    import('@/components/dashboards/ImpliedVolSurface3DChart').then(
      (m) => m.ImpliedVolSurface3DChart
    ),
  {
    ssr: false,
    loading: () => <Surface3DPlaceholder />,
  }
);

function Surface3DPlaceholder(): React.JSX.Element {
  const t = useTranslations('dashboards');
  return (
    <div className="flex h-full min-h-[280px] items-center justify-center text-sm text-muted-foreground">
      {t('impliedVol.surface.loading3d')}
    </div>
  );
}

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
