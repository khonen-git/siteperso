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
    // Récupérer tous les titres
    const headings = Array.from(document.querySelectorAll('h1, h2, h3'))
      .filter(heading => heading.id)
      .map(heading => ({
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName[1]),
      }));

    setItems(headings);

    // Observer l'intersection des titres
    const observer = new IntersectionObserver(
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
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={cn("space-y-1", className)} aria-label="Table des matières">
      {items.map(({ id, text, level }) => (
        <a
          key={id}
          href={`#${id}`}
          className={cn(
            "block text-sm transition-colors hover:text-foreground/80",
            activeId === id ? "text-foreground" : "text-foreground/60",
            level === 1 ? "pl-0" : level === 2 ? "pl-4" : "pl-8"
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