import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import Home from '../Home';

afterEach(cleanup);

describe('Home', () => {
  it('renders without crashing', () => {
    expect(() => render(<Home />)).not.toThrow();
  });

  it('renders the hero heading', () => {
    render(<Home />);
    expect(screen.getByText(/for solo builders/i)).toBeInTheDocument();
  });

  it('renders CTA links', () => {
    render(<Home />);
    const links = screen.getAllByRole('link', { name: /github/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it('renders feature cards', () => {
    render(<Home />);
    expect(screen.getByText('Zero config')).toBeInTheDocument();
  });
});
