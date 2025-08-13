import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = "Chargement...",
  className
}: LoadingStateProps) {
  return (
    <div className={cn('mt-16 text-center', className)}>
      <div className="inline-flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-lg">{message}</span>
      </div>
    </div>
  );
}


