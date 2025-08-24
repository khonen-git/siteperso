import { useState, useEffect } from 'react';

export function useTreeNodeState(href: string | undefined, isPathActive: boolean) {
  const [isExpanded, setIsExpanded] = useState(isPathActive);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (href) {
      const stored = localStorage.getItem(`toctree-${href}`);
      if (stored === 'expanded' || isPathActive) {
        setIsExpanded(true);
      }
    }
  }, [href, isPathActive]);

  useEffect(() => {
    if (href && isClient) {
      const key = `toctree-${href}`;
      if (isExpanded) {
        localStorage.setItem(key, 'expanded');
      } else {
        localStorage.removeItem(key);
      }
    }
  }, [isExpanded, href, isClient]);

  return [isExpanded, setIsExpanded] as const;
} 