import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

const MoonIcon = () => React.createElement('div', { 'data-testid': 'moon-icon' });
const SunIcon = () => React.createElement('div', { 'data-testid': 'sun-icon' });

export const Moon = MoonIcon;
export const Sun = SunIcon;

describe('Lucide React Mocks', () => {
  it('renders Moon icon correctly', () => {
    const { container } = render(React.createElement(MoonIcon));
    expect(container.querySelector('[data-testid="moon-icon"]')).toBeInTheDocument();
  });

  it('renders Sun icon correctly', () => {
    const { container } = render(React.createElement(SunIcon));
    expect(container.querySelector('[data-testid="sun-icon"]')).toBeInTheDocument();
  });
}); 