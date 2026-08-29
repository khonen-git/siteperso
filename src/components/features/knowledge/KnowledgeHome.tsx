'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { KnowledgeSidebar } from '@/components/features/knowledge/navigation/KnowledgeSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TableOfContents } from '@/components/features/knowledge/navigation/TableOfContents';
import type { TreeItem } from '@/config/knowledge/types';

const PILLAR_SECTIONS = [
  { id: 'mathematics', titleKey: 'mathematicsTitle', textKey: 'mathematicsText' },
  { id: 'probability', titleKey: 'probabilityTitle', textKey: 'probabilityText' },
  { id: 'statistics', titleKey: 'statisticsTitle', textKey: 'statisticsText' },
  { id: 'machine-learning', titleKey: 'machineLearningTitle', textKey: 'machineLearningText' },
  { id: 'quantitative-finance', titleKey: 'quantitativeFinanceTitle', textKey: 'quantitativeFinanceText' },
  { id: 'engineering', titleKey: 'engineeringTitle', textKey: 'engineeringText' },
  { id: 'tools', titleKey: 'toolsTitle', textKey: 'toolsText' },
] as const;

interface KnowledgeHomeProps {
  navItems: TreeItem[];
}

export function KnowledgeHome({ navItems }: KnowledgeHomeProps): React.JSX.Element {
  const t = useTranslations('knowledge.home');
  const tLayout = useTranslations('knowledge.layout');

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <aside className="hidden w-64 shrink-0 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:block">
        <ScrollArea className="h-full">
          <KnowledgeSidebar items={navItems} />
        </ScrollArea>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-4 my-6 sm:mx-8">
          <section id="knowledge__presentation" className="space-y-6">
            <h1 id="knowledge-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t('title')}
            </h1>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
              <p>{t('intro1')}</p>
              <p>{t('intro2')}</p>
            </div>
          </section>

          {PILLAR_SECTIONS.map(({ id, titleKey, textKey }) => (
            <section key={id} id={`knowledge__${id}`} className="mt-12 space-y-6">
              <h2 id={id} className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t(titleKey)}
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
                <p>{t(textKey)}</p>
              </div>
            </section>
          ))}
        </div>
      </main>

      <aside className="hidden w-64 shrink-0 border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 xl:block">
        <ScrollArea className="h-full px-4 py-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">{tLayout('tocTitle')}</h3>
            <TableOfContents className="text-sm" />
          </div>
        </ScrollArea>
      </aside>
    </div>
  );
}
