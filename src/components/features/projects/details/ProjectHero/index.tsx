import React from 'react';
import Image from 'next/image';
import { ProjectTags } from '../../filters/ProjectTags';
import { cn } from '@/lib/utils';
import type { ProjectHeroProps } from '../../types';

/**
 * ProjectHero - En-tête détaillé d'un projet
 * Affiche une grande image, le titre, la description et les métadonnées
 */
export function ProjectHero({ project, className }: ProjectHeroProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Image de couverture */}
      <div className="relative h-[40vh] min-h-[400px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20" />
      </div>
      
      {/* Contenu */}
      <div className="container relative z-10 -mt-32 px-4">
        <div className="rounded-lg bg-card p-8 shadow-lg">
          <div className="flex flex-col gap-4">
            {/* Titre et description */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {project.description}
              </p>
            </div>

            {/* Métadonnées */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {project.date && (
                <time dateTime={project.date}>
                  {new Date(project.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </time>
              )}
              {project.category && (
                <div className="flex items-center gap-1">
                  <span>•</span>
                  <span>{project.category}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <ProjectTags tags={project.tags} className="mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}