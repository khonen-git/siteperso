import * as React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { MobileNav } from '@/components/layout/MobileNav';
import { SITE_NAV } from '@/config/site-nav';

const Header = async (): Promise<React.JSX.Element> => {
  const t = await getTranslations('common');

  const mobileItems = SITE_NAV.map((item) => ({
    href: item.href,
    label: t(`nav.${item.messageKey}`),
  }));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-2">
        <Link href="/" className="mr-2 flex shrink-0 items-center sm:mr-6">
          <span className="font-bold">{t('brand')}</span>
        </Link>
        <nav className="mr-4 hidden items-center space-x-6 text-sm font-medium md:flex">
          {SITE_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground/80"
            >
              {t(`nav.${item.messageKey}`)}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <MobileNav
            items={mobileItems}
            openLabel={t('nav.openMenu')}
            closeLabel={t('nav.closeMenu')}
            title={t('nav.menuTitle')}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
