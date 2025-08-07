export interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  tags: string[];
  visible?: boolean;
  slug: string; // Ajout du slug
  content: {
    summary: string;
    objectives: string[];
    approach: string;
    technologies: { name: string; description: string }[];
    results: string;
    images: { url: string; caption: string }[];
    conclusion: string;
  };
}

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
  slug: string; // Ajout du slug
}

export interface ThemeColor {
  color: string;
}

export interface ProjectsDataType {
  [key: string]: ProjectDetail;
}

export interface CategoryInfo {
  [key: string]: string;
}