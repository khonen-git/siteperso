import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import type { Project } from '@/types/project';

export function useProjectsData() {
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
    async function fetchProjects() {
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

        const projects: Project[] = data.map(
          (project: Omit<Project, 'link'> & { slug: string }) => ({
            ...project,
            link: `/projects/${project.slug}`,
          })
        );

        setState({
          projects,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
        setState({
          projects: [],
          loading: false,
          error: error instanceof Error ? error : new Error(t('unknown')),
        });
      }
    }

    fetchProjects();
  }, [locale]);

  return state;
}
