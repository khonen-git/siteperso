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
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1">
        <Select value="SPY" disabled>
          <SelectTrigger className="h-8 w-[88px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SPY">SPY</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1">
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

      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 gap-1 text-xs"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          {t('impliedVol.toolbar.refresh')}
        </Button>
        <ImpliedVolInfoIcon
          content={t('impliedVol.tooltips.refresh')}
          label={t('impliedVol.tooltips.refresh')}
        />
      </div>
    </div>
  );
}
