import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { cn } from '@/lib/utils';
import type { CodeBlockProps } from '../types';

/**
 * CodeBlock - Composant pour afficher du code avec coloration syntaxique
 * 
 * @param language - Langage de programmation pour la coloration syntaxique
 * @param autoRun - Si true, le code sera exécuté automatiquement (pour les notebooks)
 */
export function CodeBlock({ 
  children, 
  language = 'typescript',
  className,
  autoRun = false 
}: CodeBlockProps) {
  return (
    <div className={cn("relative", className)}>
      {autoRun && (
        <div className="absolute right-2 top-2 text-xs text-muted-foreground">
          Auto-run enabled
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        className="rounded-md !bg-muted/50 p-4"
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}