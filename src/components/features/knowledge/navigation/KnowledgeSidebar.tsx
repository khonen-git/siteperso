import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TreeView } from './TreeView';
import { navigationData } from '@/config/navigation';

export function KnowledgeSidebar() {
  return (
    <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ScrollArea className="h-full">
        <nav className="p-4 space-y-2" role="tree" aria-label="Navigation du contenu">
          <TreeView items={navigationData} />
        </nav>
      </ScrollArea>
    </aside>
  );
}