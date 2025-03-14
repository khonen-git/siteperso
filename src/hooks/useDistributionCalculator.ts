import { useMemo } from 'react';
import { useCalculationCache } from './useCalculationCache';
import { DistributionConfig } from '@/types/distributions';

interface CalculationOptions {
  xMin: number;
  xMax: number;
  points: number;
}

interface CalculationResult {
  xValues: number[];
  yValues: number[];
}

const DEFAULT_OPTIONS: CalculationOptions = {
  xMin: -5,
  xMax: 5,
  points: 200
};

function generateXValues(options: CalculationOptions): number[] {
  const { xMin, xMax, points } = options;
  const step = (xMax - xMin) / (points - 1);
  return Array.from({ length: points }, (_, i) => xMin + i * step);
}

function calculateYValues(
  fn: (params: Record<string, number>, x: number) => number,
  params: Record<string, number>,
  xValues: number[]
): number[] {
  return xValues.map(x => fn(params, x));
}

export function useDistributionCalculator(
  distribution: DistributionConfig,
  params: Record<string, number>,
  functionType: 'pdf' | 'cdf',
  options: Partial<CalculationOptions> = {}
): CalculationResult {
  const cache = useCalculationCache<CalculationResult>();
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options } as CalculationOptions;

  return useMemo(() => {
    const cacheKey = JSON.stringify({ distribution: distribution.name, params, functionType, options: mergedOptions });
    const cachedResult = cache.get(cacheKey);
    
    if (cachedResult) return cachedResult;

    const xValues = generateXValues(mergedOptions);
    
    const fn = distribution.functions[functionType];
    if (!fn) {
      throw new Error(`La fonction ${functionType} n'est pas définie pour la distribution ${distribution.name}`);
    }

    const yValues = calculateYValues(fn, params, xValues);
    const result: CalculationResult = { xValues, yValues };
    
    cache.set(cacheKey, result);
    return result;
  }, [distribution, params, functionType, mergedOptions, cache]);
} 