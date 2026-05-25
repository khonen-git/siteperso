'use client';

import * as React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import MDXComponents from '@/components/mdx/MDXComponents';

interface KnowledgeMdxRendererProps {
  source: MDXRemoteSerializeResult;
  title?: string;
}

export function KnowledgeMdxRenderer({
  source,
  title,
}: KnowledgeMdxRendererProps): React.JSX.Element {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <article className="prose prose-gray dark:prose-invert max-w-none">
        {title ? <h1>{title}</h1> : null}
        <p className="text-muted-foreground text-sm">Chargement du contenu…</p>
      </article>
    );
  }

  return (
    <article className="prose prose-gray dark:prose-invert max-w-none">
      {title ? <h1>{title}</h1> : null}
      <MDXRemote {...source} components={MDXComponents} />
    </article>
  );
}
