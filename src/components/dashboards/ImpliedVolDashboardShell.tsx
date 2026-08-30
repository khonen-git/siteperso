'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export type ImpliedVolTab = 'overview' | 'smile' | 'term' | 'surface' | 'about';

interface ImpliedVolDashboardShellProps {
  toolbar: React.ReactNode;
  overview: React.ReactNode;
  smile: React.ReactNode;
  term: React.ReactNode;
  surface: React.ReactNode;
  about: React.ReactNode;
  defaultTab?: ImpliedVolTab;
}

export function ImpliedVolDashboardShell({
  toolbar,
  overview,
  smile,
  term,
  surface,
  about,
  defaultTab = 'smile',
}: ImpliedVolDashboardShellProps): React.JSX.Element {
  const t = useTranslations('dashboards');

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex h-full min-h-0 flex-col" data-testid="iv-dashboard-shell">
        <header className="shrink-0 border-b px-3 py-2 sm:px-4">
          <div className="flex min-w-0 items-center gap-2">
            <Link
              href="/dashboards"
              className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t('impliedVol.links.backToHub')}</span>
            </Link>
            <h1 className="min-w-0 truncate text-sm font-semibold sm:text-base">
              {t('impliedVol.title')}
            </h1>
          </div>
        </header>

        <Tabs defaultValue={defaultTab} className="flex min-h-0 flex-1 flex-col">
          <div className="shrink-0 border-b px-3 py-2 sm:px-4">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <TabsList
                className={cn(
                  'h-auto w-full justify-start overflow-x-auto bg-transparent p-0 lg:w-auto',
                  '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
                )}
              >
                <TabsTrigger value="overview" className="shrink-0">
                  {t('impliedVol.tabs.overview')}
                </TabsTrigger>
                <TabsTrigger value="smile" className="shrink-0">
                  {t('impliedVol.tabs.smile')}
                </TabsTrigger>
                <TabsTrigger value="term" className="shrink-0">
                  {t('impliedVol.tabs.term')}
                </TabsTrigger>
                <TabsTrigger value="surface" className="shrink-0">
                  {t('impliedVol.tabs.surface')}
                </TabsTrigger>
                <TabsTrigger value="about" className="shrink-0">
                  {t('impliedVol.tabs.about')}
                </TabsTrigger>
              </TabsList>
              <div className="shrink-0">{toolbar}</div>
            </div>
          </div>

          <TabsContent value="overview" className="flex min-h-0 flex-1 flex-col px-3 py-3 sm:px-4">
            {overview}
          </TabsContent>
          <TabsContent value="smile" className="flex min-h-0 flex-1 flex-col px-3 py-3 sm:px-4">
            {smile}
          </TabsContent>
          <TabsContent value="term" className="flex min-h-0 flex-1 flex-col px-3 py-3 sm:px-4">
            {term}
          </TabsContent>
          <TabsContent value="surface" className="flex min-h-0 flex-1 flex-col px-3 py-3 sm:px-4">
            {surface}
          </TabsContent>
          <TabsContent
            value="about"
            className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-3 sm:px-4"
          >
            {about}
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
}
