'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
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
import themes from '@/config/themes';

export default function ProjectsPage(): React.JSX.Element {
  const t = useTranslations('projects');
  const { projects, loading } = useProjectsData();

  const categoryLabels = React.useMemo(() => {
    const keys = Array.from(new Set(projects.map((p) => p.category)));
    return Object.fromEntries(
      keys.map((key) => {
        const messageKey = `categories.${key}` as const;
        const label = t.has(messageKey) ? t(messageKey) : key;
        return [key, label];
      })
    );
  }, [projects, t]);

  const {
    filters,
    setCategory,
    setTags,
    setSortBy,
    filteredProjects,
    allTags,
  } = useProjectsFilter(projects);

  const { searchQuery, setSearchQuery, searchResults } = useProjectsSearch(filteredProjects);

  const finalProjects = searchQuery ? searchResults : filteredProjects;

  const handleRemoveTag = (tag: string) => {
    setTags(filters.tags.filter((item) => item !== tag));
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="container py-16">
        <ProjectsHeader title={t('header.title')} description={t('header.description')} />

        <div className="mt-12 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t('filters.searchPlaceholder')}
            />

            <CategorySelect
              value={filters.category}
              onChange={setCategory}
              categories={categoryLabels}
              labels={{
                placeholder: t('filters.category'),
                group: t('filters.categories'),
                all: t('filters.allCategories'),
              }}
            />

            <TagsSelect
              value={filters.tags}
              onChange={setTags}
              availableTags={allTags}
              labels={{
                placeholder: t('filters.technologies'),
                group: t('filters.technologies'),
                all: t('filters.allTechnologies'),
              }}
            />

            <SortSelect
              value={filters.sortBy}
              onChange={setSortBy}
              labels={{
                placeholder: t('filters.sortBy'),
                group: t('filters.sortBy'),
                date: t('filters.sortDate'),
                title: t('filters.sortTitle'),
              }}
            />
          </div>

          {filters.tags.length > 0 && (
            <SelectedTags
              tags={filters.tags}
              onRemove={handleRemoveTag}
              themes={themes}
            />
          )}
        </div>

        <div className="mt-16">
          <ProjectsGrid
            projects={finalProjects}
            loading={loading}
            emptyMessage={t('grid.empty')}
          />
        </div>
      </section>
    </div>
  );
}
