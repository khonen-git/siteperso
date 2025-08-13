import { renderHook } from '@testing-library/react';
import { useProjectAnimation } from '../useProjectAnimation';

describe('useProjectAnimation', () => {
  it('returns default animation config', () => {
    const { result } = renderHook(() => useProjectAnimation());
    
    expect(result.current).toEqual({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: 0 }
    });
  });

  it('accepts custom animation parameters', () => {
    const customConfig = {
      delay: 0.3,
      duration: 0.8,
      y: 30
    };
    
    const { result } = renderHook(() => useProjectAnimation(customConfig));
    
    expect(result.current).toEqual({
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, delay: 0.3 }
    });
  });
});