'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ProjectTag from './ProjectTag';
import { ProjectDetail } from '@/types/project';

interface ProjectHeroProps {
  project: ProjectDetail;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="relative h-[50vh] w-full overflow-hidden">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover brightness-[0.7]"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="container relative z-10 flex h-full flex-col justify-end pb-16">
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-4 top-4 text-white"
          asChild
        >
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tous les projets
          </Link>
        </Button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-2 text-white">
            {project.category}
          </Badge>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center text-white/90">
              <Calendar className="mr-2 h-4 w-4" />
              {project.date}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <ProjectTag 
                  key={tag} 
                  tag={tag} 
                  className="bg-opacity-70"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectHero; 