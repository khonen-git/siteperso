'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
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
import { useDashboardFocusMode } from '@/components/dashboards/useDashboardFocusMode';
import { computeSnapshotIvRange } from '@/lib/dashboards/iv-metrics';
import { getSupportedIvSymbols, type SupportedIvSymbol } from '@/lib/dashboards/implied-vol';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';
import { cn } from '@/lib/utils';

interface ImpliedVolDashboardProps {
  initialSnapshot: ImpliedVolSnapshot;
  initialTab?: ImpliedVolTab;
}

type LoadState = 'idle' | 'loading' | 'error';

const VALID_TABS: ImpliedVolTab[] = ['overview', 'smile', 'term', 'surface', 'chain', 'about'];

function parseTab(value: string | null): ImpliedVolTab | null {
  if (value && VALID_TABS.includes(value as ImpliedVolTab)) {
    return value as ImpliedVolTab;
  }
  return null;
}

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
  initialTab = 'overview',
}: ImpliedVolDashboardProps): React.JSX.Element {
  const t = useTranslations('dashboards');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [snapshot, setSnapshot] = React.useState(initialSnapshot);
  const [selectedExpiry, setSelectedExpiry] = React.useState(() =>
    searchParams.get('expiry') &&
    initialSnapshot.slices.some((s) => s.expiry === searchParams.get('expiry'))
      ? (searchParams.get('expiry') as string)
      : (initialSnapshot.slices[0]?.expiry ?? '')
  );
  const [selectedMoneyness, setSelectedMoneyness] = React.useState<number | null>(null);
  const [activeTab, setActiveTab] = React.useState<ImpliedVolTab>(
    () => parseTab(searchParams.get('tab')) ?? initialTab
  );
  const [loadState, setLoadState] = React.useState<LoadState>('idle');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [refreshSuccess, setRefreshSuccess] = React.useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = React.useState<string>(
    () => initialSnapshot.metadata.fetchedAt ?? new Date().toISOString()
  );
  const { isFocused, toggle: toggleFocus } = useDashboardFocusMode();

  const ivYDomain = React.useMemo(() => computeSnapshotIvRange(snapshot), [snapshot]);

  const selectedSlice = React.useMemo(
    () => snapshot.slices.find((s) => s.expiry === selectedExpiry) ?? snapshot.slices[0],
    [snapshot.slices, selectedExpiry]
  );

  const selectedDte = selectedSlice?.daysToExpiry;

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', activeTab);
    if (selectedExpiry) params.set('expiry', selectedExpiry);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync URL when tab/expiry change only
  }, [activeTab, selectedExpiry]);

  React.useEffect(() => {
    if (!refreshSuccess) return;
    const timer = window.setTimeout(() => setRefreshSuccess(false), 3500);
    return () => window.clearTimeout(timer);
  }, [refreshSuccess]);

  const fetchSnapshot = React.useCallback(
    async (symbol: SupportedIvSymbol, options?: { refresh?: boolean }) => {
      setLoadState('loading');
      setErrorMessage(null);
      try {
        const url = `/api/dashboards/implied-vol?symbol=${encodeURIComponent(symbol)}`;
        const res = await fetch(url, { method: options?.refresh ? 'POST' : 'GET' });
        if (!res.ok) throw new Error(t('impliedVol.errors.loadFailed'));
        const data = (await res.json()) as ImpliedVolSnapshot;
        setSnapshot(data);
        setLastRefreshedAt(data.metadata.fetchedAt ?? new Date().toISOString());
        setSelectedExpiry((prev) =>
          data.slices.some((s) => s.expiry === prev) ? prev : (data.slices[0]?.expiry ?? '')
        );
        setLoadState('idle');
        if (options?.refresh) setRefreshSuccess(true);
      } catch (err) {
        setLoadState('error');
        setErrorMessage(err instanceof Error ? err.message : t('impliedVol.errors.loadFailed'));
      }
    },
    [t]
  );

  const handleRefresh = () => {
    void fetchSnapshot(snapshot.metadata.symbol as SupportedIvSymbol, { refresh: true });
  };

  const handleSymbolChange = (symbol: SupportedIvSymbol) => {
    if (symbol === snapshot.metadata.symbol) return;
    void fetchSnapshot(symbol);
  };

  const handleExpirySelect = (expiry: string) => {
    setSelectedExpiry(expiry);
    setSelectedMoneyness(null);
  };

  const handleHeatmapCellClick = (expiry: string) => {
    handleExpirySelect(expiry);
    setActiveTab('smile');
  };

  const handleTermPointClick = (expiry: string) => {
    handleExpirySelect(expiry);
  };

  const handleMoneynessSelect = (moneyness: number) => {
    setSelectedMoneyness(moneyness);
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
      lastRefreshedAt={lastRefreshedAt}
      locale={locale}
    />
  );

  const toolbar = (
    <ImpliedVolToolbar
      snapshot={snapshot}
      supportedSymbols={[...getSupportedIvSymbols()]}
      selectedExpiry={selectedExpiry}
      onExpiryChange={handleExpirySelect}
      onSymbolChange={handleSymbolChange}
      onRefresh={handleRefresh}
      isLoading={loadState === 'loading'}
      isFocused={isFocused}
      onToggleFocus={toggleFocus}
      lastRefreshedAt={lastRefreshedAt}
      locale={locale}
    />
  );

  return (
    <div
      className={cn(
        'relative flex h-full min-h-0 flex-col',
        isFocused && 'fixed inset-0 z-[100] bg-background'
      )}
      data-testid="iv-dashboard-root"
      data-focused={isFocused ? 'true' : 'false'}
    >
      {refreshSuccess && (
        <div
          className="absolute inset-x-0 top-0 z-40 px-4 pt-2"
          role="status"
          data-testid="iv-refresh-success"
        >
          <div className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
            {t('impliedVol.toolbar.refreshSuccess')}
          </div>
        </div>
      )}

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
        isFocused={isFocused}
        overview={
          <ImpliedVolOverviewPanel
            snapshot={snapshot}
            selectedSlice={selectedSlice}
            selectedExpiry={selectedExpiry}
            selectedDte={selectedDte}
            selectedMoneyness={selectedMoneyness}
            ivYDomain={ivYDomain}
            onTabChange={setActiveTab}
            onExpirySelect={handleHeatmapCellClick}
            onTermPointClick={handleTermPointClick}
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
                <ImpliedVolSmileChart
                  slice={selectedSlice}
                  labels={chartLabels}
                  ivYDomain={ivYDomain}
                  selectedMoneyness={selectedMoneyness}
                  onPointClick={handleMoneynessSelect}
                />
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
              <ImpliedVolTermChart
                snapshot={snapshot}
                labels={termLabels}
                ivYDomain={ivYDomain}
                selectedExpiry={selectedExpiry}
                onPointClick={handleTermPointClick}
              />
            </ChartPanel>
          </DashboardPanel>
        }
        surface={
          activeTab === 'surface' ? (
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
                  ivRange={ivYDomain}
                  selectedExpiry={selectedExpiry}
                  selectedDte={selectedDte}
                  selectedMoneyness={selectedMoneyness}
                  onExpirySelect={handleHeatmapCellClick}
                  mount3d
                />
              </ChartPanel>
            </DashboardPanel>
          ) : null
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
                selectedMoneyness={selectedMoneyness}
                onMoneynessSelect={handleMoneynessSelect}
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
