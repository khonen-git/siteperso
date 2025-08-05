import React from 'react';
import { Header } from '../header';
import { Footer } from '../footer';
import { ThemeProvider } from '@/components/ui/theme/provider';
import { cn } from '@/lib/utils';
import type { BaseLayoutProps } from '../types';

/**
 * RootLayout - Layout principal de l'application
 * Gère la structure de base avec header, footer et thème
 */
export function RootLayout({ children, className }: BaseLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className={cn("relative flex min-h-screen flex-col", className)}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}