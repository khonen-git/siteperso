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

// Données minimales requises par la carte projet
export interface ProjectCardData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  link: string;
}

export interface ProjectContent {
  meta: ProjectMeta;
  content: MDXRemoteSerializeResult;
}

// Types des composants
export interface ProjectCardProps {
  project: ProjectCardData;
  className?: string;
}

export interface ProjectContentProps {
  content: MDXRemoteSerializeResult;
  meta: ProjectMeta;
}

// Props spécifiques à des composants déplacés/supprimés retirées

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