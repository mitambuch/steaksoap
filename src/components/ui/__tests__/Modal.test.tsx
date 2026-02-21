import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

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
});
