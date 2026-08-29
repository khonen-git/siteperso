import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { KnowledgeArticle } from '@/components/features/knowledge/KnowledgeArticle';
import { listPublishedKnowledgeSlugs } from '@/lib/knowledge/content';
import { routing } from '@/i18n/routing';

interface KnowledgePageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    listPublishedKnowledgeSlugs(locale).map((slug) => ({
      locale,
      slug,
    }))
  );
}

export default async function KnowledgePage({ params }: KnowledgePageProps) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <KnowledgeArticle locale={locale} slug={slug} />;
}
