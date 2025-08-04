"use client";

import React, { useEffect, useState } from 'react';
import { TableOfContents } from '../knowledge/TableOfContents';
import { ProgressBar } from '../ui/ProgressBar';

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
    <div className="container mx-auto px-4 py-8">
      <ProgressBar progress={scrollProgress} />
      
      <div className="flex flex-col md:flex-row gap-8">
        {toc && (
          <aside className="w-full md:w-1/4 lg:w-1/5 shrink-0 md:sticky md:top-24 md:h-[calc(100vh-6rem)] overflow-auto p-4">
            <TableOfContents />
          </aside>
        )}
        
        <main className={`w-full ${toc ? 'md:w-3/4 lg:w-4/5' : ''} prose prose-slate dark:prose-invert max-w-none`}>
          {children}
        </main>
      </div>
    </div>
  );
} 