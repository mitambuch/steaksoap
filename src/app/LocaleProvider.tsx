// ═══════════════════════════════════════════════════
// LocaleProvider — reads the current locale and syncs it everywhere
//
// WHAT: Looks at the `:locale` URL param (primary source of truth).
//       When present + valid, syncs with:
//         - i18next (t() keys resolve in that locale)
//         - document.documentElement.lang (SEO + assistive tech)
//         - localStorage `locale` (so returning users land on their pref)
//       When absent (un-prefixed routes like `/playground`), falls back
//       to the detected locale via getInitialLocale().
// WHEN: Rendered at the root of every locale-scoped route tree in
//       src/app/routes/index.tsx.
// RULE: i18n-sanity.md lessons #3 (html lang sync) + #7/#8 (SEO prefix).
// ═══════════════════════════════════════════════════

import {
  DEFAULT_LOCALE,
  getInitialLocale,
  isLocale,
  type Locale,
  localePath,
  SUPPORTED_LOCALES,
} from '@config/i18n';
import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface LocaleContextValue {
  locale: Locale;
  availableLocales: readonly Locale[];
  setLocale: (next: Locale) => void;
  localePath: (path: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const params = useParams<{ locale?: string }>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  // Param-from-URL takes precedence; fall back to detected for un-prefixed routes.
  const locale: Locale = isLocale(params.locale) ? params.locale : getInitialLocale();

  useEffect(() => {
    if (i18n.language !== locale) void i18n.changeLanguage(locale);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('locale', locale);
    }
  }, [locale, i18n]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      // Strip current locale prefix (if any) then prepend the new one.
      const currentPrefix = isLocale(params.locale) ? `/${params.locale}` : '';
      const rest = currentPrefix ? pathname.slice(currentPrefix.length) || '/' : pathname;
      void navigate(localePath(next, rest));
    },
    [locale, params.locale, pathname, navigate],
  );

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      availableLocales: SUPPORTED_LOCALES,
      setLocale,
      localePath: (path: string) => localePath(locale, path),
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/** Read the active locale + helpers. Must be used inside a `<LocaleProvider>`. */
// WHY: co-located with the Provider for cohesion; Fast Refresh degrades
// gracefully (full reload on this file), which is acceptable for a context.
// eslint-disable-next-line react-refresh/only-export-components
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    // Graceful fallback for components rendered outside the provider (tests,
    // error boundaries). Never throws — returns a default-locale snapshot.
    return {
      locale: DEFAULT_LOCALE,
      availableLocales: SUPPORTED_LOCALES,
      setLocale: () => {},
      localePath: (path: string) => localePath(DEFAULT_LOCALE, path),
    };
  }
  return ctx;
}
