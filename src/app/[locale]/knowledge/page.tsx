import * as React from 'react';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { KnowledgeHome } from '@/components/features/knowledge/KnowledgeHome';
import { getFilteredNavigationData } from '@/lib/knowledge/navigation';
import { routing } from '@/i18n/routing';

interface KnowledgePageProps {
  params: Promise<{ locale: string }>;
}

export default async function KnowledgePage({
  params,
}: KnowledgePageProps): Promise<React.JSX.Element> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <KnowledgeHome navItems={getFilteredNavigationData(locale)} />;
}
