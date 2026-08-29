import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PLAYWRIGHT_PORT ?? '3000';
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${PORT}`;

/** Production-like smoke (after build). Set E2E_DEV=1 to reuse `next dev`. */
const useDevServer = process.env.E2E_DEV === '1';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: !useDevServer,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: useDevServer ? 1 : process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  timeout: 60_000,
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  ...(useDevServer
    ? {}
    : {
        webServer: {
          command: 'npm run start',
          url: baseURL,
          reuseExistingServer: !process.env.CI,
          timeout: 60_000,
          stdout: 'pipe',
          stderr: 'pipe',
        },
      }),
});
