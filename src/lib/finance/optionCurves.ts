import {
  blackScholesPrice,
  intrinsicValue,
  positionSign,
  type BlackScholesParams,
  type OptionType,
} from './blackScholes';

export interface OptionCurvePoint {
  spot: number;
  payoff: number;
  premium: number;
  pnlAtExpiry: number;
}

export interface BuildOptionCurvesInput {
  strike: number;
  timeYears: number;
  rate: number;
  volatility: number;
  optionType: OptionType;
  isLong: boolean;
  spotMin: number;
  spotMax: number;
  steps?: number;
  /** Spot at which the position was opened (for P&amp;L vs premium paid). */
  entrySpot: number;
}

export function buildOptionCurves(input: BuildOptionCurvesInput): OptionCurvePoint[] {
  const {
    strike,
    timeYears,
    rate,
    volatility,
    optionType,
    isLong,
    spotMin,
    spotMax,
    steps = 120,
    entrySpot,
  } = input;

  const sign = positionSign(isLong);
  const entryParams: BlackScholesParams = {
    spot: entrySpot,
    strike,
    timeYears,
    rate,
    volatility,
    optionType,
  };
  const premiumPaid = blackScholesPrice(entryParams);

  const points: OptionCurvePoint[] = [];
  const step = (spotMax - spotMin) / steps;

  for (let i = 0; i <= steps; i++) {
    const spot = spotMin + i * step;
    const params: BlackScholesParams = {
      spot,
      strike,
      timeYears,
      rate,
      volatility,
      optionType,
    };
    const intrinsic = intrinsicValue(spot, strike, optionType);
    const bs = blackScholesPrice(params);

    points.push({
      spot,
      payoff: sign * intrinsic,
      premium: sign * bs,
      pnlAtExpiry: sign * intrinsic - sign * premiumPaid,
    });
  }

  return points;
}
