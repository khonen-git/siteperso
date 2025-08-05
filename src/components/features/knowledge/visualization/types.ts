export interface Distribution {
  name: string;
  range: {
    min: number;
    max: number;
  };
  parameters: Record<string, number>;
  pdf: (x: number) => number;
  cdf: (x: number) => number;
}

export interface Calculator {
  pdf: (x: number) => number;
  cdf: (x: number) => number;
  calculate: (params: Record<string, number>) => void;
}

export interface Cache {
  get: (key: string) => number | null;
  set: (key: string, value: number) => void;
}

export interface VisualizerProps {
  distribution: Distribution;
}

export interface PlotProps {
  distribution: Distribution;
  calculator: Calculator;
  cache: Cache;
}