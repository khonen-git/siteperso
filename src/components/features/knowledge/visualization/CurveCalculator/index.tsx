import { useEffect } from 'react';
import { useCurveData } from './hooks/useCurveData';
import type { CurveCalculatorProps } from './types';

/**
 * CurveCalculator - Composant de calcul de courbe
 * Responsable uniquement du calcul et de la notification des données
 */
export function CurveCalculator({ 
  curve, 
  distribution, 
  functionType,
  onDataCalculated 
}: CurveCalculatorProps) {
  const curveData = useCurveData(curve, distribution, functionType);

  useEffect(() => {
    onDataCalculated(curveData);
  }, [curveData, onDataCalculated]);

  return null;
}