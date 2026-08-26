export type BlogPostKind = 'thought' | 'research';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  kind: BlogPostKind;
  tags: string[];
  visible?: boolean;
}

export interface BlogPostDetail {
  post: BlogPost;
  source: string;
}
