import { DistributionConfig } from '@/types/distributions';

export interface Point {
  x: number;
  y: number;
  [key: string]: number;
}

export interface CurveData {
  id: string;
  color: string;
  data: Point[];
}

export interface CurveConfig {
  id: string;
  color: string;
  parameters: Record<string, number>;
}

export interface CurveCalculatorProps {
  curve: CurveConfig;
  distribution: DistributionConfig;
  functionType: 'pdf' | 'cdf';
  onDataCalculated: (data: CurveData) => void;
}