import { useState, useMemo } from 'react';
import type { Project } from '@/types/project';

interface ProjectFilters {
  category: string;
  tags: string[];
  sortBy: 'date' | 'title';
}

interface UseProjectsFilterReturn {
  filters: ProjectFilters;
  setCategory: (category: string) => void;
  setTags: (tags: string[]) => void;
  setSortBy: (sortBy: 'date' | 'title') => void;
  filteredProjects: Project[];
  allTags: string[];
}

export function useProjectsFilter(projects: Project[]): UseProjectsFilterReturn {
  const [filters, setFilters] = useState<ProjectFilters>({
    category: 'all',
    tags: [],
    sortBy: 'date'
  });

  // Récupérer tous les tags uniques
  const allTags = useMemo(() => 
    Array.from(new Set(projects.flatMap(project => project.tags))),
    [projects]
  );

  // Filtrer et trier les projets
  const filteredProjects = useMemo(() => {
    return projects
      .filter(project => {
        if (!project || !project.title || !project.tags) {
          return false;
        }
        
        const matchesCategory = filters.category === 'all' || project.category === filters.category;
        const matchesTags = filters.tags.length === 0 || 
                          filters.tags.some(tag => project.tags.includes(tag));

        return matchesCategory && matchesTags;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'date') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return a.title.localeCompare(b.title);
      });
  }, [projects, filters]);

  const setCategory = (category: string) => 
    setFilters(prev => ({ ...prev, category }));

  const setTags = (tags: string[]) => 
    setFilters(prev => ({ ...prev, tags }));

  const setSortBy = (sortBy: 'date' | 'title') => 
    setFilters(prev => ({ ...prev, sortBy }));

  return {
    filters,
    setCategory,
    setTags,
    setSortBy,
    filteredProjects,
    allTags
  };
}