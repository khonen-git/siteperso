'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LineChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getLiveDashboards, type DashboardEntry } from '@/config/dashboards/registry';

function DashboardCard({ entry }: { entry: DashboardEntry }): React.JSX.Element {
  const t = useTranslations('dashboards');
  const isLive = entry.status === 'live';

  const cardInner = (
    <Card
      className={`h-full transition-colors ${isLive ? 'hover:border-primary/50 hover:shadow-md' : 'opacity-75'}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{t(`hub.${entry.id}.title`)}</CardTitle>
          </div>
          <Badge variant={isLive ? 'default' : 'secondary'}>
            {isLive ? t('hub.statusLive') : t('hub.statusSoon')}
          </Badge>
        </div>
        <CardDescription>{t(`hub.${entry.id}.description`)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{t(`hub.${entry.id}.hint`)}</p>
      </CardContent>
    </Card>
  );

  if (!isLive) return cardInner;

  return (
    <Link href={entry.href} className="block h-full">
      {cardInner}
    </Link>
  );
}

export function DashboardHub(): React.JSX.Element {
  const t = useTranslations('dashboards');
  const live = getLiveDashboards();

  return (
    <div className="container py-8">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">{t('hub.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t('hub.lead')}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {live.map((entry) => (
          <DashboardCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
