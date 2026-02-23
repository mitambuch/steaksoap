import { ThemeProvider } from '@context/ThemeContext';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Header } from '../Header';

function renderHeader(props: Partial<Parameters<typeof Header>[0]> = {}) {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <Header {...props} />
      </ThemeProvider>
    </MemoryRouter>,
  );
}

describe('Header', () => {
  it('renders project name', () => {
    renderHeader();
    expect(screen.getByText('steaksoap')).toBeInTheDocument();
  });

  it('shows Playground link', () => {
    renderHeader();
    expect(screen.getByText('Playground')).toBeInTheDocument();
  });

  it('shows GitHub link', () => {
    renderHeader();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('has navigation landmark', () => {
    renderHeader();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('has navigation aria-label', () => {
    renderHeader();
    expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
  });

  it('shows theme toggle', () => {
    renderHeader();
    expect(screen.getByLabelText(/switch to (light|dark) mode/i)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderHeader({ className: 'custom-class' });
    expect(screen.getByRole('navigation')).toHaveClass('custom-class');
  });

  it('has no accessibility violations', async () => {
    const { container } = renderHeader();
    expect(await axe(container)).toHaveNoViolations();
  });
});
