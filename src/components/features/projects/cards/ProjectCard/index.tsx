"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProjectAnimation } from '../../hooks/useProjectAnimation';
import { ProjectTag } from '@/components/project/ProjectTag';
import type { ProjectCardProps } from '../../types';

export function ProjectCard({ project }: ProjectCardProps) {
  const animation = useProjectAnimation();

  return (
    <motion.div {...animation}>
      <Link href={project.link} className="group block">
        <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="aspect-[4/3] relative">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="p-4 pb-2">
            <div className="mb-2 flex items-center justify-between">
              <div className="mr-2 flex-1 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <ProjectTag key={tag} tag={tag} />
                ))}
              </div>
              <ArrowUpRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </div>
            <h2 className="line-clamp-1 text-xl group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h2>
          </div>

          <CardContent className="p-4 pt-0">
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {project.description}
            </p>
          </CardContent>

          <Badge variant="outline" className="absolute top-2 right-2">
            {project.category}
          </Badge>
        </Card>
      </Link>
    </motion.div>
  );
}