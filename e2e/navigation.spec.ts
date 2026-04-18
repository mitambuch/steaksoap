import { expect, test } from '@playwright/test';

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION E2E — verifies routing, header links,
   theme toggle, and 404 fallback across all pages.
   ═══════════════════════════════════════════════════════════════ */

test.describe('Navigation — all pages load', () => {
  test('/ loads with heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('/playground loads', async ({ page }) => {
    await page.goto('/playground');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('/lab loads', async ({ page }) => {
    await page.goto('/lab');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('unknown route shows 404', async ({ page }) => {
    await page.goto('/this-does-not-exist');
    await expect(page.locator('text=404')).toBeVisible();
  });
});

test.describe('Navigation — header links', () => {
  test('header navigates to Playground', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('link', { name: /playground/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/playground/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('header navigates to Lab', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /lab/i }).first().click();
    await expect(page).toHaveURL(/\/lab/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('logo navigates back to home', async ({ page }) => {
    await page.goto('/playground');
    // Click the logo/brand link (first link in nav)
    await page.locator('nav[aria-label="Main navigation"] a').first().click();
    // With locale-prefix routing, home canonical URL is /:locale (fr|de|en)
    await expect(page).toHaveURL(/\/(fr|de|en)\/?$/);
  });
});

test.describe('Navigation — theme toggle', () => {
  test('toggles dark/light mode via data-theme attribute', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const initialTheme = await html.getAttribute('data-theme');

    const toggle = page.getByRole('button', { name: /switch to .* mode/i });
    await toggle.click();

    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);

    // Revert
    await toggle.click();
    const revertedTheme = await html.getAttribute('data-theme');
    expect(revertedTheme).toBe(initialTheme);
  });
});
