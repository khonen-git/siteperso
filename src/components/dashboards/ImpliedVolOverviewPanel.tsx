'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { DashboardPanel } from '@/components/dashboards/DashboardPanel';
import { DashboardStat } from '@/components/dashboards/DashboardStat';
import { ImpliedVolInfoIcon } from '@/components/dashboards/ImpliedVolInfoIcon';
import { ImpliedVolSmileChart } from '@/components/dashboards/ImpliedVolSmileChart';
import { ImpliedVolSurfaceChart } from '@/components/dashboards/ImpliedVolSurfaceChart';
import { ImpliedVolTermChart } from '@/components/dashboards/ImpliedVolTermChart';
import type { ImpliedVolTab } from '@/components/dashboards/ImpliedVolDashboardShell';
import { computeSkew25d, findAtmIv } from '@/lib/dashboards/iv-metrics';
import { formatIvPercent } from '@/lib/dashboards/chart-theme';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

interface ImpliedVolOverviewPanelProps {
  snapshot: ImpliedVolSnapshot;
  selectedSlice: ImpliedVolSnapshot['slices'][0] | undefined;
  selectedExpiry: string;
  selectedDte?: number;
  selectedMoneyness: number | null;
  ivYDomain: { min: number; max: number };
  onTabChange: (tab: ImpliedVolTab) => void;
  onExpirySelect?: (expiry: string) => void;
  onTermPointClick?: (expiry: string) => void;
}

