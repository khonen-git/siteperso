'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import type { ImpliedVolSnapshotMetadata } from '@/types/dashboards/implied-vol';

interface ImpliedVolStatusBarProps {
  metadata: ImpliedVolSnapshotMetadata;
}

export function ImpliedVolStatusBar({
  metadata,
}: ImpliedVolStatusBarProps): React.JSX.Element {
  const t = useTranslations('dashboards');
  const snapshotLabel = `${t('impliedVol.status.snapshot')} ${metadata.asOf}`;

  return (
    <div
      className="flex min-w-0 shrink-0 items-center gap-2 text-xs tabular-nums"
      data-testid="iv-status-bar"
    >
      <span className="font-semibold">{metadata.symbol}</span>
      <span className="text-muted-foreground">
        {t('impliedVol.status.spot')}{' '}
        <span className="font-medium text-foreground">{metadata.spot.toFixed(2)}</span>
      </span>
      <Badge
        variant="secondary"
        className="h-5 px-1.5 text-[10px] font-normal"
        title={snapshotLabel}
      >
        {t('impliedVol.status.delayed')}
      </Badge>
    </div>
  );
}
