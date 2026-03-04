import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Timeline } from '../Timeline';

const items = [
  { title: 'Project started', description: 'Initial commit', date: '2024-01-01' },
  { title: 'v1.0 released', description: 'First stable release', date: '2024-06-01' },
  { title: 'v2.0 released', date: '2024-12-01' },
];

describe('Timeline', () => {
  afterEach(cleanup);

  it('renders all item titles', () => {
    render(<Timeline items={items} />);
    expect(screen.getByText('Project started')).toBeInTheDocument();
    expect(screen.getByText('v1.0 released')).toBeInTheDocument();
    expect(screen.getByText('v2.0 released')).toBeInTheDocument();
  });

  it('renders descriptions when provided', () => {
    render(<Timeline items={items} />);
    expect(screen.getByText('Initial commit')).toBeInTheDocument();
    expect(screen.getByText('First stable release')).toBeInTheDocument();
  });

  it('renders dates when provided', () => {
    render(<Timeline items={items} />);
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
  });

  it('renders custom icon when provided', () => {
    const itemsWithIcon = [{ title: 'Event', icon: <span data-testid="custom-icon">*</span> }];
    render(<Timeline items={itemsWithIcon} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('accepts className override', () => {
    const { container } = render(<Timeline items={items} className="mt-8" />);
    expect(container.firstChild).toHaveClass('mt-8');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Timeline items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
