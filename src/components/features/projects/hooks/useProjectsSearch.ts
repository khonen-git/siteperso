import { useState, useMemo } from 'react';
import { fuzzySearch } from '@/lib/search';
import type { Project } from '@/types/project';

interface ProjectWithScore extends Project {
  similarityScore: number;
}

interface UseProjectsSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Project[];
}

export function useProjectsSearch(projects: Project[]): UseProjectsSearchReturn {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    // Si pas de recherche, retourner les projets tels quels
    if (!searchQuery.trim()) {
      return projects;
    }

    // Appliquer la recherche fuzzy et calculer les scores
    const projectsWithScores: ProjectWithScore[] = projects.map(project => {
      const searchResults = fuzzySearch(
        [project],
        searchQuery,
        {
          threshold: 0.3,
          keys: ['title', 'description', 'tags']
        }
      );

      return {
        ...project,
        similarityScore: searchResults.length > 0 ? searchResults[0].similarity : 0
      };
    });

    // Filtrer les résultats avec un score > 0 et trier par score
    return projectsWithScores
      .filter(project => project.similarityScore > 0)
      .sort((a, b) => b.similarityScore - a.similarityScore);
  }, [projects, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults
  };
}