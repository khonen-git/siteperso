import React, { useState, useCallback, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { MathInline } from '@/components/knowledge/Math';
import { DistributionConfig, DistributionParameter } from '@/types/distributions';
import { DistributionPlot } from './DistributionPlot';
import { CurveCalculator } from './CurveCalculator';

interface Point {
  x: number;
  y: number;
  [key: string]: number;
}

interface Curve {
  id: string;
  color: string;
  parameters: Record<string, number>;
}

interface CurveData {
  id: string;
  color: string;
  data: Point[];
}

interface DistributionVisualizerProps {
  distribution: DistributionConfig;
}

const COLORS = [
  '#2563eb', // blue-600
  '#dc2626', // red-600
  '#16a34a', // green-600
  '#9333ea', // purple-600
];

const MAX_CURVES = 4;

interface ParameterInputProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

function ParameterInput({ value, min, max, step, onChange }: Required<ParameterInputProps>) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toFixed(2));
  }, [value]);

  const handleBlur = () => {
    setIsEditing(false);
    let newValue = parseFloat(inputValue);
    
    // Vérifier si la valeur est un nombre valide
    if (isNaN(newValue)) {
      setInputValue(value.toFixed(2));
      return;
    }

    // Limiter la valeur aux bornes min et max
    newValue = Math.max(min, Math.min(max, newValue));
    
    // Arrondir au step le plus proche
    newValue = Math.round(newValue / step) * step;
    
    onChange(newValue);
    setInputValue(newValue.toFixed(2));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setInputValue(value.toFixed(2));
    }
  };

  if (isEditing) {
    return (
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-20 h-6 px-1 text-right text-sm"
        autoFocus
      />
    );
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      className="cursor-pointer hover:bg-muted px-1 rounded"
    >
      {value.toFixed(2)}
    </span>
  );
}

