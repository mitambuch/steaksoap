import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { ProgressBar } from '../ProgressBar';

describe('ProgressBar', () => {
  afterEach(cleanup);

  it('renders a progressbar element', () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('sets aria-valuenow to the clamped value', () => {
    render(<ProgressBar value={75} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
  });

  it('clamps value to 0-100 range', () => {
    const { rerender } = render(<ProgressBar value={-10} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');

    rerender(<ProgressBar value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('shows percentage label when showLabel is true', () => {
    render(<ProgressBar value={42} showLabel />);
    expect(screen.getByText('42%')).toBeInTheDocument();
  });

  it('does not show label by default', () => {
    render(<ProgressBar value={42} />);
    expect(screen.queryByText('42%')).not.toBeInTheDocument();
  });

  it('accepts className override', () => {
    const { container } = render(<ProgressBar value={50} className="mt-4" />);
    expect(container.firstChild).toHaveClass('mt-4');
  });

  it('renders the label prop as visible text when showLabel is true', () => {
    render(<ProgressBar value={50} label="Upload" showLabel />);
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ProgressBar value={60} label="Loading" showLabel />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
