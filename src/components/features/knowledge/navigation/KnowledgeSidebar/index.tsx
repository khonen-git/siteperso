'use client';

import React, { useMemo } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { ScrollArea } from '@/components/ui/navigation/scroll-area';
import { TreeView } from '../TreeView';
import { getNavigationData } from '@/config/knowledge';
import { cn } from '@/lib/utils';

interface KnowledgeSidebarProps {
  className?: string;
}

export function KnowledgeSidebar({ className }: KnowledgeSidebarProps) {
  const locale = useLocale();
  const t = useTranslations('knowledge.layout');
  const items = useMemo(() => getNavigationData(locale), [locale]);

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
