'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { codeBlockCustomStyle, getPrismSyntaxStyle } from '@/lib/code-syntax-theme';
import type { CodeBlockProps } from '../../types';

const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then((mod) => mod.Prism),
  {
    ssr: false,
    loading: () => (
      <pre className="overflow-x-auto rounded-md border border-border bg-muted/50 p-4 font-mono text-sm text-foreground">
        Chargement…
      </pre>
    ),
  }
);

/**
 * Bloc de code MDX : coloration via Prism (react-syntax-highlighter).
 * Thème VS Code (vs / vscDarkPlus) selon le mode clair/sombre du site.
 */
export function CodeBlock({
  children,
  language = 'typescript',
  className,
}: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const syntaxStyle = getPrismSyntaxStyle(
    resolvedTheme === 'dark' ? 'dark' : 'light'
  );

  const code =
    typeof children === 'string'
      ? children.trim()
      : Array.isArray(children)
        ? children.join('').trim()
        : String(children ?? '').trim();

  return (
    <div className={cn('not-prose relative my-6', className)}>
      <SyntaxHighlighter
        language={language}
        style={syntaxStyle}
        customStyle={codeBlockCustomStyle}
        codeTagProps={{
          style: {
            fontFamily: codeBlockCustomStyle.fontFamily,
            fontSize: codeBlockCustomStyle.fontSize,
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
