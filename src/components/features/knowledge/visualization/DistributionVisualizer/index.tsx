import React from 'react';
import { DistributionPlot } from '../DistributionPlot';
import { CurveCalculator } from '../components/CurveCalculator';
import { PresetManager } from '../components/PresetManager';
import { useDistributionCalculator } from '@/hooks/useDistributionCalculator';
import { useCalculationCache } from '@/hooks/useCalculationCache';
import type { VisualizerProps } from '../types';

/**
 * DistributionVisualizer
 * 
 * Composant principal pour la visualisation des distributions.
 * Gère l'orchestration entre le graphique, le calculateur et les préréglages.
 */
export function DistributionVisualizer({ distribution }: VisualizerProps) {
  // Hooks pour les calculs et le cache
  const calculator = useDistributionCalculator(distribution);
  const cache = useCalculationCache();

  return (
    <div className="space-y-6">
      {/* Graphique de la distribution */}
      <DistributionPlot 
        distribution={distribution}
        calculator={calculator}
        cache={cache}
      />

      {/* Calculateur de valeurs */}
      <CurveCalculator 
        distribution={distribution}
        calculator={calculator}
        cache={cache}
      />

      {/* Gestionnaire de préréglages */}
      <PresetManager 
        distribution={distribution}
        calculator={calculator}
      />
    </div>
  );
}