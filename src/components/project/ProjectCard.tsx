'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types/project';
import ProjectTag from './ProjectTag';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
          <CardHeader className="p-4 pb-2">
            <div className="flex flex-wrap gap-2 mb-2">
              {project.tags.map(tag => (
                <ProjectTag key={tag} tag={tag} />
              ))}
            </div>
            <CardTitle className="line-clamp-1 text-xl group-hover:text-primary transition-colors duration-300">
              <span className="flex items-center justify-between">
                {project.title}
                <ArrowUpRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </span>
            </CardTitle>
          </CardHeader>
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

export default ProjectCard; 