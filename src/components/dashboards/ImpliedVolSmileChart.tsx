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
import { cn } from '@/lib/utils';
import type { IvSlice } from '@/types/dashboards/implied-vol';

interface ChartLabels {
  moneyness: string;
  strike: string;
  iv: string;
  atm: string;
  marketIv?: string;
  ssviFit?: string;
}

interface SmilePoint {
  strike: number;
  moneyness: number;
  iv: number;
  ssviIv?: number;
}

interface ImpliedVolSmileChartProps {
  slice: IvSlice;
  labels: ChartLabels;
  compact?: boolean;
  /** Fill parent flex area (overview satellites). */
  fill?: boolean;
  ivYDomain?: { min: number; max: number };
  selectedMoneyness?: number | null;
  onPointClick?: (moneyness: number) => void;
}

const MONEYNESS_HIGHLIGHT_TOLERANCE = 0.015;

function SmileTooltip({
  active,
  payload,
  labels,
  selectedMoneyness,
}: {
  active?: boolean;
  payload?: { payload: SmilePoint }[];
  labels: ChartLabels;
  selectedMoneyness?: number | null;
}) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  const highlighted =
    selectedMoneyness != null &&
    Math.abs(p.moneyness - selectedMoneyness) <= MONEYNESS_HIGHLIGHT_TOLERANCE;
  return (
    <div className="rounded-md border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-medium">
        {labels.strike}: <span className="tabular-nums">{p.strike.toFixed(2)}</span>
        {highlighted && <span className="ml-1 text-primary">●</span>}
      </p>
      <p className="text-muted-foreground">
        {labels.moneyness}: <span className="text-foreground">{p.moneyness.toFixed(3)}</span>
      </p>
      <p>
        {labels.iv}: <span className="font-medium tabular-nums">{formatIvPercent(p.iv, 2)}</span>
      </p>
      {p.ssviIv != null && (
        <p className="text-muted-foreground">
          {labels.ssviFit ?? 'SSVI'}: {formatIvPercent(p.ssviIv, 2)}
        </p>
      )}
    </div>
  );
}

function SmileDot({
  cx,
  cy,
  payload,
  selectedMoneyness,
  onPointClick,
  compact,
}: {
  cx?: number;
  cy?: number;
  payload?: SmilePoint;
  selectedMoneyness?: number | null;
  onPointClick?: (moneyness: number) => void;
  compact?: boolean;
}) {
  if (cx == null || cy == null || !payload) return null;
  const highlighted =
    selectedMoneyness != null &&
    Math.abs(payload.moneyness - selectedMoneyness) <= MONEYNESS_HIGHLIGHT_TOLERANCE;
  if (compact && !highlighted) return null;
  const r = highlighted ? 5 : compact ? 0 : 3;
  if (r === 0) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={highlighted ? chartColors.primary : chartColors.primary}
      stroke={highlighted ? 'hsl(var(--background))' : 'none'}
      strokeWidth={highlighted ? 2 : 0}
      style={{ cursor: onPointClick ? 'pointer' : undefined }}
      onClick={() => onPointClick?.(payload.moneyness)}
    />
  );
}

export function ImpliedVolSmileChart({
  slice,
  labels,
  compact = false,
  fill = false,
  ivYDomain,
  selectedMoneyness,
  onPointClick,
}: ImpliedVolSmileChartProps): React.JSX.Element {
  const data = React.useMemo(
    () => buildSmileChartData(slice.ivPoints, slice.daysToExpiry, slice.ssvi),
    [slice]
  );

  const hasSsvi = data.some((p) => p.ssviIv != null);

  const yDomain: [number | string, number | string] = ivYDomain
    ? [ivYDomain.min, ivYDomain.max]
    : ['auto', 'auto'];

  const highlightX =
    selectedMoneyness != null
      ? [
          Math.max(selectedMoneyness - MONEYNESS_HIGHLIGHT_TOLERANCE, 0),
          selectedMoneyness + MONEYNESS_HIGHLIGHT_TOLERANCE,
        ]
      : null;

  return (
    <div
      className={cn(
        fill && 'min-h-[80px] h-full w-full min-w-0 flex-1',
        !fill && (compact ? 'h-[140px] w-full shrink-0' : 'h-full min-h-[280px] w-full flex-1')
      )}
      data-testid="iv-smile-chart"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={compact ? chartMargins.compact : chartMargins.default}>
          <CartesianGrid {...chartGridProps} />
          <ReferenceArea x1={0.98} x2={1.02} fill="hsl(var(--primary))" fillOpacity={0.06} />
          {highlightX && (
            <ReferenceArea
              x1={highlightX[0]}
              x2={highlightX[1]}
              fill="hsl(var(--primary))"
              fillOpacity={0.12}
            />
          )}
          <XAxis
            dataKey="moneyness"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(v: number) => v.toFixed(2)}
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
            content={<SmileTooltip labels={labels} selectedMoneyness={selectedMoneyness} />}
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
            dot={
              <SmileDot
                selectedMoneyness={selectedMoneyness}
                onPointClick={onPointClick}
                compact={compact}
              />
            }
            activeDot={{ r: compact ? 4 : 5 }}
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
