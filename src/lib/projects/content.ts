import fs from 'fs';
import path from 'path';
import { routing } from '@/i18n/routing';

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

  return fs
    .readdirSync(directory)
    .filter((fileName) => fileName.endsWith('.mdx'));
}
