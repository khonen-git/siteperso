import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface ProjectMeta {
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  link: string;
  date: string;
  status: 'completed' | 'in-progress' | 'planned';
}



export interface ProjectContent {
  meta: ProjectMeta;
  content: MDXRemoteSerializeResult;
}

// Types des composants
import type { Project } from '@/types/project';

export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export interface ProjectContentProps {
  content: MDXRemoteSerializeResult;
  meta: ProjectMeta;
}

// Types pour les animations
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