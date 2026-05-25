import * as React from 'react';
import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import { KnowledgeLayout } from '@/components/layouts/KnowledgeLayout';
import NotFoundKnowledge from '@/components/features/knowledge/NotFoundKnowledge';
import MDXComponents from '@/components/mdx/MDXComponents';
import { resolveKnowledgeFilePath } from '@/lib/knowledge/content';

interface Frontmatter {
  title: string;
  description?: string;
}

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
    const source = fs.readFileSync(filePath, 'utf8');
    const { content, frontmatter } = await compileMDX<Frontmatter>({
      source,
      components: MDXComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
          format: 'mdx',
        },
      },
    });

    return (
      <KnowledgeLayout>
        <article className="prose prose-gray dark:prose-invert max-w-none">
          {frontmatter.title ? <h1>{frontmatter.title}</h1> : null}
          {content}
        </article>
      </KnowledgeLayout>
    );
  } catch (error) {
    console.error('Erreur lors du chargement du contenu:', error);
    return <NotFoundKnowledge />;
  }
}
