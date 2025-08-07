import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { SearchBarProps } from './types';

export function SearchBar({ 
  value, 
  onChange, 
  className,
  placeholder = "Rechercher un projet..." 
}: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-8"
      />
    </div>
  );
}