'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Activity, LineChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatIvPercent } from '@/lib/dashboards/chart-theme';
import { computeSkew25d, computeSnapshotIvRange, findAtmIv } from '@/lib/dashboards/iv-metrics';
import { cn } from '@/lib/utils';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

/** ~200px à 840px de hauteur viewport ; s’adapte en % (vh), borné min/max. */
const surfaceHeightClass = 'h-[clamp(160px,24vh,260px)]';

const ImpliedVolSurfaceChart = dynamic(
  () =>
    import('@/components/dashboards/ImpliedVolSurfaceChart').then((m) => m.ImpliedVolSurfaceChart),
  {
    ssr: false,
    loading: () => <SurfaceLoading />,
  }
);

function SurfaceLoading(): React.JSX.Element {
  return (
    <div className={cn('flex items-center justify-center', surfaceHeightClass)}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

interface HomeDashboardPreviewProps {
  snapshot: ImpliedVolSnapshot;
}

export function HomeDashboardPreview({ snapshot }: HomeDashboardPreviewProps): React.JSX.Element {
  const t = useTranslations('home.hero');
  const tDash = useTranslations('dashboards');

  const nearestSlice = React.useMemo(() => {
    const sorted = [...snapshot.slices].sort((a, b) => a.daysToExpiry - b.daysToExpiry);
    return sorted.find((s) => s.daysToExpiry >= 21) ?? sorted[0];
  }, [snapshot.slices]);

  const atmIv = nearestSlice ? findAtmIv(nearestSlice) : 0;
  const rr25 =
    nearestSlice?.analytics?.riskReversal25 ?? (nearestSlice ? computeSkew25d(nearestSlice) : null);
  const ivRange = React.useMemo(() => computeSnapshotIvRange(snapshot), [snapshot]);

  const surfaceLabels = {
    moneyness: tDash('impliedVol.chart.moneyness'),
    daysToExpiry: tDash('impliedVol.chart.daysToExpiry'),
    iv: tDash('impliedVol.chart.iv'),
  };

  return (
    <Link
      href="/dashboards/implied-vol"
      prefetch
      className="group block h-full"
      aria-label={t('ctaDashboard')}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className={cn(
          'relative flex w-full flex-col overflow-hidden rounded-xl border bg-card/80 shadow-lg lg:ml-auto lg:max-w-[75%]',
          'transition-shadow duration-300 group-hover:shadow-xl group-hover:ring-1 group-hover:ring-primary/30'
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b bg-muted/30 px-3 py-2">
          <div className="flex items-center gap-2">
            <LineChart className="h-4 w-4 text-primary" aria-hidden />
            <span className="text-sm font-medium">{t('previewLabel')}</span>
          </div>
          <Badge variant="default" className="gap-1 text-[10px] uppercase tracking-wide">
            <Activity className="h-3 w-3" aria-hidden />
            {t('previewLive')}
          </Badge>
        </div>

        <div className="relative flex flex-col gap-2 p-3">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-md bg-muted/40 px-2 py-1.5">
              <div className="text-[10px] text-muted-foreground">
                {tDash('impliedVol.overview.spot')}
              </div>
              <div className="font-semibold tabular-nums">{snapshot.metadata.spot.toFixed(1)}</div>
            </div>
            <div className="rounded-md bg-muted/40 px-2 py-1.5">
              <div className="text-[10px] text-muted-foreground">
                {tDash('impliedVol.overview.atmIv')}
              </div>
              <div className="font-semibold tabular-nums">
                {atmIv > 0 ? formatIvPercent(atmIv, 1) : '—'}
              </div>
            </div>
            <div className="rounded-md bg-muted/40 px-2 py-1.5">
              <div className="text-[10px] text-muted-foreground">
                {tDash('impliedVol.overview.rr25')}
              </div>
              <div className="font-semibold tabular-nums">
                {rr25 != null ? `${rr25 >= 0 ? '+' : ''}${rr25.toFixed(1)} pp` : '—'}
              </div>
            </div>
          </div>

          <div
            className={cn(
              'relative shrink-0 overflow-hidden rounded-lg border bg-muted/10',
              surfaceHeightClass
            )}
            aria-hidden
          >
            <ImpliedVolSurfaceChart
              snapshot={snapshot}
              labels={surfaceLabels}
              force3d
              squarePlot
              showControls={false}
              ivRange={ivRange}
            />
          </div>

          <p className="text-xs text-muted-foreground">{t('previewHint')}</p>
        </div>
      </motion.div>
    </Link>
  );
}
