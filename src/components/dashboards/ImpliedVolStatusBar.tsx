'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ImpliedVolInfoIcon } from '@/components/dashboards/ImpliedVolInfoIcon';
import type { ImpliedVolSnapshotMetadata } from '@/types/dashboards/implied-vol';

interface ImpliedVolStatusBarProps {
  metadata: ImpliedVolSnapshotMetadata;
  onRefresh: () => void;
  isLoading: boolean;
}

export function ImpliedVolStatusBar({
  metadata,
  onRefresh,
  isLoading,
}: ImpliedVolStatusBarProps): React.JSX.Element {
  const t = useTranslations('dashboards');

  return (
    <div
      className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b bg-muted/30 px-3 py-2 sm:px-4"
      data-testid="iv-status-bar"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
        <span className="font-semibold tabular-nums">{metadata.symbol}</span>
        <span className="text-muted-foreground">
          {t('impliedVol.status.spot')}{' '}
          <span className="font-medium tabular-nums text-foreground">
            {metadata.spot.toFixed(2)}
          </span>
        </span>
        <span className="text-muted-foreground">
          {t('impliedVol.status.snapshot')}{' '}
          <span className="font-medium tabular-nums text-foreground">{metadata.asOf}</span>
        </span>
        <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-normal">
          {t('impliedVol.status.delayed')}
        </Badge>
      </div>

      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={onRefresh}
          disabled={isLoading}
          aria-label={t('impliedVol.toolbar.refresh')}
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{t('impliedVol.toolbar.refresh')}</span>
        </Button>
        <ImpliedVolInfoIcon
          content={t('impliedVol.tooltips.refresh')}
          label={t('impliedVol.tooltips.refresh')}
        />
      </div>
    </div>
  );
}
