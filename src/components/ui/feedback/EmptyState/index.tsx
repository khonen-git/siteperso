import React from 'react';
import { FileX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  message?: string;
  className?: string;
  icon?: React.ComponentType<{ className?: string }> | React.ReactNode;
}

export function EmptyState({
  message = "Aucun élément à afficher.",
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


