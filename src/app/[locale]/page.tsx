import * as React from 'react';
import { setRequestLocale } from 'next-intl/server';
import { HomeHero } from '@/components/sections/home/HomeHero';
import { HomeBento } from '@/components/sections/home/HomeBento';
import { getBlogPosts } from '@/lib/blog/content';
import { getProjects } from '@/lib/projects/content';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Project } from '@/types/project';

const FEATURED_PROJECT_SLUGS = ['financial-ml-lab', 'implied-volatility-surface'] as const;

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

function pickFeaturedProjects(projects: Project[]): Project[] {
  return FEATURED_PROJECT_SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter(
    (p): p is Project => p != null
  );
}

export default async function Home({ params }: HomePageProps): Promise<React.JSX.Element> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const projects = getProjects(locale);
  const featuredProjects = pickFeaturedProjects(projects);
  const latestBlog = getBlogPosts(locale)[0] ?? null;

  return (
    <>
      <HomeHero />
      <HomeBento featuredProjects={featuredProjects} latestBlog={latestBlog} />
    </>
  );
}
