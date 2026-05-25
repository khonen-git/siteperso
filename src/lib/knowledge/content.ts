import fs from 'fs';
import path from 'path';
import { routing } from '@/i18n/routing';

const CONTENT_ROOT = path.join(process.cwd(), 'src/content');

export function getKnowledgeDirectory(locale: string): string {
  return path.join(CONTENT_ROOT, locale, 'knowledge');
}

/** Résout le fichier MDX (repli sur la locale par défaut si absent). */
export function resolveKnowledgeFilePath(locale: string, slug: string[]): string | null {
  const localesToTry =
    locale === routing.defaultLocale ? [locale] : [locale, routing.defaultLocale];

  for (const loc of localesToTry) {
    const filePath = path.join(getKnowledgeDirectory(loc), `${slug.join('/')}.mdx`);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  return null;
}
