import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import RootLayout from '@/app/layout';

interface LayoutProps {
  children: React.ReactNode;
}

interface RootProps {
  children: {
    props: LayoutProps;
  };
}

// Mocks
jest.mock('@/components/theme/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-font',
  }),
}));

jest.mock('@/components/layout/Header', () => ({
  __esModule: true,
  default: () => <header role="banner">Header</header>,
}));

jest.mock('@/components/layout/Footer', () => ({
  __esModule: true,
  default: () => <footer role="contentinfo">Footer</footer>,
}));

describe('RootLayout', () => {
  const renderLayout = () => {
    const layout = RootLayout({ children: 'Test Content' }) as React.ReactElement<RootProps>;
    const { props } = layout.props.children;
    return render(
      <div data-testid="layout-root">
        {props.children}
      </div>
    );
  };

  it('renders layout structure correctly', () => {
    const { container } = renderLayout();
    
    expect(container.querySelector('[data-testid="theme-provider"]')).toBeInTheDocument();
    expect(container.querySelector('[role="banner"]')).toBeInTheDocument();
    expect(container.querySelector('[role="contentinfo"]')).toBeInTheDocument();
    expect(container.querySelector('main')).toHaveClass('flex-1');
  });

  it('renders children in main section', () => {
    const { container } = renderLayout();
    
    const main = container.querySelector('main');
    expect(main).toHaveClass('flex-1');
    expect(main).toHaveTextContent('Test Content');
  });
}); 