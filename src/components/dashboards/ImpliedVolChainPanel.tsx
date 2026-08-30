'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DashboardPanel } from '@/components/dashboards/DashboardPanel';
import { ImpliedVolInfoIcon } from '@/components/dashboards/ImpliedVolInfoIcon';
import { formatIvPercent } from '@/lib/dashboards/chart-theme';
import { cn } from '@/lib/utils';
import type { IvSlice } from '@/types/dashboards/implied-vol';

const ATM_TOLERANCE = 0.02;

interface ImpliedVolChainPanelProps {
  slice: IvSlice;
  symbol: string;
  className?: string;
}

function isAtm(moneyness: number): boolean {
  return Math.abs(moneyness - 1) <= ATM_TOLERANCE;
}

function noteForMoneyness(moneyness: number, t: (key: string) => string): string {
  if (isAtm(moneyness)) return t('impliedVol.chain.atmNote');
  if (moneyness > 1) return t('impliedVol.chain.otmCall');
  return t('impliedVol.chain.otmPut');
}

export function ImpliedVolChainPanel({
  slice,
  symbol,
  className,
}: ImpliedVolChainPanelProps): React.JSX.Element {
  const t = useTranslations('dashboards');
  const rows = [...slice.ivPoints].sort((a, b) => b.strike - a.strike);

  const title = t('impliedVol.chain.title', {
    symbol,
    expiry: slice.expiry,
    days: slice.daysToExpiry,
  });

  if (rows.length === 0) {
    return (
      <DashboardPanel
        title={title}
        className={cn('h-full', className)}
        actions={
          <ImpliedVolInfoIcon
            content={t('impliedVol.tooltips.chain')}
            label={t('impliedVol.tooltips.chain')}
          />
        }
      >
        <p className="py-8 text-center text-sm text-muted-foreground">
          {t('impliedVol.chain.empty')}
        </p>
      </DashboardPanel>
    );
  }

  return (
    <DashboardPanel
      title={title}
      data-testid="iv-chain-panel"
      className={cn('h-full', className)}
      actions={
        <ImpliedVolInfoIcon
          content={t('impliedVol.tooltips.chain')}
          label={t('impliedVol.tooltips.chain')}
        />
      }
      bodyClassName="flex min-h-0 flex-1 flex-col overflow-hidden p-0"
    >
      <div className="min-h-0 flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-card">
            <TableRow>
              <TableHead className="text-xs">{t('impliedVol.chain.strike')}</TableHead>
              <TableHead className="text-xs">{t('impliedVol.chain.moneyness')}</TableHead>
              <TableHead className="text-xs">{t('impliedVol.chain.iv')}</TableHead>
              <TableHead className="hidden text-xs sm:table-cell">
                {t('impliedVol.chain.note')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const atm = isAtm(row.moneyness);
              return (
                <TableRow
                  key={row.strike}
                  className={cn(atm && 'bg-primary/10 hover:bg-primary/15')}
                  data-testid={atm ? 'iv-chain-atm-row' : undefined}
                >
                  <TableCell className="py-1.5 text-xs tabular-nums font-medium">
                    {row.strike.toFixed(2)}
                  </TableCell>
                  <TableCell className="py-1.5 text-xs tabular-nums">
                    {row.moneyness.toFixed(3)}
                  </TableCell>
                  <TableCell className="py-1.5 text-xs tabular-nums">
                    {formatIvPercent(row.iv, 2)}
                  </TableCell>
                  <TableCell className="hidden py-1.5 text-xs text-muted-foreground sm:table-cell">
                    {noteForMoneyness(row.moneyness, t)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </DashboardPanel>
  );
}
