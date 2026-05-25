import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { navigationData as navigationFr } from './navigation.fr';
import { navigationData as navigationEn } from './navigation.en';
import type { TreeItem } from './types';

export type { TreeItem } from './types';

export function getNavigationData(locale: string): TreeItem[] {
  if (hasLocale(routing.locales, locale) && locale === 'en') {
    return navigationEn;
  }
  return navigationFr;
}
