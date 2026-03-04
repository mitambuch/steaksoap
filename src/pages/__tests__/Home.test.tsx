import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';

import Home from '../Home';

afterEach(cleanup);

// WHY: SeoHead uses useLocation() — pages need a router context in tests
function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
}

describe('Home', () => {
  it('renders without crashing', () => {
    expect(() => renderHome()).not.toThrow();
  });

  it('renders the hero heading', () => {
    renderHome();
    expect(screen.getByText(/100% free/i)).toBeInTheDocument();
  });

  it('renders the GitHub link', () => {
    renderHome();
    const links = screen.getAllByRole('link', { name: /view on github/i });
    expect(links.length).toBeGreaterThan(0);
  });

  it('renders the features section', () => {
    renderHome();
    expect(screen.getByText(/features/i)).toBeInTheDocument();
  });
});
