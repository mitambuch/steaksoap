/* ═══════════════════════════════════════════════════════════════
   SEO HEAD — gestion des meta tags par page (React 19 natif)
   React 19 hoist automatiquement <title> et <meta> dans <head>.

   Usage :
     <SeoHead title="Accueil" description="Bienvenue sur notre site" />
   ═══════════════════════════════════════════════════════════════ */

import { siteConfig } from '@config/site';

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
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const pageUrl = canonicalUrl ?? siteConfig.url;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph — partage Facebook / LinkedIn */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteConfig.url}${ogImage}`} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={siteConfig.locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteConfig.url}${ogImage}`} />

      {/* No index (pour staging, pages privées, etc.) */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </>
  );
}
