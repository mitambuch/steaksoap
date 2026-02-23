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

  it('renders CTA links', () => {
    renderHome();
    const links = screen.getAllByRole('link', { name: /github/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it('renders feature cards', () => {
    renderHome();
    expect(screen.getByText('Zero config')).toBeInTheDocument();
  });
});