export function ImpliedVolOverviewPanel({
  snapshot,
  selectedSlice,
  selectedExpiry,
  selectedDte,
  selectedMoneyness,
  ivYDomain,
  onTabChange,
  onExpirySelect,
  onTermPointClick,
}: ImpliedVolOverviewPanelProps): React.JSX.Element {
  const t = useTranslations('dashboards');
  const atmIvs = snapshot.slices.map(findAtmIv).filter((v) => v > 0);
  const minIv = atmIvs.length ? Math.min(...atmIvs) : 0;
  const maxIv = atmIvs.length ? Math.max(...atmIvs) : 0;
  const selectedAtmIv = selectedSlice ? findAtmIv(selectedSlice) : 0;
  const skew25d = selectedSlice ? computeSkew25d(selectedSlice) : null;

  const chartLabels = {
    moneyness: t('impliedVol.chart.moneyness'),
    strike: t('impliedVol.chart.strike'),
    iv: t('impliedVol.chart.iv'),
    atm: t('impliedVol.chart.atm'),
    marketIv: t('impliedVol.chart.marketIv'),
    ssviFit: t('impliedVol.chart.ssviIv'),
  };

  const termLabels = {
    daysToExpiry: t('impliedVol.chart.daysToExpiry'),
    iv: t('impliedVol.chart.iv'),
    atmIv: t('impliedVol.chart.atmIv'),
  };

  const surfaceLabels = {
    moneyness: t('impliedVol.chart.moneyness'),
    daysToExpiry: t('impliedVol.chart.daysToExpiry'),
    iv: t('impliedVol.chart.iv'),
  };

  const expiryHint = selectedSlice
    ? t('impliedVol.overview.expiryHint', { expiry: selectedSlice.expiry })
    : '';

  const termHint =
    snapshot.slices.length > 0
      ? t('impliedVol.overview.termHint', {
          count: String(snapshot.slices.length),
          min: (minIv * 100).toFixed(1),
          max: (maxIv * 100).toFixed(1),
        })
      : '';

  return (
    <div className="grid h-full min-h-0 flex-1 grid-cols-1 grid-rows-4 gap-3 md:grid-cols-2 md:grid-rows-2">
      <DashboardPanel
        title={t('impliedVol.tabs.smile')}
        actions={
          <ImpliedVolInfoIcon
            content={t('impliedVol.tooltips.moneyness')}
            label={t('impliedVol.tooltips.moneyness')}
          />
        }
        onClick={() => onTabChange('smile')}
        data-testid="iv-overview-smile"
        className="h-full min-h-0 overflow-hidden"
        bodyClassName="flex min-h-0 flex-1 flex-col overflow-hidden p-2"
      >
        {selectedSlice ? (
          <>
            <ImpliedVolSmileChart
              slice={selectedSlice}
              labels={chartLabels}
              compact
              ivYDomain={ivYDomain}
              selectedMoneyness={selectedMoneyness}
            />
            {expiryHint && (
              <p className="mt-auto shrink-0 px-1 pt-1 text-[10px] text-muted-foreground">
                {expiryHint}
              </p>
            )}
          </>
        ) : (
          <p className="text-xs text-muted-foreground">{t('impliedVol.errors.noData')}</p>
        )}
      </DashboardPanel>

      <DashboardPanel
        title={t('impliedVol.term.title')}
        actions={
          <ImpliedVolInfoIcon
            content={t('impliedVol.tooltips.termStructure')}
            label={t('impliedVol.tooltips.termStructure')}
          />
        }
        onClick={() => onTabChange('term')}
        data-testid="iv-overview-term"
        className="h-full min-h-0 overflow-hidden"
        bodyClassName="flex min-h-0 flex-1 flex-col overflow-hidden p-2"
      >
        {snapshot.slices.length > 0 ? (
          <>
            <ImpliedVolTermChart
              snapshot={snapshot}
              labels={termLabels}
              compact
              ivYDomain={ivYDomain}
              selectedExpiry={selectedExpiry}
              onPointClick={onTermPointClick}
            />
            {termHint && (
              <p className="mt-auto shrink-0 px-1 pt-1 text-[10px] text-muted-foreground">
                {termHint}
              </p>
            )}
          </>
        ) : (
          <p className="text-xs text-muted-foreground">{t('impliedVol.errors.noData')}</p>
        )}
      </DashboardPanel>

      <DashboardPanel
        title={t('impliedVol.tabs.surface')}
        actions={
          <ImpliedVolInfoIcon
            content={t('impliedVol.tooltips.heatmap')}
            label={t('impliedVol.tooltips.heatmap')}
          />
        }
        onClick={() => onTabChange('surface')}
        data-testid="iv-overview-surface"
        className="h-full min-h-0 overflow-hidden"
        bodyClassName="flex min-h-0 flex-1 flex-col overflow-hidden p-2"
      >
        {snapshot.slices.length > 0 ? (
          <>
            <ImpliedVolSurfaceChart
              snapshot={snapshot}
              labels={surfaceLabels}
              compact
              ivRange={ivYDomain}
              selectedExpiry={selectedExpiry}
              selectedDte={selectedDte}
              selectedMoneyness={selectedMoneyness}
              onExpirySelect={onExpirySelect}
            />
            <p className="mt-auto shrink-0 px-1 pt-1 text-[10px] text-muted-foreground">
              {t('impliedVol.overview.surfaceHint')}
            </p>
          </>
        ) : (
          <p className="text-xs text-muted-foreground">{t('impliedVol.errors.noData')}</p>
        )}
      </DashboardPanel>

      <DashboardPanel
        title={t('impliedVol.overview.indicators')}
        actions={
          <ImpliedVolInfoIcon
            content={t('impliedVol.tooltips.overviewStats')}
            label={t('impliedVol.tooltips.overviewStats')}
          />
        }
        data-testid="iv-overview-stats"
        className="h-full min-h-0 overflow-hidden"
        bodyClassName="flex min-h-0 flex-1 flex-col justify-between gap-3 overflow-y-auto p-3"
      >
        <div className="grid grid-cols-2 gap-3">
          <DashboardStat label={t('impliedVol.overview.symbol')} value={snapshot.metadata.symbol} />
          <DashboardStat
            label={t('impliedVol.overview.spot')}
            value={snapshot.metadata.spot.toFixed(2)}
          />
          <DashboardStat label={t('impliedVol.overview.asOf')} value={snapshot.metadata.asOf} />
          <DashboardStat
            label={t('impliedVol.overview.expiries')}
            value={String(snapshot.slices.length)}
          />
          <DashboardStat
            label={t('impliedVol.overview.atmIv')}
            value={selectedAtmIv > 0 ? formatIvPercent(selectedAtmIv, 2) : '—'}
          />
          <DashboardStat
            label={t('impliedVol.overview.atmRange')}
            value={atmIvs.length ? `${(minIv * 100).toFixed(1)}–${(maxIv * 100).toFixed(1)}%` : '—'}
          />
          <DashboardStat
            label={t('impliedVol.overview.skew25d')}
            value={skew25d != null ? `${skew25d >= 0 ? '+' : ''}${skew25d.toFixed(2)} pp` : '—'}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="text-[10px]">
            {snapshot.metadata.source}
          </Badge>
          <span className="text-[10px] text-muted-foreground">
            {snapshot.metadata.sourceDisclaimer}
          </span>
        </div>
      </DashboardPanel>
    </div>
  );
}
