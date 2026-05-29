export type OptionType = 'call' | 'put';

export interface BlackScholesParams {
  spot: number;
  strike: number;
  timeYears: number;
  rate: number;
  volatility: number;
  optionType: OptionType;
}

function normPdf(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

/** Cumulative standard normal distribution (Abramowitz & Stegun). */
export function normCdf(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  const p =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
}

function d1d2(spot: number, strike: number, timeYears: number, rate: number, volatility: number) {
  const sqrtT = Math.sqrt(timeYears);
  const d1 =
    (Math.log(spot / strike) + (rate + 0.5 * volatility * volatility) * timeYears) /
    (volatility * sqrtT);
  const d2 = d1 - volatility * sqrtT;
  return { d1, d2, sqrtT };
}

/** European Black–Scholes option price. */
export function blackScholesPrice(params: BlackScholesParams): number {
  const { spot, strike, timeYears, rate, volatility, optionType } = params;
  if (timeYears <= 0) {
    return intrinsicValue(spot, strike, optionType);
  }
  if (spot <= 0 || strike <= 0 || volatility <= 0) {
    return intrinsicValue(spot, strike, optionType);
  }

  const { d1, d2 } = d1d2(spot, strike, timeYears, rate, volatility);
  const discount = Math.exp(-rate * timeYears);

  if (optionType === 'call') {
    return spot * normCdf(d1) - strike * discount * normCdf(d2);
  }
  return strike * discount * normCdf(-d2) - spot * normCdf(-d1);
}

export function intrinsicValue(spot: number, strike: number, optionType: OptionType): number {
  if (optionType === 'call') {
    return Math.max(spot - strike, 0);
  }
  return Math.max(strike - spot, 0);
}

export interface OptionGreeks {
  delta: number;
  gamma: number;
  /** Theta per calendar day (option value change for +1 day). */
  thetaPerDay: number;
  /** Vega per 1 point of volatility (σ = 0.20 → 1 point = +0.01 absolute). */
  vegaPerVolPoint: number;
}

/** Greeks for a long option position (European BS). */
export function blackScholesGreeks(params: BlackScholesParams): OptionGreeks {
  const { spot, strike, timeYears, rate, volatility, optionType } = params;

  if (timeYears <= 1e-6 || spot <= 0 || strike <= 0 || volatility <= 0) {
    const callItm = spot > strike ? 1 : spot < strike ? 0 : 0.5;
    const putItm = spot < strike ? -1 : spot > strike ? 0 : -0.5;
    return {
      delta: optionType === 'call' ? callItm : putItm,
      gamma: 0,
      thetaPerDay: 0,
      vegaPerVolPoint: 0,
    };
  }

  const { d1, d2, sqrtT } = d1d2(spot, strike, timeYears, rate, volatility);
  const pdf = normPdf(d1);
  const discount = Math.exp(-rate * timeYears);

  const delta =
    optionType === 'call' ? normCdf(d1) : normCdf(d1) - 1;

  const gamma = pdf / (spot * volatility * sqrtT);

  const thetaPerYear =
    optionType === 'call'
      ? (-(spot * pdf * volatility) / (2 * sqrtT) -
          rate * strike * discount * normCdf(d2)) /
        365
      : (-(spot * pdf * volatility) / (2 * sqrtT) +
          rate * strike * discount * normCdf(-d2)) /
        365;

  const vegaPerVolPoint = (spot * pdf * sqrtT) / 100;

  return {
    delta,
    gamma,
    thetaPerDay: thetaPerYear,
    vegaPerVolPoint,
  };
}

export function positionSign(isLong: boolean): number {
  return isLong ? 1 : -1;
}
