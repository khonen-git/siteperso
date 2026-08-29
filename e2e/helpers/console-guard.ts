import type { Page } from '@playwright/test';

const IGNORED_CONSOLE_PATTERNS = [
  /Download the React DevTools/i,
  /favicon\.ico/i,
  /Failed to load resource.*favicon/i,
];

export interface ConsoleGuard {
  assertClean: (context?: string) => void;
  getErrors: () => string[];
}

export function attachConsoleGuard(page: Page): ConsoleGuard {
  const errors: string[] = [];

  page.on('console', (message) => {
    if (message.type() !== 'error') return;
    const text = message.text();
    if (IGNORED_CONSOLE_PATTERNS.some((pattern) => pattern.test(text))) return;
    errors.push(`[console.error] ${text}`);
  });

  page.on('pageerror', (error) => {
    errors.push(`[pageerror] ${error.message}`);
  });

  return {
    getErrors: () => [...errors],
    assertClean: (context = '') => {
      if (errors.length === 0) return;
      const prefix = context ? `${context}\n` : '';
      throw new Error(`${prefix}Console/page errors:\n${errors.join('\n---\n')}`);
    },
  };
}

export async function gotoWithoutConsoleErrors(
  page: Page,
  path: string,
  options?: { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' }
): Promise<ConsoleGuard> {
  const guard = attachConsoleGuard(page);
  await page.goto(path, { waitUntil: options?.waitUntil ?? 'domcontentloaded' });
  await page.waitForTimeout(300);
  guard.assertClean(path);
  return guard;
}
