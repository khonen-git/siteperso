import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { getBlogPosts } from '@/lib/blog/content';
import { routing } from '@/i18n/routing';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const posts = getBlogPosts(locale);

  return <BlogIndex posts={posts} />;
}
