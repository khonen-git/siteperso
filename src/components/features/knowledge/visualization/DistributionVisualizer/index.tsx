import React from 'react';
import { DistributionPlot } from '../DistributionPlot';
import { CurveCalculator } from '../CurveCalculator';
import { PresetManager } from '../PresetManager';
import { useDistributionCalculator } from '@/hooks/useDistributionCalculator';
import { useCalculationCache } from '@/hooks/useCalculationCache';
import { cn } from '@/lib/utils';
import type { DistributionVisualizerProps } from '../../types';

/**
 * DistributionVisualizer - Composant principal de visualisation des distributions
 * Combine le graphique, le calculateur et le gestionnaire de préréglages
 */
export function DistributionVisualizer({ distribution, className }: DistributionVisualizerProps) {
  const calculator = useDistributionCalculator(distribution);
  const cache = useCalculationCache();

  return (
    <div className={cn("space-y-6", className)}>
      <DistributionPlot 
        distribution={distribution}
        calculator={calculator}
        cache={cache}
      />
      <CurveCalculator 
        distribution={distribution}
        calculator={calculator}
      />
      <PresetManager 
        distribution={distribution}
      />
    </div>
  );
}