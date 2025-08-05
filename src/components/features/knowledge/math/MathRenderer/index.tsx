import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { cn } from '@/lib/utils';
import type { MathProps } from '../types';

/**
 * MathBlock - Rendu de formules mathématiques en mode bloc
 * Utilise KaTeX pour le rendu des formules mathématiques
 */
export function MathBlock({ children, className }: MathProps) {
  return (
    <div className={cn("my-4", className)}>
      <BlockMath math={children} />
    </div>
  );
}

/**
 * MathInline - Rendu de formules mathématiques en ligne
 * Utilise KaTeX pour le rendu des formules mathématiques
 */
export function MathInline({ children, className }: MathProps) {
  return (
    <span className={className}>
      <InlineMath math={children} />
    </span>
  );
}