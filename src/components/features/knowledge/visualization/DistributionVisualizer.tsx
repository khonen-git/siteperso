import React from 'react';
import { DistributionPlot } from './DistributionPlot';
import { CurveCalculator } from './CurveCalculator';
import { PresetManager } from './PresetManager';
import { useCalculationCache } from '@/hooks/useCalculationCache';
import { DistributionConfig } from '@/types/distributions';
import type { CurveData } from './CurveCalculator/types';

interface DistributionVisualizerProps {
  distribution: DistributionConfig;
}

export function DistributionVisualizer({ distribution }: DistributionVisualizerProps) {
  const cache = useCalculationCache<number>();
  const [, setCurveData] = React.useState<CurveData | null>(null);

  const defaultParams = React.useMemo(() => {
    return distribution.parameters.reduce(
      (acc, param) => {
        acc[param.name] = param.defaultValue;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [distribution]);

  const calculator = React.useMemo(
    () => ({
      pdf: (x: number) => {
        const pdf = distribution.functions.pdf;
        if (!pdf) {
          throw new Error(`PDF is not defined for ${distribution.name}`);
        }
        return pdf(defaultParams, x);
      },
    }),
    [distribution, defaultParams]
  );

  const defaultCurve = React.useMemo(
    () => ({
      id: 'default',
      color: '#8884d8',
      parameters: defaultParams,
    }),
    [defaultParams]
  );

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
      <PresetManager />
    </div>
  );
}
