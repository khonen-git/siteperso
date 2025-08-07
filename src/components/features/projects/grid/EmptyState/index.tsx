import React from 'react';
import { FileX } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EmptyStateProps } from './types';

export function EmptyState({
  message = "Aucun projet ne correspond à vos critères de recherche.",
  className,
  icon: Icon = FileX
}: EmptyStateProps) {
  return (
    <div className={cn('col-span-full text-center', className)}>
      {Icon && (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          {typeof Icon === 'function' ? (
            <Icon className="h-6 w-6 text-muted-foreground" />
          ) : (
            Icon
          )}
        </div>
      )}
      <p className="text-muted-foreground">
        {message}
      </p>
    </div>
  );
}