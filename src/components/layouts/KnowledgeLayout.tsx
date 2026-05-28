'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { TableOfContents } from '@/components/features/knowledge/navigation/TableOfContents';
import { ProgressBar } from '../ui/ProgressBar';
import { KnowledgeSidebar } from '@/components/features/knowledge/navigation/KnowledgeSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface KnowledgeLayoutProps {
  children: React.ReactNode;
  toc?: boolean;
}

export function KnowledgeLayout({ children, toc = true }: KnowledgeLayoutProps): React.JSX.Element {
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
      <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ScrollArea className="h-full">
          <KnowledgeSidebar />
        </ScrollArea>
      </aside>

      <div className="flex min-h-0 flex-1 flex-col">
        <ProgressBar progress={scrollProgress} />

        <div className="flex min-h-0 flex-1 flex-col xl:flex-row">
          <main
            data-knowledge-content
            ref={contentRef}
            onScroll={handleContentScroll}
            className="flex-1 overflow-y-auto px-8 py-6"
          >
            {children}
          </main>

          {toc && (
            <aside className="hidden xl:block w-64 border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <ScrollArea className="h-full py-6 px-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm">{t('tocTitle')}</h3>
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
