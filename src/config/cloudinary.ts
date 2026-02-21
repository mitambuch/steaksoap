/* ═══════════════════════════════════════════════════════════════
   CLOUDINARY — optional image CDN helper
   Only used when VITE_CLOUDINARY_CLOUD_NAME is set in .env.local.
   Usage:
     import { cloudinary } from '@config/cloudinary';
     const url = cloudinary.url('folder/image-name', { w: 800, q: 'auto' });
   ═══════════════════════════════════════════════════════════════ */

import { env } from './env';

const BASE = `https://res.cloudinary.com/${env.CLOUDINARY_CLOUD_NAME}`;

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
  /**
   * Génère une URL Cloudinary optimisée.
   * @param publicId  - Chemin de l'image dans Cloudinary (ex: "projects/hero")
   * @param opts      - Transformations (width, height, quality, format...)
   */
  url(publicId: string, opts: TransformOptions = {}): string {
    const transform = buildTransform(opts);
    return transform
      ? `${BASE}/image/upload/${transform}/${publicId}`
      : `${BASE}/image/upload/${publicId}`;
  },

  /**
   * Génère un srcSet responsive pour <img> ou <source>.
   * @param publicId - Chemin de l'image dans Cloudinary
   * @param widths   - Largeurs à générer (default: [640, 1024, 1440, 1920])
   */
  srcSet(publicId: string, widths = [640, 1024, 1440, 1920]): string {
    return widths
      .map(w => `${cloudinary.url(publicId, { w, q: 'auto', f: 'auto' })} ${w}w`)
      .join(', ');
  },
};
