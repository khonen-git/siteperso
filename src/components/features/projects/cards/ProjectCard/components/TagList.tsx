import { cn } from '@/lib/utils';
import { ProjectTag } from '../../../types';

interface TagListProps {
  tags: string[];
  className?: string;
}

export function TagList({ tags, className }: TagListProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map(tag => (
        <ProjectTag key={tag} tag={tag} />
      ))}
    </div>
  );
}