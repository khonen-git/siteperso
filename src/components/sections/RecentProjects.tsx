'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Analyse Prédictive des Ventes",
    description: "Utilisation de modèles ML pour prédire les ventes futures et optimiser les stocks en temps réel.",
    image: "https://placehold.co/600x400/png",
    tags: ["Python", "scikit-learn", "Pandas"],
    link: "/portfolio/sales-prediction",
  },
  {
    id: 2,
    title: "Dashboard Power BI",
    description: "Tableau de bord interactif pour l'analyse des KPIs et la visualisation des données en temps réel.",
    image: "https://placehold.co/600x400/png",
    tags: ["Power BI", "DAX", "SQL"],
    link: "/portfolio/powerbi-dashboard",
  },
  {
    id: 3,
    title: "ETL Pipeline",
    description: "Pipeline de données automatisé avec Apache Airflow pour le traitement des données à grande échelle.",
    image: "https://placehold.co/600x400/png",
    tags: ["Airflow", "Python", "PostgreSQL"],
    link: "/portfolio/etl-pipeline",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function RecentProjects(): React.JSX.Element {
  return (
    <section className="relative overflow-hidden bg-secondary/5 py-20">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,var(--primary-color),transparent)]" />
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
            className="mb-8 inline-block rounded-full bg-primary/10 px-6 py-2 text-sm text-primary"
          >
            Portfolio
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Projets Récents
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Découvrez mes derniers projets en data science et développement.
          </motion.p>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={item}>
                <Link href={project.link} className="group block">
                  <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-xl">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0" />
                    </div>
                    <CardHeader className="relative">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="rounded-full bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          <ArrowUpRight size={20} />
                        </motion.div>
                      </div>
                      <CardDescription className="mt-2.5 line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-secondary/10 text-secondary-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 