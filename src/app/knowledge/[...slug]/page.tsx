import * as React from 'react';
import { notFound } from 'next/navigation';
import { KnowledgeLayout } from '@/components/layouts/KnowledgeLayout';
import NotFoundKnowledge from '@/components/features/knowledge/NotFoundKnowledge';
import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/mdx/MDXComponents';

interface KnowledgePageProps {
  params: {
    slug: string[];
  };
}

interface Frontmatter {
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
}

async function getKnowledgeContent(slug: string[]) {
  const filePath = path.join(process.cwd(), 'src/content/knowledge', `${slug.join('/')}.mdx`);

  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const source = fs.readFileSync(filePath, 'utf8');
    const { content, frontmatter } = await compileMDX<Frontmatter>({
      source,
      components: MDXComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
          format: 'mdx'
        },
      },
    });

    return { content, frontmatter };
  } catch (error) {
    console.error('Erreur lors du chargement du contenu:', error);
    return null;
  }
}

export default async function KnowledgePage({ params }: KnowledgePageProps) {
  const data = await getKnowledgeContent(params.slug);

  if (!data) {
    return <NotFoundKnowledge />;
  }

  return (
    <KnowledgeLayout>
      <article className="prose prose-gray dark:prose-invert max-w-none">
        <h1>{data.frontmatter.title}</h1>
        {data.content}
      </article>
    </KnowledgeLayout>
  );
}