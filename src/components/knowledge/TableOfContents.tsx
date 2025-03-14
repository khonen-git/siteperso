"use client"

import * as React from 'react';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  className?: string;
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>('');

  // Observer pour suivre la position de lecture
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px' }
    );

    // Observer tous les headings
    document.querySelectorAll('h2[id], h3[id], h4[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="font-medium">Sur cette page</h4>
      <nav className="text-sm">
        <ul className="space-y-2 text-muted-foreground">
          {Array.from(document.querySelectorAll('h2[id], h3[id], h4[id]')).map((heading) => {
            const level = parseInt(heading.tagName[1]) - 2;
            return (
              <li
                key={heading.id}
                className={cn(
                  "hover:text-foreground transition-colors",
                  level > 0 && `ml-${level * 4}`,
                  activeId === heading.id && "text-foreground font-medium"
                )}
              >
                <a href={`#${heading.id}`}>{heading.textContent}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
} 