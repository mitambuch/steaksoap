import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { CodeBlock } from '../CodeBlock';

afterEach(cleanup);

describe('CodeBlock', () => {
  it('renders step number and label', () => {
    render(<CodeBlock step={1} label="Clone the repo" command="git clone ..." />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Clone the repo')).toBeInTheDocument();
  });

  it('renders the command with $ prompt', () => {
    render(<CodeBlock step={1} label="Install" command="pnpm install" />);
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('pnpm install')).toBeInTheDocument();
  });

  it('renders output when provided', () => {
    render(<CodeBlock step={1} label="Build" command="pnpm build" output="Done in 2s" />);
    expect(screen.getByText('Done in 2s')).toBeInTheDocument();
  });

  it('does not render output when omitted', () => {
    render(<CodeBlock step={1} label="Build" command="pnpm build" />);
    expect(screen.queryByText('Done in 2s')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CodeBlock step={1} label="Test" command="test" className="mt-4" />,
    );
    expect(container.firstElementChild).toHaveClass('mt-4');
  });
});
