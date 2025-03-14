import { useMemo } from 'react';
import { useDistributionCalculator } from '@/hooks/useDistributionCalculator';
import { DistributionConfig } from '@/types/distributions';

interface Point {
  x: number;
  y: number;
  [key: string]: number;
}

interface CurveData {
  id: string;
  color: string;
  data: Point[];
}

interface CurveCalculatorProps {
  curve: {
    id: string;
    color: string;
    parameters: Record<string, number>;
  };
  distribution: DistributionConfig;
  functionType: 'pdf' | 'cdf';
  onDataCalculated: (data: CurveData) => void;
}

export function CurveCalculator({ 
  curve, 
  distribution, 
  functionType,
  onDataCalculated 
}: CurveCalculatorProps) {
  const { xValues, yValues } = useDistributionCalculator(
    distribution,
    curve.parameters,
    functionType
  );

  const curveData = useMemo(() => ({
    id: curve.id,
    color: curve.color,
    data: xValues.map((x, i) => {
      const point: Point = { x, y: yValues[i] };
      point[curve.id] = yValues[i];
      return point;
    }),
  }), [curve.id, curve.color, xValues, yValues]);

  // Notifier le parent des données calculées
  useMemo(() => {
    onDataCalculated(curveData);
  }, [curveData, onDataCalculated]);

  // Ce composant ne rend rien visuellement
  return null;
} 