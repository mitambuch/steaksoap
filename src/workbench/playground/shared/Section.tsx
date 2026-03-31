import type { ReactNode } from 'react';

/** Numbered section wrapper for the playground. */
export function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-border/50 border-t pt-12">
      <h2 className="mb-8 flex items-baseline gap-3">
        <span className="text-accent-text font-mono text-[10px] tracking-[0.2em] uppercase">
          {number}
        </span>
        <span className="text-muted font-mono text-[10px] tracking-[0.2em] uppercase">
          // {title}
        </span>
      </h2>
      {children}
    </section>
  );
}
