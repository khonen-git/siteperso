import { useState, useEffect } from 'react';

export function useTreeNodeState(href: string | undefined, isPathActive: boolean) {
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window !== 'undefined' && href) {
      const stored = localStorage.getItem(`toctree-${href}`);
      return stored === 'expanded' || isPathActive;
    }
    return isPathActive;
  });

  useEffect(() => {
    if (href) {
      const key = `toctree-${href}`;
      if (isExpanded) {
        localStorage.setItem(key, 'expanded');
      } else {
        localStorage.removeItem(key);
      }
    }
  }, [isExpanded, href]);

  return [isExpanded, setIsExpanded] as const;
} 