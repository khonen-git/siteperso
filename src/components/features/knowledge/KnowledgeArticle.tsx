import * as React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { KnowledgeLayout } from '@/components/layouts/KnowledgeLayout';
import NotFoundKnowledge from '@/components/features/knowledge/NotFoundKnowledge';
import { KnowledgeMdxRenderer } from '@/components/features/knowledge/KnowledgeMdxRenderer';
import MDXComponents from '@/components/mdx/MDXComponents';
import { resolveKnowledgeFilePath } from '@/lib/knowledge/content';
import { isKnowledgeDraft } from '@/lib/knowledge/meta';
import { getFilteredNavigationData } from '@/lib/knowledge/navigation';
import type { TreeItem } from '@/config/knowledge/types';

interface KnowledgeArticleProps {
  locale: string;
  slug: string[];
}

export async function KnowledgeArticle({
  locale,
  slug,
}: KnowledgeArticleProps): Promise<React.JSX.Element> {
  const filePath = resolveKnowledgeFilePath(locale, slug);

  if (!filePath) {
    return <NotFoundKnowledge />;
  }

  if (isKnowledgeDraft(locale, slug)) {
    notFound();
  }

  const navItems: TreeItem[] = getFilteredNavigationData(locale);

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(raw);

    return (
      <KnowledgeLayout navItems={navItems}>
        <KnowledgeMdxRenderer locale={locale} slug={slug}>
          <MDXRemote
            source={content}
            components={MDXComponents as React.ComponentProps<typeof MDXRemote>['components']}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                format: 'mdx',
              },
            }}
          />
        </KnowledgeMdxRenderer>
      </KnowledgeLayout>
    );
  } catch {
    return <NotFoundKnowledge />;
  }
}
