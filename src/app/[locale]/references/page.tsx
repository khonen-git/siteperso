import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReferencesPageClient } from '@/components/features/references/ReferencesPageClient';
import { getReferenceCategories, getReferences } from '@/lib/references/content';
import { routing } from '@/i18n/routing';

interface ReferencesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ReferencesPage({
  params,
}: ReferencesPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const references = getReferences(locale);
  const categories = getReferenceCategories(locale);

  return <ReferencesPageClient references={references} categories={categories} />;
}
