import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { AvatarGroup } from '../AvatarGroup';

const avatars = [
  { alt: 'Alice', fallback: 'A' },
  { alt: 'Bob', fallback: 'B' },
  { alt: 'Carol', fallback: 'C' },
  { alt: 'Dan', fallback: 'D' },
  { alt: 'Eve', fallback: 'E' },
  { alt: 'Frank', fallback: 'F' },
];

describe('AvatarGroup', () => {
  afterEach(cleanup);

  it('renders visible avatars up to max', () => {
    render(<AvatarGroup avatars={avatars} max={3} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('shows overflow count when avatars exceed max', () => {
    render(<AvatarGroup avatars={avatars} max={4} />);
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('does not show overflow when avatars fit within max', () => {
    render(<AvatarGroup avatars={avatars.slice(0, 2)} max={4} />);
    expect(screen.queryByText(/\+/)).not.toBeInTheDocument();
  });

  it('accepts className override', () => {
    const { container } = render(<AvatarGroup avatars={avatars.slice(0, 2)} className="gap-4" />);
    expect(container.firstChild).toHaveClass('gap-4');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<AvatarGroup avatars={avatars} max={3} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
