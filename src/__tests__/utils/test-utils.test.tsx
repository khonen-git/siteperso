import * as React from 'react';
import { render, screen } from './test-utils';

describe('Test Utils', () => {
  it('renders components with custom wrapper', () => {
    const TestComponent = () => <div>Test Content</div>;
    render(<TestComponent />);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('preserves custom render options', () => {
    const TestComponent = () => <div>Test Content</div>;
    const { container } = render(<TestComponent />, {
      container: document.createElement('div'),
    });
    expect(container).toBeInstanceOf(HTMLDivElement);
  });
}); 