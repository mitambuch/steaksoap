import { ThemeProvider } from '@context/ThemeContext';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Header } from '../Header';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
];

function renderHeader(props: Partial<Parameters<typeof Header>[0]> = {}) {
  return render(
    <ThemeProvider>
      <Header navItems={navItems} {...props} />
    </ThemeProvider>,
  );
}

describe('Header', () => {
  it('renders project name by default', () => {
    renderHeader();
    expect(screen.getByText('steaksoap')).toBeInTheDocument();
  });

  it('renders custom logo', () => {
    renderHeader({ logo: <span>MyLogo</span> });
    expect(screen.getByText('MyLogo')).toBeInTheDocument();
  });

  it('shows nav items', () => {
    renderHeader();
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
  });

  it('has navigation landmark', () => {
    renderHeader();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('has hamburger button with aria-expanded', () => {
    renderHeader();
    const hamburger = screen.getByLabelText('Toggle menu');
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles hamburger aria-expanded on click', async () => {
    renderHeader();
    const hamburger = screen.getByLabelText('Toggle menu');
    await userEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows theme toggle by default', () => {
    renderHeader();
    expect(screen.getAllByLabelText(/switch to (light|dark) mode/i).length).toBeGreaterThan(0);
  });

  it('hides theme toggle when showThemeToggle is false', () => {
    renderHeader({ showThemeToggle: false });
    expect(screen.queryByLabelText(/switch to (light|dark) mode/i)).not.toBeInTheDocument();
  });
});
