import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';

import Welcome from '../Welcome';

afterEach(cleanup);

// WHY: SeoHead uses useLocation() — pages need a router context in tests
function renderWelcome() {
  return render(
    <MemoryRouter>
      <Welcome />
    </MemoryRouter>,
  );
}

describe('Welcome', () => {
  it('renders without crashing', () => {
    expect(() => renderWelcome()).not.toThrow();
  });

  it('renders the welcome heading', () => {
    renderWelcome();
    expect(screen.getByText(/welcome to steaksoap/i)).toBeInTheDocument();
  });

  it('renders the setup steps', () => {
    renderWelcome();
    expect(screen.getByText(/open your terminal/i)).toBeInTheDocument();
    expect(screen.getByText(/launch claude code/i)).toBeInTheDocument();
    expect(screen.getByText(/tell claude what you want/i)).toBeInTheDocument();
  });

  it('renders the steaksoap credit link', () => {
    renderWelcome();
    const link = screen.getByRole('link', { name: /built with steaksoap/i });
    expect(link).toBeInTheDocument();
  });
});
