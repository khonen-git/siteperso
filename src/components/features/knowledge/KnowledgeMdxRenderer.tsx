'use client';

import * as React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import MDXComponents from '@/components/mdx/MDXComponents';
import { NotaBene } from '@/components/mdx/NotaBene';
import {
  getAiContentNotice,
  isDesignPatternsArticle,
} from '@/lib/knowledge/ai-content-notice';

interface KnowledgeMdxRendererProps {
  source: MDXRemoteSerializeResult;
  title?: string;
  locale: string;
  slug: string[];
}

export function KnowledgeMdxRenderer({
  source,
  title,
  locale,
  slug,
}: KnowledgeMdxRendererProps): React.JSX.Element {
  const showAiNotice = isDesignPatternsArticle(slug);
  const aiNotice = getAiContentNotice(locale);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <article className="prose prose-gray dark:prose-invert max-w-none">
        {title ? <h1>{title}</h1> : null}
        {showAiNotice ? <NotaBene>{aiNotice}</NotaBene> : null}
        <p className="text-muted-foreground text-sm">Chargement du contenu…</p>
      </article>
    );
  }

  return (
    <article className="prose prose-gray dark:prose-invert max-w-none">
      {title ? <h1>{title}</h1> : null}
      {showAiNotice ? <NotaBene>{aiNotice}</NotaBene> : null}
      <MDXRemote {...source} components={MDXComponents} />
    </article>
  );
}
