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
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

interface TermLabels {
  daysToExpiry: string;
  iv: string;
  atmIv: string;
}

interface ImpliedVolTermChartProps {
  snapshot: ImpliedVolSnapshot;
  labels: TermLabels;
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

export function ImpliedVolTermChart({
  snapshot,
  labels,
}: ImpliedVolTermChartProps): React.JSX.Element {
  const data = [...snapshot.slices].map(atmPoint).sort((a, b) => a.daysToExpiry - b.daysToExpiry);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="daysToExpiry"
          label={{ value: labels.daysToExpiry, position: 'insideBottom', offset: -4, fontSize: 11 }}
        />
        <YAxis
          tickFormatter={(v: number) => `${(v * 100).toFixed(1)}%`}
          label={{ value: labels.iv, angle: -90, position: 'insideLeft', fontSize: 11 }}
        />
        <Tooltip
          formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, labels.atmIv]}
          labelFormatter={(d) => `${labels.daysToExpiry}: ${d}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="atmIv"
          name={labels.atmIv}
          stroke="#8884d8"
          dot={{ r: 4 }}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
