// ═══════════════════════════════════════════════════
// i18n — multilingual configuration (fr, de, en)
//
// WHAT: Bootstraps i18next with browser-language detection + localStorage
//       persistence. FR is the source of truth and automatic fallback.
// WHEN: Imported once in main.tsx to initialise.
// CHANGE TRANSLATIONS: src/locales/{fr,de,en}.json
// RULE: see .claude/rules/i18n-sanity.md — never hardcode FR strings in JSX.
// ═══════════════════════════════════════════════════

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import de from '../locales/de.json';
import en from '../locales/en.json';
import fr from '../locales/fr.json';

export const SUPPORTED_LOCALES = ['fr', 'de', 'en'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';

/** Type guard: is this string one of the supported locale codes? */
export const isLocale = (value: string | undefined): value is Locale =>
  value !== undefined && (SUPPORTED_LOCALES as readonly string[]).includes(value);

/**
 * Best-effort initial locale detection for SSR-less scenarios. Client code
 * should prefer `useLocale()` which also watches the URL `:locale` param.
 *
 * Chain: localStorage → navigator.language → DEFAULT_LOCALE.
 */
export const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  const stored = window.localStorage.getItem('locale');
  if (isLocale(stored ?? undefined)) return stored as Locale;

  const nav = window.navigator.language?.slice(0, 2);
  if (isLocale(nav)) return nav;

  return DEFAULT_LOCALE;
};

/** Build a locale-prefixed path: `localePath('fr', '/playground')` → `/fr/playground`. */
export const localePath = (locale: Locale, path: string): string => {
  const trimmed = path.startsWith('/') ? path : `/${path}`;
  if (trimmed === '/') return `/${locale}`;
  return `/${locale}${trimmed}`;
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      de: { translation: de },
      en: { translation: en },
    },
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: SUPPORTED_LOCALES as unknown as string[],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'locale',
    },
  });

export default i18n;
