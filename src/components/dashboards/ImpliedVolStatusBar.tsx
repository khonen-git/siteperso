'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { formatRelativeTime } from '@/lib/dashboards/iv-metrics';
import type { ImpliedVolSnapshotMetadata } from '@/types/dashboards/implied-vol';

interface ImpliedVolStatusBarProps {
  metadata: ImpliedVolSnapshotMetadata;
  lastRefreshedAt?: string;
  locale?: string;
}

export function ImpliedVolStatusBar({
  metadata,
  lastRefreshedAt,
  locale = 'en',
}: ImpliedVolStatusBarProps): React.JSX.Element {
  const t = useTranslations('dashboards');
  const fetchedIso = lastRefreshedAt ?? metadata.fetchedAt;
  const relativeTime = fetchedIso ? formatRelativeTime(fetchedIso, locale) : metadata.asOf;
  const snapshotLabel = `${t('impliedVol.status.snapshot')} ${metadata.asOf}`;

  return (
    <div
      className="flex min-w-0 shrink-0 items-center gap-2 text-xs tabular-nums"
      data-testid="iv-status-bar"
    >
      <span className="font-semibold">{metadata.symbol}</span>
      <span className="hidden text-muted-foreground sm:inline">
        {t('impliedVol.status.spot')}{' '}
        <span className="font-medium text-foreground">{metadata.spot.toFixed(2)}</span>
      </span>
      <Badge
        variant="secondary"
        className="h-5 max-w-[140px] truncate px-1.5 text-[10px] font-normal sm:max-w-none"
        title={`${snapshotLabel}${fetchedIso ? ` · ${fetchedIso}` : ''}`}
        data-testid="iv-status-fetched"
      >
        {fetchedIso
          ? t('impliedVol.status.fetchedAt', { time: relativeTime })
          : t('impliedVol.status.delayed')}
      </Badge>
    </div>
  );
}
