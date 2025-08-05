import { useEffect, useState } from 'react';
import type { Theme } from '../types';

/**
 * useThemeDetector - Hook pour détecter les préférences de thème du système
 * Surveille les changements de préférences de thème du système
 */
export function useThemeDetector() {
  const [systemTheme, setSystemTheme] = useState<Theme>('light');

  useEffect(() => {
    // Vérifier si window est disponible (côté client)
    if (typeof window === 'undefined') return;

    // Créer le media query pour le thème sombre
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Mettre à jour le thème initial
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    // Fonction de gestion des changements
    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Ajouter le listener
    mediaQuery.addEventListener('change', handler);

    // Nettoyer le listener
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return systemTheme;
}