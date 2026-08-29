const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/?(*.)+(test|spec).[jt]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^lucide-react$': '<rootDir>/test/mocks/lucide-react.ts',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': ['@swc/jest'],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(next-intl|use-intl|next-mdx-remote|@mdx-js|remark-gfm|react-syntax-highlighter|lowlight|hastscript|property-information|space-separated-tokens|comma-separated-tokens|bail|trough|vfile|vfile-message|unist-util-.*|unified|mdast-util-.*|micromark.*|decode-named-character-reference|character-entities|ccount|escape-string-regexp|markdown-table|zwitch|longest-streak|devlop)/)',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/.next/', '<rootDir>/test/'],
};

module.exports = createJestConfig(customJestConfig);
