import type { ReactNode } from 'react';

import { Copyable } from './Copyable';

/** Icon showcase item with copy-able name. */
export function IconItem({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="border-border/50 hover:border-accent/20 duration-base flex items-center gap-3 rounded-lg border px-3 py-2 transition-[border-color]">
      <div className="text-fg">{children}</div>
      <Copyable text={name} />
    </div>
  );
}
