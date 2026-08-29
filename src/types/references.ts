export interface Reference {
  id: string;
  name: string;
  description: string;
  link?: string;
  category: string;
  tags: string[];
}

export interface ReferencesData {
  categories: Record<string, string>;
  references: Reference[];
}
