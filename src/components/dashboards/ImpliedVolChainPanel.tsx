'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { isAtmMoneyness } from '@/lib/dashboards/iv-metrics';
import { cn } from '@/lib/utils';
import type { IvPoint, IvSlice } from '@/types/dashboards/implied-vol';

const MONEYNESS_HIGHLIGHT_TOLERANCE = 0.015;

type SortKey = 'strike' | 'moneyness' | 'iv';
type SortDir = 'asc' | 'desc';
type OtmFilter = 'all' | 'otmCall' | 'otmPut';

interface ImpliedVolChainPanelProps {
  slice: IvSlice;
  symbol: string;
  selectedMoneyness?: number | null;
  onMoneynessSelect?: (moneyness: number) => void;
  className?: string;
}

function noteForMoneyness(moneyness: number, t: (key: string) => string): string {
  if (isAtmMoneyness(moneyness)) return t('impliedVol.chain.atmNote');
  if (moneyness > 1) return t('impliedVol.chain.otmCall');
  return t('impliedVol.chain.otmPut');
}

function sortRows(rows: IvPoint[], key: SortKey, dir: SortDir): IvPoint[] {
  const mult = dir === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => (a[key] - b[key]) * mult);
}

function filterRows(rows: IvPoint[], filter: OtmFilter): IvPoint[] {
  if (filter === 'all') return rows;
  if (filter === 'otmCall')
    return rows.filter((r) => r.moneyness > 1 && !isAtmMoneyness(r.moneyness));
  return rows.filter((r) => r.moneyness < 1 && !isAtmMoneyness(r.moneyness));
}

export function ImpliedVolChainPanel({
  slice,
  symbol,
  selectedMoneyness,
  onMoneynessSelect,
  className,
}: ImpliedVolChainPanelProps): React.JSX.Element {
  const t = useTranslations('dashboards');
  const [sortKey, setSortKey] = React.useState<SortKey>('strike');
  const [sortDir, setSortDir] = React.useState<SortDir>('asc');
  const [otmFilter, setOtmFilter] = React.useState<OtmFilter>('all');
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const atmRowRef = React.useRef<HTMLTableRowElement>(null);

  const rows = React.useMemo(
    () => sortRows(filterRows(slice.ivPoints, otmFilter), sortKey, sortDir),
    [slice.ivPoints, sortKey, sortDir, otmFilter]
  );

  const title = t('impliedVol.chain.title', {
    symbol,
    expiry: slice.expiry,
    days: slice.daysToExpiry,
  });

  React.useEffect(() => {
    atmRowRef.current?.scrollIntoView?.({ block: 'center', behavior: 'smooth' });
  }, [slice.expiry, otmFilter]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'strike' ? 'asc' : 'asc');
    }
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return null;
    return sortDir === 'asc' ? (
      <ArrowUp className="ml-0.5 inline h-3 w-3" aria-hidden />
    ) : (
      <ArrowDown className="ml-0.5 inline h-3 w-3" aria-hidden />
    );
  };

  if (slice.ivPoints.length === 0) {
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
      <div className="flex shrink-0 flex-wrap gap-1 border-b px-2 py-1.5">
        {(['all', 'otmCall', 'otmPut'] as const).map((f) => (
          <Button
            key={f}
            type="button"
            variant={otmFilter === f ? 'secondary' : 'ghost'}
            size="sm"
            className="h-7 text-xs"
            onClick={() => setOtmFilter(f)}
            data-testid={`iv-chain-filter-${f}`}
          >
            {t(
              `impliedVol.chain.filter${f === 'all' ? 'All' : f === 'otmCall' ? 'OtmCalls' : 'OtmPuts'}`
            )}
          </Button>
        ))}
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-card">
            <TableRow>
              <TableHead className="text-xs">
                <button
                  type="button"
                  className="inline-flex items-center font-medium hover:text-foreground"
                  onClick={() => toggleSort('strike')}
                  aria-label={`${t('impliedVol.chain.strike')} ${sortDir === 'asc' ? t('impliedVol.chain.sortAsc') : t('impliedVol.chain.sortDesc')}`}
                >
                  {t('impliedVol.chain.strike')}
                  <SortIcon column="strike" />
                </button>
              </TableHead>
              <TableHead className="text-xs">
                <button
                  type="button"
                  className="inline-flex items-center font-medium hover:text-foreground"
                  onClick={() => toggleSort('moneyness')}
                >
                  {t('impliedVol.chain.moneyness')}
                  <SortIcon column="moneyness" />
                </button>
              </TableHead>
              <TableHead className="text-xs">
                <button
                  type="button"
                  className="inline-flex items-center font-medium hover:text-foreground"
                  onClick={() => toggleSort('iv')}
                >
                  {t('impliedVol.chain.iv')}
                  <SortIcon column="iv" />
                </button>
              </TableHead>
              <TableHead className="hidden text-xs sm:table-cell">
                {t('impliedVol.chain.note')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const atm = isAtmMoneyness(row.moneyness);
              const moneynessHighlighted =
                selectedMoneyness != null &&
                Math.abs(row.moneyness - selectedMoneyness) <= MONEYNESS_HIGHLIGHT_TOLERANCE;
              return (
                <TableRow
                  key={row.strike}
                  ref={atm ? atmRowRef : undefined}
                  className={cn(
                    atm && 'bg-primary/10 hover:bg-primary/15',
                    moneynessHighlighted && !atm && 'bg-primary/5',
                    onMoneynessSelect && 'cursor-pointer'
                  )}
                  data-testid={atm ? 'iv-chain-atm-row' : undefined}
                  onClick={() => onMoneynessSelect?.(row.moneyness)}
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
