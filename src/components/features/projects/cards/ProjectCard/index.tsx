import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProjectAnimation } from '../../hooks/useProjectAnimation';
import { ImageContainer } from './components/ImageContainer';
import { ProjectCardHeader } from './components/CardHeader';
import { projectCardStyles as styles } from './styles';
import type { ProjectCardProps } from '../../types';

export function ProjectCard({ project }: ProjectCardProps) {
  const animation = useProjectAnimation();

  return (
    <motion.div {...animation}>
      <Link href={project.link} className={styles.container}>
        <Card className={styles.card}>
          <ImageContainer 
            image={{
              src: project.image,
              alt: project.title
            }}
          />
          <ProjectCardHeader 
            title={project.title}
            tags={project.tags}
          />
          <CardContent className={styles.content}>
            <p className={styles.description}>
              {project.description}
            </p>
          </CardContent>
          <Badge 
            variant="outline" 
            className={styles.badge}
          >
            {project.category}
          </Badge>
        </Card>
      </Link>
    </motion.div>
  );
}