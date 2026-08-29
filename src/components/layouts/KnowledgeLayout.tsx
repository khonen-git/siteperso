'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { TableOfContents } from '@/components/features/knowledge/navigation/TableOfContents';
import { ProgressBar } from '../ui/ProgressBar';
import { KnowledgeSidebar } from '@/components/features/knowledge/navigation/KnowledgeSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { TreeItem } from '@/config/knowledge/types';

interface KnowledgeLayoutProps {
  children: React.ReactNode;
  toc?: boolean;
  navItems: TreeItem[];
}

export function KnowledgeLayout({
  children,
  toc = true,
  navItems,
}: KnowledgeLayoutProps): React.JSX.Element {
  const t = useTranslations('knowledge.layout');
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLElement | null>(null);

  const handleContentScroll = useCallback((): void => {
    const content = contentRef.current;
    if (!content) return;

    const scrollHeight = content.scrollHeight - content.clientHeight;
    const progress = scrollHeight > 0 ? (content.scrollTop / scrollHeight) * 100 : 0;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    handleContentScroll();
  }, [handleContentScroll, children]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      <aside className="hidden w-64 shrink-0 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:block">
        <ScrollArea className="h-full">
          <KnowledgeSidebar items={navItems} />
        </ScrollArea>
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <ProgressBar progress={scrollProgress} />

        <div className="flex min-h-0 flex-1 flex-col xl:flex-row">
          <main
            data-knowledge-content
            ref={contentRef}
            onScroll={handleContentScroll}
            className="min-w-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8"
          >
            {children}
          </main>

          {toc && (
            <aside className="hidden w-64 shrink-0 border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 xl:block">
              <ScrollArea className="h-full px-4 py-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">{t('tocTitle')}</h3>
                  <TableOfContents className="text-sm" />
                </div>
              </ScrollArea>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
