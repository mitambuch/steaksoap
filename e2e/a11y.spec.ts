import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/* ═══════════════════════════════════════════════════════════════
   A11Y E2E — axe-core accessibility scans on every page.
   Color-contrast is enforced on all user-facing pages.
   Playground exempts color-contrast because it renders every
   component variant, including decorative accent/status colors
   that intentionally prioritise brand over WCAG on dark bg.
   ═══════════════════════════════════════════════════════════════ */

const pages = [
  { name: 'Home', path: '/', disableContrast: false },
  { name: 'Playground', path: '/playground', disableContrast: true },
  { name: 'Lab', path: '/lab', disableContrast: false },
  { name: '404', path: '/this-does-not-exist', disableContrast: false },
];

for (const { name, path, disableContrast } of pages) {
  test(`${name} (${path}) has no accessibility violations`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    let builder = new AxeBuilder({ page });
    if (disableContrast) builder = builder.disableRules(['color-contrast']);

    const results = await builder.analyze();

    expect(results.violations).toEqual([]);
  });
}
