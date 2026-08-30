import {
  ImpliedVolSnapshotValidationError,
  validateImpliedVolSnapshot,
} from '@/lib/dashboards/implied-vol-schema';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

const validSnapshot: ImpliedVolSnapshot = {
  metadata: {
    symbol: 'SPY',
    spot: 580,
    asOf: '2026-08-30',
    source: 'demo',
    sourceDisclaimer: 'demo',
  },
  slices: [
    {
      expiry: '2026-09-19',
      daysToExpiry: 20,
      ivPoints: [
        { strike: 522, iv: 0.18, moneyness: 0.9 },
        { strike: 580, iv: 0.14, moneyness: 1.0 },
        { strike: 638, iv: 0.15, moneyness: 1.1 },
      ],
    },
  ],
};

describe('validateImpliedVolSnapshot', () => {
  it('accepts a valid snapshot', () => {
    const result = validateImpliedVolSnapshot(validSnapshot);
    expect(result.metadata.symbol).toBe('SPY');
    expect(result.slices).toHaveLength(1);
  });

  it('rejects missing metadata', () => {
    expect(() => validateImpliedVolSnapshot({ slices: validSnapshot.slices })).toThrow(
      ImpliedVolSnapshotValidationError
    );
  });

  it('rejects invalid spot', () => {
    expect(() =>
      validateImpliedVolSnapshot({
        ...validSnapshot,
        metadata: { ...validSnapshot.metadata, spot: 0 },
      })
    ).toThrow('metadata.spot');
  });

  it('rejects empty slices', () => {
    expect(() => validateImpliedVolSnapshot({ ...validSnapshot, slices: [] })).toThrow('slices');
  });

  it('rejects invalid iv point', () => {
    expect(() =>
      validateImpliedVolSnapshot({
        ...validSnapshot,
        slices: [
          {
            ...validSnapshot.slices[0],
            ivPoints: [{ strike: 580, iv: -0.1, moneyness: 1 }],
          },
        ],
      })
    ).toThrow('invalid iv');
  });
});
