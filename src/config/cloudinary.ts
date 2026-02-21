/* ═══════════════════════════════════════════════════════════════
   CLOUDINARY — optional image CDN helper
   Only used when VITE_CLOUDINARY_CLOUD_NAME is set in .env.local.
   When not configured, url() returns the raw publicId as fallback
   and srcSet() returns an empty string.
   Usage:
     import { cloudinary } from '@config/cloudinary';
     if (cloudinary.isEnabled) {
       const url = cloudinary.url('folder/image-name', { w: 800, q: 'auto' });
     }
   ═══════════════════════════════════════════════════════════════ */

import { env } from './env';

const CLOUD_NAME = env.CLOUDINARY_CLOUD_NAME;
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}`;

type TransformOptions = {
  w?: number;
  h?: number;
  q?: 'auto' | number;
  f?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  c?: 'fill' | 'fit' | 'crop' | 'scale';
  g?: 'auto' | 'face' | 'center';
};

function buildTransform(opts: TransformOptions = {}): string {
  const parts: string[] = [];
  if (opts.w) parts.push(`w_${opts.w}`);
  if (opts.h) parts.push(`h_${opts.h}`);
  if (opts.q ?? true) parts.push(`q_${opts.q ?? 'auto'}`);
  if (opts.f ?? true) parts.push(`f_${opts.f ?? 'auto'}`);
  if (opts.c) parts.push(`c_${opts.c}`);
  if (opts.g) parts.push(`g_${opts.g}`);
  return parts.join(',');
}

export const cloudinary = {
  /** Whether Cloudinary is configured and usable */
  isEnabled: !!CLOUD_NAME,

  /**
   * Generate an optimized Cloudinary URL.
   * Returns the raw publicId as fallback if Cloudinary is not configured.
   * @param publicId - Image path in Cloudinary (e.g. "projects/hero")
   * @param opts     - Transformations (width, height, quality, format...)
   */
  url(publicId: string, opts: TransformOptions = {}): string {
    if (!CLOUD_NAME) return publicId;

    const transform = buildTransform(opts);
    return transform
      ? `${BASE}/image/upload/${transform}/${publicId}`
      : `${BASE}/image/upload/${publicId}`;
  },

  /**
   * Generate a responsive srcSet string for <img> or <source>.
   * Returns empty string if Cloudinary is not configured.
   * @param publicId - Image path in Cloudinary
   * @param widths   - Widths to generate (default: [640, 1024, 1440, 1920])
   */
  srcSet(publicId: string, widths = [640, 1024, 1440, 1920]): string {
    if (!CLOUD_NAME) return '';

    return widths
      .map(w => `${cloudinary.url(publicId, { w, q: 'auto', f: 'auto' })} ${w}w`)
      .join(', ');
  },
};
