export const VIEWPORT_SIZES = {
  mobile: { width: 320, height: 568 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
};

export function setViewportSize(width: number, height: number): void {
  window.innerWidth = width;
  window.innerHeight = height;
}

export function mockMatchMedia(matches: boolean): void {
  window.matchMedia = jest.fn().mockImplementation(query => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}

describe('responsive-utils', () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    window.innerHeight = originalInnerHeight;
    window.matchMedia = originalMatchMedia;
  });

  it('exports VIEWPORT_SIZES with correct values', () => {
    expect(VIEWPORT_SIZES).toBeDefined();
    expect(VIEWPORT_SIZES.mobile).toBeDefined();
    expect(VIEWPORT_SIZES.tablet).toBeDefined();
    expect(VIEWPORT_SIZES.desktop).toBeDefined();
  });

  it('setViewportSize updates window dimensions', () => {
    setViewportSize(800, 600);
    expect(window.innerWidth).toBe(800);
    expect(window.innerHeight).toBe(600);
  });

  it('mockMatchMedia mocks window.matchMedia', () => {
    const mediaQuery = '(min-width: 768px)';
    mockMatchMedia(true);
    const result = window.matchMedia(mediaQuery);
    expect(result.matches).toBe(true);
    expect(result.media).toBe(mediaQuery);
  });
}); 