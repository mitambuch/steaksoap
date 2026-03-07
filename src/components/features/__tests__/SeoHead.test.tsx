import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { SeoHead } from '../SeoHead';

// WHY: SeoHead uses useLocation() for canonical URLs — needs a router context
function renderSeoHead(props: Parameters<typeof SeoHead>[0] = {}, path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <SeoHead {...props} />
    </MemoryRouter>,
  );
}

describe('SeoHead', () => {
  it('sets document title with site name suffix', () => {
    renderSeoHead({ title: 'About' });
    expect(document.title).toContain('About');
  });

  it('sets description meta tag', () => {
    renderSeoHead({ description: 'Test description' });
    const meta = document.querySelector('meta[name="description"]');
    expect(meta).toHaveAttribute('content', 'Test description');
  });

  it('sets Open Graph meta tags', () => {
    renderSeoHead({ title: 'OG Test', description: 'og desc' });
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle).toHaveAttribute('content', expect.stringContaining('OG Test'));
    const ogDesc = document.querySelector('meta[property="og:description"]');
    expect(ogDesc).toHaveAttribute('content', 'og desc');
  });

  it('sets Twitter Card to summary when no image', () => {
    renderSeoHead({ title: 'Tweet' });
    const card = document.querySelector('meta[name="twitter:card"]');
    expect(card).toHaveAttribute('content', 'summary');
  });

  it('sets Twitter Card to summary_large_image when image is provided', () => {
    renderSeoHead({ title: 'Tweet', ogImage: '/images/og.jpg' });
    const card = document.querySelector('meta[name="twitter:card"]');
    expect(card).toHaveAttribute('content', 'summary_large_image');
  });

  it('renders noindex when requested', () => {
    renderSeoHead({ noIndex: true });
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots).toHaveAttribute('content', 'noindex, nofollow');
  });

  it('does not emit og:image when no image is configured', () => {
    renderSeoHead({ title: 'No Image' });
    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage).toBeNull();
  });

  it('does not render noindex by default', () => {
    renderSeoHead();
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots).toBeNull();
  });
});
