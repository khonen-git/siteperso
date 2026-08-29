'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ScrollArea } from '@/components/ui/navigation/scroll-area';
import { TreeView } from '../TreeView';
import type { TreeItem } from '@/config/knowledge/types';
import { cn } from '@/lib/utils';

interface KnowledgeSidebarProps {
  className?: string;
  items: TreeItem[];
}

export function KnowledgeSidebar({ className, items }: KnowledgeSidebarProps) {
  const t = useTranslations('knowledge.layout');

  return (
    <aside
      className={cn(
        'w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      <ScrollArea className="h-full">
        <nav className="p-4 space-y-2" role="tree" aria-label={t('sidebarLabel')}>
          <TreeView items={items} />
        </nav>
      </ScrollArea>
    </aside>
  );
}
