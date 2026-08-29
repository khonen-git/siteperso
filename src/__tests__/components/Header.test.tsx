import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '../../../test/utils/render';
import { setViewportSize, VIEWPORTS } from '../../../test/utils/responsive';
import Header from '@/components/layout/Header';

jest.mock('@/components/theme/ThemeToggle', () => ({
  ThemeToggle: () => <button>Theme Toggle</button>,
}));

jest.mock('@/components/layout/LanguageSwitcher', () => ({
  LanguageSwitcher: () => <button>Language</button>,
}));

jest.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
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
      'nav.blog': 'Blog & Recherche',
      'nav.references': 'Références',
      'nav.activity': 'Activité du site',
      'nav.contact': 'Contact',
      'nav.menuTitle': 'Menu',
      'nav.openMenu': 'Ouvrir le menu',
      'nav.closeMenu': 'Fermer le menu',
    };
    return (key: string) => messages[key] ?? key;
  }),
}));

describe('Header', () => {
  it('renders the logo and navigation links on desktop', async () => {
    setViewportSize(VIEWPORTS.desktop.width, VIEWPORTS.desktop.height);
    const ui = await Header();
    render(ui);

    expect(screen.getByText('Théo Charron')).toBeInTheDocument();
    expect(screen.getByText('À propos')).toBeInTheDocument();
    expect(screen.getByText('Connaissances')).toBeInTheDocument();
    expect(screen.getByText('Projets')).toBeInTheDocument();
    expect(screen.getByText('Blog & Recherche')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('shows brand and a mobile menu trigger under md', async () => {
    setViewportSize(VIEWPORTS.mobile.width, VIEWPORTS.mobile.height);
    const ui = await Header();
    render(ui);

    expect(screen.getByText('Théo Charron')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ouvrir le menu' })).toBeInTheDocument();
    expect(document.querySelector('nav.hidden.md\\:flex')).toHaveClass('hidden', 'md:flex');
  });

  it('opens and closes the mobile navigation panel', async () => {
    setViewportSize(VIEWPORTS.mobile.width, VIEWPORTS.mobile.height);
    const ui = await Header();
    render(ui);

    fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le menu' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Connaissances' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Fermer le menu' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows theme toggle on all screen sizes', async () => {
    setViewportSize(VIEWPORTS.mobile.width, VIEWPORTS.mobile.height);
    const ui = await Header();
    render(ui);
    expect(screen.getByText('Theme Toggle')).toBeInTheDocument();

    setViewportSize(VIEWPORTS.desktop.width, VIEWPORTS.desktop.height);
    expect(screen.getByText('Theme Toggle')).toBeInTheDocument();
  });
});
