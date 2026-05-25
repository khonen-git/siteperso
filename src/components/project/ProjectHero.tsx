'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
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
  const t = useTranslations('projects.detail');

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
            {t('allProjects')}
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
          <h1 className="text-4xl font-bold text-white md:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{project.description}</p>
          <div className="mt-4 flex items-center gap-2 text-white/80">
            <Calendar className="h-4 w-4" />
            <span>{project.date}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <ProjectTag key={tag} tag={tag} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectHero;
