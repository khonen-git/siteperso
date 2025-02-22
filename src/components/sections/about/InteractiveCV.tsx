'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';

export function InteractiveCV(): React.JSX.Element {
  return (
    <section className="relative overflow-hidden bg-background/5 py-24 transition-all duration-500">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Curriculum Vitae
          </h2>
          <p className="mb-8 text-muted-foreground">
            Une vue détaillée de mon parcours professionnel et de mes compétences.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Télécharger le CV
            </Button>
          </motion.div>

          <div className="grid gap-6">
            {/* Formation */}
            <Card>
              <CardHeader>
                <CardTitle>Formation</CardTitle>
                <CardDescription>Parcours académique et certifications</CardDescription>
              </CardHeader>
              <CardContent className="text-left">
                {/* Contenu à personnaliser */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Master en Data Science</h4>
                    <p className="text-sm text-muted-foreground">2020 - 2022 • Université XYZ</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Certifications</h4>
                    <ul className="list-inside list-disc text-sm text-muted-foreground">
                      <li>Google Data Analytics Professional Certificate</li>
                      <li>Microsoft Power BI Data Analyst Associate</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expérience */}
            <Card>
              <CardHeader>
                <CardTitle>Expérience Professionnelle</CardTitle>
                <CardDescription>Postes occupés et réalisations</CardDescription>
              </CardHeader>
              <CardContent className="text-left">
                {/* Contenu à personnaliser */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold">Data Analyst Senior</h4>
                    <p className="text-sm text-muted-foreground">2022 - Présent • Entreprise XYZ</p>
                    <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                      <li>Développement de dashboards Power BI</li>
                      <li>Analyse prédictive des ventes</li>
                      <li>Optimisation des processus data</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 