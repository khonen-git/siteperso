'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle(): React.JSX.Element {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Éviter l'hydratation côté serveur
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    if (!mounted) return;

    if (theme === 'system') {
      // Si on est en mode système, on passe à l'opposé du thème système
      setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else if (theme === 'dark') {
      // Si on est en mode sombre, on passe en mode clair
      setTheme('light');
    } else {
      // Si on est en mode clair, on passe en mode sombre
      setTheme('dark');
    }
  }, [theme, setTheme, systemTheme, mounted]);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="opacity-0">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Sun 
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-[2000ms] ${
          currentTheme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
        }`} 
      />
      <Moon 
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-[2000ms] ${
          currentTheme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        }`}
      />
      <span className="sr-only">Changer le thème</span>
    </Button>
  );
} 