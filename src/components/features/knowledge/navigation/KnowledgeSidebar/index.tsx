import React from 'react';
import { ScrollArea } from '@/components/ui/navigation/scroll-area';
import { TreeView } from '../TreeView';
import { navigationData } from '@/config/navigation';
import { cn } from '@/lib/utils';

interface KnowledgeSidebarProps {
  className?: string;
}

export function KnowledgeSidebar({ className }: KnowledgeSidebarProps) {
  return (
    <aside className={cn(
      "w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <ScrollArea className="h-full">
        <nav className="p-4 space-y-2" role="tree" aria-label="Navigation du contenu">
          <TreeView items={navigationData} />
        </nav>
      </ScrollArea>
    </aside>
  );
}