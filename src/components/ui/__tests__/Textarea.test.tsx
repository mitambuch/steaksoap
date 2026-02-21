import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Textarea } from '../Textarea';

describe('Textarea', () => {
  it('renders with label', () => {
    render(<Textarea label="Message" />);
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('associates label with textarea', () => {
    render(<Textarea label="Bio" />);
    const textarea = screen.getByLabelText('Bio');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('shows error message', () => {
    render(<Textarea label="Message" error="Too short" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Too short');
  });

  it('shows helper text when no error', () => {
    render(<Textarea label="Message" helperText="Max 500 chars" />);
    expect(screen.getByText('Max 500 chars')).toBeInTheDocument();
  });

  it('accepts value changes', async () => {
    render(<Textarea label="Notes" />);
    const textarea = screen.getByLabelText('Notes');
    await userEvent.type(textarea, 'Hello');
    expect(textarea).toHaveValue('Hello');
  });

  it('defaults to 4 rows', () => {
    render(<Textarea label="Content" />);
    expect(screen.getByLabelText('Content')).toHaveAttribute('rows', '4');
  });
});
