import { useState, useEffect } from 'react';
import type { Project } from '@/types/project';

export function useProjectsData() {
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
    async function fetchProjects() {
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

        setState({
          projects: data,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error("Erreur lors du chargement des projets:", error);
        setState({
          projects: [],
          loading: false,
          error: error instanceof Error ? error : new Error('Erreur inconnue')
        });
      }
    }

    fetchProjects();
  }, []);

  return state;
}