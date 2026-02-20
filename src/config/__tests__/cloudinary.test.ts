import { describe, expect, it, vi } from 'vitest';

// Mock import.meta.env before importing the module
vi.stubEnv('VITE_CLOUDINARY_CLOUD_NAME', 'test-cloud');

const { cloudinary } = await import('../cloudinary');

describe('cloudinary', () => {
  describe('url()', () => {
    it('generates a basic url with default transforms (q_auto, f_auto)', () => {
      const url = cloudinary.url('folder/image');
      expect(url).toBe(
        'https://res.cloudinary.com/test-cloud/image/upload/q_auto,f_auto/folder/image',
      );
    });

    it('applies width transform', () => {
      const url = cloudinary.url('folder/image', { w: 800 });
      expect(url).toContain('w_800');
    });

    it('applies height transform', () => {
      const url = cloudinary.url('folder/image', { h: 600 });
      expect(url).toContain('h_600');
    });

    it('applies crop and gravity', () => {
      const url = cloudinary.url('folder/image', { c: 'fill', g: 'face' });
      expect(url).toContain('c_fill');
      expect(url).toContain('g_face');
    });

    it('includes publicId in the url', () => {
      const url = cloudinary.url('projects/hero-banner', { w: 1200 });
      expect(url).toContain('projects/hero-banner');
    });
  });

  describe('srcSet()', () => {
    it('generates srcSet with default widths', () => {
      const srcSet = cloudinary.srcSet('folder/image');
      expect(srcSet).toContain('640w');
      expect(srcSet).toContain('1024w');
      expect(srcSet).toContain('1440w');
      expect(srcSet).toContain('1920w');
    });

    it('generates srcSet with custom widths', () => {
      const srcSet = cloudinary.srcSet('folder/image', [320, 768]);
      expect(srcSet).toContain('320w');
      expect(srcSet).toContain('768w');
      expect(srcSet).not.toContain('640w');
    });

    it('includes q_auto and f_auto in each entry', () => {
      const srcSet = cloudinary.srcSet('folder/image', [640]);
      expect(srcSet).toContain('q_auto');
      expect(srcSet).toContain('f_auto');
    });
  });
});
