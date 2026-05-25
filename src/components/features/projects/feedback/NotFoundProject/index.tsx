'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/inputs/button';
import { cn } from '@/lib/utils';
import type { NotFoundProjectProps } from '../../types';

export function NotFoundProject({ className }: NotFoundProjectProps) {
  const t = useTranslations('projects.notFound');

  return (
    <div
      className={cn(
        'container flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center',
        className
      )}
    >
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="text-muted-foreground">{t('description')}</p>
      <Button asChild>
        <Link href="/projects">{t('backLink')}</Link>
      </Button>
    </div>
  );
}
