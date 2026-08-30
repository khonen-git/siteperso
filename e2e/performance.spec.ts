import { test, expect } from '@playwright/test';

const PAGE_LOAD_MS = 2_000;
const API_RESPONSE_MS = 500;

const PERF_ROUTES = [
  '/fr',
  '/fr/dashboards',
  '/fr/dashboards/implied-vol',
  '/fr/projects',
  '/fr/knowledge',
] as const;

test.describe('performance — page load', () => {
  for (const route of PERF_ROUTES) {
    test(`${route} domcontentloaded < ${PAGE_LOAD_MS}ms`, async ({ page }) => {
      const started = Date.now();
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      const elapsed = Date.now() - started;

      expect(response?.ok(), `${route} HTTP status`).toBeTruthy();
      expect(elapsed, `${route} load time`).toBeLessThan(PAGE_LOAD_MS);
    });
  }
});

test.describe('performance — API', () => {
  test(`GET /api/dashboards/implied-vol < ${API_RESPONSE_MS}ms`, async ({ request }) => {
    const started = Date.now();
    const response = await request.get('/api/dashboards/implied-vol');
    const elapsed = Date.now() - started;

    expect(response.ok()).toBeTruthy();
    expect(elapsed).toBeLessThan(API_RESPONSE_MS);
  });
});
