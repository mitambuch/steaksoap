import { useEffect, useState } from 'react';

/* ─── Hook: track mouse position ─────────────────────────────── */

function useCursorGlow(enabled: boolean) {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [enabled, visible]);

  return { pos, visible: enabled && visible };
}

/* ─── Coral cursor glow (desktop only) ───────────────────────── */

interface CursorGlowProps {
  enabled: boolean;
}

/**
 * Custom coral cursor with radial glow.
 * Renders a large diffuse glow + a small accent dot.
 * Desktop only — pass `enabled` from useMediaQuery.
 */
export function CursorGlow({ enabled }: CursorGlowProps) {
  const { pos, visible } = useCursorGlow(enabled);

  if (!visible) return null;

  return (
    <>
      {/* Large diffuse glow */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-9990 mix-blend-difference"
        style={{
          transform: `translate3d(${pos.x - 200}px, ${pos.y - 200}px, 0)`,
          transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <div
          className="h-100 w-100 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 107, 107, 0.5) 0%, transparent 55%)',
            filter: 'blur(50px)',
            opacity: 0.25,
          }}
        />
      </div>

      {/* Small accent dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-10000 flex items-center justify-center"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
          transition: 'transform 75ms ease-out',
        }}
      >
        <div
          className="bg-accent h-3 w-3 rounded-full"
          style={{
            boxShadow: '0 0 12px rgba(255, 107, 107, 0.8), 0 0 24px rgba(255, 107, 107, 0.4)',
          }}
        />
      </div>
    </>
  );
}
