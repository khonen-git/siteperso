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
  locale: string;
  slug: string[];
}

export function KnowledgeMdxRenderer({
  source,
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
      <article className="prose prose-gray prose-h1:mt-2 dark:prose-invert max-w-none">
        {showAiNotice ? <NotaBene>{aiNotice}</NotaBene> : null}
        <p className="text-muted-foreground text-sm">Chargement du contenu…</p>
      </article>
    );
  }

  return (
    <article className="prose prose-gray prose-h1:mt-2 dark:prose-invert max-w-none">
      {showAiNotice ? <NotaBene>{aiNotice}</NotaBene> : null}
      <MDXRemote {...source} components={MDXComponents} />
    </article>
  );
}
