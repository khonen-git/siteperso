import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { routing } from '@/i18n/routing';
import { isValidProjectFrontmatter } from '@/lib/projects/validation';
import type { Project, ProjectDetail } from '@/types/project';

const CONTENT_ROOT = path.join(process.cwd(), 'src/content');

export function getProjectsDirectory(locale: string): string {
  return path.join(CONTENT_ROOT, locale, 'projects');
}

/** Résout le fichier MDX d'un projet (repli sur la locale par défaut si absent). */
export function resolveProjectFilePath(locale: string, slug: string): string | null {
  const localesToTry =
    locale === routing.defaultLocale ? [locale] : [locale, routing.defaultLocale];

  for (const loc of localesToTry) {
    const filePath = path.join(getProjectsDirectory(loc), `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  return null;
}

export function listProjectFileNames(locale: string): string[] {
  const directory = getProjectsDirectory(locale);

  if (!fs.existsSync(directory)) {
    if (locale !== routing.defaultLocale) {
      return listProjectFileNames(routing.defaultLocale);
    }
    return [];
  }

  return fs.readdirSync(directory).filter((fileName) => fileName.endsWith('.mdx'));
}

function resolveProjectsDirectory(locale: string): string {
  const preferred = getProjectsDirectory(locale);
  if (fs.existsSync(preferred)) {
    return preferred;
  }
  return getProjectsDirectory(routing.defaultLocale);
}

export function getProjects(locale: string): Project[] {
  const directory = resolveProjectsDirectory(locale);
  const fileNames = fs.existsSync(directory)
    ? fs.readdirSync(directory).filter((fileName) => fileName.endsWith('.mdx'))
    : [];

  const projects: Project[] = [];

  for (const fileName of fileNames) {
    try {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      if (!isValidProjectFrontmatter(data)) {
        console.warn(`Projet invalide ${fileName}: données manquantes ou incorrectes`);
        continue;
      }

      if (data.visible === false) {
        continue;
      }

      projects.push({
        slug,
        id: data.id,
        title: data.title,
        description: data.description,
        image: data.image,
        date: data.date,
        category: data.category,
        tags: data.tags,
        visible: data.visible ?? true,
        link: `/projects/${slug}`,
      });
    } catch (error) {
      console.error(`Erreur lors de la lecture du projet ${fileName}:`, error);
    }
  }

  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export interface ProjectPageData {
  project: ProjectDetail;
  source: string;
}

export function getProject(locale: string, slug: string): ProjectPageData | null {
  const fullPath = resolveProjectFilePath(locale, slug);

  if (!fullPath) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    if (!isValidProjectFrontmatter(data)) {
      return null;
    }

    if (data.visible === false) {
      return null;
    }

    const project: ProjectDetail = {
      id: data.id,
      title: data.title,
      description: data.description,
      image: data.image,
      date: data.date,
      category: data.category,
      tags: data.tags,
      visible: data.visible ?? true,
      slug,
      content: {
        summary: '',
        objectives: [],
        approach: '',
        technologies: [],
        results: '',
        images: [],
        conclusion: '',
      },
    };

    return {
      project,
      source: content,
    };
  } catch (error) {
    console.error(`Erreur lors du chargement du projet ${slug}:`, error);
    return null;
  }
}

/** Sérialise un projet pour l'API JSON (clients legacy). */
export async function serializeProjectSource(
  source: string,
  frontmatter: Record<string, unknown>
): Promise<MDXRemoteSerializeResult> {
  const { serialize } = await import('next-mdx-remote/serialize');
  const remarkGfm = (await import('remark-gfm')).default;

  return serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
    },
    scope: frontmatter,
  });
}
