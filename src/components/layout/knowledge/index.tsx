import React from 'react';
import { TableOfContents } from '@/components/features/knowledge/navigation/TableOfContents';
import { KnowledgeSidebar } from '@/components/features/knowledge/navigation/KnowledgeSidebar';
import { ScrollArea } from '@/components/ui/navigation/scroll-area';
import { cn } from '@/lib/utils';
import type { KnowledgeLayoutProps } from '../types';

/**
 * KnowledgeLayout - Layout spécifique pour la section connaissances
 * Inclut une barre latérale et une table des matières
 */
export function KnowledgeLayout({ children, toc = true, className }: KnowledgeLayoutProps) {
  return (
    <div className={cn("flex min-h-screen", className)}>
      {/* Sidebar avec ScrollArea pour le défilement fluide */}
      <KnowledgeSidebar />

      {/* Contenu principal avec marges fixes */}
      <main className="flex-1 overflow-y-auto">
        <div className="container py-8">
          {children}
        </div>
      </main>

      {/* Table des matières flottante */}
      {toc && (
        <aside className="hidden xl:block w-64 border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <ScrollArea className="h-full p-4">
            <TableOfContents />
          </ScrollArea>
        </aside>
      )}
    </div>
  );
}