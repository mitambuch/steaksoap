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
  const imageUrl = ogImage?.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph — Facebook / LinkedIn sharing */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={siteConfig.locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* No index (for staging, private pages, etc.) */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </>
  );
}
