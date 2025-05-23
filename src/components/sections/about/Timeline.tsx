'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const timelineEvents = [
  {
    id: 1,
    date: 'juillet 2024 - Présent',
    title: 'Formation Data Analyst',
    company: 'OpenClassrooms',
    description: 'Formation en analyse de données, développement de solutions BI et machine learning',
    details: '',
    tags: ['Python', 'Data Analysis', 'SQL', 'Power BI', 'Machine Learning', 'Excel'],
  },
  {
    id: 2,
    date: 'août 2023 - mars 2024',
    title: 'Employé commercial',
    company: 'Intermarché',
    description: 'Employé commercial dans le secteur boulangerie traditionnelle',
    details: '',
    tags: ['Grande distribution', ' Boulangerie traditionnelle'],
  },
  {
    id: 3,
    date: 'septembre 2021 - juin 2023',
    title: 'Formation ingénieur (Non-validée)',
    company: 'Ecole d\'ingénieurs Télécom Saint-Etienne',
    description: 'Formation ingénieur en informatique',
    details: '',
    tags: ['Ingénierie', 'Informatique'],
  },
  {
    id: 4,
    date: 'septembre 2018 - juin 2021',
    title: 'CPGE TSI',
    company: 'Lycée Louis Rascol',
    description: 'Classe préparatoire aux grandes écoles',
    details: `Préparation aux concours CCP (Concours Communs Polytechniques) et CCS (Concours Centrale Supélec).
    La prépa m'a permis de développer une discipline et m'a donné des bases solides dans les matières scientifiques.`,
    tags: ['Prépa', 'Mathématiques', 'Physique', 'Sciences de l\'ingénieur', 'Informatique'],
  },
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

                      {/* Infobulle */}
                      <div className="absolute -right-4 -top-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="rounded-full bg-foreground p-1.5 transition-colors hover:bg-foreground/90 dark:bg-background dark:hover:bg-background/90">
                              <Info className="h-6 w-6 text-background dark:text-foreground" />
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