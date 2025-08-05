import { Project, ProjectDetail } from '@/types/project';

export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export interface ProjectHeroProps {
  project: ProjectDetail;
  className?: string;
}

export interface ProjectContentProps {
  content: React.ReactNode;
  className?: string;
}

export interface ProjectTagsProps {
  tags: string[];
  className?: string;
  onClick?: (tag: string) => void;
  removable?: boolean;
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