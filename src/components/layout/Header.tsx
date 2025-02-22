import * as React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const Header = (): React.JSX.Element => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Théo Charron</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/about" className="transition-colors hover:text-foreground/80">
              À propos
            </Link>
            <Link href="/knowledge" className="transition-colors hover:text-foreground/80">
              Connaissances
            </Link>
            <Link href="/projects" className="transition-colors hover:text-foreground/80">
              Projets
            </Link>
            <Link href="/references" className="transition-colors hover:text-foreground/80">
              Références
            </Link>
            <Link href="/activity" className="transition-colors hover:text-foreground/80">
              Activité du site
            </Link>
            <Link href="/contact" className="transition-colors hover:text-foreground/80">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search component will be added here */}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header; 