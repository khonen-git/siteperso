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
import type { OptionCurvePoint } from '@/lib/finance/optionCurves';

interface OptionPayoffChartProps {
  data: OptionCurvePoint[];
  strike: number;
  labels: {
    payoff: string;
    premium: string;
    pnl: string;
    spot: string;
  };
}

export function OptionPayoffChart({
  data,
  strike,
  labels,
}: OptionPayoffChartProps): React.JSX.Element {
  return (
    <div className="h-[380px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="spot"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(v: number) => v.toFixed(0)}
            label={{ value: labels.spot, position: 'insideBottom', offset: -4 }}
          />
          <YAxis tickFormatter={(v: number) => v.toFixed(1)} />
          <Tooltip
            formatter={(value: number, name: string) => [value.toFixed(3), name]}
            labelFormatter={(label: number) => `S = ${Number(label).toFixed(2)}`}
          />
          <Legend />
          <ReferenceLine x={strike} stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" />
          <ReferenceLine y={0} stroke="hsl(var(--border))" />
          <Line
            type="monotone"
            dataKey="payoff"
            stroke="#8884d8"
            dot={false}
            strokeWidth={2}
            name={labels.payoff}
          />
          <Line
            type="monotone"
            dataKey="premium"
            stroke="#22c55e"
            dot={false}
            strokeWidth={2}
            name={labels.premium}
          />
          <Line
            type="monotone"
            dataKey="pnlAtExpiry"
            stroke="#f97316"
            dot={false}
            strokeWidth={1.5}
            strokeDasharray="6 4"
            name={labels.pnl}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
