'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const skills = [
  'Data Analysis',
  'Python',
  'TypeScript',
  'React',
  'Next.js',
  'SQL',
  'Power BI',
];

export function Introduction(): React.JSX.Element {
  return (
    <section className="relative overflow-hidden bg-background/5 py-24 transition-all duration-500">
      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-full lg:mx-0"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10" />
            <Image
              src="https://placehold.co/800x800/png"
              alt="Photo de profil"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80vw, 40vw"
            />
          </motion.div>

          {/* Contenu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary"
            >
              À propos de moi
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl"
            >
              Théo Charron
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-6 text-xl text-muted-foreground"
            >
              Data Analyst passionné par la transformation des données en insights actionnables
              et le développement d'applications web modernes.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8 text-muted-foreground"
            >
              Avec une expertise en analyse de données et en développement web, je combine
              ces compétences pour créer des solutions innovantes et data-driven.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap gap-2"
            >
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-secondary/10 transition-colors hover:bg-secondary/20"
                >
                  {skill}
                </Badge>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 