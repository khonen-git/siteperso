import { test, expect } from '@playwright/test';
import { gotoWithoutConsoleErrors } from './helpers/console-guard';
import { VIEWPORTS, BREAKPOINT_EDGE_WIDTHS } from '../test/utils/responsive';

const RESPONSIVE_ROUTES = [
  '/fr',
  '/fr/knowledge',
  '/fr/knowledge/probability/distributions/normal',
  '/fr/projects',
  '/fr/projects/website-creation',
] as const;

const KEY_VIEWPORTS = [
  { name: 'mobile', ...VIEWPORTS.mobile },
  { name: 'tablet-below-lg', width: BREAKPOINT_EDGE_WIDTHS.beforeLg, height: 800 },
  { name: 'desktop', ...VIEWPORTS.desktop },
] as const;

test.describe('responsive — no console errors', () => {
  for (const viewport of KEY_VIEWPORTS) {
    for (const route of RESPONSIVE_ROUTES) {
      test(`${route} @ ${viewport.name} (${viewport.width}px)`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await gotoWithoutConsoleErrors(page, route);
      });
    }
  }
});

test.describe('knowledge sidebar drawer', () => {
  test('opens on mobile and closes after navigation', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await gotoWithoutConsoleErrors(page, '/fr/knowledge');

    const trigger = page.getByTestId('knowledge-sidebar-drawer-trigger');
    await expect(trigger).toBeVisible();

    await trigger.click();
    const drawer = page.getByTestId('knowledge-sidebar-drawer');
    await expect(drawer).toBeVisible();

    await drawer.locator('a[href*="/knowledge/mathematics"]').first().click();
    await expect(drawer).toBeHidden();
    await expect(page).toHaveURL(/\/fr\/knowledge\/mathematics/);
  });

  test('hidden on desktop', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await gotoWithoutConsoleErrors(page, '/fr/knowledge');
    await expect(page.getByTestId('knowledge-sidebar-drawer-trigger')).toBeHidden();
  });
});
