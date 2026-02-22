import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Badge } from '../Badge';

describe('Badge', () => {
  it('renders children text', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    const { container } = render(<Badge>Default</Badge>);
    expect(container.firstChild).toHaveClass('bg-accent');
  });

  it('renders success variant', () => {
    const { container } = render(<Badge variant="success">OK</Badge>);
    expect(container.firstChild).toHaveClass('text-success');
  });

  it('renders danger variant', () => {
    const { container } = render(<Badge variant="danger">Error</Badge>);
    expect(container.firstChild).toHaveClass('text-danger');
  });

  it('accepts className override', () => {
    const { container } = render(<Badge className="ml-2">Tag</Badge>);
    expect(container.firstChild).toHaveClass('ml-2');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Badge>Active</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
