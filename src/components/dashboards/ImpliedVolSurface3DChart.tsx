'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Rotate3d, RotateCcw } from 'lucide-react';
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
const DEFAULT_ANGLE = Math.PI / 4;
const ROTATION_SPEEDS = { slow: 0.002, medium: 0.004 } as const;

type RotationSpeed = keyof typeof ROTATION_SPEEDS;

// TODO: rotation manuelle (clic-glisser orbit/turntable Plotly) — ne fonctionne pas
// fiablement avec le layout fixed + auto-rotate. Réactiver via scene.dragmode
// + scrollZoom une fois le conflit pointer/relayout résolu.

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
  ivRange?: { min: number; max: number };
  selectedDte?: number;
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
  ivRange: ivRangeProp,
  selectedDte,
  onExpirySelect,
}: ImpliedVolSurface3DChartProps): React.JSX.Element {
  const t = useTranslations('dashboards');
  const theme = usePlotlyThemeColors();
  const [plotError, setPlotError] = React.useState<string | null>(null);
  const [autoRotate, setAutoRotate] = React.useState(true);
  const [rotationSpeed, setRotationSpeed] = React.useState<RotationSpeed>('medium');
  const graphDivRef = React.useRef<PlotlyHTMLElement | null>(null);
  const angleRef = React.useRef(DEFAULT_ANGLE);
  const animFrameRef = React.useRef<number | null>(null);
  const autoRotateRef = React.useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  const grid = React.useMemo(() => buildSurfaceGrid(snapshot), [snapshot]);
  const ivRange = ivRangeProp ?? grid.ivRange;

  const zPercent = React.useMemo(
    () => grid.zMatrix.map((row) => row.map((iv) => iv * 100)),
    [grid.zMatrix]
  );

  const cmin = ivRange.min * 100;
  const cmax = ivRange.max * 100;

  const stopAnimation = React.useCallback(() => {
    if (animFrameRef.current != null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  const runAnimationFrame = React.useCallback(async () => {
    if (!autoRotateRef.current || !graphDivRef.current) return;

    angleRef.current += ROTATION_SPEEDS[rotationSpeed];
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
  }, [rotationSpeed, stopAnimation]);

  const startAnimation = React.useCallback(() => {
    stopAnimation();
    void runAnimationFrame();
  }, [runAnimationFrame, stopAnimation]);

  React.useEffect(() => {
    if (autoRotate) {
      startAnimation();
    } else {
      stopAnimation();
    }
    return stopAnimation;
  }, [autoRotate, startAnimation, stopAnimation, rotationSpeed]);

  React.useEffect(() => () => stopAnimation(), [stopAnimation]);

  const resetCamera = React.useCallback(async () => {
    angleRef.current = DEFAULT_ANGLE;
    if (!graphDivRef.current) return;
    const Plotly = (await import('plotly.js-dist-min')).default;
    try {
      await Plotly.relayout(graphDivRef.current, {
        'scene.camera.eye': eyeFromAngle(DEFAULT_ANGLE),
      });
    } catch {
      /* ignore */
    }
  }, []);

  const data = React.useMemo(() => {
    const traces: object[] = [
      {
        type: 'surface' as const,
        x: grid.moneynessAxis,
        y: grid.dteAxis,
        z: zPercent,
        colorscale: ivPlotlyColorscale(),
        cmin,
        cmax,
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
    ];

    if (selectedDte != null && grid.dteAxis.includes(selectedDte)) {
      traces.push({
        type: 'scatter3d' as const,
        mode: 'lines' as const,
        x: grid.moneynessAxis,
        y: grid.dteAxis.map(() => selectedDte),
        z: zPercent[grid.dteAxis.indexOf(selectedDte)] ?? [],
        line: { color: 'hsl(var(--primary))', width: 4 },
        hoverinfo: 'skip' as const,
        showlegend: false,
      });
    }

    return traces;
  }, [cmax, cmin, grid.dteAxis, grid.moneynessAxis, labels, selectedDte, theme.muted, zPercent]);

  const layout = React.useMemo(
    () => ({
      autosize: true,
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      margin: { l: 0, r: 0, t: 0, b: 0 },
      scene: {
        bgcolor: 'transparent',
        dragmode: false,
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
    [labels, theme.border, theme.muted]
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
      <div className="absolute right-2 top-2 z-10 flex gap-1">
        {autoRotate && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 bg-background/90 px-2 text-[10px] shadow-sm backdrop-blur-sm"
            data-testid="iv-surface-rotation-speed"
            onClick={() => setRotationSpeed((s) => (s === 'medium' ? 'slow' : 'medium'))}
            aria-label={
              rotationSpeed === 'slow'
                ? t('impliedVol.surface.rotationSlow')
                : t('impliedVol.surface.rotationMedium')
            }
            title={
              rotationSpeed === 'slow'
                ? t('impliedVol.surface.rotationSlow')
                : t('impliedVol.surface.rotationMedium')
            }
          >
            {rotationSpeed === 'slow' ? '1×' : '2×'}
          </Button>
        )}
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-background/90 shadow-sm backdrop-blur-sm"
          data-testid="iv-surface-reset-camera"
          aria-label={t('impliedVol.surface.resetCamera')}
          title={t('impliedVol.surface.resetCamera')}
          onClick={() => void resetCamera()}
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn(
            'h-7 w-7 bg-background/90 shadow-sm backdrop-blur-sm',
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
      </div>

      <Plot
        data={data}
        layout={layout}
        config={{ displayModeBar: false, responsive: true, scrollZoom: false }}
        style={{ width: '100%', height: '100%' }}
        onClick={handleClick}
        onInitialized={handleInitialized}
        onError={(err: Error) => setPlotError(err.message)}
        useResizeHandler
      />
    </div>
  );
}
