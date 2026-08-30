'use client';

import * as React from 'react';
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

interface SurfaceLabels {
  moneyness: string;
  daysToExpiry: string;
  iv: string;
}

interface SurfacePoint {
  moneyness: number;
  daysToExpiry: number;
  iv: number;
  expiry: string;
}

interface ImpliedVolSurfaceChartProps {
  snapshot: ImpliedVolSnapshot;
  labels: SurfaceLabels;
}

function ivColor(iv: number, min: number, max: number): string {
  const t = max > min ? (iv - min) / (max - min) : 0.5;
  const hue = 220 - t * 200;
  return `hsl(${hue} 70% 45%)`;
}

export function ImpliedVolSurfaceChart({
  snapshot,
  labels,
}: ImpliedVolSurfaceChartProps): React.JSX.Element {
  const points: SurfacePoint[] = snapshot.slices.flatMap((slice) =>
    slice.ivPoints.map((p) => ({
      moneyness: p.moneyness,
      daysToExpiry: slice.daysToExpiry,
      iv: p.iv,
      expiry: slice.expiry,
    }))
  );

  const ivs = points.map((p) => p.iv);
  const minIv = Math.min(...ivs);
  const maxIv = Math.max(...ivs);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          type="number"
          dataKey="moneyness"
          domain={['dataMin', 'dataMax']}
          name={labels.moneyness}
          tickFormatter={(v: number) => v.toFixed(2)}
        />
        <YAxis type="number" dataKey="daysToExpiry" name={labels.daysToExpiry} />
        <ZAxis type="number" dataKey="iv" range={[80, 80]} />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          formatter={(value: number, name: string) => {
            if (name === labels.iv) return `${(value * 100).toFixed(2)}%`;
            return value;
          }}
          labelFormatter={() => ''}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const p = payload[0].payload as SurfacePoint;
            return (
              <div className="rounded-md border bg-popover px-3 py-2 text-xs shadow-md">
                <p>{p.expiry}</p>
                <p>
                  {labels.moneyness}: {p.moneyness.toFixed(3)}
                </p>
                <p>
                  {labels.daysToExpiry}: {p.daysToExpiry}
                </p>
                <p>
                  {labels.iv}: {(p.iv * 100).toFixed(2)}%
                </p>
              </div>
            );
          }}
        />
        <Scatter
          data={points}
          shape={(props: { cx?: number; cy?: number; payload?: SurfacePoint }) => {
            const { cx, cy, payload } = props;
            if (cx == null || cy == null || !payload) return <g />;
            return (
              <rect
                x={cx - 5}
                y={cy - 5}
                width={10}
                height={10}
                fill={ivColor(payload.iv, minIv, maxIv)}
                rx={1}
              />
            );
          }}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
