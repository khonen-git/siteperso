'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Activity, LineChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/** Static mock of the IV dashboard — no Plotly on the home page. */
export function HomeDashboardPreview(): React.JSX.Element {
  const t = useTranslations('home.hero');

  return (
    <Link
      href="/dashboards/implied-vol"
      className="group block h-full"
      aria-label={t('ctaDashboard')}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className={cn(
          'relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-xl border bg-card/80 shadow-lg',
          'transition-shadow duration-300 group-hover:shadow-xl group-hover:ring-1 group-hover:ring-primary/30'
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b bg-muted/30 px-4 py-3">
          <div className="flex items-center gap-2">
            <LineChart className="h-4 w-4 text-primary" aria-hidden />
            <span className="text-sm font-medium">{t('previewLabel')}</span>
          </div>
          <Badge variant="default" className="gap-1 text-[10px] uppercase tracking-wide">
            <Activity className="h-3 w-3" aria-hidden />
            {t('previewLive')}
          </Badge>
        </div>

        <div className="relative flex flex-1 flex-col gap-3 p-4">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {[
              { label: 'Spot', value: '580.0' },
              { label: 'IV ATM', value: '14.2%' },
              { label: 'RR 25Δ', value: '+1.8 pp' },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-md bg-muted/40 px-2 py-1.5">
                <div className="text-[10px] text-muted-foreground">{kpi.label}</div>
                <div className="font-semibold tabular-nums">{kpi.value}</div>
              </div>
            ))}
          </div>

          <div
            className="relative min-h-[140px] flex-1 overflow-hidden rounded-lg border bg-gradient-to-br from-primary/5 via-background to-secondary/10"
            aria-hidden
          >
            <div
              className="absolute inset-0 opacity-80"
              style={{
                backgroundImage: `
                  linear-gradient(135deg, hsl(var(--primary) / 0.35) 0%, transparent 45%),
                  linear-gradient(225deg, hsl(var(--secondary) / 0.25) 0%, transparent 50%),
                  radial-gradient(circle at 70% 30%, hsl(var(--primary) / 0.2), transparent 55%)
                `,
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.4)_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[10px] text-muted-foreground">
              <span>Moneyness</span>
              <span>Days → IV</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">{t('previewHint')}</p>
        </div>
      </motion.div>
    </Link>
  );
}
