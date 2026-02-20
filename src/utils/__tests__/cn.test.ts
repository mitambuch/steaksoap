import { describe, expect, it } from 'vitest';

import { cn } from '../cn';

describe('cn()', () => {
  it('concatenates class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('filters out falsy values', () => {
    expect(cn('px-4', false, null, undefined, 'py-2')).toBe('px-4 py-2');
  });

  it('resolves tailwind conflicts (last wins)', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8');
  });

  it('resolves complex tailwind conflicts', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn('btn', isActive && 'btn-active', isDisabled && 'btn-disabled')).toBe(
      'btn btn-active',
    );
  });

  it('returns empty string for no args', () => {
    expect(cn()).toBe('');
  });
});
