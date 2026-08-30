import {
  buildSnapshotAnalytics,
  computeButterfly25,
  computeExpectedMove,
  computeForwardVol,
  computeIvPercentile,
  computeIvRank,
  computeRiskReversal25,
  enrichImpliedVolSnapshot,
} from '@/lib/dashboards/implied-vol-analytics';
import type { ImpliedVolSnapshot, IvHistoryPoint, IvSlice } from '@/types/dashboards/implied-vol';

const slice: IvSlice = {
  expiry: '2026-09-19',
  daysToExpiry: 20,
  ivPoints: [
    { strike: 522, iv: 0.18, moneyness: 0.9 },
    { strike: 580, iv: 0.14, moneyness: 1.0 },
    { strike: 638, iv: 0.15, moneyness: 1.1 },
  ],
  ssvi: { rho: -0.35, eta: 0.45, gamma: 0.5, m: 0, sigma: 0.14 },
};

const snapshot: ImpliedVolSnapshot = {
  metadata: {
    symbol: 'SPY',
    spot: 580,
    asOf: '2026-08-30',
    source: 'demo',
    sourceDisclaimer: 'demo',
    realizedVol20d: 0.12,
  },
  slices: [
    slice,
    {
      expiry: '2026-10-17',
      daysToExpiry: 48,
      ivPoints: [
        { strike: 522, iv: 0.19, moneyness: 0.9 },
        { strike: 580, iv: 0.155, moneyness: 1.0 },
        { strike: 638, iv: 0.16, moneyness: 1.1 },
      ],
    },
  ],
};

const history: IvHistoryPoint[] = [
  { asOf: '2026-08-01', atmIv: 0.12, spot: 570 },
  { asOf: '2026-08-15', atmIv: 0.135, spot: 575 },
  { asOf: '2026-08-29', atmIv: 0.138, spot: 578 },
];

describe('implied-vol-analytics', () => {
  it('computes 25Δ risk reversal in pp', () => {
    expect(computeRiskReversal25(slice)).toBeCloseTo(3, 1);
  });

  it('computes 25Δ butterfly in pp', () => {
    expect(computeButterfly25(slice)).toBeCloseTo(2.5, 1);
  });

  it('computes forward vol between maturities', () => {
    const fwd = computeForwardVol(20, 0.14, 48, 0.155);
    expect(fwd).not.toBeNull();
    expect(fwd!).toBeGreaterThan(0.1);
    expect(fwd!).toBeLessThan(0.25);
  });

  it('computes expected move from ATM IV', () => {
    const move = computeExpectedMove(580, 0.14, 20)!;
    expect(move.move68Pct).toBeGreaterThan(0);
    expect(move.move95Pct).toBeGreaterThan(move.move68Pct);
    expect(move.move68Dollars).toBeCloseTo((580 * move.move68Pct) / 100, 1);
  });

  it('computes IV rank and percentile', () => {
    const values = [0.12, 0.135, 0.138, 0.15];
    expect(computeIvRank(0.14, values)).toBeCloseTo(66.7, 0);
    expect(computeIvPercentile(0.14, values)).toBeCloseTo(75, 0);
  });

  it('builds snapshot analytics with VRP and forward vols', () => {
    const analytics = buildSnapshotAnalytics(snapshot, history);
    expect(analytics.forwardVols?.length).toBe(1);
    expect(analytics.expectedMove).toBeDefined();
    expect(analytics.volatilityRiskPremium).toBeCloseTo(2, 0);
    expect(analytics.ivRank30d).toBeDefined();
  });

  it('enriches snapshot with slice and snapshot analytics', () => {
    const enriched = enrichImpliedVolSnapshot(snapshot, history);
    expect(enriched.slices[0].analytics?.atmIv).toBeCloseTo(0.14);
    expect(enriched.slices[0].analytics?.riskReversal25).toBeDefined();
    expect(enriched.analytics?.termStructure).toBeDefined();
    expect(enriched.analytics?.expectedMove).toBeDefined();
  });
});
