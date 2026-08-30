'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  onRefresh: () => void;
  isLoading: boolean;
}

export function ImpliedVolToolbar({
  snapshot,
  selectedExpiry,
  onExpiryChange,
  onRefresh,
  isLoading,
}: ImpliedVolToolbarProps): React.JSX.Element {
  const t = useTranslations('dashboards');

  return (
    <div className="flex flex-wrap items-center gap-1.5">
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
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onRefresh}
        disabled={isLoading}
        aria-label={t('impliedVol.toolbar.refresh')}
        title={t('impliedVol.toolbar.refresh')}
      >
        <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
      </Button>
      <ImpliedVolInfoIcon
        content={t('impliedVol.tooltips.refresh')}
        label={t('impliedVol.tooltips.refresh')}
      />
    </div>
  );
}
