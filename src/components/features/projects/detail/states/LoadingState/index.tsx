import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LoadingStateProps } from './types';

export function LoadingState({
  message = "Chargement du projet...",
  className
}: LoadingStateProps) {
  return (
    <div className={cn('container py-16 text-center', className)}>
      <div className="inline-flex items-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <h1 className="text-3xl font-bold">{message}</h1>
      </div>
    </div>
  );
}