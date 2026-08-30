import { getSupportedIvSymbols } from '@/lib/dashboards/implied-vol';
import { getImpliedVolSnapshot } from '@/lib/dashboards/implied-vol.server';

describe('implied-vol snapshot', () => {
  it('supports SPY symbol', () => {
    expect(getSupportedIvSymbols()).toContain('SPY');
  });

  it('loads SPY snapshot with valid schema', () => {
    const snapshot = getImpliedVolSnapshot('SPY');
    expect(snapshot.metadata.symbol).toBe('SPY');
    expect(snapshot.metadata.spot).toBeGreaterThan(0);
    expect(snapshot.slices.length).toBeGreaterThan(0);
    for (const slice of snapshot.slices) {
      expect(slice.ivPoints.length).toBeGreaterThan(0);
      expect(slice.analytics?.atmIv).toBeGreaterThan(0);
      for (const pt of slice.ivPoints) {
        expect(pt.iv).toBeGreaterThan(0);
        expect(pt.moneyness).toBeGreaterThan(0);
      }
    }
  });

  it('loads enriched snapshot analytics', () => {
    const snapshot = getImpliedVolSnapshot('SPY');
    expect(snapshot.analytics?.expectedMove).toBeDefined();
    expect(snapshot.analytics?.termStructure).toBeDefined();
    expect(snapshot.slices[0].analytics?.riskReversal25).toBeDefined();
  });
});
