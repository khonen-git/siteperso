import { Project } from '@/types/project';

export interface HeroSectionProps {
  title: string;
  description: string;
  className?: string;
}

export interface RecentProjectsProps {
  projects: Project[];
  className?: string;
}

export interface AboutSectionProps {
  className?: string;
}
