import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

export interface SurfaceGridPoint {
  moneyness: number;
  daysToExpiry: number;
  iv: number;
  expiry: string;
}

export const GRID_MONEYNESS = 24;

export function collectSurfacePoints(snapshot: ImpliedVolSnapshot): SurfaceGridPoint[] {
  return snapshot.slices.flatMap((slice) =>
    slice.ivPoints.map((p) => ({
      moneyness: p.moneyness,
      daysToExpiry: slice.daysToExpiry,
      iv: p.iv,
      expiry: slice.expiry,
    }))
  );
}

export function nearestSurfacePoint(
  moneyness: number,
  dte: number,
  points: SurfaceGridPoint[]
): SurfaceGridPoint | null {
  if (!points.length) return null;
  let best = points[0];
  let bestDist = Infinity;
  for (const p of points) {
    const dm = (p.moneyness - moneyness) * 2;
    const dd = (p.daysToExpiry - dte) / Math.max(dte, 1);
    const dist = dm * dm + dd * dd;
    if (dist < bestDist) {
      bestDist = dist;
      best = p;
    }
  }
  return best;
}

export interface SurfaceGrid {
  moneynessAxis: number[];
  dteAxis: number[];
  /** IV (decimal) indexed as [dteIdx][moneynessIdx] */
  zMatrix: number[][];
  ivRange: { min: number; max: number };
  dteToExpiry: Map<number, string>;
  /** Rows for heatmap display (DTE descending) */
  heatmapRows: { dte: number; cells: SurfaceGridPoint[] }[];
}

export function buildSurfaceGrid(
  snapshot: ImpliedVolSnapshot,
  gridSize = GRID_MONEYNESS
): SurfaceGrid {
  const points = collectSurfacePoints(snapshot);
  const dteValuesDesc = [...new Set(snapshot.slices.map((s) => s.daysToExpiry))].sort(
    (a, b) => b - a
  );
  const dteAxis = [...dteValuesDesc].sort((a, b) => a - b);

  const dteToExpiry = new Map<number, string>();
  for (const slice of snapshot.slices) {
    dteToExpiry.set(slice.daysToExpiry, slice.expiry);
  }

  if (!points.length) {
    return {
      moneynessAxis: [],
      dteAxis,
      zMatrix: [],
      ivRange: { min: 0, max: 0 },
      dteToExpiry,
      heatmapRows: [],
    };
  }

  const ms = points.map((p) => p.moneyness);
  const minM = Math.min(...ms);
  const maxM = Math.max(...ms);
  const moneynessAxis = Array.from({ length: gridSize }, (_, i) =>
    gridSize > 1 ? minM + ((maxM - minM) * i) / (gridSize - 1) : minM
  );

  const zMatrix: number[][] = [];
  const heatmapRows: { dte: number; cells: SurfaceGridPoint[] }[] = [];

  for (const dte of dteAxis) {
    const row: number[] = [];
    const cells: SurfaceGridPoint[] = [];

    for (const m of moneynessAxis) {
      const nearest = nearestSurfacePoint(m, dte, points);
      const iv = nearest?.iv ?? 0;
      row.push(iv);
      if (nearest) {
        cells.push({ ...nearest, moneyness: m, daysToExpiry: dte });
      }
    }

    zMatrix.push(row);
    heatmapRows.push({ dte, cells });
  }

  heatmapRows.sort((a, b) => b.dte - a.dte);

  const ivs = points.map((p) => p.iv);
  return {
    moneynessAxis,
    dteAxis,
    zMatrix,
    ivRange: { min: Math.min(...ivs), max: Math.max(...ivs) },
    dteToExpiry,
    heatmapRows,
  };
}
