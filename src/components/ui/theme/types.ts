import { ThemeProviderProps as NextThemeProviderProps } from 'next-themes';

export interface ThemeProviderProps extends Partial<NextThemeProviderProps> {
  children: React.ReactNode;
}

export interface ThemeToggleProps {
  className?: string;
}

export type Theme = 'light' | 'dark' | 'system';

export interface UseThemeReturn {
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
  systemTheme: Theme | undefined;
}