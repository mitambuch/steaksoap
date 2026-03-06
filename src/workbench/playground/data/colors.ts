/**
 * Color token metadata — hex values are read live from CSS vars at runtime.
 * Single source of truth: src/index.css @theme block.
 */
export const COLOR_TOKENS = [
  { name: 'accent', token: 'accent' },
  { name: 'background', token: 'bg' },
  { name: 'foreground', token: 'fg' },
  { name: 'muted', token: 'muted' },
  { name: 'surface', token: 'surface' },
  { name: 'border', token: 'border' },
  { name: 'success', token: 'success' },
  { name: 'warning', token: 'warning' },
  { name: 'danger', token: 'danger' },
  { name: 'info', token: 'info' },
] as const;
