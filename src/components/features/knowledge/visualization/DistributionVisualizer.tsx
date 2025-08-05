import React from 'react';
import { DistributionPlot } from './DistributionPlot';
import { CurveCalculator } from './CurveCalculator';
import { PresetManager } from './PresetManager';

interface DistributionVisualizerProps {
  distribution: any; // À typer correctement selon vos besoins
}

export function DistributionVisualizer({ distribution }: DistributionVisualizerProps) {
  return (
    <div className="space-y-4">
      <DistributionPlot distribution={distribution} />
      <CurveCalculator distribution={distribution} />
      <PresetManager distribution={distribution} />
    </div>
  );
}