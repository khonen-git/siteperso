'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Rotate3d } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import type { PlotMouseEvent, PlotlyHTMLElement } from 'plotly.js';
import { Button } from '@/components/ui/button';
import { ivPlotlyColorscale } from '@/lib/dashboards/chart-theme';
import { buildSurfaceGrid } from '@/lib/dashboards/surface-grid';
import { cn } from '@/lib/utils';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

const Plot = dynamic(() => import('@/components/dashboards/ImpliedVolPlotly'), {
  ssr: false,
  loading: () => <Surface3DLoading />,
});

const CAMERA_RADIUS = Math.hypot(1.55, 1.55);
const CAMERA_HEIGHT = 0.85;
const ROTATION_SPEED = 0.004;

function Surface3DLoading(): React.JSX.Element {
  const t = useTranslations('dashboards');
  return (
    <div className="flex h-full min-h-[280px] items-center justify-center text-sm text-muted-foreground">
      {t('impliedVol.surface.loading3d')}
    </div>
  );
}

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

function eyeFromAngle(angle: number) {
  return {
    x: CAMERA_RADIUS * Math.cos(angle),
    y: CAMERA_RADIUS * Math.sin(angle),
    z: CAMERA_HEIGHT,
  };
}

export function ImpliedVolSurface3DChart({
  snapshot,
  labels,
  onExpirySelect,
}: ImpliedVolSurface3DChartProps): React.JSX.Element {
  const t = useTranslations('dashboards');
  const theme = usePlotlyThemeColors();
  const [plotError, setPlotError] = React.useState<string | null>(null);
  const [autoRotate, setAutoRotate] = React.useState(true);
  const graphDivRef = React.useRef<PlotlyHTMLElement | null>(null);
  const angleRef = React.useRef(Math.PI / 4);
  const animFrameRef = React.useRef<number | null>(null);
  const autoRotateRef = React.useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  const grid = React.useMemo(() => buildSurfaceGrid(snapshot), [snapshot]);

  const zPercent = React.useMemo(
    () => grid.zMatrix.map((row) => row.map((iv) => iv * 100)),
    [grid.zMatrix]
  );

  const stopAnimation = React.useCallback(() => {
    if (animFrameRef.current != null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  const runAnimationFrame = React.useCallback(async () => {
    if (!autoRotateRef.current || !graphDivRef.current) return;

    angleRef.current += ROTATION_SPEED;
    const Plotly = (await import('plotly.js-dist-min')).default;

    try {
      await Plotly.relayout(graphDivRef.current, {
        'scene.camera.eye': eyeFromAngle(angleRef.current),
      });
    } catch {
      stopAnimation();
      return;
    }

    animFrameRef.current = requestAnimationFrame(() => {
      void runAnimationFrame();
    });
  }, [stopAnimation]);

  const startAnimation = React.useCallback(() => {
    stopAnimation();
    void runAnimationFrame();
  }, [runAnimationFrame, stopAnimation]);

  const setDragMode = React.useCallback(async (mode: false | 'turntable') => {
    if (!graphDivRef.current) return;
    const Plotly = (await import('plotly.js-dist-min')).default;
    try {
      await Plotly.relayout(graphDivRef.current, { 'scene.dragmode': mode });
    } catch {
      /* plot unmounted */
    }
  }, []);

  React.useEffect(() => {
    if (autoRotate) {
      void setDragMode(false);
      startAnimation();
    } else {
      stopAnimation();
      void setDragMode('turntable');
    }
    return stopAnimation;
  }, [autoRotate, setDragMode, startAnimation, stopAnimation]);

  React.useEffect(() => () => stopAnimation(), [stopAnimation]);

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
        dragmode: (autoRotate ? false : 'turntable') as false | 'turntable',
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
        camera: { eye: eyeFromAngle(angleRef.current) },
      },
    }),
    [autoRotate, labels, theme.border, theme.muted]
  );

  const handleClick = React.useCallback(
    (event: Readonly<PlotMouseEvent>) => {
      if (autoRotateRef.current) return;
      if (!onExpirySelect || !event.points?.[0]) return;
      const dte = Number(event.points[0].y);
      const expiry = grid.dteToExpiry.get(dte);
      if (expiry) onExpirySelect(expiry);
    },
    [grid.dteToExpiry, onExpirySelect]
  );

  const handleInitialized = React.useCallback(
    (_figure: unknown, graphDiv: HTMLElement) => {
      graphDivRef.current = graphDiv as PlotlyHTMLElement;
      if (autoRotateRef.current) startAnimation();
    },
    [startAnimation]
  );

  if (!grid.zMatrix.length) {
    return (
      <div className="flex h-full min-h-[280px] items-center justify-center text-sm text-muted-foreground">
        {t('impliedVol.errors.noData')}
      </div>
    );
  }

  if (plotError) {
    return (
      <div className="flex h-full min-h-[280px] items-center justify-center px-4 text-center text-sm text-destructive">
        {plotError}
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[280px] w-full flex-1" data-testid="iv-surface-3d">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn(
          'absolute right-2 top-2 z-10 h-7 w-7 bg-background/90 shadow-sm backdrop-blur-sm',
          autoRotate && 'border-primary/50 text-primary'
        )}
        data-testid="iv-surface-rotation-toggle"
        aria-pressed={autoRotate}
        aria-label={
          autoRotate ? t('impliedVol.surface.rotationOff') : t('impliedVol.surface.rotationOn')
        }
        title={
          autoRotate ? t('impliedVol.surface.rotationOff') : t('impliedVol.surface.rotationOn')
        }
        onClick={() => setAutoRotate((value) => !value)}
      >
        <Rotate3d className="h-3.5 w-3.5" />
      </Button>

      <Plot
        data={data}
        layout={layout}
        config={{ displayModeBar: false, responsive: true, scrollZoom: !autoRotate }}
        style={{ width: '100%', height: '100%' }}
        onClick={handleClick}
        onInitialized={handleInitialized}
        onError={(err: Error) => setPlotError(err.message)}
        useResizeHandler
      />
    </div>
  );
}
