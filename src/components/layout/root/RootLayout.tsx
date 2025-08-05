import React from 'react';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}