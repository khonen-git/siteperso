export interface DistributionParameter {
  name: string;
  label: string;
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface DistributionConfig {
  name: string;
  parameters: DistributionParameter[];
  functions: {
    pdf?: (params: Record<string, number>, x: number) => number;
    cdf?: (params: Record<string, number>, x: number) => number;
  };
} 