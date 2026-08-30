'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { RefreshCw, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImpliedVolInfoIcon } from '@/components/dashboards/ImpliedVolInfoIcon';
import { formatRelativeTime } from '@/lib/dashboards/iv-metrics';
import type { SupportedIvSymbol } from '@/lib/dashboards/implied-vol';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

interface ImpliedVolToolbarProps {
  snapshot: ImpliedVolSnapshot;
  supportedSymbols: SupportedIvSymbol[];
  selectedExpiry: string;
  onExpiryChange: (expiry: string) => void;
  onSymbolChange: (symbol: SupportedIvSymbol) => void;
  onRefresh: () => void;
  isLoading: boolean;
  isFocused: boolean;
  onToggleFocus: () => void;
  lastRefreshedAt: string;
  locale: string;
}

export function ImpliedVolToolbar({
  snapshot,
  supportedSymbols,
  selectedExpiry,
  onExpiryChange,
  onSymbolChange,
  onRefresh,
  isLoading,
  isFocused,
  onToggleFocus,
  lastRefreshedAt,
  locale,
}: ImpliedVolToolbarProps): React.JSX.Element {
  const t = useTranslations('dashboards');
  const relativeRefresh = formatRelativeTime(lastRefreshedAt, locale);

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground">{t('impliedVol.toolbar.symbol')}</span>
        <Select
          value={snapshot.metadata.symbol}
          onValueChange={(v) => onSymbolChange(v as SupportedIvSymbol)}
          disabled={isLoading || supportedSymbols.length <= 1}
        >
          <SelectTrigger className="h-8 w-[88px] text-xs" data-testid="iv-symbol-select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {supportedSymbols.map((sym) => (
              <SelectItem key={sym} value={sym}>
                {sym}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground">{t('impliedVol.toolbar.expiry')}</span>
        <Select value={selectedExpiry} onValueChange={onExpiryChange}>
          <SelectTrigger className="h-8 w-[160px] text-xs" data-testid="iv-expiry-select">
            <SelectValue placeholder={t('impliedVol.toolbar.expiry')} />
          </SelectTrigger>
          <SelectContent>
            {snapshot.slices.map((slice) => (
              <SelectItem key={slice.expiry} value={slice.expiry}>
                {slice.expiry} ({slice.daysToExpiry}d)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ImpliedVolInfoIcon
          content={t('impliedVol.tooltips.expiry')}
          label={t('impliedVol.tooltips.expiry')}
        />
      </div>

      <span
        className="hidden text-[10px] text-muted-foreground tabular-nums sm:inline"
        title={lastRefreshedAt}
        data-testid="iv-last-refresh"
      >
        {t('impliedVol.status.lastRefresh', { time: relativeRefresh })}
      </span>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onRefresh}
        disabled={isLoading}
        aria-label={t('impliedVol.toolbar.refresh')}
        title={t('impliedVol.toolbar.refresh')}
        data-testid="iv-refresh-button"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onToggleFocus}
        aria-pressed={isFocused}
        aria-label={
          isFocused ? t('impliedVol.toolbar.exitFocus') : t('impliedVol.toolbar.enterFocus')
        }
        title={isFocused ? t('impliedVol.toolbar.exitFocus') : t('impliedVol.toolbar.enterFocus')}
        data-testid="iv-focus-toggle"
      >
        {isFocused ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
      </Button>
    </div>
  );
}
