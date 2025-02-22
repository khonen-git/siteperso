'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const timelineEvents = [
  {
    id: 1,
    date: '2023 - Présent',
    title: 'Data Analyst',
    company: 'Entreprise XYZ',
    description: 'Analyse de données et développement de solutions BI',
    details: 'Utilisation avancée de Python et SQL pour l\'analyse de données. Création de dashboards interactifs avec Power BI. Optimisation des processus d\'ETL.',
    tags: ['Python', 'SQL', 'Power BI'],
  },
  {
    id: 2,
    date: '2021 - 2023',
    title: 'Formation Data Science',
    company: 'École ABC',
    description: 'Formation intensive en data science et programmation',
    details: 'Apprentissage approfondi des algorithmes de machine learning. Projets pratiques en analyse de données. Certification en Data Science.',
    tags: ['Machine Learning', 'Statistics', 'Python'],
  },
  // Ajoutez d'autres événements selon votre parcours
];

export function Timeline(): React.JSX.Element {
  return (
    <TooltipProvider>
      <section className="relative overflow-hidden py-24 transition-all duration-500">
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Mon Parcours
            </h2>
            <p className="text-muted-foreground">
              Une progression constante dans le domaine de la data et du développement.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-[1fr_1fr] gap-8">
            {/* Partie gauche - Timeline */}
            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex gap-8"
                >
                  {/* Ligne verticale */}
                  <div className="absolute left-[7px] top-0 h-full w-[2px] bg-border" />
                  
                  {/* Point */}
                  <div className="relative h-4 w-4">
                    <div className="absolute h-4 w-4 rounded-full bg-background ring-2 ring-primary" />
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 pb-8">
                    <div className="relative mb-2">
                      <span className="text-sm text-muted-foreground">{event.date}</span>
                      <div className="absolute -right-4 -top-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="rounded-full bg-foreground p-1.5 transition-colors hover:bg-foreground/90 dark:bg-background dark:hover:bg-background/90">
                              <Info className="h-3 w-3 text-background dark:text-foreground" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="right" 
                            sideOffset={16}
                            className="max-w-xs bg-card p-4 text-card-foreground"
                          >
                            <p className="text-sm leading-relaxed">{event.details}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">
                      {event.title}
                    </h3>
                    <div className="mb-2 text-muted-foreground">
                      {event.company}
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-secondary/10"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Partie droite - Espace pour les infobulles */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
} 