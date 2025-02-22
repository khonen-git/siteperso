'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Brain, Rocket } from 'lucide-react';

const ambitions = [
  {
    icon: Target,
    title: 'Objectifs',
    description: 'Devenir expert en data science et contribuer à des projets innovants qui ont un impact réel.',
  },
  {
    icon: Brain,
    title: 'Domaines d\'intérêt',
    description: 'Machine Learning, Data Visualization, et développement d\'applications web modernes.',
  },
  {
    icon: Rocket,
    title: 'Projets Futurs',
    description: 'Développer des solutions data-driven qui combinent analyse de données et interfaces utilisateur intuitives.',
  },
];

export function Ambitions(): React.JSX.Element {
  return (
    <section className="relative overflow-hidden py-24 transition-all duration-500">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ambitions & Projets
          </h2>
          <p className="mb-16 text-muted-foreground">
            Mes objectifs et ma vision pour l'avenir.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {ambitions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative h-full overflow-hidden">
                <CardContent className="flex h-full flex-col items-center p-6 text-center">
                  <div className="mb-6 rounded-full bg-primary/10 p-3">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 