/* ═══════════════════════════════════════════════════════════════
   useInView — triggers once when an element enters the viewport.
   Returns a ref to attach and an isInView boolean.
   Uses IntersectionObserver (native, zero dependencies).
   ═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  /** Percentage of element visible to trigger (0-1). Default: 0.15 */
  threshold?: number;
  /** Trigger only once. Default: true */
  once?: boolean;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(options: UseInViewOptions = {}) {
  const { threshold = 0.15, once = true } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isInView };
}
