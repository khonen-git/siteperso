import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { FooterProps } from '../types';

/**
 * Footer - Pied de page de l'application
 * Contient les liens et informations de copyright
 */
export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t bg-background", className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <Link
              href="https://github.com/theocharron"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Théo Charron
            </Link>
            . Source code available on{" "}
            <Link
              href="https://github.com/theocharron/reworksiteperso"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}