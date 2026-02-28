import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Section } from '../Section';

afterEach(cleanup);

describe('Section', () => {
  it('renders children', () => {
    render(<Section>Hello content</Section>);
    expect(screen.getByText('Hello content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Section title="My Section">Content</Section>);
    expect(screen.getByText('My Section')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(
      <Section title="Title" subtitle="Subtitle text">
        Content
      </Section>,
    );
    expect(screen.getByText('Subtitle text')).toBeInTheDocument();
  });

  it('does not render title when omitted', () => {
    render(<Section>Content</Section>);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('applies the id attribute', () => {
    render(<Section id="features">Content</Section>);
    expect(document.getElementById('features')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Section className="bg-red-500">Content</Section>);
    expect(container.firstElementChild).toHaveClass('bg-red-500');
  });
});
