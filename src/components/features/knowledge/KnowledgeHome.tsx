'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { KnowledgeSidebar } from '@/components/features/knowledge/navigation/KnowledgeSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TableOfContents } from '@/components/features/knowledge/navigation/TableOfContents';

const PILLAR_SECTIONS = [
  { id: 'mathematics', titleKey: 'mathematicsTitle', textKey: 'mathematicsText' },
  { id: 'probability', titleKey: 'probabilityTitle', textKey: 'probabilityText' },
  { id: 'statistics', titleKey: 'statisticsTitle', textKey: 'statisticsText' },
  { id: 'machine-learning', titleKey: 'machineLearningTitle', textKey: 'machineLearningText' },
  { id: 'quantitative-finance', titleKey: 'quantitativeFinanceTitle', textKey: 'quantitativeFinanceText' },
  { id: 'engineering', titleKey: 'engineeringTitle', textKey: 'engineeringText' },
  { id: 'tools', titleKey: 'toolsTitle', textKey: 'toolsText' },
] as const;

export function KnowledgeHome(): React.JSX.Element {
  const t = useTranslations('knowledge.home');
  const tLayout = useTranslations('knowledge.layout');

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ScrollArea className="h-full">
          <KnowledgeSidebar />
        </ScrollArea>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-8 my-6">
          <section id="knowledge__presentation" className="space-y-6">
            <h1 id="knowledge-title" className="text-4xl font-bold tracking-tight">
              {t('title')}
            </h1>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
              <p>{t('intro1')}</p>
              <p>{t('intro2')}</p>
            </div>
          </section>

          {PILLAR_SECTIONS.map(({ id, titleKey, textKey }) => (
            <section key={id} id={`knowledge__${id}`} className="space-y-6 mt-12">
              <h2 id={id} className="text-4xl font-bold tracking-tight">
                {t(titleKey)}
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
                <p>{t(textKey)}</p>
              </div>
            </section>
          ))}
        </div>
      </main>

      <aside className="hidden xl:block w-64 border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ScrollArea className="h-full py-6 px-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">{tLayout('tocTitle')}</h3>
            <TableOfContents className="text-sm" />
          </div>
        </ScrollArea>
      </aside>
    </div>
  );
}
