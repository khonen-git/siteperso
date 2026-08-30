'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { DashboardPanel } from '@/components/dashboards/DashboardPanel';
import { ImpliedVolAboutPanel } from '@/components/dashboards/ImpliedVolAboutPanel';
import {
  ImpliedVolDashboardShell,
  type ImpliedVolTab,
} from '@/components/dashboards/ImpliedVolDashboardShell';
import { ImpliedVolChainPanel } from '@/components/dashboards/ImpliedVolChainPanel';
import { ImpliedVolInfoIcon } from '@/components/dashboards/ImpliedVolInfoIcon';
import { ImpliedVolOverviewPanel } from '@/components/dashboards/ImpliedVolOverviewPanel';
import { ImpliedVolSmileChart } from '@/components/dashboards/ImpliedVolSmileChart';
import { ImpliedVolStatusBar } from '@/components/dashboards/ImpliedVolStatusBar';
import { ImpliedVolSurfaceChart } from '@/components/dashboards/ImpliedVolSurfaceChart';
import { ImpliedVolTermChart } from '@/components/dashboards/ImpliedVolTermChart';
import { ImpliedVolToolbar } from '@/components/dashboards/ImpliedVolToolbar';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';
import { cn } from '@/lib/utils';

interface ImpliedVolDashboardProps {
  initialSnapshot: ImpliedVolSnapshot;
  initialTab?: ImpliedVolTab;
}

type LoadState = 'idle' | 'loading' | 'error';

function ChartPanel({
  isLoading,
  hasData,
  loadingLabel,
  emptyLabel,
  children,
}: {
  isLoading: boolean;
  hasData: boolean;
  loadingLabel: string;
  emptyLabel: string;
  children: React.ReactNode;
}): React.JSX.Element {
  if (isLoading) {
    return (
      <div
        className="flex min-h-[280px] flex-1 items-center justify-center text-sm text-muted-foreground"
        data-testid="iv-loading"
      >
        {loadingLabel}
      </div>
    );
  }
  if (!hasData) {
    return (
      <div className="flex min-h-[280px] flex-1 items-center justify-center text-sm text-muted-foreground">
        {emptyLabel}
      </div>
    );
  }
  return (
    <div className={cn('flex h-full min-h-0 flex-1 flex-col', 'min-h-[280px]')}>{children}</div>
  );
}

