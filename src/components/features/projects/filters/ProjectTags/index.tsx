import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProjectTagsProps {
  tags: string[];
  removable?: boolean;
  onClick?: (tag: string) => void;
  className?: string;
}

export function ProjectTags({ tags, removable, onClick, className }: ProjectTagsProps) {
  const tagColors = {
    React: 'bg-cyan-500/10 text-cyan-500 dark:bg-cyan-400/10 dark:text-cyan-400',
    TypeScript: 'bg-purple-500/10 text-purple-500 dark:bg-purple-400/10 dark:text-purple-400',
    'Next.js': 'bg-black/10 text-black dark:bg-white/10 dark:text-white',
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className={cn(
            'flex items-center gap-1',
            tagColors[tag as keyof typeof tagColors]
          )}
          onClick={removable ? () => onClick?.(tag) : undefined}
          role={removable ? 'button' : undefined}
        >
          <span className="flex items-center gap-1">
            {tag}
            {removable && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hover:text-destructive"
                aria-label="Supprimer"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </span>
        </Badge>
      ))}
    </div>
  );
}