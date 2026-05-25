import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { Project } from '@/types/project';

export function useRecentProjects(limit: number = 3) {
  const locale = useLocale();
  const t = useTranslations('projects.errors');
  const [state, setState] = useState<{
    projects: Project[];
    loading: boolean;
    error: Error | null;
  }>({
    projects: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchRecentProjects() {
      try {
        const response = await fetch(`/api/projects?locale=${locale}`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(t('loadFailed'));
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(t('invalidData'));
        }

        const validProjects: Project[] = data
          .filter(
            (project: Project) =>
              project &&
              project.id !== undefined &&
              project.title &&
              project.description &&
              project.image
          )
          .slice(0, limit)
          .map((project: Omit<Project, 'link'> & { slug: string }) => ({
            ...project,
            link: `/projects/${project.slug}`,
          }));

        setState({
          projects: validProjects,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Erreur lors du chargement des projets récents:', error);
        setState({
          projects: [],
          loading: false,
          error: error instanceof Error ? error : new Error(t('unknown')),
        });
      }
    }

    fetchRecentProjects();
  }, [limit, locale]);

  return state;
}
