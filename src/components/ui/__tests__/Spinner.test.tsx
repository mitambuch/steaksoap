import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('renders with default aria-label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('accepts custom aria-label', () => {
    render(<Spinner aria-label="Processing" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Processing');
  });

  it('renders sm size', () => {
    render(<Spinner size="sm" />);
    const svg = screen.getByRole('status');
    expect(svg.classList.toString()).toContain('h-4');
  });

  it('renders lg size', () => {
    render(<Spinner size="lg" />);
    const svg = screen.getByRole('status');
    expect(svg.classList.toString()).toContain('h-8');
  });

  it('uses motion-safe for animation', () => {
    render(<Spinner />);
    const svg = screen.getByRole('status');
    expect(svg.classList.toString()).toContain('motion-safe:animate-spin');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Spinner />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
