import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { ProjectsPageClient } from '@/components/features/projects/ProjectsPageClient';
import { getProjects } from '@/lib/projects/content';
import { routing } from '@/i18n/routing';

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({
  params,
}: ProjectsPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const projects = getProjects(locale);

  return <ProjectsPageClient projects={projects} />;
}
