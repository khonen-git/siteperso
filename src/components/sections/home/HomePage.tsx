'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Activity, ArrowUpRight, BookOpen, FlaskConical, LineChart, PenLine } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatIvPercent } from '@/lib/dashboards/chart-theme';
import { computeSkew25d, computeSnapshotIvRange, findAtmIv } from '@/lib/dashboards/iv-metrics';
import { cn } from '@/lib/utils';
import type { BlogPost } from '@/types/blog';
import type { ImpliedVolSnapshot } from '@/types/dashboards/implied-vol';
import type { Project } from '@/types/project';

/** ~200px à 840px de hauteur viewport ; s’adapte en % (vh), borné min/max. */
const surfaceHeightClass = 'h-[clamp(160px,24vh,260px)]';

const ImpliedVolSurfaceChart = dynamic(
  () =>
    import('@/components/dashboards/ImpliedVolSurfaceChart').then((m) => m.ImpliedVolSurfaceChart),
  {
    ssr: false,
    loading: () => <SurfaceLoading />,
  }
);

function SurfaceLoading(): React.JSX.Element {
  return (
    <div className={cn('flex items-center justify-center', surfaceHeightClass)}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
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
      prefetch
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

function IvPreview({ snapshot }: { snapshot: ImpliedVolSnapshot }): React.JSX.Element {
  const t = useTranslations('home.hero');
  const tDash = useTranslations('dashboards');

  const nearestSlice = React.useMemo(() => {
    const sorted = [...snapshot.slices].sort((a, b) => a.daysToExpiry - b.daysToExpiry);
    return sorted.find((s) => s.daysToExpiry >= 21) ?? sorted[0];
  }, [snapshot.slices]);

  const atmIv = nearestSlice ? findAtmIv(nearestSlice) : 0;
  const rr25 =
    nearestSlice?.analytics?.riskReversal25 ?? (nearestSlice ? computeSkew25d(nearestSlice) : null);
  const ivRange = React.useMemo(() => computeSnapshotIvRange(snapshot), [snapshot]);

  const surfaceLabels = {
    moneyness: tDash('impliedVol.chart.moneyness'),
    daysToExpiry: tDash('impliedVol.chart.daysToExpiry'),
    iv: tDash('impliedVol.chart.iv'),
  };

  return (
    <Link
      href="/dashboards/implied-vol"
      prefetch
      className="group block h-full"
      aria-label={t('ctaDashboard')}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className={cn(
          'relative flex w-full flex-col overflow-hidden rounded-xl border bg-card/80 shadow-lg lg:ml-auto lg:max-w-[75%]',
          'transition-shadow duration-300 group-hover:shadow-xl group-hover:ring-1 group-hover:ring-primary/30'
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b bg-muted/30 px-3 py-2">
          <div className="flex items-center gap-2">
            <LineChart className="h-4 w-4 text-primary" aria-hidden />
            <span className="text-sm font-medium">{t('previewLabel')}</span>
          </div>
          <Badge variant="default" className="gap-1 text-[10px] uppercase tracking-wide">
            <Activity className="h-3 w-3" aria-hidden />
            {t('previewLive')}
          </Badge>
        </div>

        <div className="relative flex flex-col gap-2 p-3">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-md bg-muted/40 px-2 py-1.5">
              <div className="text-[10px] text-muted-foreground">
                {tDash('impliedVol.overview.spot')}
              </div>
              <div className="font-semibold tabular-nums">{snapshot.metadata.spot.toFixed(1)}</div>
            </div>
            <div className="rounded-md bg-muted/40 px-2 py-1.5">
              <div className="text-[10px] text-muted-foreground">
                {tDash('impliedVol.overview.atmIv')}
              </div>
              <div className="font-semibold tabular-nums">
                {atmIv > 0 ? formatIvPercent(atmIv, 1) : '—'}
              </div>
            </div>
            <div className="rounded-md bg-muted/40 px-2 py-1.5">
              <div className="text-[10px] text-muted-foreground">
                {tDash('impliedVol.overview.rr25')}
              </div>
              <div className="font-semibold tabular-nums">
                {rr25 != null ? `${rr25 >= 0 ? '+' : ''}${rr25.toFixed(1)} pp` : '—'}
              </div>
            </div>
          </div>

          <div
            className={cn(
              'relative shrink-0 overflow-hidden rounded-lg border bg-muted/10',
              surfaceHeightClass
            )}
            aria-hidden
          >
            <ImpliedVolSurfaceChart
              snapshot={snapshot}
              labels={surfaceLabels}
              force3d
              squarePlot
              showControls={false}
              ivRange={ivRange}
            />
          </div>

          <p className="text-xs text-muted-foreground">{t('previewHint')}</p>
        </div>
      </motion.div>
    </Link>
  );
}

interface HomePageProps {
  featuredProjects: Project[];
  latestBlog: BlogPost | null;
  ivSnapshot: ImpliedVolSnapshot | null;
}

export function HomePage({
  featuredProjects,
  latestBlog,
  ivSnapshot,
}: HomePageProps): React.JSX.Element {
  const tHero = useTranslations('home.hero');
  const tBento = useTranslations('home.bento');
  const [primary, secondary] = featuredProjects;

  return (
    <>
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
                {tHero('eyebrow')}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[2.75rem] lg:leading-[1.1]"
              >
                {tHero('headline')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="mt-5 text-lg text-muted-foreground"
              >
                {tHero('subheadline')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Button size="lg" asChild>
                  <Link href="/dashboards/implied-vol" prefetch className="gap-2">
                    {tHero('ctaDashboard')}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/projects" prefetch>
                    {tHero('ctaProjects')}
                  </Link>
                </Button>
              </motion.div>
            </div>

            <div className="self-start lg:-mt-2 lg:pl-4">
              {ivSnapshot ? <IvPreview snapshot={ivSnapshot} /> : null}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/20 py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
            className="mb-10 max-w-2xl"
          >
            <h2 className="text-3xl font-bold tracking-tight">{tBento('title')}</h2>
            <p className="mt-2 text-muted-foreground">{tBento('lead')}</p>
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
                <BentoTile
                  href={`/projects/${primary.slug}`}
                  className="min-h-[220px] lg:min-h-full"
                >
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <FlaskConical className="h-5 w-5 text-primary" aria-hidden />
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <h3 className="text-xl font-semibold leading-snug">{primary.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-4">
                    {primary.description}
                  </p>
                  <span className="mt-4 text-sm font-medium text-primary">
                    {tBento('projectCta')}
                  </span>
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
                <h3 className="text-lg font-semibold">{tBento('knowledgeTitle')}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {tBento('knowledgeDescription')}
                </p>
                <span className="mt-4 text-sm font-medium text-primary">
                  {tBento('knowledgeCta')}
                </span>
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
                  <span className="mt-4 text-sm font-medium text-primary">
                    {tBento('projectCta')}
                  </span>
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
                  {tBento('blogLabel')}
                </p>
                <h3 className="mt-1 text-lg font-semibold leading-snug line-clamp-2">
                  {latestBlog?.title ?? tBento('blogFallbackTitle')}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
                  {latestBlog?.description ?? tBento('blogFallbackDescription')}
                </p>
                <span className="mt-4 text-sm font-medium text-primary">{tBento('blogCta')}</span>
              </BentoTile>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
