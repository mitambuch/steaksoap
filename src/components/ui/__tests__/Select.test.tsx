import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Select } from '../Select';

const options = [
  { value: 'fr', label: 'French' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'German' },
];

describe('Select', () => {
  it('renders with label', () => {
    render(<Select label="Language" options={options} />);
    expect(screen.getByLabelText('Language')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select label="Language" options={options} />);
    expect(screen.getByRole('option', { name: 'French' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'German' })).toBeInTheDocument();
  });

  it('shows placeholder option when provided', () => {
    render(<Select label="Language" options={options} placeholder="Pick one" />);
    expect(screen.getByRole('option', { name: 'Pick one' })).toBeDisabled();
  });

  it('shows error message', () => {
    render(<Select label="Language" options={options} error="Required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('accepts className override', () => {
    render(<Select label="Language" options={options} className="custom" />);
    expect(screen.getByLabelText('Language')).toHaveClass('custom');
  });
});
