import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ProjectTags } from '../filters/ProjectTags';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-[16/9]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <p className="mt-2 text-muted-foreground">{project.description}</p>
          <ProjectTags tags={project.tags} className="mt-4" />
        </CardContent>
      </Card>
    </Link>
  );
}