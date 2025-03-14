import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@/__tests__/utils/test-utils';
import { setViewportSize, VIEWPORT_SIZES } from '@/__tests__/utils/responsive-utils';
import Footer from '@/components/layout/Footer';

describe('Footer', () => {
  it('renders copyright notice', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2024 Théo Charron/)).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<Footer />);
    
    const githubLink = screen.getByText('GitHub');
    const linkedinLink = screen.getByText('LinkedIn');
    
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/khonen-git');
    
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/tcharron');
  });

  it('adapts layout on mobile screens', () => {
    setViewportSize(VIEWPORT_SIZES.mobile.width, VIEWPORT_SIZES.mobile.height);
    render(<Footer />);
    
    const container = document.querySelector('.container');
    expect(container).toHaveClass('flex-col');
  });

  it('has responsive classes for desktop screens', () => {
    render(<Footer />);
    
    const container = document.querySelector('.container');
    expect(container).toHaveClass('md:h-24', 'md:flex-row');
  });

  it('adjusts text alignment based on screen size', () => {
    render(<Footer />);
    
    const copyrightContainer = screen.getByText(/© 2024 Théo Charron/).closest('p');
    expect(copyrightContainer).toHaveClass('text-center', 'md:text-left');
  });
}); 