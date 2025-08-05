import React from 'react';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import type { KnowledgeSectionProps } from '../types';

/**
 * KnowledgeSection - Section de contenu pour la page Knowledge
 * Affiche une section avec titre, description et icône optionnelle
 */
export function KnowledgeSection({ 
  title, 
  description, 
  icon, 
  className 
}: KnowledgeSectionProps) {
  const Icon = icon ? Icons[icon as keyof typeof Icons] : null;

  return (
    <div className={cn("group rounded-lg border p-4 transition-all hover:border-primary", className)}>
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="rounded-full bg-primary/10 p-2 transition-colors group-hover:bg-primary/20">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}