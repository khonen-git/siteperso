'use client';

import * as React from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ParamControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
  className?: string;
}

export function ParamControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format = (v) => v.toFixed(2),
  className,
}: ParamControlProps): React.JSX.Element {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="font-medium">{label}</span>
        <Input
          type="number"
          className="h-8 w-24 text-right"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const parsed = Number.parseFloat(e.target.value);
            if (!Number.isNaN(parsed)) {
              onChange(clamp(parsed));
            }
          }}
        />
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(clamp(v))}
      />
      <p className="text-xs text-muted-foreground">{format(value)}</p>
    </div>
  );
}
