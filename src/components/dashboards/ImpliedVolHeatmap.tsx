'use client';

import * as React from 'react';
import { ivHeatmapColor } from '@/lib/dashboards/chart-theme';
import { buildSurfaceGrid } from '@/lib/dashboards/surface-grid';
import { cn } from '@/lib/utils';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

interface HeatmapPoint {
  moneyness: number;
  daysToExpiry: number;
  iv: number;
  expiry: string;
}

interface ImpliedVolHeatmapProps {
  snapshot: ImpliedVolSnapshot;
  labels: {
    moneyness: string;
    daysToExpiry: string;
    iv: string;
  };
  compact?: boolean;
  ivRange?: { min: number; max: number };
  selectedDte?: number;
  selectedMoneyness?: number | null;
  onCellClick?: (expiry: string) => void;
}

const MONEYNESS_HIGHLIGHT_TOLERANCE = 0.03;

export function ImpliedVolHeatmap({
  snapshot,
  labels,
  compact = false,
  ivRange: ivRangeProp,
  selectedDte,
  selectedMoneyness,
  onCellClick,
}: ImpliedVolHeatmapProps): React.JSX.Element {
  const [hover, setHover] = React.useState<HeatmapPoint | null>(null);

  const grid = React.useMemo(() => buildSurfaceGrid(snapshot), [snapshot]);
  const { heatmapRows: gridRows, ivRange: gridIvRange, moneynessAxis } = grid;
  const ivRange = ivRangeProp ?? gridIvRange;

  const dteValues = React.useMemo(() => gridRows.map((row) => row.dte), [gridRows]);

  const moneynessRange = React.useMemo(() => {
    if (!moneynessAxis.length) return { min: 0, max: 1 };
    return { min: moneynessAxis[0], max: moneynessAxis[moneynessAxis.length - 1] };
  }, [moneynessAxis]);

  const legendSteps = 5;
  const legendColors = Array.from({ length: legendSteps }, (_, i) => {
    const tVal = i / (legendSteps - 1);
    const iv = ivRange.min + tVal * (ivRange.max - ivRange.min);
    return { iv, color: ivHeatmapColor(tVal) };
  }).reverse();

  const moneynessTicks = [moneynessRange.min, 1, moneynessRange.max].filter(
    (v, i, arr) => arr.indexOf(v) === i
  );

  const cellH = compact ? 'h-2.5' : 'h-5';
  const legendW = compact ? 'w-2' : 'w-3';

  const colorT = (iv: number) => {
    if (ivRange.max <= ivRange.min) return 0.5;
    return (iv - ivRange.min) / (ivRange.max - ivRange.min);
  };

  const isMoneynessHighlighted = (m: number) =>
    selectedMoneyness != null && Math.abs(m - selectedMoneyness) <= MONEYNESS_HIGHLIGHT_TOLERANCE;

  return (
    <div
      className={cn(
        'relative flex gap-3',
        compact ? 'h-full max-h-[140px] shrink-0 flex-col' : 'min-h-0 flex-1 flex-row'
      )}
      data-testid="iv-heatmap"
    >
      <div className={cn('flex min-w-0 flex-col', compact ? 'h-full flex-1' : 'min-h-0 flex-1')}>
        <div className={cn('flex gap-1', compact ? 'h-full flex-1' : 'min-h-0 flex-1')}>
          <div className="flex shrink-0 flex-col justify-around text-[10px] tabular-nums text-muted-foreground">
            {dteValues.map((dte) => (
              <span
                key={dte}
                className={cn(
                  'leading-none',
                  cellH,
                  selectedDte === dte && 'font-semibold text-primary'
                )}
              >
                {dte}d
              </span>
            ))}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-px">
            {gridRows.map(({ dte, cells }) => {
              const rowSelected = selectedDte === dte;
              return (
                <div
                  key={dte}
                  className={cn('flex gap-px', cellH, rowSelected && 'ring-1 ring-primary/40')}
                >
                  {cells.map((cell, idx) => {
                    const tVal = colorT(cell.iv);
                    const mHighlighted = isMoneynessHighlighted(cell.moneyness);
                    return (
                      <button
                        key={`${dte}-${idx}`}
                        type="button"
                        className={cn(
                          'min-w-0 flex-1 rounded-[1px] border-0 p-0 transition-opacity hover:opacity-80',
                          onCellClick && 'cursor-pointer',
                          mHighlighted && 'ring-1 ring-inset ring-primary/70',
                          rowSelected && 'opacity-100'
                        )}
                        style={{ backgroundColor: ivHeatmapColor(tVal) }}
                        onMouseEnter={() => setHover(cell)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => onCellClick?.(cell.expiry)}
                        aria-label={`${labels.iv} ${(cell.iv * 100).toFixed(1)}%`}
                        data-selected-dte={rowSelected ? 'true' : undefined}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-1 flex justify-between pl-8 text-[10px] tabular-nums text-muted-foreground">
          {moneynessTicks.map((m) => (
            <span key={m}>{m.toFixed(2)}</span>
          ))}
        </div>
        <p className="mt-0.5 pl-8 text-[10px] text-muted-foreground">{labels.moneyness} →</p>
      </div>

      <div className={cn('flex shrink-0 gap-2', compact ? 'flex-row items-center' : 'flex-col')}>
        <div className="flex flex-col gap-0.5">
          {legendColors.map(({ iv, color }) => (
            <div key={iv} className="flex items-center gap-1.5">
              <div
                className={cn('rounded-sm', legendW, compact ? 'h-2.5' : 'h-4')}
                style={{ backgroundColor: color }}
              />
              <span className="text-[10px] tabular-nums text-muted-foreground">
                {(iv * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {hover && !compact && (
        <div className="pointer-events-none absolute bottom-2 left-2 rounded-md border bg-popover px-2 py-1 text-[11px] shadow-sm">
          <p className="font-medium">{hover.expiry}</p>
          <p>
            {labels.moneyness}: {hover.moneyness.toFixed(3)}
          </p>
          <p>
            {labels.daysToExpiry}: {hover.daysToExpiry}
          </p>
          <p>
            {labels.iv}: {(hover.iv * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}
