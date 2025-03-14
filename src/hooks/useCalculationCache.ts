import { useRef, useCallback } from 'react';

interface CacheEntry<T> {
  key: string;
  value: T;
  timestamp: number;
}

interface CacheOptions {
  maxSize?: number;
  ttl?: number; // Time to live en millisecondes
}

export function useCalculationCache<T>(options: CacheOptions = {}) {
  const { maxSize = 100, ttl = 5000 } = options;
  const cacheRef = useRef<Map<string, CacheEntry<T>>>(new Map());

  const generateKey = useCallback((params: unknown) => {
    return JSON.stringify(params);
  }, []);

  const get = useCallback((key: string): T | undefined => {
    const entry = cacheRef.current.get(key);
    if (!entry) return undefined;

    const now = Date.now();
    if (now - entry.timestamp > ttl) {
      cacheRef.current.delete(key);
      return undefined;
    }

    return entry.value;
  }, [ttl]);

  const set = useCallback((key: string, value: T) => {
    if (cacheRef.current.size >= maxSize) {
      // Supprimer l'entrée la plus ancienne
      const oldestKey = Array.from(cacheRef.current.entries())
        .sort(([, a], [, b]) => a.timestamp - b.timestamp)[0][0];
      cacheRef.current.delete(oldestKey);
    }

    cacheRef.current.set(key, {
      key,
      value,
      timestamp: Date.now()
    });
  }, [maxSize]);

  const clear = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  return {
    generateKey,
    get,
    set,
    clear
  };
} 