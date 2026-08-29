import type * as React from 'react';

export type ThemeProviderProps = React.ComponentProps<typeof import('next-themes').ThemeProvider>;

export interface ThemeToggleProps {
  className?: string;
}

export type Theme = 'light' | 'dark' | 'system';

export interface UseThemeReturn {
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
  systemTheme: Theme | undefined;
}
