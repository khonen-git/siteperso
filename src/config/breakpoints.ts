/**
 * Breakpoints alignés sur les écrans Tailwind par défaut (theme.screens).
 * Ne pas confondre avec `container.screens['2xl']` (= 1400px) dans tailwind.config.ts.
 *
 * Source de vérité width-first : pas de classification par ratio / orientation ici.
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export const MEDIA_QUERIES = {
  sm: `(min-width: ${BREAKPOINTS.sm}px)`,
  md: `(min-width: ${BREAKPOINTS.md}px)`,
  lg: `(min-width: ${BREAKPOINTS.lg}px)`,
  xl: `(min-width: ${BREAKPOINTS.xl}px)`,
  '2xl': `(min-width: ${BREAKPOINTS['2xl']}px)`,
} as const;

export function matchesMinWidth(width: number, breakpoint: Breakpoint): boolean {
  return width >= BREAKPOINTS[breakpoint];
}

export function isBelow(width: number, breakpoint: Breakpoint): boolean {
  return width < BREAKPOINTS[breakpoint];
}
