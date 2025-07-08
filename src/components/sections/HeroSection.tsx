'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

export function HeroSection({ title, subtitle, description }: HeroSectionProps): React.JSX.Element {
  return (
    <section className="relative overflow-hidden min-h-[90vh] bg-background/5 transition-all duration-[2000ms]">
      {/* 
        TODO(THEME-001): Corriger la transition du thème sur le fond décoratif
        
        Problème:
        - La transition du thème n'est pas fluide sur le fond décoratif complexe
        - Les autres sections ont une transition fluide
        
        Causes potentielles:
        - Structure complexe des dégradés et des couches
        - Interaction entre les variables CSS et les transitions
        - Comportement des transitions sur les dégradés multiples
        
        Solutions possibles:
        - Simplifier la structure des couches
        - Revoir la gestion des transitions CSS
        - Utiliser Framer Motion pour les transitions
        
        Priorité: Moyenne
        Impact: UX
        Lié à: #THEME
      */}
      <div className="absolute inset-0 -z-10 transition-all duration-[2000ms]">
        {/* Grille de fond */}
        <div className="absolute inset-0 bg-grid-gray-900/5 bg-[size:32px_32px] transition-all duration-[2000ms]" />
        
        {/* Dégradé principal */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background/80 transition-all duration-[2000ms]" />
        
        {/* Formes animées */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl transition-all duration-[2000ms]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-3xl transition-all duration-[2000ms]"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
              rotate: [0, -45, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
      </div>

      {/* Contenu */}
      <div className="container relative flex min-h-[90vh] items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass mx-auto mb-8 inline-block rounded-full px-6 py-2 text-sm backdrop-blur-sm"
          >
            Data - Développement - IA
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl"
          >
            {title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 text-xl text-muted-foreground sm:text-2xl"
          >
            {subtitle}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            {description}
          </motion.p>
          
          {/* Boutons */}
            {/*
            TODO: Corriger la transition des boutons lors du switch entre le mode clair et sombre

            Problème: Les boutons clignotent lors du switch entre le mode clair et sombre
            */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 flex items-center justify-center gap-6"
          >
            <Button
              size="lg"
              variant="outline"
              className="glass relative overflow-hidden rounded-full px-8 transition-all hover:shadow-lg"
            >
              <Link href="/projects" className="relative z-10">
                Voir mes projets
              </Link>
              <motion.div
                className="absolute inset-0 -z-10 bg-primary/20"
              />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="glass relative overflow-hidden rounded-full px-8 transition-all hover:shadow-lg"
            >
              <Link href="/contact" className="relative z-10">
                Me contacter
              </Link>
              <motion.div
                className="absolute inset-0 -z-10 bg-secondary/10"
              />
            </Button>
          </motion.div>

          {/* Indicateur de défilement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="flex flex-col items-center"
            >
              <div className="glass h-10 w-6 rounded-full p-1">
                <motion.div
                  className="h-2 w-full rounded-full bg-foreground/20"
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </div>
              <span className="mt-2 text-sm text-muted-foreground">Défiler</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 