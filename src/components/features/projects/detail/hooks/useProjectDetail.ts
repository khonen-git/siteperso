import { useState, useEffect } from 'react';
import type { ProjectDetail } from '@/types/project';
import type { ProjectDetailState, UseProjectDetailReturn } from './types';

const initialState: ProjectDetailState = {
  project: null,
  content: null,
  loading: true,
  error: null
};

export function useProjectDetail(slug: string): UseProjectDetailReturn {
  const [state, setState] = useState<ProjectDetailState>(initialState);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Récupérer le contenu du projet via l'API
        const response = await fetch(`/api/projects/${slug}`, {
          cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'default',
        });
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const projectContent = await response.json();
        
        // Transformer les métadonnées en objet ProjectDetail
        const projectDetail: ProjectDetail = {
          id: projectContent.frontmatter.id,
          title: projectContent.frontmatter.title,
          description: projectContent.frontmatter.description,
          image: projectContent.frontmatter.image,
          date: projectContent.frontmatter.date,
          category: projectContent.frontmatter.category,
          tags: projectContent.frontmatter.tags,
          content: {
            summary: '',
            objectives: [],
            approach: '',
            technologies: [],
            results: '',
            images: [],
            conclusion: ''
          }
        };
        
        setState({
          project: projectDetail,
          content: projectContent.content,
          loading: false,
          error: null
        });
      } catch (error) {
        setState({
          project: null,
          content: null,
          loading: false,
          error: error instanceof Error ? error : new Error('Une erreur est survenue')
        });
      }
    };
    
    fetchProject();
  }, [slug]);

  return {
    ...state,
    isNotFound: !state.loading && (!state.project || !state.content)
  };
}