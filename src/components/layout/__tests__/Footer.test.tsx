import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import Footer from '../Footer';

// WHY: __APP_VERSION__ is defined by Vite's define config, not available in vitest by default
beforeAll(() => {
  (globalThis as Record<string, unknown>).__APP_VERSION__ = '0.0.0-test';
});

describe('Footer', () => {
  it('renders the Claude Code credit link', () => {
    render(<Footer />);
    expect(screen.getByText('Claude Code')).toBeInTheDocument();
  });

  it('renders the GitHub link', () => {
    render(<Footer />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('opens links in new tab', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    }
  });

  it('renders the version', () => {
    render(<Footer />);
    // WHY: JSX splits `v` and `{__APP_VERSION__}` into separate text nodes
    expect(
      screen.getByText((_content, el) => el?.textContent === 'v0.0.0-test'),
    ).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Footer />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
