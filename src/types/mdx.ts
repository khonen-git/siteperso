import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface KnowledgeFrontmatter {
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  category?: string;
  order?: number;
  /** Masque la page du toctree et renvoie 404 si true ou corps placeholder. */
  draft?: boolean;
}

export interface KnowledgeContent {
  content: MDXRemoteSerializeResult;
  frontmatter: KnowledgeFrontmatter;
}

export interface MDXPage {
  frontmatter: KnowledgeFrontmatter;
  content: string;
  slug: string;
}
