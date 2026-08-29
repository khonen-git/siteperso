'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function ContactPage(): React.JSX.Element {
  const t = useTranslations('contact');

  return (
    <div className="min-h-screen bg-background">
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{t('title')}</h1>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-16 max-w-md"
        >
          <Card className="p-6">
            <h2 className="mb-6 text-2xl font-semibold">{t('infoTitle')}</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href="mailto:theocharron.pro@gmail.com"
                  className="text-muted-foreground hover:text-primary"
                >
                  theocharron.pro@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Github className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href="https://github.com/khonen-git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  GitHub
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Linkedin className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href="https://linkedin.com/in/tcharron/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
