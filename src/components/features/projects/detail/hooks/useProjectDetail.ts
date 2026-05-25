import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { ProjectDetail } from '@/types/project';
import type { ProjectDetailState, UseProjectDetailReturn } from './types';

const initialState: ProjectDetailState = {
  project: null,
  content: null,
  loading: true,
  error: null,
};

export function useProjectDetail(slug: string): UseProjectDetailReturn {
  const locale = useLocale();
  const t = useTranslations('projects.errors');
  const [state, setState] = useState<ProjectDetailState>(initialState);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${slug}?locale=${locale}`, {
          cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'default',
        });

        if (!response.ok) {
          throw new Error(t('httpError', { status: response.status }));
        }

        const projectContent = await response.json();

        const projectDetail: ProjectDetail = {
          id: projectContent.frontmatter.id,
          title: projectContent.frontmatter.title,
          description: projectContent.frontmatter.description,
          image: projectContent.frontmatter.image,
          date: projectContent.frontmatter.date,
          category: projectContent.frontmatter.category,
          tags: projectContent.frontmatter.tags,
          slug,
          content: {
            summary: '',
            objectives: [],
            approach: '',
            technologies: [],
            results: '',
            images: [],
            conclusion: '',
          },
        };

        setState({
          project: projectDetail,
          content: projectContent.content,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          project: null,
          content: null,
          loading: false,
          error: error instanceof Error ? error : new Error(t('unknown')),
        });
      }
    };

    fetchProject();
  }, [slug, locale]);

  return {
    ...state,
    isNotFound: !state.loading && (!state.project || !state.content),
  };
}
