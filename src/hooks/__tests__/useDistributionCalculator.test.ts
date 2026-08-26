import { renderHook } from '@testing-library/react';
import { useDistributionCalculator } from '../useDistributionCalculator';
import { normalDistribution } from '@/lib/distributions/normal';

describe('useDistributionCalculator', () => {
  const params = { mu: 0, sigma: 1 };

  it('computes xValues and yValues for a pdf', () => {
    const { result } = renderHook(() =>
      useDistributionCalculator(normalDistribution, params, 'pdf')
    );

    expect(result.current.xValues).toHaveLength(200);
    expect(result.current.yValues).toHaveLength(200);

    let closestIndex = 0;
    let closestAbs = Math.abs(result.current.xValues[0]);
    result.current.xValues.forEach((x, i) => {
      const abs = Math.abs(x);
      if (abs < closestAbs) {
        closestAbs = abs;
        closestIndex = i;
      }
    });

    expect(closestAbs).toBeLessThan(0.05);
    expect(result.current.yValues[closestIndex]).toBeCloseTo(0.399, 2);
  });

  it('computes an increasing cdf', () => {
    const { result } = renderHook(() =>
      useDistributionCalculator(normalDistribution, params, 'cdf')
    );

    const first = result.current.yValues[0];
    const last = result.current.yValues[result.current.yValues.length - 1];
    expect(last).toBeGreaterThan(first);
  });

  it('memoizes the result across rerenders', () => {
    const { result, rerender } = renderHook(() =>
      useDistributionCalculator(normalDistribution, params, 'pdf')
    );

    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });
});
