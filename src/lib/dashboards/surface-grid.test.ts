import { buildSurfaceGrid, collectSurfacePoints } from '@/lib/dashboards/surface-grid';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

const mockSnapshot: ImpliedVolSnapshot = {
  metadata: {
    symbol: 'SPY',
    spot: 580,
    asOf: '2026-08-30',
    source: 'Yahoo Finance',
    sourceDisclaimer: 'Delayed',
  },
  slices: [
    {
      expiry: '2026-09-19',
      daysToExpiry: 20,
      ivPoints: [
        { strike: 580, iv: 0.143, moneyness: 1 },
        { strike: 550, iv: 0.149, moneyness: 0.95 },
      ],
    },
    {
      expiry: '2026-10-17',
      daysToExpiry: 48,
      ivPoints: [
        { strike: 580, iv: 0.152, moneyness: 1 },
        { strike: 550, iv: 0.158, moneyness: 0.95 },
      ],
    },
  ],
};

describe('surface-grid', () => {
  it('collects points from all slices', () => {
    expect(collectSurfacePoints(mockSnapshot)).toHaveLength(4);
  });

  it('builds aligned axes and z matrix', () => {
    const grid = buildSurfaceGrid(mockSnapshot, 8);
    expect(grid.moneynessAxis).toHaveLength(8);
    expect(grid.dteAxis).toEqual([20, 48]);
    expect(grid.zMatrix).toHaveLength(2);
    expect(grid.zMatrix[0]).toHaveLength(8);
    expect(grid.ivRange.min).toBeGreaterThan(0);
    expect(grid.dteToExpiry.get(20)).toBe('2026-09-19');
  });

  it('orders heatmap rows by descending DTE', () => {
    const grid = buildSurfaceGrid(mockSnapshot, 8);
    expect(grid.heatmapRows.map((r) => r.dte)).toEqual([48, 20]);
  });
});
