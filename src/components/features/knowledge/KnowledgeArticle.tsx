import * as React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import { KnowledgeLayout } from '@/components/layouts/KnowledgeLayout';
import NotFoundKnowledge from '@/components/features/knowledge/NotFoundKnowledge';
import { KnowledgeMdxRenderer } from '@/components/features/knowledge/KnowledgeMdxRenderer';
import { resolveKnowledgeFilePath } from '@/lib/knowledge/content';

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

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(raw);

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
        format: 'mdx',
      },
    });

    return (
      <KnowledgeLayout>
        <KnowledgeMdxRenderer source={mdxSource} locale={locale} slug={slug} />
      </KnowledgeLayout>
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error ?? 'erreur inconnue');
    console.error(
      `Erreur lors du chargement du contenu (${locale}/${slug.join('/')}):`,
      message
    );
    return <NotFoundKnowledge />;
  }
}
