import { test } from '@playwright/test';
import { gotoWithoutConsoleErrors } from './helpers/console-guard';

/** Key routes — FR focus; EN home for locale parity. */
const SMOKE_ROUTES = [
  '/fr',
  '/en',
  '/fr/about',
  '/fr/projects',
  '/fr/projects/website-creation',
  '/fr/blog',
  '/fr/blog/stoch-event-sampling',
  '/fr/knowledge',
  '/fr/knowledge/probability/distributions/normal',
  '/fr/knowledge/statistics/inference/statistical-tests',
  '/fr/dashboards',
  '/fr/dashboards/implied-vol',
  '/fr/references',
  '/fr/contact',
] as const;

test.describe('smoke — no console errors', () => {
  for (const route of SMOKE_ROUTES) {
    test(route, async ({ page }) => {
      await gotoWithoutConsoleErrors(page, route);
    });
  }
});
