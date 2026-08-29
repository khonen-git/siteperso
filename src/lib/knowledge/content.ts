import fs from 'fs';
import path from 'path';
import { routing } from '@/i18n/routing';
import { isKnowledgeDraft } from './meta';

const CONTENT_ROOT = path.join(process.cwd(), 'src/content');

export function getKnowledgeDirectory(locale: string): string {
  return path.join(CONTENT_ROOT, locale, 'knowledge');
}

function getKnowledgeCandidatePaths(locale: string, slug: string[]): string[] {
  const baseDir = getKnowledgeDirectory(locale);
  return [path.join(baseDir, `${slug.join('/')}.mdx`), path.join(baseDir, ...slug, 'index.mdx')];
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

/**
 * Liste les slugs Knowledge pour une locale.
 * `foo.mdx` → ['foo'], `foo/index.mdx` → ['foo'], `a/b/c.mdx` → ['a','b','c']
 */
export function listKnowledgeSlugs(locale: string): string[][] {
  const directory = getKnowledgeDirectory(locale);

  if (!fs.existsSync(directory)) {
    if (locale !== routing.defaultLocale) {
      return listKnowledgeSlugs(routing.defaultLocale);
    }
    return [];
  }

  const slugs: string[][] = [];

  function walk(currentDir: string, relativeParts: string[]): void {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        walk(path.join(currentDir, entry.name), [...relativeParts, entry.name]);
        continue;
      }

      if (!entry.isFile() || !entry.name.endsWith('.mdx')) {
        continue;
      }

      if (entry.name === 'index.mdx') {
        if (relativeParts.length > 0) {
          slugs.push(relativeParts);
        }
        continue;
      }

      const fileSlug = entry.name.replace(/\.mdx$/, '');
      slugs.push([...relativeParts, fileSlug]);
    }
  }

  walk(directory, []);
  return slugs;
}

/** Slugs publiés (hors brouillons / placeholders). */
export function listPublishedKnowledgeSlugs(locale: string): string[][] {
  return listKnowledgeSlugs(locale).filter((slug) => !isKnowledgeDraft(locale, slug));
}
