import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Divider } from '../Divider';

describe('Divider', () => {
  afterEach(cleanup);

  it('renders an hr when no label is provided', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('renders label text when provided', () => {
    render(<Divider label="OR" />);
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('does not render hr when label is provided', () => {
    const { container } = render(<Divider label="Section" />);
    expect(container.querySelector('hr')).not.toBeInTheDocument();
  });

  it('accepts className override', () => {
    const { container } = render(<Divider className="my-10" />);
    expect(container.firstChild).toHaveClass('my-10');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Divider />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
