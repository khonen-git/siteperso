'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import type { CodeBlockProps } from '../../types';

const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then((mod) => mod.Prism),
  {
    ssr: false,
    loading: () => (
      <pre className="overflow-x-auto rounded-md bg-muted/50 p-4 font-mono text-sm">
        Chargement…
      </pre>
    ),
  }
);

/**
 * CodeBlock - Affichage de code avec coloration syntaxique (client uniquement)
 */
export function CodeBlock({
  children,
  language = 'typescript',
  className,
}: CodeBlockProps) {
  const code =
    typeof children === 'string'
      ? children.trim()
      : Array.isArray(children)
        ? children.join('').trim()
        : String(children ?? '').trim();

  return (
    <div className={cn('relative rounded-md', className)}>
      <SyntaxHighlighter language={language} className="!bg-muted/50 !p-4">
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
