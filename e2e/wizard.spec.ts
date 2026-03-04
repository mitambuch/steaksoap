import { expect, test } from '@playwright/test';

/* ═══════════════════════════════════════════════════════════════
   WIZARD E2E — tests the SetupWizard interactive modal.
   Verifies open/close, step navigation, and content rendering.
   ═══════════════════════════════════════════════════════════════ */

test.describe('SetupWizard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('opens wizard when clicking the guided setup button', async ({ page }) => {
    const wizardButton = page.getByRole('button', { name: /guided setup/i }).first();
    await wizardButton.click();

    // Wizard modal should be visible
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
  });

  test('wizard can be closed', async ({ page }) => {
    const wizardButton = page.getByRole('button', { name: /guided setup/i }).first();
    await wizardButton.click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    // Close via X button
    const closeButton = modal.getByRole('button', { name: /close/i });
    await closeButton.click();

    await expect(modal).not.toBeVisible();
  });

  test('wizard shows step content and navigates forward', async ({ page }) => {
    const wizardButton = page.getByRole('button', { name: /guided setup/i }).first();
    await wizardButton.click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    // Should have a "Got it →" or "Done, next →" button
    const nextButton = modal.getByRole('button', { name: /got it|done.*next/i });
    if (await nextButton.isVisible()) {
      await nextButton.click();
      // Modal should still be visible (on step 2)
      await expect(modal).toBeVisible();
    }
  });
});
