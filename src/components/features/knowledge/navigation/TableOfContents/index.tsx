"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { TableOfContentsProps } from '../../types';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

/**
 * TableOfContents - Table des matières dynamique
 * Génère automatiquement une navigation basée sur les titres de la page
 */
export function TableOfContents({ className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [items, setItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    const contentRoot = document.querySelector(
      '[data-knowledge-content]'
    ) as HTMLElement | null;
    if (!contentRoot) return;

    let observer: IntersectionObserver | null = null;
    let rafId = 0;

    const collectHeadings = (): TOCItem[] =>
      Array.from(contentRoot.querySelectorAll('h1, h2, h3'))
        .filter((heading) => heading.id)
        .map((heading) => ({
          id: heading.id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName[1]),
        }));

    const rebuild = (): void => {
      const headings = collectHeadings();
      setItems(headings);

      if (observer) observer.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: '0px 0px -80% 0px' }
      );

      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer?.observe(element);
      });
    };

    // Première passe
    rebuild();

    // Rebuild quand le MDX se monte/modifie le DOM
    const mutationObserver = new MutationObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(rebuild);
    });

    mutationObserver.observe(contentRoot, {
      childList: true,
      subtree: true,
    });

    return () => {
      cancelAnimationFrame(rafId);
      mutationObserver.disconnect();
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <nav className={cn("space-y-1", className)} aria-label="Table des matières">
      {items.map(({ id, text, level }) => (
        <a
          key={id}
          href={`#${id}`}
          className={cn(
            "block text-sm py-1 transition-colors hover:text-foreground/80",
            activeId === id ? "text-foreground font-medium" : "text-foreground/60",
            level === 1 ? "text-base font-semibold" : level === 2 ? "pl-4" : "pl-8"
          )}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {text}
        </a>
      ))}
    </nav>
  );
}