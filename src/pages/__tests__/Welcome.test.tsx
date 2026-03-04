import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

import Welcome from '../Welcome';

afterEach(cleanup);

// WHY: SeoHead uses useLocation() — pages need a router context in tests
function renderWelcome() {
  return render(
    <MemoryRouter>
      <Welcome />
    </MemoryRouter>,
  );
}

describe('Welcome', () => {
  it('renders without crashing', () => {
    expect(() => renderWelcome()).not.toThrow();
  });

  it('renders the welcome heading', () => {
    renderWelcome();
    expect(screen.getByText(/welcome to steaksoap/i)).toBeInTheDocument();
  });

  it('renders the setup steps', () => {
    renderWelcome();
    expect(screen.getByText(/open your terminal/i)).toBeInTheDocument();
    expect(screen.getByText(/launch claude code/i)).toBeInTheDocument();
    expect(screen.getByText(/tell claude what you want/i)).toBeInTheDocument();
  });

  it('renders the steaksoap credit link', () => {
    renderWelcome();
    const link = screen.getByRole('link', { name: /built with steaksoap/i });
    expect(link).toBeInTheDocument();
  });

  it('uses Link components for internal routes', () => {
    renderWelcome();
    const playgroundLinks = screen.getAllByRole('link', { name: /playground/i });
    expect(playgroundLinks.length).toBeGreaterThan(0);
    for (const link of playgroundLinks) {
      expect(link.getAttribute('href')).toMatch(/^\//);
    }
  });

  it('copies code to clipboard when copy button is clicked', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    });

    renderWelcome();
    const copyButtons = screen.getAllByRole('button');
    const copyButton = copyButtons.find(btn => btn.querySelector('svg'));
    if (copyButton) {
      await user.click(copyButton);
      expect(writeText).toHaveBeenCalled();
    }
  });
});
