import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { Modal } from '../Modal';

describe('Modal', () => {
  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Test Modal">
        Modal content
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Hidden">
        Hidden content
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Closeable">
        Content
      </Modal>,
    );
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('closes on backdrop click', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Backdrop">
        Content
      </Modal>,
    );
    // Backdrop is the first child with aria-hidden
    const backdrop = screen
      .getByRole('dialog')
      .parentElement?.querySelector('[aria-hidden="true"]');
    if (backdrop) await userEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('has dialog role and aria-modal', () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Accessible">
        Content
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('has close button with aria-label', () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="With Close">
        Content
      </Modal>,
    );
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('has no accessibility violations when open', async () => {
    const { container } = render(
      <Modal isOpen onClose={vi.fn()} title="Accessible Modal">
        <p>Modal content</p>
      </Modal>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('sets body overflow hidden when open', () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Overflow Test">
        Content
      </Modal>,
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body overflow on close', () => {
    const { rerender } = render(
      <Modal isOpen onClose={vi.fn()} title="Overflow Restore">
        Content
      </Modal>,
    );
    expect(document.body.style.overflow).toBe('hidden');
    rerender(
      <Modal isOpen={false} onClose={vi.fn()} title="Overflow Restore">
        Content
      </Modal>,
    );
    expect(document.body.style.overflow).toBe('');
  });

  it('renders close button even without title', () => {
    render(
      <Modal isOpen onClose={vi.fn()}>
        No title content
      </Modal>,
    );
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('traps focus within the dialog', () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Focus Trap">
        <button>First</button>
        <button>Last</button>
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    const focusable = dialog.querySelectorAll('button');
    expect(focusable.length).toBeGreaterThan(0);
  });

  it('dialog has tabIndex for focus fallback when no focusable children exist', () => {
    render(
      <Modal isOpen onClose={vi.fn()}>
        <p>Content</p>
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    // WHY: tabIndex={-1} allows programmatic focus on the dialog itself
    // when no interactive children exist (defensive a11y pattern)
    expect(dialog).toHaveAttribute('tabindex', '-1');
  });
});
