import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { HeroSectionProps } from '../types';

/**
 * HeroSection - Section d'en-tête principale
 * Affiche un titre et une description avec une animation
 */
export function HeroSection({ title, description, className }: HeroSectionProps) {
  return (
    <section className={cn("container py-16", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="text-muted-foreground">
          {description}
        </p>
      </motion.div>
    </section>
  );
}