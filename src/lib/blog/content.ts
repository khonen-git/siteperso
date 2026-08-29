import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { routing } from '@/i18n/routing';
import type { BlogPost, BlogPostDetail, BlogPostKind } from '@/types/blog';

const CONTENT_ROOT = path.join(process.cwd(), 'src/content');

const VALID_KINDS = new Set<BlogPostKind>(['thought', 'research']);

export function getBlogDirectory(locale: string): string {
  return path.join(CONTENT_ROOT, locale, 'blog');
}

function resolveBlogDirectory(locale: string): string {
  const preferred = getBlogDirectory(locale);
  if (fs.existsSync(preferred)) {
    return preferred;
  }
  return getBlogDirectory(routing.defaultLocale);
}

export function resolveBlogFilePath(locale: string, slug: string): string | null {
  const localesToTry =
    locale === routing.defaultLocale ? [locale] : [locale, routing.defaultLocale];

  for (const loc of localesToTry) {
    const filePath = path.join(getBlogDirectory(loc), `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  return null;
}

export function listBlogFileNames(locale: string): string[] {
  const directory = resolveBlogDirectory(locale);

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory).filter((fileName) => fileName.endsWith('.mdx'));
}

function isValidBlogFrontmatter(data: Record<string, unknown>): boolean {
  return (
    typeof data.title === 'string' &&
    typeof data.description === 'string' &&
    typeof data.date === 'string' &&
    typeof data.kind === 'string' &&
    VALID_KINDS.has(data.kind as BlogPostKind)
  );
}

export function getBlogPosts(locale: string): BlogPost[] {
  const directory = resolveBlogDirectory(locale);
  const fileNames = fs.existsSync(directory)
    ? fs.readdirSync(directory).filter((fileName) => fileName.endsWith('.mdx'))
    : [];

  const posts: BlogPost[] = [];

  for (const fileName of fileNames) {
    try {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      if (!isValidBlogFrontmatter(data)) {
        continue;
      }

      if (data.visible === false) {
        continue;
      }

      posts.push({
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        kind: data.kind as BlogPostKind,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        visible: data.visible !== false,
      });
    } catch {
      // Ignorer les fichiers illisibles
    }
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPost(locale: string, slug: string): BlogPostDetail | null {
  const filePath = resolveBlogFilePath(locale, slug);
  if (!filePath) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    if (!isValidBlogFrontmatter(data) || data.visible === false) {
      return null;
    }

    return {
      post: {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        kind: data.kind as BlogPostKind,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        visible: data.visible !== false,
      },
      source: content,
    };
  } catch {
    return null;
  }
}
