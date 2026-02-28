import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { FeatureCard } from '../FeatureCard';

afterEach(cleanup);

describe('FeatureCard', () => {
  it('renders icon, title, and description', () => {
    render(<FeatureCard icon="⚡" title="Fast" description="Blazing speed" />);
    expect(screen.getByText('⚡')).toBeInTheDocument();
    expect(screen.getByText('Fast')).toBeInTheDocument();
    expect(screen.getByText('Blazing speed')).toBeInTheDocument();
  });

  it('marks the icon as decorative', () => {
    render(<FeatureCard icon="🔒" title="Secure" description="Safe" />);
    expect(screen.getByText('🔒')).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies custom className', () => {
    const { container } = render(
      <FeatureCard icon="🎨" title="Themed" description="Colors" className="w-full" />,
    );
    expect(container.firstElementChild).toHaveClass('w-full');
  });
});
