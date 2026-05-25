export function isValidProjectFrontmatter(data: unknown): data is {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  tags: string[];
  visible?: boolean;
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
