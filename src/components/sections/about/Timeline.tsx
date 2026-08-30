'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

const timelineEvents = [
  {
    id: 1,
    date: '2025 – Présent',
    title: 'Projets personnels',
    company: 'Indépendant',
    description:
      'Conception et développement de projets data & quantitatifs : dashboards, pipelines, site portfolio et contenus pédagogiques.',
  },
  {
    id: 2,
    date: '2024 – 2025',
    title: 'Formation Data Analyst',
    company: 'OpenClassrooms',
    description:
      'Formation terminée en 2025 — analyse de données, BI, machine learning et visualisation.',
  },
  {
    id: 3,
    date: '2023 – 2024',
    title: 'Employé commercial',
    company: 'Intermarché',
    description: 'Employé commercial dans le secteur boulangerie traditionnelle',
  },
  {
    id: 4,
    date: '2021 – 2023',
    title: 'Formation ingénieur (Non-validée)',
    company: "Ecole d'ingénieurs Télécom Saint-Etienne",
    description: 'Formation ingénieur en informatique',
  },
  {
    id: 5,
    date: '2018 – 2021',
    title: 'CPGE TSI',
    company: 'Lycée Louis Rascol',
    description:
      "Classe préparatoire aux grandes écoles — concours CCP et CCS. Bases solides en mathématiques, physique et sciences de l'ingénieur.",
  },
];

export function Timeline(): React.JSX.Element {
  return (
    <section className="relative overflow-hidden py-24 transition-all duration-500">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Mon Parcours</h2>
        </motion.div>

        <div className="mx-auto mt-16 max-w-2xl space-y-8">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex gap-8"
            >
              <div className="absolute left-[7px] top-0 h-full w-[2px] bg-border" />

              <div className="relative h-4 w-4 shrink-0">
                <div className="absolute h-4 w-4 rounded-full bg-background ring-2 ring-primary" />
              </div>

              <div className="flex-1 pb-8">
                <span className="mb-2 block text-sm text-muted-foreground">{event.date}</span>
                <h3 className="mb-2 text-xl font-semibold">{event.title}</h3>
                <div className="mb-2 text-muted-foreground">{event.company}</div>
                <p className="text-muted-foreground">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
