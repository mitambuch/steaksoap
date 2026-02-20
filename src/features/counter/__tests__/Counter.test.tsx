import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Counter } from '../Counter';

describe('Counter', () => {
  it('renders with initial count of 0', () => {
    render(<Counter />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('increments on + click', async () => {
    render(<Counter />);
    await userEvent.click(screen.getByText('+'));
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('decrements on − click', async () => {
    render(<Counter />);
    await userEvent.click(screen.getByText('−'));
    expect(screen.getByText('-1')).toBeInTheDocument();
  });

  it('resets to 0', async () => {
    render(<Counter />);
    await userEvent.click(screen.getByText('+'));
    await userEvent.click(screen.getByText('+'));
    await userEvent.click(screen.getByText('reset'));
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
