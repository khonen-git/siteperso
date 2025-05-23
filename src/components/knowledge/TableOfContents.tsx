"use client"

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface HeadingInfo {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export function TableOfContents({ className }: TableOfContentsProps): React.JSX.Element {
  const [headings, setHeadings] = useState<HeadingInfo[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const headingsArray: HeadingInfo[] = [];
    document.querySelectorAll('h2[id], h3[id], h4[id]').forEach((section) => {
      const id = section.id;
      const text = section.textContent || '';
      const level = parseInt(section.tagName[1]);
      
      headingsArray.push({
        id,
        text,
        level
      });
    });

    setHeadings(headingsArray);

    const handleScroll = (): void => {
      if (headingsArray.length === 0) return;

      // Trouver l'en-tête visible le plus haut
      const headingElements = headingsArray.map(heading => 
        document.getElementById(heading.id)
      ).filter(el => el !== null) as HTMLElement[];

      const scrollPosition = window.scrollY + 100;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const currentElement = headingElements[i];
        if (currentElement && currentElement.offsetTop <= scrollPosition) {
          setActiveId(currentElement.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (headings.length === 0) {
    return <div className="text-sm text-muted-foreground">Aucune table des matières disponible</div>;
  }

  return (
    <nav className={cn("space-y-1", className)}>
      <h4 className="font-medium mb-2 text-lg">Table des matières</h4>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li 
            key={heading.id}
            className={cn(
              "transition-colors",
              heading.level === 2 ? 'ml-0' : heading.level === 3 ? 'ml-4' : 'ml-8'
            )}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                "block py-1 text-muted-foreground hover:text-foreground transition-colors",
                activeId === heading.id && "font-medium text-foreground"
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth'
                });
                setActiveId(heading.id);
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
} 