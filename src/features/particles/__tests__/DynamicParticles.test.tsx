import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { DynamicParticles } from '../DynamicParticles';

afterEach(cleanup);

// WHY: Canvas getContext is not implemented in jsdom — mock it
const mockCtx = {
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  setTransform: vi.fn(),
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 0,
};

vi.stubGlobal('HTMLCanvasElement', class extends HTMLCanvasElement {});

describe('DynamicParticles', () => {
  beforeEach(() => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      mockCtx as unknown as CanvasRenderingContext2D,
    );
  });

  it('renders a canvas element', () => {
    const { container } = render(<DynamicParticles />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('canvas is not interactive (pointer-events-none)', () => {
    const { container } = render(<DynamicParticles />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toHaveClass('pointer-events-none');
  });

  it('returns null when prefers-reduced-motion is set', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(<DynamicParticles />);
    expect(container.querySelector('canvas')).toBeNull();
  });
});
