import React from 'react';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';
import { getReferences } from '@/lib/references/content';
import type { Reference } from '@/types/references';

interface ProjectReferencesProps {
  locale: string;
  referenceIds: string[];
}

export function ProjectReferences({
  locale,
  referenceIds,
}: ProjectReferencesProps): React.JSX.Element | null {
  const t = useTranslations('projects.references');

  if (referenceIds.length === 0) {
    return null;
  }

  const allReferences = getReferences(locale);
  const byId = new Map(allReferences.map((ref) => [ref.id, ref]));
  const references = referenceIds
    .map((id) => byId.get(id))
    .filter((ref): ref is Reference => ref !== undefined);

  if (references.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 border-t pt-8" aria-labelledby="project-references-title">
      <h2 id="project-references-title" className="mb-4 text-xl font-semibold">
        {t('title')}
      </h2>
      <ul className="space-y-3">
        {references.map((reference) => (
          <li key={reference.id} className="rounded-lg border bg-muted/30 px-4 py-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-medium">{reference.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{reference.description}</p>
              </div>
              {reference.link ? (
                <a
                  href={reference.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  {t('openLink')}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
