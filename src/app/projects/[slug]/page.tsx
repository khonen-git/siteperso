'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useProjectDetail } from '@/components/features/projects/detail/hooks/useProjectDetail';
import { LoadingState } from '@/components/features/projects/detail/states/LoadingState';
import { ErrorState } from '@/components/features/projects/detail/states/ErrorState';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectContent from '@/components/project/ProjectContent';

export default function ProjectPage(): React.JSX.Element {
  const { slug } = useParams() as { slug: string };
  const { project, content, loading, error, isNotFound } = useProjectDetail(slug);

  if (loading) {
    return <LoadingState />;
  }

  if (error || isNotFound) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <ProjectHero project={project!} />
      <ProjectContent content={content!} />
    </div>
  );
}