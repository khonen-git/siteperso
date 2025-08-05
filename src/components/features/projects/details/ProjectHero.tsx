import React from 'react';
import Image from 'next/image';
import { ProjectTags } from '../filters/ProjectTags';
import { ProjectDetail } from '@/types/project';

interface ProjectHeroProps {
  project: ProjectDetail;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <div className="relative">
      <div className="relative h-[40vh] min-h-[400px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20" />
      </div>
      
      <div className="container relative z-10 -mt-32 px-4">
        <div className="rounded-lg bg-card p-8 shadow-lg">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            {project.description}
          </p>
          <ProjectTags tags={project.tags} className="mt-6" />
        </div>
      </div>
    </div>
  );
}