import { expect, test } from '@playwright/test';

/* ═══════════════════════════════════════════════════════════════
   SMOKE TESTS — essential checks that the app runs correctly.
   Chromium only, no CI integration (run manually with pnpm test:e2e).
   ═══════════════════════════════════════════════════════════════ */

test.describe('Smoke — Home page', () => {
  test('loads and shows the hero heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('100% free');
  });

  test('has no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
});

test.describe('Smoke — Navigation', () => {
  test('navigates to /playground', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('link', { name: /playground/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/playground/);
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('Smoke — Theme toggle', () => {
  test('switches between dark and light mode', async ({ page }) => {
    await page.goto('/');

    // Default should be dark (system preference or default)
    const html = page.locator('html');
    const initialTheme = await html.getAttribute('data-theme');

    // Click the theme toggle button
    const toggleButton = page.getByRole('button', { name: /switch to .* mode/i });
    await toggleButton.click();

    // Theme should have changed
    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);

    // Click again to revert
    await toggleButton.click();
    const revertedTheme = await html.getAttribute('data-theme');
    expect(revertedTheme).toBe(initialTheme);
  });
});

test.describe('Smoke — Playground', () => {
  test('shows component sections', async ({ page }) => {
    await page.goto('/playground');
    await expect(page.locator('h1')).toBeVisible();
    // Playground should display UI component sections
    await expect(page.getByText('Button')).toBeVisible();
  });

  test('has no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/playground');
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
});
