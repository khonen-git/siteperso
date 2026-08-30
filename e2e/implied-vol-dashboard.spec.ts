import { test, expect } from '@playwright/test';
import { gotoWithoutConsoleErrors } from './helpers/console-guard';

test.describe('implied-vol dashboard', () => {
  test('overview is default tab', async ({ page }) => {
    await gotoWithoutConsoleErrors(page, '/fr/dashboards/implied-vol');
    await expect(page.getByTestId('iv-overview-smile')).toBeVisible();
    await expect(page.getByTestId('iv-dashboard-root')).toHaveAttribute('data-focused', 'false');
  });

  test('focus toggle enters fullscreen mode', async ({ page }) => {
    await gotoWithoutConsoleErrors(page, '/fr/dashboards/implied-vol');
    await page.getByTestId('iv-focus-toggle').click();
    await expect(page.getByTestId('iv-dashboard-root')).toHaveAttribute('data-focused', 'true');
  });

  test('surface tab mounts 3D or mobile fallback', async ({ page }) => {
    await gotoWithoutConsoleErrors(page, '/fr/dashboards/implied-vol?tab=surface');
    await page.getByRole('tab', { name: /Surface/i }).click();
    const surface3d = page.getByTestId('iv-surface-3d');
    const mobileFallback = page.getByTestId('iv-surface-mobile-fallback');
    await expect(surface3d.or(mobileFallback)).toBeVisible({ timeout: 15_000 });
  });

  test('URL persists tab query on navigation', async ({ page }) => {
    await gotoWithoutConsoleErrors(page, '/fr/dashboards/implied-vol');
    await page.getByRole('tab', { name: /Smile/i }).click();
    await expect(page).toHaveURL(/tab=smile/);
  });

  test('API snapshot returns HTTP 200 with SPY payload', async ({ request }) => {
    const response = await request.get('/api/dashboards/implied-vol?symbol=SPY');
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { metadata?: { symbol?: string } };
    expect(body.metadata?.symbol).toBe('SPY');
  });
});
