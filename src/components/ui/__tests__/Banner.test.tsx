import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Banner } from '../Banner';

describe('Banner', () => {
  it('renders children', () => {
    render(<Banner>Hello</Banner>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('dismisses on click', async () => {
    const user = userEvent.setup();
    render(<Banner>Hello</Banner>);
    expect(screen.getByText('Hello')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Dismiss'));
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });

  it('hides dismiss button when not dismissable', () => {
    render(<Banner dismissable={false}>Permanent</Banner>);
    expect(screen.getByText('Permanent')).toBeInTheDocument();
    expect(screen.queryByLabelText('Dismiss')).not.toBeInTheDocument();
  });
});
