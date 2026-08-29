import type { ProjectImportance } from '@/types/project';

const VALID_IMPORTANCE = new Set<ProjectImportance>([0, 1, 2, 3, 4, 5]);

function parseImportance(value: unknown): ProjectImportance {
  if (typeof value === 'number' && VALID_IMPORTANCE.has(value as ProjectImportance)) {
    return value as ProjectImportance;
  }
  return 0;
}

function parseRelatedReferences(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === 'string');
}

export function isValidProjectFrontmatter(data: unknown): data is {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  tags: string[];
  visible?: boolean;
  importance?: ProjectImportance;
  relatedReferences?: string[];
} {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const project = data as Record<string, unknown>;

  return (
    typeof project.id === 'number' &&
    typeof project.title === 'string' &&
    typeof project.description === 'string' &&
    typeof project.image === 'string' &&
    typeof project.date === 'string' &&
    typeof project.category === 'string' &&
    Array.isArray(project.tags)
  );
}

export function parseProjectFrontmatter(data: Record<string, unknown>): {
  importance: ProjectImportance;
  relatedReferences: string[];
} {
  return {
    importance: parseImportance(data.importance),
    relatedReferences: parseRelatedReferences(data.relatedReferences),
  };
}
