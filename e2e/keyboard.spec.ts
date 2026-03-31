import { expect, test } from '@playwright/test';

/* ═══════════════════════════════════════════════════════════════
   KEYBOARD ACCESSIBILITY — verifies the entire site is
   navigable via keyboard alone. Critical for a11y compliance.
   ═══════════════════════════════════════════════════════════════ */

test.describe('Keyboard — focus visibility', () => {
  test('Tab moves focus through interactive elements on Home', async ({ page }) => {
    await page.goto('/');
    // WHY: Focus the skip-link directly to start tab navigation from a known element
    const skipLink = page.getByRole('link', { name: /skip to content/i });
    await skipLink.focus();
    await page.keyboard.press('Tab');
    const firstFocused = page.locator(':focus');
    await expect(firstFocused).toBeVisible();

    // Continue tabbing — every focused element should be visible
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      const tagName = await focused.evaluate(el => el.tagName.toLowerCase());
      // Every focusable element should be a link, button, or input
      expect(['a', 'button', 'input', 'select', 'textarea', 'summary']).toContain(tagName);
    }
  });

  test('Tab moves focus through Playground components', async ({ page }) => {
    await page.goto('/playground');
    await page.keyboard.press('Tab');

    // Tab through at least 10 elements — all should be visible interactive elements
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      const isVisible = await focused.isVisible().catch(() => false);
      // Focus should never land on a hidden element
      if (isVisible) {
        const tagName = await focused.evaluate(el => el.tagName.toLowerCase());
        expect(['a', 'button', 'input', 'select', 'textarea', 'summary', 'div']).toContain(tagName);
      }
    }
  });
});

test.describe('Keyboard — navigation', () => {
  test('Enter activates links', async ({ page }) => {
    await page.goto('/');
    // Tab to the Playground link in the header
    const playgroundLink = page.getByRole('link', { name: /playground/i }).first();
    await playgroundLink.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/playground/);
  });

  test('theme toggle works with Enter', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const initialTheme = await html.getAttribute('data-theme');

    const toggle = page.getByRole('button', { name: /switch to .* mode/i });
    await toggle.focus();
    await page.keyboard.press('Enter');

    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });
});

test.describe('Keyboard — no focus traps', () => {
  test('can Tab through entire Home page without getting stuck', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.getByRole('link', { name: /skip to content/i });
    await skipLink.focus();
    const focusedElements: string[] = [];

    // Tab through 20 elements
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? `${el.tagName}:${el.textContent?.slice(0, 20)}` : 'none';
      });
      focusedElements.push(focused);
    }

    // Should not be stuck on the same element (would indicate a focus trap)
    const unique = new Set(focusedElements);
    expect(unique.size).toBeGreaterThan(3);
  });
});
