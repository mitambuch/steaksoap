import { useCallback, useEffect, useRef, useState } from 'react';

/* ─── Hook: track mouse position via refs (zero re-renders) ──── */

// WHY: Using refs + direct DOM mutation instead of useState for position
// avoids 60+ React re-renders/sec on mousemove. Only the initial
// visibility toggle triggers a single re-render.
function useCursorGlow(enabled: boolean) {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: MouseEvent) => {
    if (glowRef.current) {
      glowRef.current.style.transform = `translate3d(${e.clientX - 150}px, ${e.clientY - 150}px, 0)`;
    }
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }
    if (!visibleRef.current) {
      visibleRef.current = true;
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [enabled, handleMove]);

  return { visible: enabled && visible, glowRef, dotRef };
}

/* ─── Coral cursor glow (desktop only) ───────────────────────── */

interface CursorGlowProps {
  enabled: boolean;
}

/**
 * Custom coral cursor with radial glow.
 * Renders a subtle diffuse glow + a small accent dot.
 * Desktop only — pass `enabled` from useMediaQuery.
 */
export const CursorGlow = ({ enabled }: CursorGlowProps) => {
  const { visible, glowRef, dotRef } = useCursorGlow(enabled);

  if (!visible) return null;

  return (
    <>
      {/* Large diffuse glow — subtle */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-9990"
        style={{
          transform: 'translate3d(-200px, -200px, 0)',
          transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <div
          className="h-75 w-75 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.3) 0%, transparent 60%)',
            filter: 'blur(40px)',
            opacity: 0.12,
          }}
        />
      </div>

      {/* Small accent dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-10000 flex items-center justify-center"
        style={{
          transform: 'translate(-200px, -200px) translate(-50%, -50%)',
          transition: 'transform 75ms ease-out',
        }}
      >
        <div
          className="bg-accent h-2 w-2 rounded-full"
          style={{
            boxShadow:
              '0 0 8px rgba(var(--color-accent-rgb), 0.6), 0 0 20px rgba(var(--color-accent-rgb), 0.3), 0 0 40px rgba(var(--color-accent-rgb), 0.1)',
          }}
        />
      </div>
    </>
  );
};
