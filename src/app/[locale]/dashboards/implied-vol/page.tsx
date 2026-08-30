import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { ImpliedVolDashboard } from '@/components/dashboards/ImpliedVolDashboard';
import { getImpliedVolSnapshot } from '@/lib/dashboards/implied-vol.server';
import { routing } from '@/i18n/routing';

interface ImpliedVolPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ImpliedVolPage({
  params,
}: ImpliedVolPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  let snapshot;
  try {
    snapshot = getImpliedVolSnapshot('SPY');
  } catch {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
          …
        </div>
      }
    >
      <ImpliedVolDashboard initialSnapshot={snapshot} />
    </Suspense>
  );
}
