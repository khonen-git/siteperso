import type { Project } from '@/types/project';

export interface ProjectsGridProps {
  projects: Project[];
  loading?: boolean;
  className?: string;
  animationDelay?: number;
  emptyMessage?: string;
}