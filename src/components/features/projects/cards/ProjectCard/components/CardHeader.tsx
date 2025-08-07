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
      <TagList tags={tags} className="mb-2" />
      <CardTitle className={titleStyles.className}>
        <span className="flex items-center justify-between">
          {title}
          <ArrowUpRight className={arrowStyles.className} />
        </span>
      </CardTitle>
    </UICardHeader>
  );
}