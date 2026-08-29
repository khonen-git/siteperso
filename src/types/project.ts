/** Importance rank 0 = none, 1–5 = star count (5 = highest). */
export type ProjectImportance = 0 | 1 | 2 | 3 | 4 | 5;

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  tags: string[];
  visible?: boolean;
  link: string;
  slug: string;
  importance: ProjectImportance;
  relatedReferences: string[];
}

export type ProjectDetail = Project;

export interface ThemeColor {
  color: string;
}
