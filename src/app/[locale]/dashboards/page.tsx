import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { DashboardHub } from '@/components/dashboards/DashboardHub';
import { routing } from '@/i18n/routing';

interface DashboardsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardsPage({
  params,
}: DashboardsPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <DashboardHub />;
}
