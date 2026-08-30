'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImpliedVolInfoIcon } from '@/components/dashboards/ImpliedVolInfoIcon';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

interface ImpliedVolToolbarProps {
  snapshot: ImpliedVolSnapshot;
  selectedExpiry: string;
  onExpiryChange: (expiry: string) => void;
}

export function ImpliedVolToolbar({
  snapshot,
  selectedExpiry,
  onExpiryChange,
}: ImpliedVolToolbarProps): React.JSX.Element {
  const t = useTranslations('dashboards');

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground">{t('impliedVol.toolbar.expiry')}</span>
        <Select value={selectedExpiry} onValueChange={onExpiryChange}>
          <SelectTrigger className="h-8 w-[160px] text-xs">
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
    </div>
  );
}
