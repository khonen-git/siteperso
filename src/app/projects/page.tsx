'use client';

import React from 'react';
import { useProjectsData } from '@/components/features/projects/hooks/useProjectsData';
import { useProjectsFilter } from '@/components/features/projects/hooks/useProjectsFilter';
import { useProjectsSearch } from '@/components/features/projects/hooks/useProjectsSearch';
import { ProjectsHeader } from '@/components/features/projects/header/ProjectsHeader';
import { SearchBar } from '@/components/features/projects/filters/SearchBar';
import { CategorySelect } from '@/components/features/projects/filters/CategorySelect';
import { TagsSelect } from '@/components/features/projects/filters/TagsSelect';
import { SortSelect } from '@/components/features/projects/filters/SortSelect';
import { SelectedTags } from '@/components/features/projects/filters/SelectedTags';
import { ProjectsGrid } from '@/components/features/projects/grid/ProjectsGrid';
import categories from '@/config/categories';
import themes from '@/config/themes';

export default function ProjectsPage(): React.JSX.Element {
  // Chargement des données
  const { projects, loading, error } = useProjectsData();

  // Gestion des filtres
  const {
    filters,
    setCategory,
    setTags,
    setSortBy,
    filteredProjects,
    allTags
  } = useProjectsFilter(projects);

  // Gestion de la recherche
  const {
    searchQuery,
    setSearchQuery,
    searchResults
  } = useProjectsSearch(filteredProjects);

  // Projets finaux à afficher (après filtres et recherche)
  const finalProjects = searchQuery ? searchResults : filteredProjects;

  // Gestionnaire de suppression de tag
  const handleRemoveTag = (tag: string) => {
    setTags(filters.tags.filter(t => t !== tag));
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="container py-16">
        {/* En-tête */}
        <ProjectsHeader />

        {/* Filtres */}
        <div className="mt-12 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
            />

            <CategorySelect
              value={filters.category}
              onChange={setCategory}
              categories={categories}
            />

            <TagsSelect
              value={filters.tags}
              onChange={setTags}
              availableTags={allTags}
            />

            <SortSelect
              value={filters.sortBy}
              onChange={setSortBy}
            />
          </div>

          {/* Tags sélectionnés */}
          {filters.tags.length > 0 && (
            <SelectedTags
              tags={filters.tags}
              onRemove={handleRemoveTag}
              themes={themes}
            />
          )}
        </div>

        {/* Grille de projets */}
        <div className="mt-16">
          <ProjectsGrid
            projects={finalProjects}
            loading={loading}
          />
        </div>
      </section>
    </div>
  );
}