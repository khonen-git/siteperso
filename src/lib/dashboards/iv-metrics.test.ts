import { computeSkew25d, findAtmIv, formatRelativeTime } from '@/lib/dashboards/iv-metrics';
import type { IvSlice } from '@/types/dashboards/implied-vol';

describe('iv-metrics', () => {
  const slice: IvSlice = {
    expiry: '2026-09-19',
    daysToExpiry: 20,
    ivPoints: [
      { strike: 522, iv: 0.18, moneyness: 0.9 },
      { strike: 580, iv: 0.14, moneyness: 1.0 },
      { strike: 638, iv: 0.15, moneyness: 1.1 },
    ],
  };

  it('finds ATM IV closest to moneyness 1', () => {
    expect(findAtmIv(slice)).toBeCloseTo(0.14);
  });

  it('computes skew 25d proxy in percentage points', () => {
    expect(computeSkew25d(slice)).toBeCloseTo(3, 0);
  });

  it('formats relative time', () => {
    const iso = new Date(Date.now() - 60_000).toISOString();
    expect(formatRelativeTime(iso, 'en')).toMatch(/minute|min/i);
  });
});
