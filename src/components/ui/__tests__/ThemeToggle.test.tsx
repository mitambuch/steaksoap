import { ThemeProvider } from '@context/ThemeContext';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ThemeToggle } from '../ThemeToggle';

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe('ThemeToggle', () => {
  it('renders a button', () => {
    renderToggle();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has an accessible label', () => {
    renderToggle();
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
    expect(button.getAttribute('aria-label')).toMatch(/switch to (light|dark) mode/i);
  });

  it('toggles theme on click', async () => {
    renderToggle();
    const button = screen.getByRole('button');
    const initialLabel = button.getAttribute('aria-label');
    await userEvent.click(button);
    expect(button.getAttribute('aria-label')).not.toBe(initialLabel);
  });

  it('accepts className prop', () => {
    render(
      <ThemeProvider>
        <ThemeToggle className="custom-class" />
      </ThemeProvider>,
    );
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
