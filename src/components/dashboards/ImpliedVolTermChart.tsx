'use client';

import * as React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  chartAxisStyle,
  chartColors,
  chartCursorStyle,
  chartGridProps,
  chartMargins,
  formatIvPercent,
} from '@/lib/dashboards/chart-theme';
import { cn } from '@/lib/utils';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

interface TermLabels {
  daysToExpiry: string;
  iv: string;
  atmIv: string;
}

interface TermPoint {
  daysToExpiry: number;
  expiry: string;
  atmIv: number;
}

interface ImpliedVolTermChartProps {
  snapshot: ImpliedVolSnapshot;
  labels: TermLabels;
  compact?: boolean;
  fill?: boolean;
  ivYDomain?: { min: number; max: number };
  selectedExpiry?: string;
  onPointClick?: (expiry: string) => void;
}

function atmPoint(slice: ImpliedVolSnapshot['slices'][0]): TermPoint {
  const sorted = [...slice.ivPoints].sort(
    (a, b) => Math.abs(a.moneyness - 1) - Math.abs(b.moneyness - 1)
  );
  return {
    daysToExpiry: slice.daysToExpiry,
    expiry: slice.expiry,
    atmIv: sorted[0]?.iv ?? 0,
  };
}

function TermTooltip({
  active,
  payload,
  labels,
  selectedExpiry,
}: {
  active?: boolean;
  payload?: { payload: TermPoint }[];
  labels: TermLabels;
  selectedExpiry?: string;
}) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  const isSelected = selectedExpiry === p.expiry;
  return (
    <div className="rounded-md border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-medium">
        {p.expiry}
        {isSelected && <span className="ml-1 text-primary">●</span>}
      </p>
      <p className="text-muted-foreground">
        {labels.daysToExpiry}: <span className="text-foreground">{p.daysToExpiry}d</span>
      </p>
      <p>
        {labels.atmIv}:{' '}
        <span className="font-medium tabular-nums">{formatIvPercent(p.atmIv, 2)}</span>
      </p>
    </div>
  );
}

function TermDot({
  cx,
  cy,
  payload,
  selectedExpiry,
  onPointClick,
  compact,
}: {
  cx?: number;
  cy?: number;
  payload?: TermPoint;
  selectedExpiry?: string;
  onPointClick?: (expiry: string) => void;
  compact?: boolean;
}) {
  if (cx == null || cy == null || !payload) return null;
  const selected = selectedExpiry === payload.expiry;
  const r = compact ? 3 : selected ? 6 : 4;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={chartColors.primary}
      fillOpacity={selected ? 1 : 0.85}
      stroke={selected ? 'hsl(var(--background))' : 'none'}
      strokeWidth={selected ? 2 : 0}
      style={{ cursor: onPointClick ? 'pointer' : undefined }}
      onClick={() => onPointClick?.(payload.expiry)}
    />
  );
}

export function ImpliedVolTermChart({
  snapshot,
  labels,
  compact = false,
  fill = false,
  ivYDomain,
  selectedExpiry,
  onPointClick,
}: ImpliedVolTermChartProps): React.JSX.Element {
  const data = React.useMemo(
    () => [...snapshot.slices].map(atmPoint).sort((a, b) => a.daysToExpiry - b.daysToExpiry),
    [snapshot.slices]
  );

  const yDomain: [number | string, number | string] = ivYDomain
    ? [ivYDomain.min, ivYDomain.max]
    : ['auto', 'auto'];

  return (
    <div
      className={cn(
        fill && 'min-h-[80px] h-full w-full min-w-0 flex-1',
        !fill && (compact ? 'h-[140px] w-full shrink-0' : 'h-full min-h-[280px] w-full flex-1')
      )}
      data-testid="iv-term-chart"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={compact ? chartMargins.compact : chartMargins.default}>
          <CartesianGrid {...chartGridProps} />
          <XAxis
            dataKey="daysToExpiry"
            tickFormatter={(v: number) => `${v}d`}
            tick={chartAxisStyle}
            hide={compact}
          />
          <YAxis
            domain={yDomain}
            tickFormatter={(v: number) => formatIvPercent(v)}
            tick={chartAxisStyle}
            width={compact ? 36 : 48}
          />
          <Tooltip
            cursor={chartCursorStyle}
            content={<TermTooltip labels={labels} selectedExpiry={selectedExpiry} />}
          />
          {!compact && <Legend wrapperStyle={{ fontSize: 11 }} />}
          <Line
            type="monotone"
            dataKey="atmIv"
            name={labels.atmIv}
            stroke={chartColors.primary}
            dot={
              <TermDot
                selectedExpiry={selectedExpiry}
                onPointClick={onPointClick}
                compact={compact}
              />
            }
            activeDot={{ r: compact ? 4 : 6 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
