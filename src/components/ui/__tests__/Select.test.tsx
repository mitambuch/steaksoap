import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Select } from '../Select';

const options = [
  { value: 'fr', label: 'French' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'German' },
];

describe('Select', () => {
  it('renders with label and trigger', () => {
    render(<Select label="Language" options={options} />);
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders all options in listbox when open', async () => {
    const user = userEvent.setup();
    render(<Select label="Language" options={options} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: 'French' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'German' })).toBeInTheDocument();
  });

  it('hides listbox from screen readers when closed', () => {
    render(<Select label="Language" options={options} />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('option')).not.toBeInTheDocument();
  });

  it('shows placeholder when provided', async () => {
    const user = userEvent.setup();
    render(<Select label="Language" options={options} placeholder="Pick one" />);
    await user.click(screen.getByRole('combobox'));
    const placeholderOpt = screen.getByRole('option', { name: 'Pick one' });
    expect(placeholderOpt).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows error message', () => {
    render(<Select label="Language" options={options} error="Required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('accepts className override', () => {
    render(<Select label="Language" options={options} className="custom" />);
    expect(screen.getByRole('combobox')).toHaveClass('custom');
  });

  it('selects an option on click', async () => {
    const user = userEvent.setup();
    render(<Select label="Language" options={options} placeholder="Pick one" />);

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'English' }));

    expect(trigger).toHaveTextContent('English');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Select label="Language" options={options} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('opens dropdown with ArrowDown key', async () => {
    const user = userEvent.setup();
    render(<Select label="Language" options={options} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();
    await user.keyboard('{ArrowDown}');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('navigates options with ArrowDown and ArrowUp', async () => {
    const user = userEvent.setup();
    render(<Select label="Language" options={options} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();
    // Open and go down
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowDown}');
    // Select with Enter
    await user.keyboard('{Enter}');
    expect(trigger).toHaveTextContent('English');
  });

  it('selects highlighted option with Enter key', async () => {
    const user = userEvent.setup();
    render(<Select label="Language" options={options} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');
    expect(trigger).toHaveTextContent('French');
  });

  it('closes dropdown with Escape key', async () => {
    const user = userEvent.setup();
    render(<Select label="Language" options={options} />);
    const trigger = screen.getByRole('combobox');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<Select label="Language" options={options} disabled />);
    const trigger = screen.getByRole('combobox');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('ArrowUp does not go below 0', async () => {
    const user = userEvent.setup();
    render(<Select label="Language" options={options} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowUp}');
    await user.keyboard('{Enter}');
    // Should still be on first option
    expect(trigger).toHaveTextContent('French');
  });
});
