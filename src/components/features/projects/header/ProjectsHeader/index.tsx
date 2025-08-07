import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ProjectsHeaderProps } from './types';

export function ProjectsHeader({
  title = "Mes Projets",
  description = "Découvrez mes réalisations en data science, analyse de données et développement.",
  className,
  animationDelay = 0
}: ProjectsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className={cn('mx-auto max-w-2xl text-center', className)}
    >
      <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h1>
      <p className="text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}