'use client';

import * as React from 'react';
import { KnowledgeSidebar } from '@/components/knowledge/KnowledgeSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { TableOfContents } from '@/components/knowledge/TableOfContents';

interface KnowledgeLayoutProps {
  content: {
    metadata?: {
      title: string;
      description: string;
    };
    default: React.ComponentType;
  };
}

export function KnowledgeLayout({ content }: KnowledgeLayoutProps) {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const Content = content.default;

  React.useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar gauche fixe */}
      <aside className="fixed top-[64px] left-0 w-64 h-[calc(100vh-64px)] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ScrollArea className="h-full">
          <KnowledgeSidebar />
        </ScrollArea>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 ml-64 mr-64">
        {/* Barre de progression fixe */}
        <div className="fixed left-[16rem] right-64 top-[64px] z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Progress value={scrollProgress} className="w-full h-1" />
        </div>

        <div className="max-w-5xl mx-auto mt-[64px]">
          <article className="prose prose-lg dark:prose-invert max-w-none px-8">
            {content.metadata && (
              <header className="not-prose mb-8">
                <h1 className="text-4xl font-bold mb-4 text-foreground">{content.metadata.title}</h1>
                <p className="text-xl text-muted-foreground">{content.metadata.description}</p>
              </header>
            )}
            <div className="mdx-content">
              <Content />
            </div>
          </article>
        </div>
      </main>

      {/* Table des matières flottante fixe */}
      <aside className="fixed top-[64px] right-0 w-64 h-[calc(100vh-64px)] border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ScrollArea className="h-full p-4">
          <TableOfContents />
        </ScrollArea>
      </aside>
    </div>
  );
} 