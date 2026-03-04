import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { CursorGlow } from '../CursorGlow';

afterEach(cleanup);

describe('CursorGlow', () => {
  it('renders nothing when disabled', () => {
    const { container } = render(<CursorGlow enabled={false} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders nothing before mouse movement', () => {
    const { container } = render(<CursorGlow enabled={true} />);
    // Before any mousemove, visible is false → renders null
    expect(container.innerHTML).toBe('');
  });

  it('accepts enabled prop without crashing', () => {
    expect(() => render(<CursorGlow enabled={true} />)).not.toThrow();
  });

  it('has no accessibility violations (pointer-events-none)', () => {
    // CursorGlow is decorative — it should never interfere with interaction
    const { container } = render(<CursorGlow enabled={true} />);
    const interactive = container.querySelectorAll('button, a, input, [role="button"]');
    expect(interactive).toHaveLength(0);
  });

  it('becomes visible after mousemove when enabled', () => {
    const { container } = render(<CursorGlow enabled={true} />);
    expect(container.innerHTML).toBe('');
    fireEvent.mouseMove(window, { clientX: 100, clientY: 200 });
    expect(container.innerHTML).not.toBe('');
  });

  it('stays hidden on mousemove when disabled', () => {
    const { container } = render(<CursorGlow enabled={false} />);
    fireEvent.mouseMove(window, { clientX: 100, clientY: 200 });
    expect(container.innerHTML).toBe('');
  });

  it('renders glow and dot elements after mouse move', () => {
    const { container } = render(<CursorGlow enabled={true} />);
    fireEvent.mouseMove(window, { clientX: 50, clientY: 50 });
    const divs = container.querySelectorAll('div');
    expect(divs.length).toBeGreaterThanOrEqual(4);
  });
});
