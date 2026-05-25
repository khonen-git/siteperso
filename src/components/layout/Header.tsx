import * as React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

const Header = async (): Promise<React.JSX.Element> => {
  const t = await getTranslations('common');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">{t('brand')}</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/about" className="transition-colors hover:text-foreground/80">
              {t('nav.about')}
            </Link>
            <Link href="/knowledge" className="transition-colors hover:text-foreground/80">
              {t('nav.knowledge')}
            </Link>
            <Link href="/projects" className="transition-colors hover:text-foreground/80">
              {t('nav.projects')}
            </Link>
            <Link href="/references" className="transition-colors hover:text-foreground/80">
              {t('nav.references')}
            </Link>
            <Link href="/activity" className="transition-colors hover:text-foreground/80">
              {t('nav.activity')}
            </Link>
            <Link href="/contact" className="transition-colors hover:text-foreground/80">
              {t('nav.contact')}
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none" />
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
