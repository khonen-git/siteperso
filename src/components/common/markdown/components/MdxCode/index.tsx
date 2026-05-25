'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { codeBlockCustomStyle, getPrismSyntaxStyle } from '@/lib/code-syntax-theme';
import type { MdxCodeProps } from '../../types';

const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then((mod) => mod.Prism),
  { ssr: false }
);

/**
 * MdxCode - Bloc de code avec coloration syntaxique (même thème que CodeBlock knowledge)
 */
export function MdxCode({
  children,
  language = 'typescript',
  filename,
  showLineNumbers = false,
  className,
}: MdxCodeProps) {
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
    <div className={cn('not-prose relative rounded-md overflow-hidden my-6', className)}>
      {filename && (
        <div className="border-b border-border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
          {filename}
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={syntaxStyle}
        customStyle={codeBlockCustomStyle}
        showLineNumbers={showLineNumbers}
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
