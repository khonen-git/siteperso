export interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  tags: string[];
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
  link: string;
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