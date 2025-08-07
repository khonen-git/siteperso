import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { badgeVariants } from './styles';
import type { BadgeProps } from './types';

/**
 * Badge - Composant d'affichage d'étiquette
 * Supporte différentes variantes et peut être supprimable
 */
export function Badge({ 
  className, 
  variant, 
  removable,
  onRemove,
  children,
  ...props 
}: BadgeProps) {
  return (
    <div 
      className={cn(badgeVariants({ variant }), 
        removable && "pr-1",
        className
      )} 
      {...props}
    >
      <span className="flex items-center gap-1">
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 rounded-full p-0.5 hover:bg-background/20"
            aria-label="Supprimer"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    </div>
  );
}

export { badgeVariants };