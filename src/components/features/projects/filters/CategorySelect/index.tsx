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
  className
}: CategorySelectProps) {
  return (
    <Select
      value={value}
      onValueChange={onChange}
      className={className}
    >
      <SelectTrigger>
        <SelectValue placeholder="Catégorie" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Catégories</SelectLabel>
          <SelectItem value="all">Toutes les catégories</SelectItem>
          {Object.entries(categories).map(([category, description]) => (
            <SelectItem 
              key={category} 
              value={category}
              title={description}
            >
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}