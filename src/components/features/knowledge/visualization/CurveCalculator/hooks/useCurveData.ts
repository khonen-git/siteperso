import { useMemo } from 'react';
import { useDistributionCalculator } from '@/hooks/useDistributionCalculator';
import type { CurveConfig, CurveData } from '../types';
import type { DistributionConfig } from '@/types/distributions';

/**
 * Hook pour calculer les données de la courbe
 */
export function useCurveData(
  curve: CurveConfig,
  distribution: DistributionConfig,
  functionType: 'pdf' | 'cdf'
): CurveData {
  const { xValues, yValues } = useDistributionCalculator(
    distribution,
    curve.parameters,
    functionType
  );

  return useMemo(() => ({
    id: curve.id,
    color: curve.color,
    data: xValues.map((x, i) => {
      const point = { x, y: yValues[i] };
      point[curve.id] = yValues[i];
      return point;
    }),
  }), [curve.id, curve.color, xValues, yValues]);
}