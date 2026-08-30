'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import type { PlotMouseEvent } from 'plotly.js';
import { ivPlotlyColorscale } from '@/lib/dashboards/chart-theme';
import { buildSurfaceGrid } from '@/lib/dashboards/surface-grid';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[280px] items-center justify-center text-sm text-muted-foreground">
      …
    </div>
  ),
});

interface SurfaceLabels {
  moneyness: string;
  daysToExpiry: string;
  iv: string;
}

interface ImpliedVolSurface3DChartProps {
  snapshot: ImpliedVolSnapshot;
  labels: SurfaceLabels;
  onExpirySelect?: (expiry: string) => void;
}

function readHslVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return raw ? `hsl(${raw})` : fallback;
}

function usePlotlyThemeColors() {
  const { resolvedTheme } = useTheme();
  const [colors, setColors] = React.useState({
    muted: '#94a3b8',
    border: '#334155',
  });

  React.useEffect(() => {
    setColors({
      muted: readHslVar('--muted-foreground', '#94a3b8'),
      border: readHslVar('--border', '#334155'),
    });
  }, [resolvedTheme]);

  return colors;
}

export function ImpliedVolSurface3DChart({
  snapshot,
  labels,
  onExpirySelect,
}: ImpliedVolSurface3DChartProps): React.JSX.Element {
  const theme = usePlotlyThemeColors();
  const grid = React.useMemo(() => buildSurfaceGrid(snapshot), [snapshot]);

  const zPercent = React.useMemo(
    () => grid.zMatrix.map((row) => row.map((iv) => iv * 100)),
    [grid.zMatrix]
  );

  const data = React.useMemo(
    () => [
      {
        type: 'surface' as const,
        x: grid.moneynessAxis,
        y: grid.dteAxis,
        z: zPercent,
        colorscale: ivPlotlyColorscale(),
        showscale: true,
        colorbar: {
          title: { text: labels.iv, font: { size: 11, color: theme.muted } },
          tickfont: { size: 10, color: theme.muted },
          ticksuffix: '%',
          len: 0.75,
        },
        hovertemplate:
          `${labels.moneyness}: %{x:.3f}<br>` +
          `${labels.daysToExpiry}: %{y}d<br>` +
          `${labels.iv}: %{z:.2f}%<extra></extra>`,
      },
    ],
    [grid.dteAxis, grid.moneynessAxis, labels, theme.muted, zPercent]
  );

  const layout = React.useMemo(
    () => ({
      autosize: true,
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { l: 0, r: 0, t: 0, b: 0 },
      scene: {
        bgcolor: 'transparent',
        xaxis: {
          title: { text: labels.moneyness, font: { size: 11, color: theme.muted } },
          tickfont: { size: 10, color: theme.muted },
          gridcolor: theme.border,
          zerolinecolor: theme.border,
        },
        yaxis: {
          title: { text: labels.daysToExpiry, font: { size: 11, color: theme.muted } },
          tickfont: { size: 10, color: theme.muted },
          gridcolor: theme.border,
          zerolinecolor: theme.border,
        },
        zaxis: {
          title: { text: labels.iv, font: { size: 11, color: theme.muted } },
          tickfont: { size: 10, color: theme.muted },
          ticksuffix: '%',
          gridcolor: theme.border,
          zerolinecolor: theme.border,
        },
        camera: { eye: { x: 1.55, y: 1.55, z: 0.85 } },
      },
    }),
    [labels, theme.border, theme.muted]
  );

  const handleClick = React.useCallback(
    (event: Readonly<PlotMouseEvent>) => {
      if (!onExpirySelect || !event.points?.[0]) return;
      const dte = Number(event.points[0].y);
      const expiry = grid.dteToExpiry.get(dte);
      if (expiry) onExpirySelect(expiry);
    },
    [grid.dteToExpiry, onExpirySelect]
  );

  if (!grid.zMatrix.length) {
    return (
      <div className="flex h-full min-h-[280px] items-center justify-center text-sm text-muted-foreground">
        —
      </div>
    );
  }

  return (
    <div className="h-full min-h-[280px] w-full flex-1" data-testid="iv-surface-3d">
      <Plot
        data={data}
        layout={layout}
        config={{ displayModeBar: false, responsive: true }}
        style={{ width: '100%', height: '100%' }}
        onClick={handleClick}
        useResizeHandler
      />
    </div>
  );
}
