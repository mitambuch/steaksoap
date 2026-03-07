/* ═══════════════════════════════════════════════════════════════
   SEO HEAD — per-page meta tag management (React 19 native)
   React 19 automatically hoists <title> and <meta> into <head>.

   Usage:
     <SeoHead title="Home" description="Welcome to our site" />
   ═══════════════════════════════════════════════════════════════ */

import { siteConfig } from '@config/site';
import { useLocation } from 'react-router-dom';

interface SeoHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export function SeoHead({
  title,
  description = siteConfig.description,
  ogImage = siteConfig.ogImage,
  canonicalUrl,
  noIndex = false,
}: SeoHeadProps) {
  const { pathname } = useLocation();
  const fullTitle =
    title && title !== siteConfig.name ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const pageUrl = canonicalUrl ?? `${siteConfig.url}${pathname}`;
  const hasImage = Boolean(ogImage);
  const imageUrl = hasImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${siteConfig.url}${ogImage}`
    : '';

  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph — only emit image/description when configured */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {hasImage && <meta property="og:image" content={imageUrl} />}
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={siteConfig.locale} />

      {/* Twitter Card — summary_large_image only when an image exists */}
      <meta name="twitter:card" content={hasImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {hasImage && <meta name="twitter:image" content={imageUrl} />}

      {/* No index (for staging, private pages, etc.) */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </>
  );
}
