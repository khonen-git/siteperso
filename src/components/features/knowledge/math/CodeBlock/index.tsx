import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { cn } from '@/lib/utils';
import type { CodeBlockProps } from '../../types';

/**
 * CodeBlock - Composant pour l'affichage de code avec coloration syntaxique
 */
export function CodeBlock({ 
  children, 
  language = 'typescript',
  className 
}: CodeBlockProps) {
  return (
    <div className={cn("relative rounded-md", className)}>
      <SyntaxHighlighter
        language={language}
        className="!bg-muted/50 !p-4"
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}