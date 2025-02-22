'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const updates = [
  {
    id: 1,
    title: 'Nouveau Projet Data Science',
    description: 'Analyse prédictive des ventes avec Python et scikit-learn',
    date: '2024-02-19',
    category: 'Projet',
    color: 'bg-blue-500/10 text-blue-500',
    icon: '📊',
  },
  {
    id: 2,
    title: 'Article sur le Machine Learning',
    description: 'Introduction aux concepts fondamentaux du ML',
    date: '2024-02-18',
    category: 'Blog',
    color: 'bg-green-500/10 text-green-500',
    icon: '📝',
  },
  {
    id: 3,
    title: 'Mise à jour du Portfolio',
    description: 'Ajout de nouveaux projets et améliorations UI',
    date: '2024-02-17',
    category: 'Site',
    color: 'bg-purple-500/10 text-purple-500',
    icon: '🎨',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function LatestUpdates(): React.JSX.Element {
  return (
    <section className="relative overflow-hidden bg-background/5 py-20 transition-all duration-[2000ms]">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-gray-900/5 bg-[size:40px_40px] transition-all duration-[2000ms]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,var(--primary-color),transparent)] opacity-10 transition-all duration-[2000ms]" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center lg:max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-block rounded-full bg-secondary/10 px-6 py-2 text-sm text-secondary-foreground"
          >
            Restez informé
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Dernières Mises à Jour
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Découvrez mes dernières activités, projets et articles.
          </motion.p>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {updates.map((update) => (
              <motion.div key={update.id} variants={item}>
                <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="relative z-10">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge variant="secondary" className={update.color}>
                        {update.category}
                      </Badge>
                      <span className="text-2xl">{update.icon}</span>
                    </div>
                    <CardTitle className="line-clamp-2 text-xl transition-colors group-hover:text-primary">
                      {update.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {update.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {update.description}
                    </p>
                  </CardContent>
                  {/* Effet de survol */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 