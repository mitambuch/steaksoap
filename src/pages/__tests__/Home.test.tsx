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

  it('renders the welcome heading', () => {
    renderHome();
    expect(screen.getByText(/welcome to steaksoap/i)).toBeInTheDocument();
  });

  it('renders the setup steps', () => {
    renderHome();
    expect(screen.getByText(/open your terminal/i)).toBeInTheDocument();
    expect(screen.getByText(/launch claude code/i)).toBeInTheDocument();
    expect(screen.getByText(/tell claude what you want/i)).toBeInTheDocument();
  });

  it('renders the steaksoap credit link', () => {
    renderHome();
    const link = screen.getByRole('link', { name: /built with steaksoap/i });
    expect(link).toBeInTheDocument();
  });
});
