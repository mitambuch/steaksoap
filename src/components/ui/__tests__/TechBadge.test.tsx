import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { TechBadge } from '../TechBadge';

const defaultProps = { name: 'React', role: 'UI Library', href: 'https://react.dev' };

describe('TechBadge', () => {
  afterEach(cleanup);

  it('renders the tech name', () => {
    render(<TechBadge {...defaultProps} />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders the role text', () => {
    render(<TechBadge {...defaultProps} />);
    expect(screen.getByText('UI Library')).toBeInTheDocument();
  });

  it('renders as a link with correct href', () => {
    render(<TechBadge {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://react.dev');
  });

  it('opens link in new tab', () => {
    render(<TechBadge {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('accepts className override', () => {
    const { container } = render(<TechBadge {...defaultProps} className="px-6" />);
    expect(container.firstChild).toHaveClass('px-6');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<TechBadge {...defaultProps} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
