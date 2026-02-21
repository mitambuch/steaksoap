import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Container } from '../Container';

describe('Container', () => {
  it('renders children', () => {
    render(<Container>Content</Container>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies default size (lg)', () => {
    const { container } = render(<Container>Content</Container>);
    expect(container.firstChild).toHaveClass('max-w-5xl');
  });

  it('accepts size prop', () => {
    const { container } = render(<Container size="sm">Content</Container>);
    expect(container.firstChild).toHaveClass('max-w-2xl');
  });

  it('accepts custom className', () => {
    const { container } = render(<Container className="my-custom">Content</Container>);
    expect(container.firstChild).toHaveClass('my-custom');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Container>Content</Container>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
