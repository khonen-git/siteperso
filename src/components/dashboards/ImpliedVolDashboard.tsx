'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { ImpliedVolAboutPanel } from '@/components/dashboards/ImpliedVolAboutPanel';
import { ImpliedVolDashboardShell } from '@/components/dashboards/ImpliedVolDashboardShell';
import { ImpliedVolInfoIcon } from '@/components/dashboards/ImpliedVolInfoIcon';
import { ImpliedVolOverviewPanel } from '@/components/dashboards/ImpliedVolOverviewPanel';
import { ImpliedVolSmileChart } from '@/components/dashboards/ImpliedVolSmileChart';
import { ImpliedVolSurfaceChart } from '@/components/dashboards/ImpliedVolSurfaceChart';
import { ImpliedVolTermChart } from '@/components/dashboards/ImpliedVolTermChart';
import { ImpliedVolToolbar } from '@/components/dashboards/ImpliedVolToolbar';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

interface ImpliedVolDashboardProps {
  initialSnapshot: ImpliedVolSnapshot;
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
        className="flex flex-1 items-center justify-center text-sm text-muted-foreground"
        data-testid="iv-loading"
      >
        {loadingLabel}
      </div>
    );
  }
  if (!hasData) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
        {emptyLabel}
      </div>
    );
  }
  return <div className="min-h-0 flex-1">{children}</div>;
}

export function ImpliedVolDashboard({
  initialSnapshot,
}: ImpliedVolDashboardProps): React.JSX.Element {
  const t = useTranslations('dashboards');

  const [snapshot, setSnapshot] = React.useState(initialSnapshot);
  const [selectedExpiry, setSelectedExpiry] = React.useState(
    initialSnapshot.slices[0]?.expiry ?? ''
  );
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

  const chartLabels = {
    moneyness: t('impliedVol.chart.moneyness'),
    strike: t('impliedVol.chart.strike'),
    iv: t('impliedVol.chart.iv'),
    atm: t('impliedVol.chart.atm'),
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

  const toolbar = (
    <ImpliedVolToolbar
      snapshot={snapshot}
      selectedExpiry={selectedExpiry}
      onExpiryChange={setSelectedExpiry}
      onRefresh={handleRefresh}
      isLoading={loadState === 'loading'}
    />
  );

  return (
    <>
      {loadState === 'error' && errorMessage && (
        <div className="absolute inset-x-0 top-0 z-40 px-4 pt-2">
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <strong>{t('impliedVol.errors.title')}</strong> {errorMessage}
          </div>
        </div>
      )}

      <ImpliedVolDashboardShell
        toolbar={toolbar}
        overview={<ImpliedVolOverviewPanel snapshot={snapshot} />}
        smile={
          <div className="flex h-full min-h-0 flex-col gap-2">
            <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
              <span>{t('impliedVol.chart.moneyness')}</span>
              <ImpliedVolInfoIcon
                content={t('impliedVol.tooltips.moneyness')}
                label={t('impliedVol.tooltips.moneyness')}
              />
            </div>
            <ChartPanel
              isLoading={loadState === 'loading'}
              hasData={Boolean(selectedSlice)}
              loadingLabel={t('impliedVol.loading')}
              emptyLabel={t('impliedVol.errors.noData')}
            >
              {selectedSlice && (
                <>
                  <ImpliedVolSmileChart slice={selectedSlice} labels={chartLabels} />
                  {selectedSlice.ssvi && (
                    <div className="mt-2 flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                      <span>
                        {t('impliedVol.ssviHint', {
                          rho: selectedSlice.ssvi.rho.toFixed(2),
                          eta: selectedSlice.ssvi.eta.toFixed(2),
                          sigma: selectedSlice.ssvi.sigma.toFixed(3),
                        })}
                      </span>
                      <ImpliedVolInfoIcon
                        content={t('impliedVol.tooltips.ssvi')}
                        label={t('impliedVol.tooltips.ssvi')}
                      />
                    </div>
                  )}
                </>
              )}
            </ChartPanel>
          </div>
        }
        term={
          <div className="flex h-full min-h-0 flex-col gap-2">
            <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
              <span>{t('impliedVol.term.title')}</span>
              <ImpliedVolInfoIcon
                content={t('impliedVol.tooltips.termStructure')}
                label={t('impliedVol.tooltips.termStructure')}
              />
            </div>
            <ChartPanel
              isLoading={loadState === 'loading'}
              hasData={snapshot.slices.length > 0}
              loadingLabel={t('impliedVol.loading')}
              emptyLabel={t('impliedVol.errors.noData')}
            >
              <ImpliedVolTermChart snapshot={snapshot} labels={termLabels} />
            </ChartPanel>
          </div>
        }
        surface={
          <ChartPanel
            isLoading={loadState === 'loading'}
            hasData={snapshot.slices.length > 0}
            loadingLabel={t('impliedVol.loading')}
            emptyLabel={t('impliedVol.errors.noData')}
          >
            <ImpliedVolSurfaceChart snapshot={snapshot} labels={surfaceLabels} />
          </ChartPanel>
        }
        about={<ImpliedVolAboutPanel />}
      />
    </>
  );
}
