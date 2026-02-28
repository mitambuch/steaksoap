import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Switch } from '../Switch';

afterEach(cleanup);

describe('Switch', () => {
  it('renders with role switch', () => {
    render(<Switch label="Dark mode" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('renders the label text', () => {
    render(<Switch label="Notifications" />);
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('reflects unchecked state', () => {
    render(<Switch label="Toggle" checked={false} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('reflects checked state', () => {
    render(<Switch label="Toggle" checked={true} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange when clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch label="Toggle" checked={false} onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch label="Toggle" disabled onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
