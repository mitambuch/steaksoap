import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';

import Lab from '../Lab';

afterEach(cleanup);

function renderLab() {
  return render(
    <MemoryRouter>
      <Lab />
    </MemoryRouter>,
  );
}

describe('Lab', () => {
  it('renders without crashing', () => {
    expect(() => renderLab()).not.toThrow();
  });

  it('renders the heading', () => {
    renderLab();
    expect(screen.getByRole('heading', { name: 'Lab' })).toBeInTheDocument();
  });
});
