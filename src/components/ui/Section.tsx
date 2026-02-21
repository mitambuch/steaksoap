/* ═══════════════════════════════════════════════════════════════
   Section — reusable page section with heading and scroll reveal.
   Wraps children in a centered, padded container.
   Uses useInView for entrance animation.
   ═══════════════════════════════════════════════════════════════ */

import { useInView } from '@hooks/useInView';
import { cn } from '@utils/cn';
import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, title, subtitle, children, className }: SectionProps) {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        'mx-auto w-full max-w-5xl px-4 py-20 md:px-8 md:py-28',
        isInView ? 'animate-fade-in' : 'opacity-0',
        className,
      )}
    >
      {title && (
        <div className="mb-12 md:mb-16">
          <h2 className="text-fg/90 font-mono text-2xl font-medium md:text-3xl">{title}</h2>
          {subtitle && <p className="text-muted mt-3 font-mono text-sm">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
