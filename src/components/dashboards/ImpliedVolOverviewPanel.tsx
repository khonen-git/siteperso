'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { DashboardPanel } from '@/components/dashboards/DashboardPanel';
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

function KpiItem({ label, value }: { label: string; value: string }): React.JSX.Element {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="truncate text-sm font-medium tabular-nums">{value}</span>
    </div>
  );
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
  const selectedAtmIv = selectedSlice ? findAtmIv(selectedSlice) : 0;
  const rr25 =
    selectedSlice?.analytics?.riskReversal25 ??
    (selectedSlice ? computeSkew25d(selectedSlice) : null);
  const { analytics } = snapshot;
  const expectedMove = analytics?.expectedMove;
  const termLabel =
    analytics?.termStructure != null
      ? t(`impliedVol.analytics.term.${analytics.termStructure}`)
      : null;

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

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col gap-3" data-testid="iv-overview-root">
      <div
        className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2 rounded-lg border border-border/60 bg-card px-3 py-2.5"
        data-testid="iv-overview-kpi"
      >
        <KpiItem label={t('impliedVol.overview.symbol')} value={snapshot.metadata.symbol} />
        <KpiItem label={t('impliedVol.overview.spot')} value={snapshot.metadata.spot.toFixed(2)} />
        <KpiItem
          label={t('impliedVol.overview.atmIv')}
          value={selectedAtmIv > 0 ? formatIvPercent(selectedAtmIv, 2) : '—'}
        />
        <KpiItem
          label={t('impliedVol.overview.rr25')}
          value={rr25 != null ? `${rr25 >= 0 ? '+' : ''}${rr25.toFixed(2)} pp` : '—'}
        />
        <KpiItem
          label={t('impliedVol.overview.ivRank')}
          value={analytics?.ivRank30d != null ? `${analytics.ivRank30d.toFixed(1)}%` : '—'}
        />
        <KpiItem
          label={t('impliedVol.overview.expectedMove68')}
          value={
            expectedMove
              ? `±${expectedMove.move68Pct.toFixed(1)}% · ${expectedMove.move68Dollars.toFixed(2)}$`
              : '—'
          }
        />
        <KpiItem
          label={t('impliedVol.overview.vrp')}
          value={
            analytics?.volatilityRiskPremium != null
              ? `${analytics.volatilityRiskPremium >= 0 ? '+' : ''}${analytics.volatilityRiskPremium.toFixed(2)} pp`
              : '—'
          }
        />
        {termLabel && <KpiItem label={t('impliedVol.overview.termStructure')} value={termLabel} />}
        <KpiItem label={t('impliedVol.overview.expiries')} value={String(snapshot.slices.length)} />
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="text-[10px]">
            {snapshot.metadata.source}
          </Badge>
          <span className="text-[10px] text-muted-foreground">{snapshot.metadata.asOf}</span>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:grid-rows-1">
        <DashboardPanel
          title={t('impliedVol.tabs.surface')}
          actions={
            <ImpliedVolInfoIcon
              content={t('impliedVol.tooltips.surface3d')}
              label={t('impliedVol.tooltips.surface3d')}
            />
          }
          onClick={() => onTabChange('surface')}
          data-testid="iv-overview-surface"
          className="min-h-0"
          bodyClassName="flex min-h-0 flex-1 flex-col overflow-hidden p-2"
        >
          {snapshot.slices.length > 0 ? (
            <>
              <div className="flex min-h-0 flex-1 items-center justify-center">
                <ImpliedVolSurfaceChart
                  snapshot={snapshot}
                  labels={surfaceLabels}
                  force3d
                  squarePlot
                  ivRange={ivYDomain}
                  selectedDte={selectedDte}
                  selectedMoneyness={selectedMoneyness}
                  onExpirySelect={onExpirySelect}
                />
              </div>
              <p className="mt-2 shrink-0 px-1 text-[10px] text-muted-foreground">
                {t('impliedVol.overview.surfaceHint')}
              </p>
            </>
          ) : (
            <p className="text-xs text-muted-foreground">{t('impliedVol.errors.noData')}</p>
          )}
        </DashboardPanel>

        <div className="grid min-h-0 grid-rows-2 gap-3 lg:min-h-0">
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
            className="min-h-[140px] min-h-0"
            bodyClassName="flex min-h-0 flex-1 flex-col overflow-hidden p-2"
          >
            {snapshot.slices.length > 0 ? (
              <ImpliedVolTermChart
                snapshot={snapshot}
                labels={termLabels}
                fill
                ivYDomain={ivYDomain}
                selectedExpiry={selectedExpiry}
                onPointClick={onTermPointClick}
              />
            ) : (
              <p className="text-xs text-muted-foreground">{t('impliedVol.errors.noData')}</p>
            )}
          </DashboardPanel>

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
            className="min-h-[140px] min-h-0"
            bodyClassName="flex min-h-0 flex-1 flex-col overflow-hidden p-2"
          >
            {selectedSlice ? (
              <>
                <ImpliedVolSmileChart
                  slice={selectedSlice}
                  labels={chartLabels}
                  fill
                  ivYDomain={ivYDomain}
                  selectedMoneyness={selectedMoneyness}
                />
                {expiryHint && (
                  <p className="mt-1 shrink-0 px-1 text-[10px] text-muted-foreground">
                    {expiryHint}
                  </p>
                )}
              </>
            ) : (
              <p className="text-xs text-muted-foreground">{t('impliedVol.errors.noData')}</p>
            )}
          </DashboardPanel>
        </div>
      </div>
    </div>
  );
}
