import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

describe('ThemeProvider', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders children correctly', () => {
    const testContent = 'Test Content';
    const { container } = render(
      <ThemeProvider>
        <div>{testContent}</div>
      </ThemeProvider>
    );
    
    expect(container.innerHTML).toContain(testContent);
  });
}); 