import { _resetToasts, useToast } from '@hooks/useToast';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { ToastContainer } from '../Toast';

// WHY: Helper component to trigger toasts in tests via the hook
function ToastTrigger({
  variant = 'success' as const,
  title,
  message = 'Test message',
}: {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message?: string;
}) {
  const { toast } = useToast();
  return <button onClick={() => toast({ variant, title, message })}>trigger</button>;
}

describe('Toast', () => {
  beforeEach(() => {
    _resetToasts();
  });

  it('renders a toast when triggered', async () => {
    const user = userEvent.setup();
    render(
      <>
        <ToastTrigger />
        <ToastContainer />
      </>,
    );

    await user.click(screen.getByText('trigger'));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders toast with title', async () => {
    const user = userEvent.setup();
    render(
      <>
        <ToastTrigger title="Done!" />
        <ToastContainer />
      </>,
    );

    await user.click(screen.getByText('trigger'));
    expect(screen.getByText('Done!')).toBeInTheDocument();
  });

  it('renders all 4 variants', async () => {
    const user = userEvent.setup();

    function AllVariants() {
      const { toast } = useToast();
      return (
        <>
          <button onClick={() => toast({ variant: 'success', message: 's' })}>s</button>
          <button onClick={() => toast({ variant: 'error', message: 'e' })}>e</button>
          <button onClick={() => toast({ variant: 'warning', message: 'w' })}>w</button>
          <button onClick={() => toast({ variant: 'info', message: 'i' })}>i</button>
        </>
      );
    }

    render(
      <>
        <AllVariants />
        <ToastContainer />
      </>,
    );

    await user.click(screen.getByText('s'));
    await user.click(screen.getByText('e'));
    await user.click(screen.getByText('w'));
    await user.click(screen.getByText('i'));

    expect(screen.getAllByRole('alert')).toHaveLength(4);
  });

  it('auto-dismisses after duration', () => {
    vi.useFakeTimers();

    // WHY: Trigger toast directly via module function to avoid userEvent + fake timer conflict
    act(() => {
      _resetToasts();
    });

    function AutoDismissTest() {
      const { toast, toasts } = useToast();
      return (
        <>
          <button onClick={() => toast({ variant: 'success', message: 'bye', duration: 1000 })}>
            add
          </button>
          <span data-testid="count">{toasts.length}</span>
          <ToastContainer />
        </>
      );
    }

    render(<AutoDismissTest />);

    // WHY: Use fireEvent instead of userEvent to avoid fake timer deadlock
    act(() => {
      screen.getByText('add').click();
    });

    expect(screen.getByTestId('count').textContent).toBe('1');

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByTestId('count').textContent).toBe('0');

    vi.useRealTimers();
  });

  it('dismisses on close button click', async () => {
    const user = userEvent.setup();
    render(
      <>
        <ToastTrigger />
        <ToastContainer />
      </>,
    );

    await user.click(screen.getByText('trigger'));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Dismiss notification'));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('has aria-live polite region', async () => {
    const user = userEvent.setup();
    render(
      <>
        <ToastTrigger />
        <ToastContainer />
      </>,
    );

    await user.click(screen.getByText('trigger'));
    const region = screen.getByLabelText('Notifications');
    expect(region).toHaveAttribute('aria-live', 'polite');
  });

  it('has no accessibility violations', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <>
        <ToastTrigger />
        <ToastContainer />
      </>,
    );

    await user.click(screen.getByText('trigger'));
    expect(await axe(container)).toHaveNoViolations();
  });
});
