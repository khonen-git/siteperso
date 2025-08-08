import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface ProjectTag {
  name: string;
  color?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

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

export interface ProjectTagProps {
  tag: string;
  className?: string;
}

export interface ProjectImageContainerProps {
  image: ProjectImage;
  className?: string;
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