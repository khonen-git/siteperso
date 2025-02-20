import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@/__tests__/utils/test-utils';
import { setViewportSize, VIEWPORT_SIZES } from '@/__tests__/utils/responsive-utils';
import Header from '@/components/layout/Header';

jest.mock('@/components/theme/ThemeToggle', () => ({
  ThemeToggle: () => <button>Theme Toggle</button>,
}));

describe('Header', () => {
  it('renders the logo and navigation links on desktop', () => {
    setViewportSize(VIEWPORT_SIZES.desktop.width, VIEWPORT_SIZES.desktop.height);
    render(<Header />);
    
    expect(screen.getByText('Théo Knoepflin')).toBeInTheDocument();
    expect(screen.getByText('À propos')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('hides navigation container on mobile', () => {
    setViewportSize(VIEWPORT_SIZES.mobile.width, VIEWPORT_SIZES.mobile.height);
    render(<Header />);
    
    const navContainer = document.querySelector('.mr-4');
    expect(navContainer).toHaveClass('hidden', 'md:flex');
  });

  it('shows theme toggle on all screen sizes', () => {
    // Test mobile
    setViewportSize(VIEWPORT_SIZES.mobile.width, VIEWPORT_SIZES.mobile.height);
    render(<Header />);
    expect(screen.getByText('Theme Toggle')).toBeInTheDocument();

    // Test desktop
    setViewportSize(VIEWPORT_SIZES.desktop.width, VIEWPORT_SIZES.desktop.height);
    expect(screen.getByText('Theme Toggle')).toBeInTheDocument();
  });
}); 