/* ═══════════════════════════════════════════════════════════════
   TYPES COMMUNS — réutilisables partout dans le projet
   ═══════════════════════════════════════════════════════════════ */

// ─── Utility types ────────────────────────────────────────────
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ID = string;
export type Timestamp = number;

// ─── Props helpers ────────────────────────────────────────────
export interface WithClassName {
  className?: string;
}
export interface WithChildren {
  children: import('react').ReactNode;
}
export interface WithStyle {
  style?: import('react').CSSProperties;
}

// ─── Image (Cloudinary) ───────────────────────────────────────
export interface CloudinaryImage {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
}

// ─── Navigation ───────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}
