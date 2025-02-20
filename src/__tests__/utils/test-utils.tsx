import * as React from 'react';
import { render, RenderOptions } from '@testing-library/react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };

describe('test-utils', () => {
  it('exports render function', () => {
    expect(render).toBeDefined();
  });

  it('renders components with custom wrapper', () => {
    const TestComponent = () => React.createElement('div', null, 'Test Content');
    const { container } = render(React.createElement(TestComponent));
    expect(container).toBeInTheDocument();
  });
}); 