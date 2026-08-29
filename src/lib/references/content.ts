import fs from 'fs';
import path from 'path';
import { routing } from '@/i18n/routing';
import type { Reference, ReferencesData } from '@/types/references';

const CONTENT_ROOT = path.join(process.cwd(), 'src/content');

function resolveReferencesPath(locale: string): string {
  const preferred = path.join(CONTENT_ROOT, locale, 'references.json');
  if (fs.existsSync(preferred)) {
    return preferred;
  }
  return path.join(CONTENT_ROOT, routing.defaultLocale, 'references.json');
}

export function getReferencesData(locale: string): ReferencesData {
  const filePath = resolveReferencesPath(locale);
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw) as ReferencesData;
}

export function getReferences(locale: string): Reference[] {
  return getReferencesData(locale).references;
}

export function getReferenceCategories(locale: string): Record<string, string> {
  return getReferencesData(locale).categories;
}
