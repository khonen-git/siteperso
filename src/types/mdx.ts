import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface KnowledgeFrontmatter {
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  category?: string;
  order?: number;
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
