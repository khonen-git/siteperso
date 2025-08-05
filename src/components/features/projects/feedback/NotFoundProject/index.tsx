import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/inputs/button';
import { cn } from '@/lib/utils';
import type { NotFoundProjectProps } from '../../types';

/**
 * NotFoundProject - Page d'erreur 404 pour les projets
 * Affiche un message d'erreur et un lien de retour
 */
export function NotFoundProject({ className }: NotFoundProjectProps) {
  return (
    <div className={cn(
      "container flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center",
      className
    )}>
      <h1 className="text-4xl font-bold">Projet Non Trouvé</h1>
      <p className="text-muted-foreground">
        Le projet que vous recherchez n&apos;existe pas ou a été déplacé.
      </p>
      <Button asChild>
        <Link href="/projects">
          Retour à la liste des projets
        </Link>
      </Button>
    </div>
  );
}