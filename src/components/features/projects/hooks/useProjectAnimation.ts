import { useMemo } from 'react';
import type { ProjectAnimationConfig } from '../types';

interface UseProjectAnimationProps {
  delay?: number;
  duration?: number;
  y?: number;
}

/**
 * Hook pour gérer les animations des composants Project
 * @param props Configuration de l'animation
 * @returns Configuration de l'animation pour Framer Motion
 */
export function useProjectAnimation({
  delay = 0,
  duration = 0.5,
  y = 20
}: UseProjectAnimationProps = {}): ProjectAnimationConfig {
  return useMemo(
    () => ({
      initial: {
        opacity: 0,
        y
      },
      animate: {
        opacity: 1,
        y: 0
      },
      transition: {
        duration,
        delay
      }
    }),
    [delay, duration, y]
  );
}

// useProjectCardAnimation supprimé après consolidation de ProjectCard