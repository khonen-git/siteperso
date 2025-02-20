import { setViewportSize, mockMatchMedia, VIEWPORT_SIZES } from './responsive-utils';

describe('Responsive Utils', () => {
  it('sets viewport size correctly', () => {
    setViewportSize(800, 600);
    expect(window.innerWidth).toBe(800);
    expect(window.innerHeight).toBe(600);
  });

  it('defines standard viewport sizes', () => {
    expect(VIEWPORT_SIZES.mobile).toBeDefined();
    expect(VIEWPORT_SIZES.tablet).toBeDefined();
    expect(VIEWPORT_SIZES.desktop).toBeDefined();
  });

  it('mocks matchMedia correctly', () => {
    mockMatchMedia(true);
    expect(window.matchMedia('(min-width: 768px)')).toEqual(
      expect.objectContaining({
        matches: true,
        media: '(min-width: 768px)',
      })
    );

    mockMatchMedia(false);
    expect(window.matchMedia('(min-width: 768px)')).toEqual(
      expect.objectContaining({
        matches: false,
        media: '(min-width: 768px)',
      })
    );
  });
}); 