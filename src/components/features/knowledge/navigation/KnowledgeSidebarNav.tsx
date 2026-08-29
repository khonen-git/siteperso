'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { TreeView } from './TreeView';
import type { TreeItem } from '@/config/knowledge/types';

interface KnowledgeSidebarNavProps {
  items: TreeItem[];
  onNavigate?: () => void;
}

export function KnowledgeSidebarNav({
  items,
  onNavigate,
}: KnowledgeSidebarNavProps): React.JSX.Element {
  const t = useTranslations('knowledge.layout');

  return (
    <nav className="space-y-2 p-4" aria-label={t('sidebarLabel')}>
      <div role="tree">
        <TreeView items={items} onLinkClick={onNavigate} />
      </div>
    </nav>
  );
}
