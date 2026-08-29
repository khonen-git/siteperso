'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/navigation/scroll-area';
import { KnowledgeSidebarNav } from '../KnowledgeSidebarNav';
import type { TreeItem } from '@/config/knowledge/types';
import { cn } from '@/lib/utils';

interface KnowledgeSidebarProps {
  className?: string;
  items: TreeItem[];
}

export function KnowledgeSidebar({ className, items }: KnowledgeSidebarProps) {
  return (
    <div className={cn('h-full w-full', className)}>
      <ScrollArea className="h-full">
        <KnowledgeSidebarNav items={items} />
      </ScrollArea>
    </div>
  );
}
