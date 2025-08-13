import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProjectCard } from '@/components/features/projects/cards/ProjectCard';
import { LoadingState } from '@/components/ui/feedback/LoadingState';
import { EmptyState } from '@/components/ui/feedback/EmptyState';
import type { ProjectsGridProps } from './types';

export function ProjectsGrid({
  projects,
  loading = false,
  className,
  animationDelay = 0.2,
  emptyMessage = "Aucun projet ne correspond à vos critères de recherche."
}: ProjectsGridProps) {
  if (loading) {
    return <LoadingState />;
  }

  if (projects.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className={cn('grid gap-8 sm:grid-cols-2 lg:grid-cols-3', className)}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </motion.div>
  );
}