import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Header } from '../Header';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
];

describe('Header', () => {
  it('renders project name by default', () => {
    render(<Header navItems={navItems} />);
    expect(screen.getByText('steaksoap')).toBeInTheDocument();
  });

  it('renders custom logo', () => {
    render(<Header logo={<span>MyLogo</span>} navItems={navItems} />);
    expect(screen.getByText('MyLogo')).toBeInTheDocument();
  });

  it('shows nav items', () => {
    render(<Header navItems={navItems} />);
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
  });

  it('has navigation landmark', () => {
    render(<Header navItems={navItems} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('has hamburger button with aria-expanded', () => {
    render(<Header navItems={navItems} />);
    const hamburger = screen.getByLabelText('Toggle menu');
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles hamburger aria-expanded on click', async () => {
    render(<Header navItems={navItems} />);
    const hamburger = screen.getByLabelText('Toggle menu');
    await userEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows theme toggle by default', () => {
    render(<Header navItems={navItems} />);
    expect(screen.getAllByLabelText('Toggle theme').length).toBeGreaterThan(0);
  });

  it('hides theme toggle when showThemeToggle is false', () => {
    render(<Header navItems={navItems} showThemeToggle={false} />);
    expect(screen.queryByLabelText('Toggle theme')).not.toBeInTheDocument();
  });
});
