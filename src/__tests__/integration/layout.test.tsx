import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { setViewportSize, VIEWPORT_SIZES } from '@/__tests__/utils/responsive-utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Mocks
jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-font',
  }),
}));

jest.mock('@/components/theme/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/components/theme/ThemeToggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Theme Toggle</button>,
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <div id="test-wrapper">
    {children}
  </div>
);

describe('Layout Integration', () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    window.innerHeight = originalInnerHeight;
  });

  it('renders complete layout structure', () => {
    const { container } = render(
      <TestWrapper>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">Test Content</main>
          <Footer />
        </div>
      </TestWrapper>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('maintains layout structure on mobile', () => {
    setViewportSize(VIEWPORT_SIZES.mobile.width, VIEWPORT_SIZES.mobile.height);
    const { container } = render(
      <TestWrapper>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">Test Content</main>
          <Footer />
        </div>
      </TestWrapper>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('maintains layout structure on tablet', () => {
    setViewportSize(VIEWPORT_SIZES.tablet.width, VIEWPORT_SIZES.tablet.height);
    render(
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">Test Content</main>
        <Footer />
      </div>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('has correct spacing and layout hierarchy', () => {
    render(
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">Test Content</main>
        <Footer />
      </div>
    );

    const main = screen.getByRole('main');
    expect(main.className).toContain('flex-1');
  });

  it('maintains correct spacing and layout hierarchy', () => {
    render(
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">Test Content</main>
        <Footer />
      </div>
    );

    const main = screen.getByRole('main');
    const header = screen.getByRole('banner');
    const footer = screen.getByRole('contentinfo');

    expect(main.className).toContain('flex-1');
    expect(header.className).toContain('sticky');
    expect(header.className).toContain('top-0');
    expect(footer.className).toContain('border-t');
  });

  it('preserves navigation functionality across screen sizes', () => {
    render(
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">Test Content</main>
        <Footer />
      </div>
    );

    // Desktop navigation
    expect(screen.getByText('À propos')).toBeVisible();
    expect(screen.getByText('Portfolio')).toBeVisible();

    // Mobile navigation
    setViewportSize(VIEWPORT_SIZES.mobile.width, VIEWPORT_SIZES.mobile.height);
    const navContainer = document.querySelector('.mr-4');
    expect(navContainer).toHaveClass('hidden', 'md:flex');
  });

  it('shows theme toggle on all screen sizes', () => {
    const { container } = render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });
}); 