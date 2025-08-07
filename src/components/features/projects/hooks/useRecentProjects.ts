import { useState, useEffect } from 'react';
import type { Project } from '@/types/project';

export function useRecentProjects(limit: number = 3) {
  const [state, setState] = useState<{
    projects: Project[];
    loading: boolean;
    error: Error | null;
  }>({
    projects: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    async function fetchRecentProjects() {
      try {
        const response = await fetch('/api/projects', {
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error('Erreur lors du chargement des projets');
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Format de données invalide");
        }

        // Filtrer et limiter les projets
        const validProjects = data
          .filter(project => 
            project && 
            project.id !== undefined && 
            project.title && 
            project.description && 
            project.image
          )
          .slice(0, limit)
          .map(project => ({
            ...project,
            link: `/projects/${project.slug}` // Construire le lien à partir du slug
          }));

        setState({
          projects: validProjects,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Erreur lors du chargement des projets récents:', error);
        setState({
          projects: [],
          loading: false,
          error: error instanceof Error ? error : new Error('Erreur inconnue')
        });
      }
    }

    fetchRecentProjects();
  }, [limit]);

  return state;
}