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
