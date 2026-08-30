'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { getDashboardEntry } from '@/config/dashboards/registry';

export function ImpliedVolAboutPanel(): React.JSX.Element {
  const t = useTranslations('dashboards');
  const entry = getDashboardEntry('implied-vol');

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 overflow-y-auto pb-4">
      <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4">
        <h2 className="text-sm font-semibold text-amber-700 dark:text-amber-400">
          {t('impliedVol.disclaimer.title')}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{t('impliedVol.disclaimer.body')}</p>
      </div>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">{t('impliedVol.about.methodologyTitle')}</h2>
        <p className="text-sm text-muted-foreground">{t('impliedVol.about.methodologyBody')}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">{t('impliedVol.about.linksTitle')}</h2>
        <div className="flex flex-wrap gap-2">
          {entry?.projectSlug && (
            <Button variant="secondary" size="sm" asChild>
              <Link href={`/projects/${entry.projectSlug}`}>{t('impliedVol.links.project')}</Link>
            </Button>
          )}
          {entry?.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={entry.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                {t('impliedVol.links.github')}
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
