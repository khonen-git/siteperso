import { renderHook, act } from '@testing-library/react';
import { useCalculationCache } from '../useCalculationCache';

describe('useCalculationCache', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('devrait stocker et récupérer des valeurs correctement', () => {
    const { result } = renderHook(() => useCalculationCache<number>());
    
    const key = result.current.generateKey({ test: 1 });
    act(() => {
      result.current.set(key, 42);
    });
    
    expect(result.current.get(key)).toBe(42);
  });

  it('devrait respecter la taille maximale du cache', () => {
    const { result } = renderHook(() => useCalculationCache<number>({ maxSize: 2 }));
    
    const key1 = result.current.generateKey({ id: 1 });
    const key2 = result.current.generateKey({ id: 2 });
    const key3 = result.current.generateKey({ id: 3 });
    
    act(() => {
      result.current.set(key1, 1);
      result.current.set(key2, 2);
      result.current.set(key3, 3);
    });
    
    expect(result.current.get(key1)).toBeUndefined(); // La plus ancienne entrée devrait être supprimée
    expect(result.current.get(key2)).toBe(2);
    expect(result.current.get(key3)).toBe(3);
  });

  it('devrait respecter le TTL', () => {
    const ttl = 1000; // 1 seconde
    const { result } = renderHook(() => useCalculationCache<number>({ ttl }));
    
    const key = result.current.generateKey({ test: 1 });
    act(() => {
      result.current.set(key, 42);
    });
    
    expect(result.current.get(key)).toBe(42);
    
    act(() => {
      jest.advanceTimersByTime(ttl + 100);
    });
    
    expect(result.current.get(key)).toBeUndefined();
  });

  it('devrait effacer le cache', () => {
    const { result } = renderHook(() => useCalculationCache<number>());
    
    const key = result.current.generateKey({ test: 1 });
    act(() => {
      result.current.set(key, 42);
    });
    
    expect(result.current.get(key)).toBe(42);
    
    act(() => {
      result.current.clear();
    });
    
    expect(result.current.get(key)).toBeUndefined();
  });

  it('devrait générer des clés uniques pour différents paramètres', () => {
    const { result } = renderHook(() => useCalculationCache<number>());
    
    const key1 = result.current.generateKey({ a: 1, b: 2 });
    const key2 = result.current.generateKey({ b: 2, a: 1 });
    const key3 = result.current.generateKey({ a: 1, b: 3 });
    
    expect(key1).toBe(key2); // Même contenu, ordre différent
    expect(key1).not.toBe(key3); // Contenu différent
  });
}); 