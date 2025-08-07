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

/**
 * Hook pour gérer les animations des cartes de projet avec hover
 */
export function useProjectCardAnimation() {
  return useMemo(
    () => ({
      card: {
        className: 'transition-all duration-300 hover:shadow-xl'
      },
      image: {
        className: 'object-cover transition-transform duration-300 group-hover:scale-105'
      },
      title: {
        className: 'line-clamp-1 text-xl group-hover:text-primary transition-colors duration-300'
      },
      arrow: {
        className: 'h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'
      }
    }),
    []
  );
}