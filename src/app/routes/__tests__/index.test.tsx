import { ThemeProvider } from '@context/ThemeContext';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import AppRoutes from '../index';

// WHY: Mock lazy-loaded pages to avoid full component tree in route tests
vi.mock('@pages/Home', () => ({
  default: () => <div data-testid="home-page">Home</div>,
}));
vi.mock('@pages/Welcome', () => ({
  default: () => <div data-testid="welcome-page">Welcome</div>,
}));
vi.mock('@pages/Playground', () => ({
  default: () => <div data-testid="playground-page">Playground</div>,
}));
vi.mock('@pages/Steaksoap', () => ({
  default: () => <div data-testid="steaksoap-page">Steaksoap</div>,
}));
vi.mock('@pages/NotFound', () => ({
  default: () => <div data-testid="notfound-page">404</div>,
}));

function renderRoute(path: string) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe('AppRoutes', () => {
  it('renders Home page for /', async () => {
    renderRoute('/');
    expect(await screen.findByTestId('home-page')).toBeInTheDocument();
  });

  it('renders Welcome page for /welcome', async () => {
    renderRoute('/welcome');
    expect(await screen.findByTestId('welcome-page')).toBeInTheDocument();
  });

  it('renders Playground page for /playground', async () => {
    renderRoute('/playground');
    expect(await screen.findByTestId('playground-page')).toBeInTheDocument();
  });

  it('renders Steaksoap page for /steaksoap', async () => {
    renderRoute('/steaksoap');
    expect(await screen.findByTestId('steaksoap-page')).toBeInTheDocument();
  });

  it('renders NotFound for unknown routes', async () => {
    renderRoute('/unknown-route');
    expect(await screen.findByTestId('notfound-page')).toBeInTheDocument();
  });
});
