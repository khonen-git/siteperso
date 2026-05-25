import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@/__tests__/utils/test-utils';
import { setViewportSize, VIEWPORT_SIZES } from '@/__tests__/utils/responsive-utils';
import Header from '@/components/layout/Header';
import { NextIntlClientProvider } from 'next-intl';

jest.mock('@/components/theme/ThemeToggle', () => ({
  ThemeToggle: () => <button>Theme Toggle</button>,
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

const messages = {
  common: {
    languageSwitcher: { label: 'Changer de langue', fr: 'Français', en: 'English' },
  },
};

describe('Header', () => {
  it('renders the logo and navigation links on desktop', async () => {
    setViewportSize(VIEWPORT_SIZES.desktop.width, VIEWPORT_SIZES.desktop.height);
    const ui = await Header();
    render(<NextIntlClientProvider locale="fr" messages={messages}>{ui}</NextIntlClientProvider>);

    expect(screen.getByText('Théo Charron')).toBeInTheDocument();
    expect(screen.getByText('À propos')).toBeInTheDocument();
    expect(screen.getByText('Connaissances')).toBeInTheDocument();
    expect(screen.getByText('Projets')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('hides navigation container on mobile', async () => {
    setViewportSize(VIEWPORT_SIZES.mobile.width, VIEWPORT_SIZES.mobile.height);
    const ui = await Header();
    render(<NextIntlClientProvider locale="fr" messages={messages}>{ui}</NextIntlClientProvider>);

    const navContainer = document.querySelector('.mr-4');
    expect(navContainer).toHaveClass('hidden', 'md:flex');
  });

  it('shows theme toggle on all screen sizes', async () => {
    setViewportSize(VIEWPORT_SIZES.mobile.width, VIEWPORT_SIZES.mobile.height);
    const ui = await Header();
    render(<NextIntlClientProvider locale="fr" messages={messages}>{ui}</NextIntlClientProvider>);
    expect(screen.getByText('Theme Toggle')).toBeInTheDocument();

    setViewportSize(VIEWPORT_SIZES.desktop.width, VIEWPORT_SIZES.desktop.height);
    expect(screen.getByText('Theme Toggle')).toBeInTheDocument();
  });
});
