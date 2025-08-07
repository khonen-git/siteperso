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

export function SortSelect({
  value,
  onChange,
  className
}: SortSelectProps) {
  const handleValueChange = (newValue: string) => {
    onChange(newValue as SortOption);
  };

  return (
    <Select
      value={value}
      onValueChange={handleValueChange}
      className={className}
    >
      <SelectTrigger>
        <SelectValue placeholder="Trier par" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Trier par</SelectLabel>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="title">Titre</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}