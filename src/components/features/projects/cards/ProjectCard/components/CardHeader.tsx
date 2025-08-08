import { ArrowUpRight } from 'lucide-react';
import { CardHeader as UICardHeader, CardTitle } from '@/components/ui/card';
import { useProjectCardAnimation } from '../../../hooks/useProjectAnimation';
import { TagList } from './TagList';

interface ProjectCardHeaderProps {
  title: string;
  tags: string[];
}

export function ProjectCardHeader({ title, tags }: ProjectCardHeaderProps) {
  const { title: titleStyles, arrow: arrowStyles } = useProjectCardAnimation();

  return (
    <UICardHeader className="p-4 pb-2">
      <div className="mb-2 flex items-center justify-between">
        <TagList tags={tags} className="mr-2 flex-1" />
        <ArrowUpRight className={arrowStyles.className} />
      </div>
      <CardTitle className={titleStyles.className}>{title}</CardTitle>
    </UICardHeader>
  );
}