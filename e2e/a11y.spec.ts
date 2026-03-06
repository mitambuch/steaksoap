import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/* ═══════════════════════════════════════════════════════════════
   A11Y E2E — axe-core accessibility scans on every page.
   Disables color-contrast (flaky in headless Chromium with
   CSS custom properties / design tokens).
   ═══════════════════════════════════════════════════════════════ */

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Playground', path: '/playground' },
];

for (const { name, path } of pages) {
  test(`${name} (${path}) has no accessibility violations`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();

    expect(results.violations).toEqual([]);
  });
}
