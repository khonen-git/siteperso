import React from 'react';
import { DistributionPlot } from './DistributionPlot';
import { CurveCalculator } from './CurveCalculator';
import { PresetManager } from './PresetManager';
import { useCalculationCache } from '@/hooks/useCalculationCache';
import { useDistributionCalculator } from '@/hooks/useDistributionCalculator';
import { DistributionConfig } from '@/types/distributions';
import type { CurveData } from './CurveCalculator/types';

interface DistributionVisualizerProps {
  distribution: DistributionConfig;
}

export function DistributionVisualizer({ distribution }: DistributionVisualizerProps) {
  const cache = useCalculationCache<number>();
  const [curveData, setCurveData] = React.useState<CurveData | null>(null);
  
  const defaultParams = React.useMemo(() => {
    return distribution.parameters.reduce((acc, param) => {
      acc[param.name] = param.defaultValue;
      return acc;
    }, {} as Record<string, number>);
  }, [distribution]);

  const calculator = useDistributionCalculator(
    distribution,
    defaultParams,
    'pdf'
  );

  const defaultCurve = React.useMemo(() => ({
    id: 'default',
    color: '#8884d8',
    parameters: defaultParams
  }), [defaultParams]);

  const handleDataCalculated = React.useCallback((data: CurveData) => {
    setCurveData(data);
  }, []);

  return (
    <div className="space-y-4">
      <DistributionPlot 
        distribution={distribution} 
        calculator={calculator}
        cache={cache}
      />
      <CurveCalculator 
        distribution={distribution}
        curve={defaultCurve}
        functionType="pdf"
        onDataCalculated={handleDataCalculated}
      />
      <PresetManager distribution={distribution} />
    </div>
  );
}