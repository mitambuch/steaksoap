// ═══════════════════════════════════════════════════
// Logo — Studio wordmark (top-left of the tool bar)
//
// WHAT: Replaces the default "Sanity" wordmark. Brand per-client by
//       editing this file — swap the emoji + label for the client's
//       wordmark or import an <svg>.
// ═══════════════════════════════════════════════════

import type { ReactElement } from 'react';

export function Logo(): ReactElement {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: '0.02em',
      }}
    >
      <span aria-hidden="true" style={{ fontSize: 16 }}>
        📝
      </span>
      Studio
    </span>
  );
}
