import '@testing-library/jest-dom';
import React from 'react';

jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-font',
  }),
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => React.createElement('div', props, children),
  },
}));

jest.mock('next/link', () => {
  function MockLink({ children, ...props }: any) {
    return React.createElement('a', props, children);
  }
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => React.createElement('img', { src, alt, ...props }),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
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

if (typeof globalThis.crypto === 'undefined') {
  // @ts-expect-error polyfill test
  globalThis.crypto = {};
}
if (typeof globalThis.crypto.randomUUID !== 'function') {
  globalThis.crypto.randomUUID = () => '00000000-0000-4000-8000-000000000000';
}

class IntersectionObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn(() => []);
  root = null;
  rootMargin = '';
  thresholds = [];
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});
