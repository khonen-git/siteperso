'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function LanguageSwitcher(): React.JSX.Element {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav
      aria-label="Language"
      className="flex items-center gap-1 rounded-md border p-0.5 text-sm"
    >
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          className={cn(
            'rounded px-2 py-1 font-medium uppercase transition-colors',
            locale === loc
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
          aria-current={locale === loc ? 'true' : undefined}
        >
          {loc}
        </Link>
      ))}
    </nav>
  );
}
