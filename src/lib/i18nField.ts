// ═══════════════════════════════════════════════════
// i18nField — resolve locale* fields coming from Sanity
//
// WHAT: Takes a field shaped as `{ fr, de, en }` and returns the active
//       locale's value, with automatic FR fallback.
// WHEN: Consumed by Sanity hooks and any component rendering multilingual
//       CMS content.
// RULE: see .claude/rules/i18n-sanity.md — lesson #4 (fallback chain).
// ═══════════════════════════════════════════════════

import type { Locale } from '@config/i18n';

export type LocaleField<T = string> = Partial<Record<Locale, T>> | undefined;

/** Resolve a Sanity locale field → active locale value or FR fallback. */
export const resolveField = <T>(value: LocaleField<T>, locale: Locale): T | undefined => {
  if (!value) return undefined;
  return value[locale] ?? value.fr;
};

/**
 * Resolve with an i18n JSON fallback — pattern HDVA lesson #4.
 *
 * Chain: sanity[locale] → sanity.fr → provided fallback (e.g. `t('key.fallback')`).
 */
export const resolveFieldOrFallback = <T>(value: LocaleField<T>, locale: Locale, fallback: T): T =>
  resolveField(value, locale) ?? fallback;
