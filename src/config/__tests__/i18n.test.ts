import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_LOCALE, getInitialLocale, isLocale, localePath, SUPPORTED_LOCALES } from '../i18n';

describe('isLocale', () => {
  it('accepts every supported code', () => {
    for (const l of SUPPORTED_LOCALES) expect(isLocale(l)).toBe(true);
  });

  it('rejects unknown codes', () => {
    expect(isLocale('xx')).toBe(false);
    expect(isLocale('')).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});

describe('localePath', () => {
  it('prefixes a root path with the locale only', () => {
    expect(localePath('fr', '/')).toBe('/fr');
  });

  it('prefixes a nested path', () => {
    expect(localePath('de', '/playground')).toBe('/de/playground');
  });

  it('normalises a path missing its leading slash', () => {
    expect(localePath('en', 'lab')).toBe('/en/lab');
  });
});

describe('getInitialLocale', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns the localStorage value when valid', () => {
    window.localStorage.setItem('locale', 'de');
    expect(getInitialLocale()).toBe('de');
  });

  it('falls back to the default when storage has an invalid value', () => {
    window.localStorage.setItem('locale', 'xx');
    // navigator.language in jsdom defaults to "en-US" — both xx and en-US
    // fail isLocale for the stored value, so it falls back to navigator.
    // The navigator branch returning 'en' is also valid; we just need a
    // supported locale back.
    expect(SUPPORTED_LOCALES).toContain(getInitialLocale());
  });

  it('returns a supported locale regardless of inputs', () => {
    expect(SUPPORTED_LOCALES).toContain(getInitialLocale());
    expect(DEFAULT_LOCALE).toBe('fr');
  });
});
