import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Kbd } from '../Kbd';

describe('Kbd', () => {
  afterEach(cleanup);

  it('renders keyboard shortcut text', () => {
    render(<Kbd>Ctrl</Kbd>);
    expect(screen.getByText('Ctrl')).toBeInTheDocument();
  });

  it('renders as a kbd element', () => {
    const { container } = render(<Kbd>Esc</Kbd>);
    expect(container.querySelector('kbd')).toBeInTheDocument();
  });

  it('accepts className override', () => {
    const { container } = render(<Kbd className="ml-2">K</Kbd>);
    expect(container.firstChild).toHaveClass('ml-2');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Kbd>Enter</Kbd>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
