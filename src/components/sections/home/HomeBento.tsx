'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight, BookOpen, FlaskConical, LineChart, PenLine } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BlogPost } from '@/types/blog';
import type { Project } from '@/types/project';

interface HomeBentoProps {
  featuredProjects: Project[];
  latestBlog: BlogPost | null;
}

function BentoTile({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <Link
      href={href}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card p-5 shadow-sm',
        'transition-all duration-300 hover:border-primary/40 hover:shadow-md',
        className
      )}
    >
      {children}
    </Link>
  );
}

export function HomeBento({ featuredProjects, latestBlog }: HomeBentoProps): React.JSX.Element {
  const t = useTranslations('home.bento');
  const [primary, secondary] = featuredProjects;

  return (
    <section className="bg-muted/20 py-16 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="mb-10 max-w-2xl"
        >
          <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
          <p className="mt-2 text-muted-foreground">{t('lead')}</p>
        </motion.div>

        <div className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {primary && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-2 lg:row-span-2"
            >
              <BentoTile href={`/projects/${primary.slug}`} className="min-h-[220px] lg:min-h-full">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <FlaskConical className="h-5 w-5 text-primary" aria-hidden />
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="text-xl font-semibold leading-snug">{primary.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-4">
                  {primary.description}
                </p>
                <span className="mt-4 text-sm font-medium text-primary">{t('projectCta')}</span>
              </BentoTile>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <BentoTile href="/knowledge" className="min-h-[180px]">
              <div className="mb-3 flex items-start justify-between gap-2">
                <BookOpen className="h-5 w-5 text-primary" aria-hidden />
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <h3 className="text-lg font-semibold">{t('knowledgeTitle')}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {t('knowledgeDescription')}
              </p>
              <span className="mt-4 text-sm font-medium text-primary">{t('knowledgeCta')}</span>
            </BentoTile>
          </motion.div>

          {secondary && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <BentoTile href={`/projects/${secondary.slug}`} className="min-h-[180px]">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <LineChart className="h-5 w-5 text-primary" aria-hidden />
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="text-lg font-semibold leading-snug line-clamp-2">
                  {secondary.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
                  {secondary.description}
                </p>
                <span className="mt-4 text-sm font-medium text-primary">{t('projectCta')}</span>
              </BentoTile>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <BentoTile
              href={latestBlog ? `/blog/${latestBlog.slug}` : '/blog'}
              className="min-h-[180px]"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <PenLine className="h-5 w-5 text-primary" aria-hidden />
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t('blogLabel')}
              </p>
              <h3 className="mt-1 text-lg font-semibold leading-snug line-clamp-2">
                {latestBlog?.title ?? t('blogFallbackTitle')}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
                {latestBlog?.description ?? t('blogFallbackDescription')}
              </p>
              <span className="mt-4 text-sm font-medium text-primary">{t('blogCta')}</span>
            </BentoTile>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
