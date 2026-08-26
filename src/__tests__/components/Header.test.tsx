import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '../../../test/utils/render';
import { setViewportSize, VIEWPORT_SIZES } from '../../../test/utils/responsive';
import Header from '@/components/layout/Header';

jest.mock('@/components/theme/ThemeToggle', () => ({
  ThemeToggle: () => <button>Theme Toggle</button>,
}));

jest.mock('@/components/layout/LanguageSwitcher', () => ({
  LanguageSwitcher: () => <button>Language</button>,
}));

jest.mock('@/i18n/navigation', () => ({
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn(async () => {
    const messages: Record<string, string> = {
      brand: 'Théo Charron',
      'nav.about': 'À propos',
      'nav.knowledge': 'Connaissances',
      'nav.projects': 'Projets',
      'nav.references': 'Références',
      'nav.activity': 'Activité du site',
      'nav.contact': 'Contact',
    };
    return (key: string) => messages[key] ?? key;
  }),
}));

describe('Header', () => {
  it('renders the logo and navigation links on desktop', async () => {
    setViewportSize(VIEWPORT_SIZES.desktop.width, VIEWPORT_SIZES.desktop.height);
    const ui = await Header();
    render(ui);

    expect(screen.getByText('Théo Charron')).toBeInTheDocument();
    expect(screen.getByText('À propos')).toBeInTheDocument();
    expect(screen.getByText('Connaissances')).toBeInTheDocument();
    expect(screen.getByText('Projets')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('hides navigation container on mobile', async () => {
    setViewportSize(VIEWPORT_SIZES.mobile.width, VIEWPORT_SIZES.mobile.height);
    const ui = await Header();
    render(ui);

    const navContainer = document.querySelector('.mr-4');
    expect(navContainer).toHaveClass('hidden', 'md:flex');
  });

  it('shows theme toggle on all screen sizes', async () => {
    setViewportSize(VIEWPORT_SIZES.mobile.width, VIEWPORT_SIZES.mobile.height);
    const ui = await Header();
    render(ui);
    expect(screen.getByText('Theme Toggle')).toBeInTheDocument();

    setViewportSize(VIEWPORT_SIZES.desktop.width, VIEWPORT_SIZES.desktop.height);
    expect(screen.getByText('Theme Toggle')).toBeInTheDocument();
  });
});
