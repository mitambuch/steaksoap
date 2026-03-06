import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';

import Playground from '../Playground';

afterEach(cleanup);

// WHY: SeoHead uses useLocation() — pages need a router context in tests
function renderPlayground() {
  return render(
    <MemoryRouter>
      <Playground />
    </MemoryRouter>,
  );
}

describe('Playground', () => {
  it('renders without crashing', () => {
    expect(() => renderPlayground()).not.toThrow();
  });

  it('renders the devkit heading', () => {
    renderPlayground();
    expect(screen.getByText('devkit')).toBeInTheDocument();
  });

  it('renders component sections', () => {
    renderPlayground();
    // Should have at least one button rendered
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  }, 15_000);
});
