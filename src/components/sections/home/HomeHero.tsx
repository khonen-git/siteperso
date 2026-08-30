'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HomeDashboardPreview } from '@/components/sections/home/HomeDashboardPreview';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';

interface HomeHeroProps {
  ivSnapshot: ImpliedVolSnapshot | null;
}

export function HomeHero({ ivSnapshot }: HomeHeroProps): React.JSX.Element {
  const t = useTranslations('home.hero');

  return (
    <section className="relative border-b bg-background">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,hsl(var(--primary)/0.12),transparent)]" />

      <div className="container py-16 md:py-20 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-10">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-4 text-sm font-medium uppercase tracking-wider text-primary"
            >
              {t('eyebrow')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[2.75rem] lg:leading-[1.1]"
            >
              {t('headline')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-5 text-lg text-muted-foreground"
            >
              {t('subheadline')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button size="lg" asChild>
                <Link href="/dashboards/implied-vol" prefetch className="gap-2">
                  {t('ctaDashboard')}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects" prefetch>
                  {t('ctaProjects')}
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="self-start lg:-mt-2 lg:pl-4">
            {ivSnapshot ? <HomeDashboardPreview snapshot={ivSnapshot} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
