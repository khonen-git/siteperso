import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import * as React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectContent from '@/components/project/ProjectContent';
import { ProjectReferences } from '@/components/project/ProjectReferences';
import MDXComponents from '@/components/mdx/MDXComponents';
import { getProject, listProjectFileNames } from '@/lib/projects/content';
import { routing } from '@/i18n/routing';

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    listProjectFileNames(locale).map((fileName) => ({
      locale,
      slug: fileName.replace(/\.mdx$/, ''),
    }))
  );
}

export default async function ProjectPage({
  params,
}: ProjectPageProps): Promise<React.JSX.Element> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const projectData = getProject(locale, slug);

  if (!projectData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <ProjectHero project={projectData.project} />
      <ProjectContent>
        <MDXRemote
          source={projectData.source}
          components={MDXComponents as React.ComponentProps<typeof MDXRemote>['components']}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
        <ProjectReferences locale={locale} referenceIds={projectData.project.relatedReferences} />
      </ProjectContent>
    </div>
  );
}
