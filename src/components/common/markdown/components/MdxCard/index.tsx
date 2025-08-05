import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/data-display/card';
import { cn } from '@/lib/utils';
import type { MdxCardProps } from '../../types';

/**
 * MdxCard - Carte stylisée pour le contenu MDX
 * Peut inclure un titre optionnel
 */
export function MdxCard({ title, children, className }: MdxCardProps) {
  return (
    <Card className={cn("my-4", className)}>
      {title && (
        <CardHeader>
          <h3 className="text-lg font-semibold">{title}</h3>
        </CardHeader>
      )}
      <CardContent className="prose dark:prose-invert">
        {children}
      </CardContent>
    </Card>
  );
}