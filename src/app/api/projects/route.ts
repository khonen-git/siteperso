import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { NextRequest, NextResponse } from 'next/server';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getProjectsDirectory } from '@/lib/projects/content';
import { isValidProjectFrontmatter } from '@/lib/projects/validation';

function resolveLocale(searchParams: URLSearchParams): string {
  const requested = searchParams.get('locale');
  return requested && hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
}

export async function GET(request: NextRequest) {
  const locale = resolveLocale(request.nextUrl.searchParams);
  let projectsDirectory = getProjectsDirectory(locale);

  try {
    try {
      await fs.access(projectsDirectory);
    } catch {
      if (locale !== routing.defaultLocale) {
        projectsDirectory = getProjectsDirectory(routing.defaultLocale);
      } else {
        throw new Error('Projects directory not found');
      }
    }

    const fileNames = await fs.readdir(projectsDirectory);

    const allProjectsData = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map(async (fileName) => {
          try {
            const slug = fileName.replace(/\.mdx$/, '');
            const fullPath = path.join(projectsDirectory, fileName);
            const fileContents = await fs.readFile(fullPath, 'utf8');
            const { data } = matter(fileContents);

            if (!isValidProjectFrontmatter(data)) {
              console.warn(`Projet invalide ${fileName}: données manquantes ou incorrectes`);
              return null;
            }

            return {
              slug,
              id: data.id,
              title: data.title,
              description: data.description,
              image: data.image,
              date: data.date,
              category: data.category,
              tags: data.tags,
              visible: data.visible ?? true,
            };
          } catch (error) {
            console.error(`Erreur lors de la lecture du projet ${fileName}:`, error);
            return null;
          }
        })
    );

    const validProjects = allProjectsData
      .filter(
        (project): project is NonNullable<typeof project> =>
          project !== null && project.visible
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (validProjects.length === 0) {
      return NextResponse.json(
        {
          error: 'Aucun projet valide trouvé',
          projects: [],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(validProjects);
  } catch (error) {
    const err = error as Error;
    console.error('Erreur lors de la lecture des projets:', err);
    return NextResponse.json(
      {
        error: 'Erreur lors du chargement des projets',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined,
      },
      { status: 500 }
    );
  }
}
