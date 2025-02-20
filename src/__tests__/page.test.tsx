import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '@/app/page';

describe('Page', () => {
  it('renders the main heading', () => {
    render(<Page />);
    expect(screen.getByText('Data Analyst & Développeur')).toBeInTheDocument();
    expect(
      screen.getByText('Passionné par la data science et le développement web')
    ).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(<Page />);
    expect(screen.getByText('Voir mes projets')).toBeInTheDocument();
    expect(screen.getByText('Me contacter')).toBeInTheDocument();
  });

  it('renders latest updates section', () => {
    render(<Page />);
    expect(screen.getByText('Dernières Mises à Jour')).toBeInTheDocument();
    expect(
      screen.getByText('Restez informé des dernières actualités, projets et articles.')
    ).toBeInTheDocument();
  });
});
