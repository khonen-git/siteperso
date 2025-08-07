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
import type { TagsSelectProps } from './types';

export function TagsSelect({
  value,
  onChange,
  availableTags,
  className
}: TagsSelectProps) {
  const handleValueChange = (newValue: string) => {
    if (newValue === 'all') {
      onChange([]);
    } else {
      onChange([newValue]);
    }
  };

  return (
    <Select
      value={value[0] || 'all'}
      onValueChange={handleValueChange}
      className={className}
    >
      <SelectTrigger>
        <SelectValue placeholder="Technologies" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Technologies</SelectLabel>
          <SelectItem value="all">Toutes les technologies</SelectItem>
          {availableTags.map(tag => (
            <SelectItem key={tag} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}