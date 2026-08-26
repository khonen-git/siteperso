'use client';

import * as React from 'react';
import { NotaBene } from '@/components/mdx/NotaBene';
import { KnowledgeMdxProvider } from '@/components/mdx/KnowledgeMdxContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  getAiContentNotice,
  isDesignPatternsArticle,
} from '@/lib/knowledge/ai-content-notice';

interface KnowledgeMdxRendererProps {
  locale: string;
  slug: string[];
  children: React.ReactNode;
}

export function KnowledgeMdxRenderer({
  locale,
  slug,
  children,
}: KnowledgeMdxRendererProps): React.JSX.Element {
  const showAiNotice = isDesignPatternsArticle(slug);
  const aiNotice = getAiContentNotice(locale);

  return (
    <article className="prose prose-gray prose-h1:mt-2 dark:prose-invert max-w-none">
      {showAiNotice ? <NotaBene>{aiNotice}</NotaBene> : null}
      <KnowledgeMdxProvider locale={locale}>
        <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
      </KnowledgeMdxProvider>
    </article>
  );
}
