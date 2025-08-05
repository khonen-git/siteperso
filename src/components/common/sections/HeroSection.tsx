import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function HeroSection({ title, description, children }: HeroSectionProps) {
  return (
    <section className="container py-16">
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
        {children}
      </motion.div>
    </section>
  );
}