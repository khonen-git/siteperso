import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { cn } from '@/lib/utils';
import type { MdxCodeProps } from '../../types';

/**
 * MdxCode - Bloc de code avec coloration syntaxique
 * Supporte différents langages et options d'affichage
 */
export function MdxCode({ 
  children, 
  language = 'typescript',
  filename,
  showLineNumbers = false,
  className 
}: MdxCodeProps) {
  return (
    <div className={cn("relative rounded-md overflow-hidden", className)}>
      {filename && (
        <div className="bg-muted/50 px-4 py-2 border-b text-sm text-muted-foreground">
          {filename}
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        showLineNumbers={showLineNumbers}
        className="!bg-muted/50 !p-4"
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}