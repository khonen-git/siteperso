'use client';

import * as React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
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
import { buildSmileChartData } from '@/lib/dashboards/ssvi-curve';
import type { IvSlice } from '@/types/dashboards/implied-vol';

interface ChartLabels {
  moneyness: string;
  strike: string;
  iv: string;
  atm: string;
  marketIv?: string;
  ssviFit?: string;
}

interface ImpliedVolSmileChartProps {
  slice: IvSlice;
  labels: ChartLabels;
  compact?: boolean;
}

function SmileTooltip({
  active,
  payload,
  labels,
}: {
  active?: boolean;
  payload?: { payload: { strike: number; moneyness: number; iv: number; ssviIv?: number } }[];
  labels: ChartLabels;
}) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-md border bg-popover px-3 py-2 text-xs shadow-md">
      <p>
        {labels.strike}: {p.strike.toFixed(2)}
      </p>
      <p>
        {labels.moneyness}: {p.moneyness.toFixed(3)}
      </p>
      <p>
        {labels.iv}: {formatIvPercent(p.iv, 2)}
      </p>
      {p.ssviIv != null && (
        <p className="text-muted-foreground">
          {labels.ssviFit ?? 'SSVI'}: {formatIvPercent(p.ssviIv, 2)}
        </p>
      )}
    </div>
  );
}

export function ImpliedVolSmileChart({
  slice,
  labels,
  compact = false,
}: ImpliedVolSmileChartProps): React.JSX.Element {
  const data = React.useMemo(
    () => buildSmileChartData(slice.ivPoints, slice.daysToExpiry, slice.ssvi),
    [slice]
  );

  const hasSsvi = data.some((p) => p.ssviIv != null);

  return (
    <div
      className={
        compact ? 'h-[140px] w-full shrink-0' : 'h-full min-h-[280px] w-full flex-1'
      }
    >
      <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={compact ? chartMargins.compact : chartMargins.default}>
        <CartesianGrid {...chartGridProps} />
        <ReferenceArea x1={0.98} x2={1.02} fill="hsl(var(--primary))" fillOpacity={0.06} />
        <XAxis
          dataKey="moneyness"
          type="number"
          domain={['dataMin', 'dataMax']}
          tickFormatter={(v: number) => v.toFixed(2)}
          tick={chartAxisStyle}
          hide={compact}
        />
        <YAxis
          tickFormatter={(v: number) => formatIvPercent(v)}
          tick={chartAxisStyle}
          width={compact ? 36 : 48}
        />
        <Tooltip
          cursor={chartCursorStyle}
          content={<SmileTooltip labels={labels} />}
        />
        {!compact && <Legend wrapperStyle={{ fontSize: 11 }} />}
        <ReferenceLine
          x={1}
          stroke={chartColors.muted}
          strokeDasharray="4 4"
          label={compact ? undefined : labels.atm}
        />
        <Line
          type="monotone"
          dataKey="iv"
          name={labels.marketIv ?? labels.iv}
          stroke={chartColors.primary}
          dot={compact ? false : { r: 3 }}
          strokeWidth={2}
        />
        {hasSsvi && (
          <Line
            type="monotone"
            dataKey="ssviIv"
            name={labels.ssviFit ?? 'SSVI'}
            stroke={chartColors.ssvi}
            dot={false}
            strokeWidth={1.5}
            strokeDasharray="6 4"
          />
        )}
      </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
