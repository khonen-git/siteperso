import * as React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/sections/HeroSection';
import { RecentProjects } from '@/components/sections/RecentProjects';
import { getProjects } from '@/lib/projects/content';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomePageProps): Promise<React.JSX.Element> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations('home');
  const recentProjects = getProjects(locale).slice(0, 3);

  return (
    <>
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        description={t('hero.description')}
      />
      <RecentProjects projects={recentProjects} />
    </>
  );
}
