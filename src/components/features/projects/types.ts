import type { Project } from '@/types/project';

export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export interface NotFoundProjectProps {
  className?: string;
}

export interface ProjectAnimationConfig {
  initial: {
    opacity: number;
    y: number;
  };
  animate: {
    opacity: number;
    y: number;
  };
  transition: {
    duration: number;
    delay?: number;
  };
}
