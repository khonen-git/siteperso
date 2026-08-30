import {
  buildSmileChartData,
  ssviIvAtMoneyness,
  ssviTotalVariance,
} from '@/lib/dashboards/ssvi-curve';
import type { SsviParams } from '@/types/dashboards/implied-vol';

const params: SsviParams = {
  rho: -0.35,
  eta: 0.45,
  gamma: 0.5,
  m: 0,
  sigma: 0.14,
};

describe('ssvi-curve', () => {
  it('computes positive total variance at ATM', () => {
    const T = 20 / 365;
    const theta = params.sigma ** 2 * T;
    const w = ssviTotalVariance(0, theta, params);
    expect(w).toBeGreaterThan(0);
  });

  it('returns ATM IV close to sigma parameter', () => {
    const iv = ssviIvAtMoneyness(1, 20, params);
    expect(iv).toBeGreaterThan(0.1);
    expect(iv).toBeLessThan(0.2);
    expect(Math.abs(iv - params.sigma)).toBeLessThan(0.02);
  });

  it('buildSmileChartData attaches ssviIv when params provided', () => {
    const points = [
      { strike: 550, iv: 0.16, moneyness: 0.95 },
      { strike: 580, iv: 0.14, moneyness: 1.0 },
    ];
    const data = buildSmileChartData(points, 20, params);
    expect(data).toHaveLength(2);
    expect(data[0].ssviIv).toBeDefined();
    expect(data[1].ssviIv).toBeDefined();
  });

  it('buildSmileChartData omits ssviIv without params', () => {
    const points = [{ strike: 580, iv: 0.14, moneyness: 1.0 }];
    const data = buildSmileChartData(points, 20);
    expect(data[0].ssviIv).toBeUndefined();
  });
});
