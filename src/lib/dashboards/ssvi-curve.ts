import type { SsviParams } from '@/types/dashboards/implied-vol';

/** Gatheral–Jacquier SSVI total variance at log-moneyness k. */
export function ssviTotalVariance(
  k: number,
  theta: number,
  params: Pick<SsviParams, 'rho' | 'eta' | 'gamma'>
): number {
  const { rho, eta, gamma } = params;
  if (theta <= 0) return 0;

  const denom = Math.pow(theta, gamma) * Math.pow(1 + theta, 1 - gamma);
  const phi = denom > 0 ? eta / denom : eta;
  const phiK = phi * k;
  const inner = Math.sqrt((phiK + rho) ** 2 + 1 - rho ** 2);
  return (theta / 2) * (1 + rho * phiK + inner);
}

/** Implied vol from SSVI params at moneyness K/S for a given slice. */
export function ssviIvAtMoneyness(
  moneyness: number,
  daysToExpiry: number,
  params: SsviParams
): number {
  if (moneyness <= 0 || daysToExpiry <= 0) return 0;

  const T = daysToExpiry / 365;
  const k = Math.log(moneyness) - params.m;
  const theta = params.sigma ** 2 * T;
  const w = ssviTotalVariance(k, theta, params);
  if (w <= 0) return 0;
  return Math.sqrt(w / T);
}

export interface SmileChartPoint {
  moneyness: number;
  strike: number;
  iv: number;
  ssviIv?: number;
}

/** Merge market IV points with SSVI overlay curve. */
export function buildSmileChartData(
  ivPoints: { strike: number; iv: number; moneyness: number }[],
  daysToExpiry: number,
  ssvi?: SsviParams
): SmileChartPoint[] {
  const sorted = [...ivPoints].sort((a, b) => a.moneyness - b.moneyness);
  return sorted.map((p) => ({
    moneyness: p.moneyness,
    strike: p.strike,
    iv: p.iv,
    ssviIv: ssvi ? ssviIvAtMoneyness(p.moneyness, daysToExpiry, ssvi) : undefined,
  }));
}
