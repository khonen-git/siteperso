import { BREAKPOINTS } from '@/config/breakpoints';

export type ViewportSize = {
  width: number;
  height: number;
};

/**
 * Viewports représentatifs pour les tests Jest (pas une taxonomie d’appareils runtime).
 * La validation multi-device réelle reste Playwright.
 */
export const VIEWPORTS = {
  mobileSmall: { width: 320, height: 568 },
  mobile: { width: 375, height: 812 },
  mobileLarge: { width: 430, height: 932 },
  tablet: { width: BREAKPOINTS.md, height: 1024 },
  tabletLandscape: { width: BREAKPOINTS.lg, height: 768 },
  desktop: { width: BREAKPOINTS.xl, height: 800 },
  desktopLarge: { width: 1920, height: 1080 },
} as const satisfies Record<string, ViewportSize>;

/** Largeurs juste avant / sur chaque breakpoint Tailwind — là où les bugs CSS apparaissent. */
export const BREAKPOINT_EDGE_WIDTHS = {
  beforeSm: BREAKPOINTS.sm - 1,
  sm: BREAKPOINTS.sm,
  beforeMd: BREAKPOINTS.md - 1,
  md: BREAKPOINTS.md,
  beforeLg: BREAKPOINTS.lg - 1,
  lg: BREAKPOINTS.lg,
  beforeXl: BREAKPOINTS.xl - 1,
  xl: BREAKPOINTS.xl,
  before2xl: BREAKPOINTS['2xl'] - 1,
  '2xl': BREAKPOINTS['2xl'],
} as const;

export { BREAKPOINTS };

export function setViewportSize(width: number, height: number): void {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event('resize'));
}

export type MockMatchMediaOptions = {
  /** Fallback pour les queries non basées sur la largeur (ex. prefers-color-scheme). */
  nonWidthMatches?: boolean;
};

function evaluateWidthQuery(query: string, width: number): boolean | null {
  const minMatch = /min-width:\s*(\d+(?:\.\d+)?)px/i.exec(query);
  if (minMatch) {
    return width >= Number(minMatch[1]);
  }
  const maxMatch = /max-width:\s*(\d+(?:\.\d+)?)px/i.exec(query);
  if (maxMatch) {
    return width <= Number(maxMatch[1]);
  }
  return null;
}

/**
 * Mock `matchMedia` qui respecte min/max-width vs `window.innerWidth`.
 * Les autres queries utilisent `nonWidthMatches` (défaut false).
 */
export function mockMatchMedia(options: MockMatchMediaOptions = {}): void {
  const { nonWidthMatches = false } = options;

  window.matchMedia = jest.fn().mockImplementation((query: string) => {
    const widthResult = evaluateWidthQuery(query, window.innerWidth);
    const matches = widthResult ?? nonWidthMatches;

    return {
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  });
}
