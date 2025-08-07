import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { SelectedTagsProps } from './types';

export function SelectedTags({
  tags,
  onRemove,
  className,
  themes = {}
}: SelectedTagsProps) {
  if (tags.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map(tag => (
        <Badge
          key={tag}
          variant="secondary"
          className={cn(
            themes[tag]?.color,
            'cursor-pointer'
          )}
          onClick={() => onRemove(tag)}
        >
          {tag} ×
        </Badge>
      ))}
    </div>
  );
}