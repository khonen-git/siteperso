import { renderHook } from '@testing-library/react';
import { useDistributionCalculator } from '../useDistributionCalculator';
import { normalDistribution } from '@/lib/distributions/normal';

describe('useDistributionCalculator', () => {
  const createCurves = (count: number) => Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    parameters: { mu: 0, sigma: 1 },
    color: '#000000'
  }));

  it('calculates points efficiently', () => {
    const start = performance.now();
    
    const { result } = renderHook(() => useDistributionCalculator(
      normalDistribution,
      createCurves(1),
      'pdf'
    ));
    
    const end = performance.now();
    expect(end - start).toBeLessThan(100); // Moins de 100ms pour le calcul initial
    expect(result.current.data.length).toBe(200); // 200 points par défaut
  });

  it('handles multiple curves efficiently', () => {
    const start = performance.now();
    
    const { result } = renderHook(() => useDistributionCalculator(
      normalDistribution,
      createCurves(5),
      'pdf'
    ));
    
    const end = performance.now();
    expect(end - start).toBeLessThan(200); // Moins de 200ms pour 5 courbes
    expect(result.current.data[0]).toHaveProperty('1');
    expect(result.current.data[0]).toHaveProperty('5');
  });

  it('calculates correct values', () => {
    const { result } = renderHook(() => useDistributionCalculator(
      normalDistribution,
      createCurves(1),
      'pdf'
    ));

    // Vérifier la valeur au point x = 0 (doit être ≈ 0.399 pour une normale standard)
    const centerPoint = result.current.data.find(point => Math.abs(point.x) < 0.01);
    expect(centerPoint?.['1']).toBeCloseTo(0.399, 3);
  });

  it('memoizes calculations correctly', () => {
    const { result, rerender } = renderHook(() => useDistributionCalculator(
      normalDistribution,
      createCurves(1),
      'pdf'
    ));

    const firstResult = result.current;
    rerender();
    expect(result.current).toBe(firstResult); // Même référence grâce à useMemo
  });
}); 