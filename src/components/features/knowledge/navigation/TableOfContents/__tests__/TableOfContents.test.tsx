import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { TableOfContents } from '..';

describe('TableOfContents', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <main data-knowledge-content>
        <h1 id="section1">Section 1</h1>
        <h2 id="section2">Section 2</h2>
        <h3 id="section3">Section 3</h3>
      </main>
      <div id="toc-root"></div>
    `;
  });

  it('generates table of contents from headings', async () => {
    render(<TableOfContents />, {
      container: document.getElementById('toc-root')!,
    });

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Section 1' })).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: 'Section 2' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Section 3' })).toBeInTheDocument();
  });

  it('scrolls to section on click', async () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    render(<TableOfContents />, {
      container: document.getElementById('toc-root')!,
    });

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Section 1' })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('link', { name: 'Section 1' }));
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('applies correct indentation based on heading level', async () => {
    render(<TableOfContents />, {
      container: document.getElementById('toc-root')!,
    });

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Section 1' })).toBeInTheDocument();
    });

    const level1 = screen.getByRole('link', { name: 'Section 1' });
    const level2 = screen.getByRole('link', { name: 'Section 2' });
    const level3 = screen.getByRole('link', { name: 'Section 3' });

    expect(level1).toHaveClass('font-semibold');
    expect(level2).toHaveClass('pl-4');
    expect(level3).toHaveClass('pl-8');
  });
});
