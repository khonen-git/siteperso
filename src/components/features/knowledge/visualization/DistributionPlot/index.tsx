import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import type { PlotProps } from '../types';

/**
 * DistributionPlot
 * 
 * Composant de visualisation pour afficher le graphique d'une distribution.
 * Utilise Recharts pour le rendu et met en cache les calculs pour optimiser les performances.
 */
export function DistributionPlot({ distribution, calculator, cache }: PlotProps) {
  // Calcul des points pour le graphique avec mise en cache
  const plotData = React.useMemo(() => {
    if (!distribution.range || !calculator?.pdf || !cache) {
      console.warn('Missing required props:', { 
        hasRange: !!distribution.range, 
        hasCalculator: !!calculator?.pdf, 
        hasCache: !!cache 
      });
      return [];
    }

    const points = [];
    const { min, max } = distribution.range;
    const step = (max - min) / 100;

    for (let x = min; x <= max; x += step) {
      // Utilisation du cache pour éviter les recalculs
      const cacheKey = `pdf_${x.toFixed(4)}`;
      let y = cache.get(cacheKey);
      
      if (y === undefined) {
        try {
          y = calculator.pdf(x);
          if (typeof y === 'number' && !isNaN(y)) {
            cache.set(cacheKey, y);
          } else {
            console.warn('Invalid y value:', y);
            continue;
          }
        } catch (error) {
          console.error('Error calculating pdf:', error);
          continue;
        }
      }

      points.push({ x, y });
    }

    return points;
  }, [distribution, calculator, cache]);

  if (!plotData.length) {
    return null;
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={plotData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            type="number"
            domain={['auto', 'auto']}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <YAxis
            domain={[0, 'auto']}
            tickFormatter={(value) => value.toFixed(3)}
          />
          <Tooltip
            formatter={(value: number) => value.toFixed(4)}
            labelFormatter={(label: number) => `x = ${label.toFixed(2)}`}
          />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#8884d8"
            dot={false}
            name="Density"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}