// WHY: Neural flow particle system — creates the living background on the Home page.
// 140 particles drift organically, connect to each other and to the cursor.
// Physics values (friction 0.96, spring 0.03, radius 150) were tuned visually — don't change.

import { useMediaQuery } from '@hooks/useMediaQuery';
import { useEffect, useRef } from 'react';

/* ─── Types ───────────────────────────────────────────────── */

interface ParticleState {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  blinkSpeed: number;
  alpha: number;
  increasing: boolean;
  vx: number;
  vy: number;
  friction: number;
}

interface MousePosition {
  x: number;
  y: number;
}

/* ─── Particle factory ────────────────────────────────────── */

function createParticle(canvasWidth: number, canvasHeight: number): ParticleState {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    size: Math.random() * 1.6 + 0.3,
    speed: Math.random() * 0.05 + 0.02,
    angle: Math.random() * Math.PI * 2,
    blinkSpeed: 0.001 + Math.random() * 0.003,
    alpha: Math.random() * 0.7,
    increasing: Math.random() > 0.5,
    vx: 0,
    vy: 0,
    friction: 0.96,
  };
}

function updateParticle(
  p: ParticleState,
  time: number,
  mouse: MousePosition,
  canvasWidth: number,
  canvasHeight: number,
) {
  // Organic drift
  p.angle += Math.sin(p.x * 0.005 + time) * 0.002;
  p.angle += Math.cos(p.y * 0.005 + time) * 0.002;
  const driftX = Math.cos(p.angle) * p.speed;
  const driftY = Math.sin(p.angle) * p.speed;

  // Mouse repulsion
  const dx = mouse.x - p.x;
  const dy = mouse.y - p.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const radius = 150;

  if (dist < radius && dist > 0) {
    const force = (radius - dist) / radius;
    p.vx -= (dx / dist) * force * 0.5;
    p.vy -= (dy / dist) * force * 0.5;
  }

  p.vx *= p.friction;
  p.vy *= p.friction;
  p.x += driftX + p.vx;
  p.y += driftY + p.vy;

  // Wrap around edges
  if (p.x < -20) p.x = canvasWidth + 20;
  if (p.x > canvasWidth + 20) p.x = -20;
  if (p.y < -20) p.y = canvasHeight + 20;
  if (p.y > canvasHeight + 20) p.y = -20;

  // Blink
  if (p.increasing) {
    p.alpha += p.blinkSpeed;
    if (p.alpha >= 0.8) p.increasing = false;
  } else {
    p.alpha -= p.blinkSpeed;
    if (p.alpha <= 0.1) p.increasing = true;
  }
}

/* ─── DynamicParticles ────────────────────────────────────── */

const PARTICLE_COUNT = 140;
const CONNECTION_DIST = 80;
const CURSOR_DIST = 180;

export function DynamicParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<MousePosition>({ x: -1000, y: -1000 });
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    // WHY: devicePixelRatio scales the canvas buffer for sharp rendering on Retina/HiDPI screens
    let logicalWidth = window.innerWidth;
    let logicalHeight = window.innerHeight;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      logicalWidth = window.innerWidth;
      logicalHeight = window.innerHeight;
      canvas.width = logicalWidth * dpr;
      canvas.height = logicalHeight * dpr;
      canvas.style.width = `${logicalWidth}px`;
      canvas.style.height = `${logicalHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    const particles = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(logicalWidth, logicalHeight),
    );

    const animate = () => {
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      time += 0.0005;

      const mouse = mouseRef.current;

      // Update & draw particles
      for (const p of particles) {
        updateParticle(p, time, mouse, logicalWidth, logicalHeight);
        ctx.fillStyle = `rgba(255, 107, 107, ${p.alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Inter-particle connections
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        if (!pi) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          if (!pj) continue;

          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            ctx.strokeStyle = `rgba(255, 107, 107, ${0.2 * (1 - dist / CONNECTION_DIST) * pi.alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
          }
        }

        // Cursor-to-particle connections
        const cdx = mouse.x - pi.x;
        const cdy = mouse.y - pi.y;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
        if (cdist < CURSOR_DIST) {
          const opacity = 0.45 * (1 - cdist / CURSOR_DIST) * pi.alpha;
          ctx.strokeStyle = `rgba(255, 107, 107, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDesktop, prefersReducedMotion]);

  // Mobile or reduced motion: no particles
  if (!isDesktop || prefersReducedMotion) return null;

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-1" />;
}
