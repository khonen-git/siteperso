/** Recharts styling aligned with site light/dark tokens. */

export const chartColors = {
  primary: 'hsl(var(--primary))',
  muted: 'hsl(var(--muted-foreground))',
  border: 'hsl(var(--border))',
  popover: 'hsl(var(--popover))',
  popoverForeground: 'hsl(var(--popover-foreground))',
  secondary: 'hsl(var(--secondary))',
  ssvi: 'hsl(var(--muted-foreground))',
} as const;

export const chartMargins = {
  default: { top: 8, right: 16, left: 4, bottom: 8 },
  compact: { top: 4, right: 8, left: 0, bottom: 4 },
} as const;

export const chartAxisStyle = {
  fontSize: 11,
  fill: 'hsl(var(--muted-foreground))',
} as const;

export const chartGridProps = {
  strokeDasharray: '3 3',
  stroke: 'hsl(var(--border))',
  vertical: false,
} as const;

export const chartCursorStyle = {
  stroke: 'hsl(var(--muted-foreground))',
  strokeWidth: 1,
  strokeDasharray: '4 4',
} as const;

export function formatIvPercent(iv: number, decimals = 1): string {
  return `${(iv * 100).toFixed(decimals)}%`;
}

/** Heatmap color scale (0 = low IV, 1 = high IV). Works in light and dark. */
export function ivHeatmapColor(t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const hue = 220 - clamped * 200;
  const lightness = 28 + clamped * 32;
  return `hsl(${hue} 65% ${lightness}%)`;
}

/** Plotly colorscale derived from the heatmap palette. */
export function ivPlotlyColorscale(steps = 8): [number, string][] {
  const n = Math.max(2, steps);
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    return [t, ivHeatmapColor(t)] as [number, string];
  });
}
