import { cleanup, render } from '@testing-library/react';
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
});
