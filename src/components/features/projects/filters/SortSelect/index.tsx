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
import type { SortSelectProps, SortOption } from './types';

export function SortSelect({ value, onChange, labels, className }: SortSelectProps) {
  const handleValueChange = (newValue: string) => {
    onChange(newValue as SortOption);
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder={labels.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{labels.group}</SelectLabel>
          <SelectItem value="importance">{labels.importance}</SelectItem>
          <SelectItem value="date">{labels.date}</SelectItem>
          <SelectItem value="title">{labels.title}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
