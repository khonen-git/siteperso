import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@/components/ui/theme/provider';

/**
 * Wrapper personnalisé pour les tests
 * Fournit le contexte nécessaire (thème, etc.)
 */
export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {ui}
    </ThemeProvider>
  );
}

/**
 * Mock pour Next/Image
 */
export const mockNextImage = () => {
  jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />
  }));
};

/**
 * Mock pour Next/Link
 */
export const mockNextLink = () => {
  jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href }: any) => <a href={href}>{children}</a>
  }));
};

/**
 * Mock pour les icônes
 */
export const mockIcons = () => {
  jest.mock('@/components/ui/icons', () => ({
    Icons: new Proxy({}, {
      get: () => () => <span data-testid="mock-icon" />
    })
  }));
};