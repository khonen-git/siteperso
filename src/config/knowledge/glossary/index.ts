import { knowledgeGlossaryEn } from './en';
import { knowledgeGlossaryFr } from './fr';

const glossaries = {
  fr: knowledgeGlossaryFr,
  en: knowledgeGlossaryEn,
} as const;

export type KnowledgeGlossaryKey = keyof typeof knowledgeGlossaryFr;

export function getGlossaryDefinition(
  locale: string,
  term: string
): string | undefined {
  const glossary = locale === 'en' ? glossaries.en : glossaries.fr;
  return glossary[term as KnowledgeGlossaryKey];
}
