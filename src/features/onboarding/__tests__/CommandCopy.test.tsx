import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { CommandCopy } from '../CommandCopy';

afterEach(cleanup);

describe('CommandCopy', () => {
  it('renders the command text', () => {
    render(<CommandCopy command="pnpm install" />);
    expect(screen.getByText('pnpm install')).toBeInTheDocument();
  });

  it('renders the label when provided', () => {
    render(<CommandCopy command="pnpm dev" label="Run this" />);
    expect(screen.getByText('Run this')).toBeInTheDocument();
  });

  it('does not render a label when omitted', () => {
    render(<CommandCopy command="pnpm dev" />);
    expect(screen.queryByText('Run this')).not.toBeInTheDocument();
  });

  it('shows a copy button', () => {
    render(<CommandCopy command="pnpm dev" />);
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
  });

  it('renders the copy button text', async () => {
    const user = userEvent.setup();
    render(<CommandCopy command="pnpm install" />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Copy');
    // Click to trigger the copy flow — button text changes to "Copied"
    await user.click(button);
    expect(button).toHaveTextContent('Copied');
  });
});
