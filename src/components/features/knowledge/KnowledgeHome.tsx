'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { KnowledgeSidebar } from '@/components/features/knowledge/navigation/KnowledgeSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TableOfContents } from '@/components/features/knowledge/navigation/TableOfContents';

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

          <section id="knowledge__mathematics" className="space-y-6">
            <h2 id="mathematics" className="text-4xl font-bold tracking-tight">
              {t('mathematicsTitle')}
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
              <p>{t('mathematicsText')}</p>
            </div>
          </section>

          <section id="knowledge__programming" className="space-y-6">
            <h2 id="programming" className="text-4xl font-bold tracking-tight">
              {t('programmingTitle')}
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
              <p>{t('programmingText')}</p>
            </div>
          </section>

          <section id="knowledge__data" className="space-y-6">
            <h2 id="data" className="text-4xl font-bold tracking-tight">
              {t('dataTitle')}
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
              <p>{t('dataText')}</p>
            </div>
          </section>

          <section id="knowledge__finance" className="space-y-6">
            <h2 id="finance" className="text-4xl font-bold tracking-tight">
              {t('financeTitle')}
            </h2>
          </section>

          <section id="knowledge__tools" className="space-y-6">
            <h2 id="tools" className="text-4xl font-bold tracking-tight">
              {t('toolsTitle')}
            </h2>
          </section>
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
