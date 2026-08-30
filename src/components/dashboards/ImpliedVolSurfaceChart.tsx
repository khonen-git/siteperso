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

function useMaxWidth(maxWidth: number): boolean {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    setMatches(mq.matches);
    const handler = () => setMatches(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [maxWidth]);
  return matches;
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
  ivRange?: { min: number; max: number };
  selectedExpiry?: string;
  selectedDte?: number;
  selectedMoneyness?: number | null;
  onExpirySelect?: (expiry: string) => void;
  /** When false, 3D Plotly is not mounted (lazy tab activation). */
  mount3d?: boolean;
}

export function ImpliedVolSurfaceChart({
  snapshot,
  labels,
  compact = false,
  ivRange,
  selectedDte,
  selectedMoneyness,
  onExpirySelect,
  mount3d = false,
}: ImpliedVolSurfaceChartProps): React.JSX.Element {
  const t = useTranslations('dashboards');
  const isNarrow = useMaxWidth(639);

  const showMobileFallback = !compact && isNarrow;

  return (
    <div
      className={cn(
        'relative flex min-h-0 flex-1 flex-col',
        compact ? 'h-[140px] shrink-0' : 'h-full min-h-[280px]'
      )}
      data-testid="iv-surface-chart"
    >
      {compact || showMobileFallback ? (
        <>
          {showMobileFallback && (
            <p
              className="mb-2 shrink-0 text-xs text-muted-foreground"
              data-testid="iv-surface-mobile-fallback"
            >
              {t('impliedVol.surface.mobileFallback')}
            </p>
          )}
          <ImpliedVolHeatmap
            snapshot={snapshot}
            labels={labels}
            compact={compact || showMobileFallback}
            ivRange={ivRange}
            selectedDte={selectedDte}
            selectedMoneyness={selectedMoneyness}
            onCellClick={onExpirySelect}
          />
        </>
      ) : mount3d ? (
        <ImpliedVolSurface3DChart
          snapshot={snapshot}
          labels={labels}
          ivRange={ivRange}
          selectedDte={selectedDte}
          onExpirySelect={onExpirySelect}
        />
      ) : (
        <Surface3DPlaceholder />
      )}
    </div>
  );
}