export function DistributionVisualizer({ distribution }: DistributionVisualizerProps) {
  const [curves, setCurves] = useState<Curve[]>([]);
  const [selectedCurve, setSelectedCurve] = useState<string | null>(null);
  const [curvesData, setCurvesData] = useState<CurveData[]>([]);
  const [functionType, setFunctionType] = useState<'pdf' | 'cdf'>('pdf');

  // Initialiser avec une courbe par défaut
  useEffect(() => {
    if (curves.length === 0) {
      const defaultParameters = Object.fromEntries(
        distribution.parameters.map(param => [param.name, param.defaultValue])
      );
      
      const initialCurve: Curve = {
        id: 'curve1',
        color: COLORS[0],
        parameters: defaultParameters,
      };
      
      setCurves([initialCurve]);
      setSelectedCurve(initialCurve.id);
    }
  }, [distribution.parameters]);

  const getNextAvailableCurveNumber = () => {
    const usedNumbers = curves.map(curve => parseInt(curve.id.replace('curve', '')));
    for (let i = 1; i <= MAX_CURVES; i++) {
      if (!usedNumbers.includes(i)) {
        return i;
      }
    }
    return curves.length + 1;
  };

  const addCurve = () => {
    if (curves.length >= MAX_CURVES) return;

    const defaultParameters = Object.fromEntries(
      distribution.parameters.map(param => [param.name, param.defaultValue])
    );
    
    const curveNumber = getNextAvailableCurveNumber();
    const newCurve: Curve = {
      id: `curve${curveNumber}`,
      color: COLORS[(curveNumber - 1) % COLORS.length],
      parameters: defaultParameters,
    };
    
    setCurves([...curves, newCurve]);
    setSelectedCurve(newCurve.id);
  };

  const removeCurve = (id: string) => {
    // Empêcher la suppression si c'est la dernière courbe
    if (curves.length <= 1) return;

    setCurves(curves.filter(c => c.id !== id));
    setCurvesData(curvesData.filter(c => c.id !== id));
    if (selectedCurve === id) {
      // Sélectionner la première courbe restante
      const remainingCurves = curves.filter(c => c.id !== id);
      setSelectedCurve(remainingCurves[0]?.id ?? null);
    }
  };

  const updateParameter = (curveId: string, paramName: string, value: number) => {
    setCurves(curves.map(curve =>
      curve.id === curveId
        ? { ...curve, parameters: { ...curve.parameters, [paramName]: value } }
        : curve
    ));
  };

  const handleCurveDataCalculated = useCallback((data: CurveData) => {
    setCurvesData(prev => {
      const index = prev.findIndex(c => c.id === data.id);
      if (index === -1) {
        return [...prev, data];
      }
      const newData = [...prev];
      newData[index] = data;
      return newData;
    });
  }, []);

  const handleFunctionTypeChange = (type: 'pdf' | 'cdf') => {
    setFunctionType(type);
  };

  return (
    <div className="space-y-4">
      {/* Boutons des courbes en haut */}
      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={addCurve}
          disabled={curves.length >= MAX_CURVES}
        >
          Ajouter une courbe
        </Button>
        {curves.map(curve => (
          <Button
            key={curve.id}
            variant="outline"
            style={{
              borderColor: curve.color,
              color: curve.color,
              backgroundColor: 'transparent'
            }}
          >
            {curve.id.replace(/curve/, 'Courbe ')}
            {curves.length > 1 && (
              <button
                className="ml-2 text-xs hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  removeCurve(curve.id);
                }}
              >
                ×
              </button>
            )}
          </Button>
        ))}
      </div>

      {/* Zone principale avec paramètres à gauche et graphique à droite */}
      <div className="grid grid-cols-[350px,1fr] gap-4">
        {/* Panneau de gauche avec les paramètres */}
        <Card className="p-4">
          <h3 className="font-medium text-lg mb-4">Paramètres des courbes</h3>
          <ScrollArea className="h-[500px]">
            <div className="space-y-2 pr-4">
              {curves.map(curve => (
                <Card key={curve.id} className="p-3 bg-muted/50">
                  <h4 className="text-sm font-medium mb-2" style={{ color: curve.color }}>
                    {curve.id.replace(/curve/, 'Courbe ')}
                  </h4>
                  <div className="space-y-1.5">
                    {distribution.parameters.map((param: DistributionParameter) => {
                      const currentValue = curve.parameters[param.name];
                      if (currentValue === undefined) return null;

                      const minValue = param.min ?? 0;
                      const maxValue = param.max ?? 100;
                      const stepValue = param.step ?? 1;

                      return (
                        <div key={param.name} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <label className="text-muted-foreground">
                              {param.name === 'mu' ? (
                                <MathInline>\mu</MathInline>
                              ) : param.name === 'sigma' ? (
                                <MathInline>\sigma</MathInline>
                              ) : (
                                param.name
                              )}
                            </label>
                            <ParameterInput
                              value={currentValue}
                              min={minValue}
                              max={maxValue}
                              step={stepValue}
                              onChange={(value) => updateParameter(curve.id, param.name, value)}
                            />
                          </div>
                          <Slider
                            min={minValue}
                            max={maxValue}
                            step={stepValue}
                            value={[currentValue]}
                            onValueChange={([value]) => updateParameter(curve.id, param.name, value)}
                            className="py-0.5"
                          />
                        </div>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Panneau de droite avec le graphique */}
        <div className="min-h-[600px]">
          {/* Calculateurs de courbes */}
          {curves.map(curve => (
            <CurveCalculator
              key={curve.id}
              curve={curve}
              distribution={distribution}
              functionType={functionType}
              onDataCalculated={handleCurveDataCalculated}
            />
          ))}

          {/* Affichage du graphique */}
          {curvesData.length > 0 && (
            <Card className="p-4">
              <DistributionPlot 
                curves={curvesData}
                onFunctionTypeChange={handleFunctionTypeChange}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 