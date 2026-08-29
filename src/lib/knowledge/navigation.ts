import { getNavigationData } from '@/config/knowledge';
import type { TreeItem } from '@/config/knowledge/types';
import { isKnowledgeDraft } from './meta';

const KNOWLEDGE_PREFIX = '/knowledge/';

export function hrefToKnowledgeSlug(href: string): string[] {
  if (!href.startsWith(KNOWLEDGE_PREFIX)) {
    return [];
  }

  const rest = href.slice(KNOWLEDGE_PREFIX.length);
  return rest ? rest.split('/').filter(Boolean) : [];
}

export function filterNavigationTree(items: TreeItem[], locale: string): TreeItem[] {
  const filtered: TreeItem[] = [];

  for (const item of items) {
    const children = item.children ? filterNavigationTree(item.children, locale) : undefined;
    const slug = item.href ? hrefToKnowledgeSlug(item.href) : null;
    const draft = slug !== null && isKnowledgeDraft(locale, slug);

    if (draft && (!children || children.length === 0)) {
      continue;
    }

    const node: TreeItem = { title: item.title };

    if (children && children.length > 0) {
      node.children = children;
    }

    if (item.href && !draft) {
      node.href = item.href;
    }

    if (node.href || (node.children && node.children.length > 0)) {
      filtered.push(node);
    }
  }

  return filtered;
}

const filteredNavCache = new Map<string, TreeItem[]>();

export function getFilteredNavigationData(locale: string): TreeItem[] {
  const cached = filteredNavCache.get(locale);
  if (cached) {
    return cached;
  }

  const filtered = filterNavigationTree(getNavigationData(locale), locale);
  filteredNavCache.set(locale, filtered);
  return filtered;
}

/** Vide le cache (tests uniquement). */
export function clearFilteredNavigationCache(): void {
  filteredNavCache.clear();
}
