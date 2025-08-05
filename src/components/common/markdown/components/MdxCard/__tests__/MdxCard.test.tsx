import React from 'react';
import { renderWithProviders } from '@/components/common/test-utils';
import { MdxCard } from '..';

describe('MdxCard', () => {
  it('renders content correctly', () => {
    const { getByText } = renderWithProviders(
      <MdxCard>Test Content</MdxCard>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    const { getByText } = renderWithProviders(
      <MdxCard title="Test Title">Content</MdxCard>
    );
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('applies prose styles to content', () => {
    const { container } = renderWithProviders(
      <MdxCard>Test Content</MdxCard>
    );
    expect(container.querySelector('.prose')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithProviders(
      <MdxCard className="test-class">Content</MdxCard>
    );
    expect(container.firstChild).toHaveClass('test-class');
  });

  it('supports nested markdown content', () => {
    const { container } = renderWithProviders(
      <MdxCard>
        <h1>Title</h1>
        <p>Paragraph</p>
        <ul>
          <li>Item</li>
        </ul>
      </MdxCard>
    );
    
    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelector('p')).toBeInTheDocument();
    expect(container.querySelector('ul > li')).toBeInTheDocument();
  });
});