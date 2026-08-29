import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import * as React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import MDXComponents from '@/components/mdx/MDXComponents';
import { getBlogPost, listBlogFileNames } from '@/lib/blog/content';
import { routing } from '@/i18n/routing';

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    listBlogFileNames(locale).map((fileName) => ({
      locale,
      slug: fileName.replace(/\.mdx$/, ''),
    }))
  );
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps): Promise<React.JSX.Element> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const postData = getBlogPost(locale, slug);

  if (!postData) {
    notFound();
  }

  return (
    <BlogPostLayout post={postData.post}>
      <MDXRemote
        source={postData.source}
        components={MDXComponents as React.ComponentProps<typeof MDXRemote>['components']}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            format: 'mdx',
          },
        }}
      />
    </BlogPostLayout>
  );
}
