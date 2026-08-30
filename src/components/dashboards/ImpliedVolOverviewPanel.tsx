'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

function findAtmIv(slice: ImpliedVolSnapshot['slices'][0]): number {
  const sorted = [...slice.ivPoints].sort(
    (a, b) => Math.abs(a.moneyness - 1) - Math.abs(b.moneyness - 1)
  );
  return sorted[0]?.iv ?? 0;
}

interface ImpliedVolOverviewPanelProps {
  snapshot: ImpliedVolSnapshot;
}

export function ImpliedVolOverviewPanel({
  snapshot,
}: ImpliedVolOverviewPanelProps): React.JSX.Element {
  const t = useTranslations('dashboards');
  const atmIvs = snapshot.slices.map(findAtmIv).filter((v) => v > 0);
  const minIv = atmIvs.length ? Math.min(...atmIvs) : 0;
  const maxIv = atmIvs.length ? Math.max(...atmIvs) : 0;

  const kpis = [
    { label: t('impliedVol.overview.symbol'), value: snapshot.metadata.symbol },
    { label: t('impliedVol.overview.spot'), value: snapshot.metadata.spot.toFixed(2) },
    { label: t('impliedVol.overview.asOf'), value: snapshot.metadata.asOf },
    { label: t('impliedVol.overview.expiries'), value: String(snapshot.slices.length) },
    {
      label: t('impliedVol.overview.atmRange'),
      value: atmIvs.length ? `${(minIv * 100).toFixed(1)}–${(maxIv * 100).toFixed(1)}%` : '—',
    },
  ];

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="shadow-none">
            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {kpi.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <p className="text-lg font-semibold tabular-nums">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">{snapshot.metadata.source}</Badge>
        <span className="text-xs text-muted-foreground">{snapshot.metadata.sourceDisclaimer}</span>
      </div>
    </div>
  );
}
