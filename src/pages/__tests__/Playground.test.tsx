import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import Playground from '../Playground';

afterEach(cleanup);

describe('Playground', () => {
  it('renders without crashing', () => {
    expect(() => render(<Playground />)).not.toThrow();
  });

  it('renders the devkit heading', () => {
    render(<Playground />);
    expect(screen.getByText('devkit')).toBeInTheDocument();
  });

  it('renders component sections', () => {
    render(<Playground />);
    // Should have at least one button rendered
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });
});
