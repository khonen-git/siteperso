import { DistributionConfig } from '@/types/distributions';

export interface CalculationResult {
  xValues: number[];
  yValues: number[];
}

export interface Cache {
  get: (key: string) => number | undefined;
  set: (key: string, value: number) => void;
}

export interface VisualizerProps {
  distribution: DistributionConfig;
}

export interface PlotProps {
  distribution: DistributionConfig;
  calculator: {
    pdf: (x: number) => number;
  };
  cache: Cache;
}