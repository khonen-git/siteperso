"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTreeNodeState } from '@/hooks/useTreeNodeState';
import type { TreeItem, TreeViewProps } from '../types';

interface TreeNodeProps {
  item: TreeItem;
  level?: number;
}

function TreeNode({ item, level = 0 }: TreeNodeProps) {
  const pathname = usePathname();
  const isActive = item.href === pathname;
  const isPathActive = pathname.startsWith(item.href || '');
  const hasChildren = item.children && item.children.length > 0;
  const [isExpanded, setIsExpanded] = useTreeNodeState(item.href, isPathActive);

  return (
    <div role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
      <div
        className={cn(
          "flex items-center justify-between py-2 px-2",
          level === 0 && "rounded-md",
          level > 0,
          isActive && "bg-accent text-accent-foreground font-medium",
          !isActive && level === 0 && "hover:bg-accent/50",
          !isActive && level > 0 && "hover:text-accent-foreground"
        )}
      >
        {item.href ? (
          <Link href={item.href} className="flex-1" aria-current={isActive ? 'page' : undefined}>
            {item.title}
          </Link>
        ) : (
          <span className="flex-1">{item.title}</span>
        )}
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-accent rounded-sm"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Réduire la section" : "Développer la section"}
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "transform rotate-180"
              )}
            />
          </button>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div 
          className={cn(
            "border-l ml-2 pl-1"
          )}
          role="group"
        >
          {item.children?.map((child, index) => (
            <TreeNode key={index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function TreeView({ items }: TreeViewProps) {
  return (
    <div role="tree" className="space-y-2">
      {items.map((item, index) => (
        <TreeNode key={index} item={item} />
      ))}
    </div>
  );
}