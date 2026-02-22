import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SeoHead } from '../SeoHead';

describe('SeoHead', () => {
  it('sets document title with site name suffix', () => {
    render(<SeoHead title="About" />);
    expect(document.title).toContain('About');
  });

  it('sets description meta tag', () => {
    render(<SeoHead description="Test description" />);
    const meta = document.querySelector('meta[name="description"]');
    expect(meta).toHaveAttribute('content', 'Test description');
  });

  it('sets Open Graph meta tags', () => {
    render(<SeoHead title="OG Test" description="og desc" />);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle).toHaveAttribute('content', expect.stringContaining('OG Test'));
    const ogDesc = document.querySelector('meta[property="og:description"]');
    expect(ogDesc).toHaveAttribute('content', 'og desc');
  });

  it('sets Twitter Card meta tags', () => {
    render(<SeoHead title="Tweet" />);
    const card = document.querySelector('meta[name="twitter:card"]');
    expect(card).toHaveAttribute('content', 'summary_large_image');
  });

  it('renders noindex when requested', () => {
    render(<SeoHead noIndex />);
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots).toHaveAttribute('content', 'noindex, nofollow');
  });

  it('does not render noindex by default', () => {
    render(<SeoHead />);
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots).toBeNull();
  });
});
