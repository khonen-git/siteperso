"use client";

import React, { useEffect, useState } from 'react';
import { TableOfContents } from '@/components/features/knowledge/navigation/TableOfContents';
import { ProgressBar } from '../ui/ProgressBar';
import { KnowledgeSidebar } from '@/components/features/knowledge/navigation/KnowledgeSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface KnowledgeLayoutProps {
  children: React.ReactNode;
  toc?: boolean;
}

export function KnowledgeLayout({ children, toc = true }: KnowledgeLayoutProps): React.JSX.Element {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = (): void => {
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.scrollY;
        const progress = (scrollTop / scrollHeight) * 100;
        setScrollProgress(progress);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar de navigation */}
      <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ScrollArea className="h-full">
          <KnowledgeSidebar />
        </ScrollArea>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1">
        <ProgressBar progress={scrollProgress} />
        
        <div className="flex flex-col xl:flex-row">
          <main className="flex-1 overflow-y-auto px-8 py-6">
            {children}
          </main>

          {/* Table des matières flottante */}
          {toc && (
            <aside className="hidden xl:block w-64 border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <ScrollArea className="h-full py-6 px-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm">Table des matières</h3>
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