import fs from 'fs';
import matter from 'gray-matter';
import { resolveKnowledgeFilePath } from './content';

const STUB_BODY = new Set([
  'Ce contenu est en cours de rédaction.',
  'This content is being written.',
]);

function normalizeStubBody(content: string): string {
  return content
    .replace(/^#\s+.+\r?\n+/m, '')
    .replace(/\r/g, '')
    .trim();
}

function isStubBody(content: string): boolean {
  const body = normalizeStubBody(content);
  return STUB_BODY.has(body);
}

/** Page masquée : frontmatter `draft: true` ou corps placeholder auto-généré. */
export function isKnowledgeDraft(locale: string, slug: string[]): boolean {
  const filePath = resolveKnowledgeFilePath(locale, slug);

  if (!filePath) {
    return true;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  if (data.draft === true) {
    return true;
  }

  return isStubBody(content);
}
