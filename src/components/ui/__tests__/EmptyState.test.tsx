import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { EmptyState } from '../EmptyState';

describe('EmptyState', () => {
  afterEach(cleanup);

  it('renders title', () => {
    render(<EmptyState title="No results" />);
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<EmptyState title="No results" description="Try a different search." />);
    expect(screen.getByText('Try a different search.')).toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(<EmptyState title="Empty" action={<button>Retry</button>} />);
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<EmptyState title="Empty" icon={<span data-testid="icon">!</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('accepts className override', () => {
    const { container } = render(<EmptyState title="Empty" className="py-8" />);
    expect(container.firstChild).toHaveClass('py-8');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <EmptyState title="No results" description="Try a different search." />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
