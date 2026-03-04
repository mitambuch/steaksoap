import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Stat } from '../Stat';

describe('Stat', () => {
  afterEach(cleanup);

  it('renders label and value', () => {
    render(<Stat label="Users" value="1,234" />);
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('renders trend indicator when provided', () => {
    render(<Stat label="Revenue" value="$50K" trend={{ value: '12%', positive: true }} />);
    expect(screen.getByText(/12%/)).toBeInTheDocument();
  });

  it('renders negative trend', () => {
    render(<Stat label="Errors" value="42" trend={{ value: '5%', positive: false }} />);
    expect(screen.getByText(/5%/)).toBeInTheDocument();
  });

  it('does not render trend when not provided', () => {
    const { container } = render(<Stat label="Count" value="99" />);
    expect(container.querySelectorAll('span')).toHaveLength(2);
  });

  it('accepts className override', () => {
    const { container } = render(<Stat label="Test" value="0" className="gap-2" />);
    expect(container.firstChild).toHaveClass('gap-2');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Stat label="Users" value="1,234" trend={{ value: '12%', positive: true }} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
