import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar } from '../Avatar';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="/photo.jpg" alt="John Doe" />);
    expect(screen.getByAltText('John Doe')).toBeInTheDocument();
  });

  it('renders fallback text when no src', () => {
    render(<Avatar alt="John Doe" fallback="JD" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders first letter of alt as default fallback', () => {
    render(<Avatar alt="Alice" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('shows fallback on image error', () => {
    render(<Avatar src="/broken.jpg" alt="Bob" fallback="B" />);
    const img = screen.getByAltText('Bob');
    fireEvent.error(img);
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('accepts className override', () => {
    const { container } = render(<Avatar alt="Test" className="border-2" />);
    expect(container.firstChild).toHaveClass('border-2');
  });
});
