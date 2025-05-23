'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import themes from '@/config/themes';

interface ProjectTagProps {
  tag: string;
  variant?: 'default' | 'secondary' | 'outline';
  size?: 'default' | 'sm';
  className?: string;
}

export function ProjectTag({ 
  tag, 
  variant = 'secondary', 
  size = 'default',
  className 
}: ProjectTagProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        themes[tag as keyof typeof themes]?.color,
        className
      )}
    >
      {tag}
    </Badge>
  );
}

export default ProjectTag; 