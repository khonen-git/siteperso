import fs from 'fs';
import path from 'path';
import { routing } from '@/i18n/routing';

const CONTENT_ROOT = path.join(process.cwd(), 'src/content');

export function getKnowledgeDirectory(locale: string): string {
  return path.join(CONTENT_ROOT, locale, 'knowledge');
}

function getKnowledgeCandidatePaths(locale: string, slug: string[]): string[] {
  const baseDir = getKnowledgeDirectory(locale);
  return [
    path.join(baseDir, `${slug.join('/')}.mdx`),
    path.join(baseDir, ...slug, 'index.mdx'),
  ];
}

/** Résout le fichier MDX (repli sur la locale par défaut si absent). */
export function resolveKnowledgeFilePath(locale: string, slug: string[]): string | null {
  const localesToTry =
    locale === routing.defaultLocale ? [locale] : [locale, routing.defaultLocale];

  for (const loc of localesToTry) {
    for (const filePath of getKnowledgeCandidatePaths(loc, slug)) {
      if (fs.existsSync(filePath)) {
        return filePath;
      }
    }
  }

  return null;
}
