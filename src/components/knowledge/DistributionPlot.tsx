import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Point {
  x: number;
  y: number;
  [key: string]: number;
}

interface CurveData {
  id: string;
  color: string;
  data: Point[];
}

interface DistributionPlotProps {
  curves: CurveData[];
  xDomain?: [number, number];
  yDomain?: [number, number];
  onFunctionTypeChange?: (type: 'pdf' | 'cdf') => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-lg p-2">
        <p className="text-sm font-medium">x: {Number(label).toFixed(2)}</p>
        {payload.map((entry: any) => (
          <p
            key={entry.dataKey}
            className="text-sm"
            style={{ color: entry.color }}
          >
            {`${entry.dataKey.replace(/curve/, 'Courbe ')}: ${entry.value.toFixed(4)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Fonction pour arrondir à l'unité supérieure ou inférieure
const roundToUnit = (value: number, roundUp: boolean): number => {
  return roundUp ? Math.ceil(value) : Math.floor(value);
};

// Fonction pour calculer le nombre de divisions de la grille
const calculateGridDivisions = (min: number, max: number): number => {
  return Math.abs(roundToUnit(max, true) - roundToUnit(min, false));
};

export function DistributionPlot({ curves, xDomain, yDomain, onFunctionTypeChange }: DistributionPlotProps) {
  const [functionType, setFunctionType] = useState<'pdf' | 'cdf'>('pdf');

  const handleFunctionTypeChange = (value: 'pdf' | 'cdf') => {
    setFunctionType(value);
    onFunctionTypeChange?.(value);
  };

  // Transformer les données pour Recharts
  const chartData = curves[0].data.map((point, index) => {
    const transformedPoint: Record<string, number> = { x: point.x };
    curves.forEach(curve => {
      transformedPoint[curve.id] = curve.data[index].y;
    });
    return transformedPoint;
  });

  // Calculer les domaines si non fournis
  const rawXDomain = xDomain ?? [
    Math.min(...curves[0].data.map(p => p.x)),
    Math.max(...curves[0].data.map(p => p.x))
  ];

  // Arrondir les domaines aux unités
  const computedXDomain: [number, number] = [
    roundToUnit(rawXDomain[0], false),
    roundToUnit(rawXDomain[1], true)
  ];

  // Calculer le nombre de divisions pour la grille en X
  const xDivisions = calculateGridDivisions(computedXDomain[0], computedXDomain[1]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <span className="text-sm text-muted-foreground">Type de fonction :</span>
        <Select
          value={functionType}
          onValueChange={handleFunctionTypeChange}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Choisir le type de fonction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pdf">Densité de probabilité</SelectItem>
            <SelectItem value="cdf">Fonction de répartition</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="aspect-square w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData} 
            margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
            className="bg-muted/30"
          >
            <CartesianGrid 
              strokeDasharray="0" 
              stroke="#9CA3AF"
              strokeOpacity={0.2}
              horizontal={true}
              vertical={true}
            />
            <XAxis
              domain={computedXDomain}
              type="number"
              dataKey="x"
              tickFormatter={value => value.toFixed(0)}
              interval={0}
              tickCount={xDivisions + 1}
            />
            <YAxis
              domain={[0, 1]}
              tickFormatter={value => value.toFixed(1)}
              interval={0}
              tickCount={11}
              allowDataOverflow={true}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {curves.map(curve => (
              <Line
                key={curve.id}
                type="monotone"
                dataKey={curve.id}
                stroke={curve.color}
                name={`${curve.id.replace(/curve/, 'Courbe ')}`}
                dot={false}
                activeDot={{ r: 4 }}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 