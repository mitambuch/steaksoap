/* ═══════════════════════════════════════════════════════════════
   SEO HEAD — per-page meta tag management (React 19 native)
   React 19 automatically hoists <title> and <meta> into <head>.

   Emits:
   - <title>, description, canonical (locale-prefixed)
   - Open Graph (og:title/description/image/url/type/locale)
   - Twitter Card
   - hreflang alternates for every SUPPORTED_LOCALES + x-default
     (i18n-sanity.md lesson #8)

   Usage:
     <SeoHead title="Home" description="Welcome to our site" />
   ═══════════════════════════════════════════════════════════════ */

import { useLocale } from '@app/LocaleProvider';
import { isLocale, localePath, SUPPORTED_LOCALES } from '@config/i18n';
import { siteConfig } from '@config/site';
import { useLocation } from 'react-router-dom';

const OG_LOCALE_MAP: Record<string, string> = {
  fr: 'fr_FR',
  de: 'de_DE',
  en: 'en_US',
};

interface SeoHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

/** Strip leading `/:locale` from a pathname so we can re-prefix per alternate. */
function stripLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    const rest = segments.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return pathname || '/';
}

export function SeoHead({
  title,
  description = siteConfig.description,
  ogImage = siteConfig.ogImage,
  canonicalUrl,
  noIndex = false,
}: SeoHeadProps) {
  const { pathname } = useLocation();
  const { locale } = useLocale();

  const fullTitle =
    title && title !== siteConfig.name ? `${title} | ${siteConfig.name}` : siteConfig.name;

  const basePath = stripLocale(pathname);
  const canonicalPath = localePath(locale, basePath);
  const pageUrl = canonicalUrl ?? `${siteConfig.url}${canonicalPath}`;
  const ogLocale = OG_LOCALE_MAP[locale] ?? siteConfig.locale;

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

      {/* hreflang alternates — one per supported locale + x-default */}
      {SUPPORTED_LOCALES.map(l => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`${siteConfig.url}${localePath(l, basePath)}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${siteConfig.url}${localePath(SUPPORTED_LOCALES[0], basePath)}`}
      />

      {/* Open Graph — only emit image/description when configured */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {hasImage && <meta property="og:image" content={imageUrl} />}
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={ogLocale} />

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
