import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { KnowledgeArticle } from '@/components/features/knowledge/KnowledgeArticle';
import { routing } from '@/i18n/routing';

export const dynamic = 'force-dynamic';

interface KnowledgePageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

export default async function KnowledgePage({ params }: KnowledgePageProps) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <KnowledgeArticle locale={locale} slug={slug} />;
}
