'use client';

import * as React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { IvSlice } from '@/types/dashboards/implied-vol';

interface ChartLabels {
  moneyness: string;
  strike: string;
  iv: string;
  atm: string;
}

interface ImpliedVolSmileChartProps {
  slice: IvSlice;
  labels: ChartLabels;
}

export function ImpliedVolSmileChart({
  slice,
  labels,
}: ImpliedVolSmileChartProps): React.JSX.Element {
  const data = [...slice.ivPoints].sort((a, b) => a.moneyness - b.moneyness);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="moneyness"
          type="number"
          domain={['dataMin', 'dataMax']}
          tickFormatter={(v: number) => v.toFixed(2)}
          label={{ value: labels.moneyness, position: 'insideBottom', offset: -4, fontSize: 11 }}
        />
        <YAxis
          tickFormatter={(v: number) => `${(v * 100).toFixed(1)}%`}
          label={{ value: labels.iv, angle: -90, position: 'insideLeft', fontSize: 11 }}
        />
        <Tooltip
          formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, labels.iv]}
          labelFormatter={(_, payload) => {
            const p = payload?.[0]?.payload as { strike?: number; moneyness?: number } | undefined;
            if (!p) return '';
            return `${labels.strike}: ${p.strike?.toFixed(2)} · ${labels.moneyness}: ${p.moneyness?.toFixed(3)}`;
          }}
        />
        <Legend />
        <ReferenceLine x={1} stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" label={labels.atm} />
        <Line
          type="monotone"
          dataKey="iv"
          name={labels.iv}
          stroke="hsl(var(--primary))"
          dot={{ r: 3 }}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
