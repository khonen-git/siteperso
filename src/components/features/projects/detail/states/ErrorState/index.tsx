import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ErrorStateProps } from './types';

export function ErrorState({
  error,
  className,
  onRetry
}: ErrorStateProps) {
  return (
    <div className={cn('container py-16 text-center', className)}>
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <h1 className="text-3xl font-bold">Projet non trouvé</h1>
      <p className="mt-4 text-muted-foreground">
        {error?.message || "Le projet que vous recherchez n'existe pas."}
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <Button asChild>
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux projets
          </Link>
        </Button>
        {onRetry && (
          <Button variant="outline" onClick={onRetry}>
            Réessayer
          </Button>
        )}
      </div>
    </div>
  );
}