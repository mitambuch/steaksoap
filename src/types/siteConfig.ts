// ═══════════════════════════════════════════════════
// SiteConfig — TypeScript type matching studio/schemas/documents/siteConfig.ts
//
// Used by useSiteConfig() hook and any component that consumes the
// Sanity singleton. Keep in sync with the schema — a field change in
// the Studio should be reflected here within the same commit.
// ═══════════════════════════════════════════════════

import type { LocaleField } from '@lib/i18nField';
import type { SanityImageSource } from '@lib/sanity';

export interface SanityNavItem {
  label: LocaleField;
  href?: string;
}

export interface SanitySocials {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  x?: string;
}

export interface SanitySiteConfig {
  _id: string;
  _updatedAt?: string;
  siteName?: LocaleField;
  tagline?: LocaleField;
  logo?: SanityImageSource;
  primaryNav?: SanityNavItem[];
  footerTagline?: LocaleField;
  copyright?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: LocaleField;
  socials?: SanitySocials;
  seoTitle?: LocaleField;
  seoDescription?: LocaleField;
  ogImage?: SanityImageSource;
}
