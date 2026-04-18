import { describe, expect, it } from 'vitest';

import { resolveField, resolveFieldOrFallback } from '../i18nField';

describe('resolveField', () => {
  it('returns undefined for undefined field', () => {
    expect(resolveField(undefined, 'fr')).toBeUndefined();
  });

  it('returns the value for the active locale', () => {
    const field = { fr: 'Bonjour', de: 'Hallo', en: 'Hello' };
    expect(resolveField(field, 'de')).toBe('Hallo');
  });

  it('falls back to fr when active locale is missing', () => {
    const field = { fr: 'Bonjour' };
    expect(resolveField(field, 'en')).toBe('Bonjour');
  });

  it('returns undefined when fr fallback is also absent', () => {
    expect(resolveField({ de: 'Hallo' }, 'en')).toBeUndefined();
  });
});

describe('resolveFieldOrFallback', () => {
  it('uses the Sanity value when present', () => {
    expect(resolveFieldOrFallback({ fr: 'Salut', de: 'Hi' }, 'de', 'default')).toBe('Hi');
  });

  it('falls back to fr Sanity value before the provided fallback', () => {
    expect(resolveFieldOrFallback({ fr: 'Salut' }, 'en', 'default')).toBe('Salut');
  });

  it('uses the provided fallback when Sanity has nothing', () => {
    expect(resolveFieldOrFallback(undefined, 'fr', 'i18n-fallback')).toBe('i18n-fallback');
  });

  it('treats an empty object as no Sanity value', () => {
    expect(resolveFieldOrFallback({}, 'fr', 'last-resort')).toBe('last-resort');
  });
});
