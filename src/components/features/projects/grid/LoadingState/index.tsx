import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LoadingStateProps } from './types';

export function LoadingState({
  message = "Chargement des projets...",
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