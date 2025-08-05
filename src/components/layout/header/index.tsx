import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme/toggle';
import { cn } from '@/lib/utils';
import type { HeaderProps } from '../types';

/**
 * Header - En-tête principal de l'application
 * Contient la navigation et le toggle de thème
 */
export function Header({ className }: HeaderProps) {
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Théo Charron</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-foreground/80">
              À propos
            </Link>
            <Link href="/projects" className="hover:text-foreground/80">
              Projets
            </Link>
            <Link href="/knowledge" className="hover:text-foreground/80">
              Connaissances
            </Link>
            <Link href="/contact" className="hover:text-foreground/80">
              Contact
            </Link>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}