import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../../inputs/button';
import { cn } from '@/lib/utils';
import type { ThemeToggleProps } from '../types';

/**
 * ThemeToggle - Bouton de basculement du thème
 * Permet de changer entre les thèmes clair et sombre
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={cn(
        "relative h-9 w-9 transition-colors hover:bg-accent",
        className
      )}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Changer le thème</span>
    </Button>
  );
}