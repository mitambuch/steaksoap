import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ErrorBoundary } from '../ErrorBoundary';

function ThrowingComponent({ shouldThrow = true }: { shouldThrow?: boolean }) {
  if (shouldThrow) throw new Error('Test error');
  return <p>No error</p>;
}

describe('ErrorBoundary', () => {
  // WHY: React logs errors to console during boundary catches — suppress in tests
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = originalError;
  });

  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('renders default fallback when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<p>Custom error UI</p>}>
        <ThrowingComponent />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Custom error UI')).toBeInTheDocument();
  });

  it('resets error state when "Try again" is clicked', async () => {
    const user = userEvent.setup();

    // WHY: We need a component that throws once then recovers to test reset
    let shouldThrow = true;
    function ConditionalThrow() {
      if (shouldThrow) throw new Error('Test error');
      return <p>Recovered</p>;
    }

    const { rerender } = render(
      <ErrorBoundary>
        <ConditionalThrow />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

    shouldThrow = false;
    await user.click(screen.getByText('Try again'));

    rerender(
      <ErrorBoundary>
        <ConditionalThrow />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Recovered')).toBeInTheDocument();
  });
});
