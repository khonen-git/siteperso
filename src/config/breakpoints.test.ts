import { BREAKPOINTS, isBelow, matchesMinWidth } from '@/config/breakpoints';

describe('breakpoints', () => {
  it('matches Tailwind default widths', () => {
    expect(BREAKPOINTS.md).toBe(768);
    expect(BREAKPOINTS.lg).toBe(1024);
  });

  it('evaluates min-width helpers', () => {
    expect(matchesMinWidth(767, 'md')).toBe(false);
    expect(matchesMinWidth(768, 'md')).toBe(true);
    expect(isBelow(1023, 'lg')).toBe(true);
    expect(isBelow(1024, 'lg')).toBe(false);
  });
});
