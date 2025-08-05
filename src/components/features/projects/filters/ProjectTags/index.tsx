import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/data-display/badge';
import { themes } from '@/config/themes';
import { cn } from '@/lib/utils';
import type { ProjectTagsProps } from '../../types';

/**
 * ProjectTags - Affiche les tags d'un projet
 * Peut être utilisé en mode lecture seule ou avec suppression
 */
export function ProjectTags({ 
  tags, 
  className, 
  onClick, 
  removable = false 
}: ProjectTagsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className={cn(
            themes[tag as keyof typeof themes]?.color,
            (onClick || removable) && "cursor-pointer",
            "flex items-center gap-1"
          )}
          onClick={() => onClick?.(tag)}
        >
          {tag}
          {removable && (
            <X 
              className="h-3 w-3 hover:text-destructive" 
              onClick={(e) => {
                e.stopPropagation();
                onClick?.(tag);
              }}
            />
          )}
        </Badge>
      ))}
    </div>
  );
}