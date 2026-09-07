import * as React from 'react';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { HomePage } from '@/components/sections/home/HomePage';
import { getBlogPosts } from '@/lib/blog/content';
import { getImpliedVolSnapshot } from '@/lib/dashboards/implied-vol.server';
import { getProjects } from '@/lib/projects/content';
import { routing } from '@/i18n/routing';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';
import type { Project } from '@/types/project';

const FEATURED_PROJECT_SLUGS = ['financial-ml-lab', 'implied-volatility-surface'] as const;

type PageProps = {
  params: Promise<{ locale: string }>;
};

function loadIvSnapshot(): ImpliedVolSnapshot | null {
  try {
    return getImpliedVolSnapshot('SPY');
  } catch {
    return null;
  }
}

function pickFeaturedProjects(projects: Project[]): Project[] {
  return FEATURED_PROJECT_SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter(
    (p): p is Project => p != null
  );
}

export default async function Home({ params }: PageProps): Promise<React.JSX.Element> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const projects = getProjects(locale);
  const featuredProjects = pickFeaturedProjects(projects);
  const latestBlog = getBlogPosts(locale)[0] ?? null;
  const ivSnapshot = loadIvSnapshot();

  return (
    <HomePage featuredProjects={featuredProjects} latestBlog={latestBlog} ivSnapshot={ivSnapshot} />
  );
}