export function ImpliedVolDashboard({
  initialSnapshot,
  initialTab = 'smile',
}: ImpliedVolDashboardProps): React.JSX.Element {
  const t = useTranslations('dashboards');

  const [snapshot, setSnapshot] = React.useState(initialSnapshot);
  const [selectedExpiry, setSelectedExpiry] = React.useState(
    initialSnapshot.slices[0]?.expiry ?? ''
  );
  const [activeTab, setActiveTab] = React.useState<ImpliedVolTab>(initialTab);
  const [loadState, setLoadState] = React.useState<LoadState>('idle');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const selectedSlice = React.useMemo(
    () => snapshot.slices.find((s) => s.expiry === selectedExpiry) ?? snapshot.slices[0],
    [snapshot.slices, selectedExpiry]
  );

  const handleRefresh = async () => {
    setLoadState('loading');
    setErrorMessage(null);
    try {
      const res = await fetch(
        `/api/dashboards/implied-vol?symbol=${encodeURIComponent(snapshot.metadata.symbol)}`
      );
      if (!res.ok) throw new Error(t('impliedVol.errors.loadFailed'));
      const data = (await res.json()) as ImpliedVolSnapshot;
      setSnapshot(data);
      if (!data.slices.some((s) => s.expiry === selectedExpiry)) {
        setSelectedExpiry(data.slices[0]?.expiry ?? '');
      }
      setLoadState('idle');
    } catch (err) {
      setLoadState('error');
      setErrorMessage(err instanceof Error ? err.message : t('impliedVol.errors.loadFailed'));
    }
  };

  const handleHeatmapCellClick = (expiry: string) => {
    setSelectedExpiry(expiry);
    setActiveTab('smile');
  };

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

  const smileTitle = selectedSlice
    ? t('impliedVol.smile.title', {
        expiry: selectedSlice.expiry,
        days: String(selectedSlice.daysToExpiry),
      })
    : t('impliedVol.tabs.smile');


  const statusBar = (
    <ImpliedVolStatusBar
      metadata={snapshot.metadata}
      onRefresh={handleRefresh}
      isLoading={loadState === 'loading'}
    />
  );

  const toolbar = (
    <ImpliedVolToolbar
      snapshot={snapshot}
      selectedExpiry={selectedExpiry}
      onExpiryChange={setSelectedExpiry}
    />
  );

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      {loadState === 'error' && errorMessage && (
        <div className="absolute inset-x-0 top-0 z-40 px-4 pt-2">
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <strong>{t('impliedVol.errors.title')}</strong> {errorMessage}
          </div>
        </div>
      )}

      <ImpliedVolDashboardShell
        statusBar={statusBar}
        toolbar={toolbar}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        overview={
          <ImpliedVolOverviewPanel
            snapshot={snapshot}
            selectedSlice={selectedSlice}
            onTabChange={setActiveTab}
          />
        }
        smile={
          <DashboardPanel
            title={smileTitle}
            actions={
              <ImpliedVolInfoIcon
                content={t('impliedVol.tooltips.moneyness')}
                label={t('impliedVol.tooltips.moneyness')}
              />
            }
            className="h-full"
            bodyClassName="flex min-h-0 flex-1 flex-col p-2"
          >
            <ChartPanel
              isLoading={loadState === 'loading'}
              hasData={Boolean(selectedSlice)}
              loadingLabel={t('impliedVol.loading')}
              emptyLabel={t('impliedVol.errors.noData')}
            >
              {selectedSlice && (
                <ImpliedVolSmileChart slice={selectedSlice} labels={chartLabels} />
              )}
            </ChartPanel>
          </DashboardPanel>
        }
        term={
          <DashboardPanel
            title={t('impliedVol.term.title')}
            actions={
              <ImpliedVolInfoIcon
                content={t('impliedVol.tooltips.termStructure')}
                label={t('impliedVol.tooltips.termStructure')}
              />
            }
            className="h-full"
            bodyClassName="flex min-h-0 flex-1 flex-col p-2"
          >
            <ChartPanel
              isLoading={loadState === 'loading'}
              hasData={snapshot.slices.length > 0}
              loadingLabel={t('impliedVol.loading')}
              emptyLabel={t('impliedVol.errors.noData')}
            >
              <ImpliedVolTermChart snapshot={snapshot} labels={termLabels} />
            </ChartPanel>
          </DashboardPanel>
        }
        surface={
          <DashboardPanel
            title={t('impliedVol.tabs.surface')}
            actions={
              <ImpliedVolInfoIcon
                content={t('impliedVol.tooltips.surface3d')}
                label={t('impliedVol.tooltips.surface3d')}
              />
            }
            className="h-full"
            bodyClassName="relative flex min-h-0 flex-1 flex-col p-2"
          >
            <ChartPanel
              isLoading={loadState === 'loading'}
              hasData={snapshot.slices.length > 0}
              loadingLabel={t('impliedVol.loading')}
              emptyLabel={t('impliedVol.errors.noData')}
            >
              <ImpliedVolSurfaceChart
                snapshot={snapshot}
                labels={surfaceLabels}
                onExpirySelect={handleHeatmapCellClick}
              />
            </ChartPanel>
          </DashboardPanel>
        }
        chain={
          <ChartPanel
            isLoading={loadState === 'loading'}
            hasData={Boolean(selectedSlice)}
            loadingLabel={t('impliedVol.loading')}
            emptyLabel={t('impliedVol.errors.noData')}
          >
            {selectedSlice && (
              <ImpliedVolChainPanel
                slice={selectedSlice}
                symbol={snapshot.metadata.symbol}
                className="h-full"
              />
            )}
          </ChartPanel>
        }
        about={<ImpliedVolAboutPanel />}
      />
    </div>
  );
}
