import React from 'react';
import { ScrollArea } from '@/components/ui/navigation/scroll-area';
import { TreeView } from '../TreeView';
import { navigationData } from '@/config/navigation';
import { cn } from '@/lib/utils';
import type { SidebarProps } from '../types';

/**
 * KnowledgeSidebar - Barre latérale de navigation pour la section Knowledge
 * Affiche une arborescence navigable du contenu
 */
export function KnowledgeSidebar({ className }: SidebarProps) {
  return (
    <aside 
      className={cn(
        "w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <ScrollArea className="h-full">
        <nav className="p-4" role="navigation" aria-label="Navigation du contenu">
          <TreeView items={navigationData} />
        </nav>
      </ScrollArea>
    </aside>
  );
}