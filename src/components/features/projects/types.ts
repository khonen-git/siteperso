import { Project, ProjectDetail } from '@/types/project';

// Types pour les cartes de projet
export interface ProjectCardProps {
  project: Project;
  className?: string;
}

// Types pour les détails de projet
export interface ProjectHeroProps {
  project: ProjectDetail;
  className?: string;
}

export interface ProjectContentProps {
  content: React.ReactNode;
  className?: string;
}

// Types pour le filtrage et les tags
export interface ProjectTagProps {
  tag: string;
  onClick?: () => void;
  removable?: boolean;
  className?: string;
}

export interface ProjectTagsProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
  removable?: boolean;
  className?: string;
}

export interface ProjectFilterProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onTagSelect: (tag: string) => void;
  onSortChange: (sort: 'date' | 'title') => void;
  selectedCategory: string;
  selectedTags: string[];
  sortBy: 'date' | 'title';
  className?: string;
}

// Types pour les états d'erreur
export interface NotFoundProjectProps {
  className?: string;
}