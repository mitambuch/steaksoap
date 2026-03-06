import type { ReactNode } from 'react';

/** Small uppercase label for sub-sections. */
export function SubLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-muted mb-4 block font-mono text-[10px] tracking-[0.2em] uppercase">
      {children}
    </span>
  );
}
