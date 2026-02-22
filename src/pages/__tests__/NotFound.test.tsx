import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';

import NotFound from '../NotFound';

afterEach(cleanup);

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
}

describe('NotFound', () => {
  it('renders 404 text', () => {
    renderWithRouter();
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders "Page not found." message', () => {
    renderWithRouter();
    expect(screen.getByText('Page not found.')).toBeInTheDocument();
  });

  it('has a link back to home', () => {
    renderWithRouter();
    const link = screen.getByRole('link', { name: /back to home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
