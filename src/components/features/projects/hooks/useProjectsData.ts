import { useState, useEffect } from 'react';
import fallbackProjects, { fetchProjects } from '@/data/projectsList';
import type { Project } from '@/types/project';

interface UseProjectsDataReturn {
  projects: Project[];
  loading: boolean;
  error: Error | null;
}

export function useProjectsData(): UseProjectsDataReturn {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
        setError(null);
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
        setError(error instanceof Error ? error : new Error('Erreur inconnue'));
        // Fallback sur les projets statiques déjà chargés
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return { projects, loading, error };
}