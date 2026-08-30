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
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

interface TermLabels {
  daysToExpiry: string;
  iv: string;
  atmIv: string;
}

interface ImpliedVolTermChartProps {
  snapshot: ImpliedVolSnapshot;
  labels: TermLabels;
  compact?: boolean;
}

function atmPoint(slice: ImpliedVolSnapshot['slices'][0]) {
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
}: {
  active?: boolean;
  payload?: { payload: { expiry: string; daysToExpiry: number; atmIv: number } }[];
  labels: TermLabels;
}) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-md border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-medium">{p.expiry}</p>
      <p>
        {labels.daysToExpiry}: {p.daysToExpiry}
      </p>
      <p>
        {labels.atmIv}: {formatIvPercent(p.atmIv, 2)}
      </p>
    </div>
  );
}

export function ImpliedVolTermChart({
  snapshot,
  labels,
  compact = false,
}: ImpliedVolTermChartProps): React.JSX.Element {
  const data = React.useMemo(
    () => [...snapshot.slices].map(atmPoint).sort((a, b) => a.daysToExpiry - b.daysToExpiry),
    [snapshot.slices]
  );

  return (
    <div
      className={
        compact ? 'h-[140px] w-full shrink-0' : 'h-full min-h-[280px] w-full flex-1'
      }
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
          tickFormatter={(v: number) => formatIvPercent(v)}
          tick={chartAxisStyle}
          width={compact ? 36 : 48}
        />
        <Tooltip cursor={chartCursorStyle} content={<TermTooltip labels={labels} />} />
        {!compact && <Legend wrapperStyle={{ fontSize: 11 }} />}
        <Line
          type="monotone"
          dataKey="atmIv"
          name={labels.atmIv}
          stroke={chartColors.primary}
          dot={compact ? { r: 2 } : { r: 4 }}
          strokeWidth={2}
        />
      </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
