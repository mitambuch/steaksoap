import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SetupWizard } from '../SetupWizard';

beforeEach(() => {
  localStorage.clear();
});

afterEach(cleanup);

function renderWizard(onClose = vi.fn()) {
  return { onClose, ...render(<SetupWizard onClose={onClose} />) };
}

describe('SetupWizard', () => {
  it('renders the modal with dialog role', () => {
    renderWizard();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows the welcome screen by default', () => {
    renderWizard();
    expect(screen.getByText('Welcome to steaksoap')).toBeInTheDocument();
  });

  it('navigates to the next slide on CTA click', async () => {
    const user = userEvent.setup();
    renderWizard();
    await user.click(screen.getByRole('button', { name: /let's do this/i }));
    // Should be on the first real step now (VS Code intro)
    expect(screen.queryByText('Welcome to steaksoap')).not.toBeInTheDocument();
  });

  it('navigates back with the back button', async () => {
    const user = userEvent.setup();
    renderWizard();
    // Go to step 1
    await user.click(screen.getByRole('button', { name: /let's do this/i }));
    // Go to step 2
    await user.click(screen.getByRole('button', { name: /got it/i }));
    // Go back
    await user.click(screen.getByRole('button', { name: /back/i }));
    // Should still not be on welcome (back from step 2 goes to step 1)
    expect(screen.queryByText('Welcome to steaksoap')).not.toBeInTheDocument();
  });

  it('closes directly from welcome screen', async () => {
    const user = userEvent.setup();
    const { onClose } = renderWizard();
    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('shows quit confirmation when closing mid-wizard', async () => {
    const user = userEvent.setup();
    renderWizard();
    // Advance past welcome
    await user.click(screen.getByRole('button', { name: /let's do this/i }));
    // Click close
    await user.click(screen.getByRole('button', { name: /close/i }));
    // Should show quit confirmation
    expect(screen.getByText('Taking a break?')).toBeInTheDocument();
  });

  it('dismisses quit confirmation with "Continue setup"', async () => {
    const user = userEvent.setup();
    renderWizard();
    await user.click(screen.getByRole('button', { name: /let's do this/i }));
    await user.click(screen.getByRole('button', { name: /close/i }));
    await user.click(screen.getByRole('button', { name: /continue setup/i }));
    expect(screen.queryByText('Taking a break?')).not.toBeInTheDocument();
  });

  it('closes with "Resume later" from quit confirmation', async () => {
    const user = userEvent.setup();
    const { onClose } = renderWizard();
    await user.click(screen.getByRole('button', { name: /let's do this/i }));
    await user.click(screen.getByRole('button', { name: /close/i }));
    await user.click(screen.getByRole('button', { name: /resume later/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('persists progress in localStorage', async () => {
    const user = userEvent.setup();
    renderWizard();
    await user.click(screen.getByRole('button', { name: /let's do this/i }));
    const stored = JSON.parse(localStorage.getItem('steaksoap_wizard') ?? '{}');
    expect(stored.step).toBe(1);
    expect(stored.version).toBe(5);
  });

  it('restores progress from localStorage', () => {
    localStorage.setItem('steaksoap_wizard', JSON.stringify({ version: 5, step: 1 }));
    renderWizard();
    // Should NOT be on welcome
    expect(screen.queryByText('Welcome to steaksoap')).not.toBeInTheDocument();
  });

  it('resets progress if version mismatch', () => {
    localStorage.setItem('steaksoap_wizard', JSON.stringify({ version: 1, step: 5 }));
    renderWizard();
    // Should be on welcome (version mismatch resets)
    expect(screen.getByText('Welcome to steaksoap')).toBeInTheDocument();
  });

  it('closes on Escape from welcome', async () => {
    const user = userEvent.setup();
    const { onClose } = renderWizard();
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('shows quit confirmation on Escape mid-wizard', async () => {
    const user = userEvent.setup();
    renderWizard();
    await user.click(screen.getByRole('button', { name: /let's do this/i }));
    await user.keyboard('{Escape}');
    expect(screen.getByText('Taking a break?')).toBeInTheDocument();
  });

  it('dismisses quit confirmation on second Escape', async () => {
    const user = userEvent.setup();
    renderWizard();
    await user.click(screen.getByRole('button', { name: /let's do this/i }));
    await user.keyboard('{Escape}');
    expect(screen.getByText('Taking a break?')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByText('Taking a break?')).not.toBeInTheDocument();
  });

  it('navigates to action slide with link button', async () => {
    const user = userEvent.setup();
    renderWizard();
    // Welcome -> VS Code intro
    await user.click(screen.getByRole('button', { name: /let's do this/i }));
    // VS Code intro -> VS Code install (action + link)
    await user.click(screen.getByRole('button', { name: /got it/i }));
    expect(screen.getByRole('link', { name: /download vs code/i })).toBeInTheDocument();
  });

  it('navigates to verify slide with command', async () => {
    const user = userEvent.setup();
    renderWizard();
    // Welcome -> step 1 (intro) -> step 2 (action) -> step 3 (intro) -> step 4 (action) -> step 5 (verify)
    await user.click(screen.getByRole('button', { name: /let's do this/i }));
    await user.click(screen.getByRole('button', { name: /got it/i }));
    await user.click(screen.getByRole('button', { name: /done, next/i }));
    await user.click(screen.getByRole('button', { name: /got it/i }));
    await user.click(screen.getByRole('button', { name: /done, next/i }));
    // Now on verify slide — should show the command
    expect(screen.getByText('node --version')).toBeInTheDocument();
  });

  it('shows the "Stuck? Copy help message" button on content slides', async () => {
    const user = userEvent.setup();
    renderWizard();
    await user.click(screen.getByRole('button', { name: /let's do this/i }));
    expect(screen.getByRole('button', { name: /stuck/i })).toBeInTheDocument();
  });

  it('navigates to the done slide and shows congratulations', async () => {
    const user = userEvent.setup();
    // Start from near the end by setting localStorage
    const { wizardSlides } = await import('../steps');
    const lastContentIndex = wizardSlides.length - 2;
    localStorage.setItem(
      'steaksoap_wizard',
      JSON.stringify({ version: 5, step: lastContentIndex }),
    );
    renderWizard();
    await user.click(screen.getByRole('button', { name: /done, next|got it/i }));
    expect(screen.getByText('Congratulations!')).toBeInTheDocument();
  });

  it('handles invalid localStorage data gracefully', () => {
    localStorage.setItem('steaksoap_wizard', 'not-json');
    renderWizard();
    expect(screen.getByText('Welcome to steaksoap')).toBeInTheDocument();
  });

  it('resets when step is out of bounds', () => {
    localStorage.setItem('steaksoap_wizard', JSON.stringify({ version: 5, step: 9999 }));
    renderWizard();
    expect(screen.getByText('Welcome to steaksoap')).toBeInTheDocument();
  });
});
