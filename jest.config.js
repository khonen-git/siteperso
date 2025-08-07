const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^lucide-react$': '<rootDir>/src/__tests__/mocks/lucide-react.ts',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': ['@swc/jest'],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(next|next/dist/lib|next/dist/client|next/dist/pages|@radix-ui|next-themes|class-variance-authority)/)',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}',
    '!src/__tests__/mocks/**',
  ],
}

module.exports = createJestConfig(customJestConfig)