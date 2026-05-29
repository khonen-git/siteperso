import {
  blackScholesGreeks,
  blackScholesPrice,
  intrinsicValue,
  normCdf,
} from '../blackScholes';

describe('blackScholes', () => {
  it('normCdf(0) is approximately 0.5', () => {
    expect(normCdf(0)).toBeCloseTo(0.5, 2);
  });

  it('call price is above intrinsic when T > 0', () => {
    const spot = 100;
    const strike = 100;
    const price = blackScholesPrice({
      spot,
      strike,
      timeYears: 0.5,
      rate: 0.05,
      volatility: 0.2,
      optionType: 'call',
    });
    expect(price).toBeGreaterThan(intrinsicValue(spot, strike, 'call'));
  });

  it('put-call parity holds approximately', () => {
    const params = {
      spot: 100,
      strike: 100,
      timeYears: 1,
      rate: 0.05,
      volatility: 0.25,
    };
    const call = blackScholesPrice({ ...params, optionType: 'call' as const });
    const put = blackScholesPrice({ ...params, optionType: 'put' as const });
    const parity = call - put - params.spot + params.strike * Math.exp(-params.rate * params.timeYears);
    expect(Math.abs(parity)).toBeLessThan(0.01);
  });

  it('long call delta is between 0 and 1', () => {
    const g = blackScholesGreeks({
      spot: 100,
      strike: 100,
      timeYears: 0.25,
      rate: 0.05,
      volatility: 0.2,
      optionType: 'call',
    });
    expect(g.delta).toBeGreaterThan(0);
    expect(g.delta).toBeLessThan(1);
  });
});
