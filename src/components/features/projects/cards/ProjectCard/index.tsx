import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/data-display/card';
import { ProjectTags } from '../../filters/ProjectTags';
import { cn } from '@/lib/utils';
import type { ProjectCardProps } from '../../types';

/**
 * ProjectCard - Carte de présentation d'un projet
 * Affiche une image, un titre, une description et des tags
 */
export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link 
      href={`/projects/${project.id}`} 
      className={cn(
        "block transition-all hover:scale-[1.02]",
        className
      )}
    >
      <Card className="overflow-hidden h-full">
        <div className="relative aspect-[16/9]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4 space-y-2">
          <div className="space-y-1">
            <h3 className="font-semibold leading-none tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </div>
          
          <ProjectTags tags={project.tags} />

          {project.date && (
            <p className="text-xs text-muted-foreground">
              {new Date(project.date).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long'
              })}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}