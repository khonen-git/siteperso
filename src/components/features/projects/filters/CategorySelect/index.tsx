import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { CategorySelectProps } from './types';

export function CategorySelect({
  value,
  onChange,
  categories,
  labels,
  className,
}: CategorySelectProps) {
  return (
    <Select value={value} onValueChange={onChange} className={className}>
      <SelectTrigger>
        <SelectValue placeholder={labels.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{labels.group}</SelectLabel>
          <SelectItem value="all">{labels.all}</SelectItem>
          {Object.entries(categories).map(([category, label]) => (
            <SelectItem key={category} value={category} title={label}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
