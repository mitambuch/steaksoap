import { describe, expect, it } from 'vitest';

import { getPlatformShortcut, PLATFORM_SHORTCUT_PLACEHOLDER, wizardSlides } from '../steps';

describe('wizardSlides', () => {
  it('has slides defined', () => {
    expect(wizardSlides.length).toBeGreaterThan(0);
  });

  it('starts with a welcome slide', () => {
    expect(wizardSlides[0]?.type).toBe('welcome');
  });

  it('ends with a done slide', () => {
    expect(wizardSlides[wizardSlides.length - 1]?.type).toBe('done');
  });

  it('every slide has an id and type', () => {
    for (const slide of wizardSlides) {
      expect(slide.id).toBeTruthy();
      expect(slide.type).toBeTruthy();
      expect(typeof slide.group).toBe('string');
    }
  });

  it('content slides have title and body', () => {
    const contentSlides = wizardSlides.filter(s => s.type !== 'welcome' && s.type !== 'done');
    for (const slide of contentSlides) {
      expect(slide.title).toBeTruthy();
      expect(slide.body).toBeTruthy();
    }
  });

  it('has unique IDs for every slide', () => {
    const ids = wizardSlides.map(s => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('action slides have actionType and actionValue', () => {
    const actionSlides = wizardSlides.filter(s => s.type === 'action');
    for (const slide of actionSlides) {
      expect(slide.actionType).toBeTruthy();
      expect(slide.actionValue).toBeTruthy();
    }
  });

  it('verify slides have a command', () => {
    const verifySlides = wizardSlides.filter(s => s.type === 'verify');
    for (const slide of verifySlides) {
      expect(slide.command).toBeTruthy();
    }
  });

  it('getPlatformShortcut returns a keyboard shortcut string', () => {
    const shortcut = getPlatformShortcut();
    expect(shortcut).toMatch(/Cmd|Ctrl/);
    expect(shortcut).toContain('`');
  });

  it('PLATFORM_SHORTCUT_PLACEHOLDER is a non-empty string', () => {
    expect(PLATFORM_SHORTCUT_PLACEHOLDER).toBeTruthy();
    expect(typeof PLATFORM_SHORTCUT_PLACEHOLDER).toBe('string');
  });

  it('all slides have a group property', () => {
    for (const slide of wizardSlides) {
      expect(typeof slide.group).toBe('string');
      expect(slide.group.length).toBeGreaterThan(0);
    }
  });
});
