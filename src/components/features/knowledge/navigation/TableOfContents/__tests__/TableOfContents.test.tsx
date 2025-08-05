import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { TableOfContents } from '..';

describe('TableOfContents', () => {
  beforeEach(() => {
    // Setup mock DOM structure
    document.body.innerHTML = `
      <h1 id="section1">Section 1</h1>
      <h2 id="section2">Section 2</h2>
      <h3 id="section3">Section 3</h3>
    `;
  });

  it('generates table of contents from headings', () => {
    render(<TableOfContents />);
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Section 3')).toBeInTheDocument();
  });

  it('scrolls to section on click', () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    render(<TableOfContents />);
    fireEvent.click(screen.getByText('Section 1'));
    
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('applies correct indentation based on heading level', () => {
    render(<TableOfContents />);
    
    const level1 = screen.getByText('Section 1').closest('a');
    const level2 = screen.getByText('Section 2').closest('a');
    const level3 = screen.getByText('Section 3').closest('a');

    expect(level1).toHaveClass('pl-0');
    expect(level2).toHaveClass('pl-4');
    expect(level3).toHaveClass('pl-8');
  });
});