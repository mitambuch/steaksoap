import { CursorGlow } from '@components/layout/CursorGlow';
import { Switch } from '@components/ui/Switch';
import { DynamicParticles } from '@features/particles/DynamicParticles';
import { cn } from '@utils/cn';
import { useState } from 'react';

import { Section } from '../shared';

function CursorGlowDemo() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="space-y-4">
      <p className="text-muted text-sm">
        Custom coral cursor with radial glow. Desktop only — hover over the box below to see it.
      </p>
      <Switch label="Enable cursor glow" checked={enabled} onChange={setEnabled} />
      <div className="border-border/50 relative h-64 overflow-hidden rounded-lg border">
        {enabled && <CursorGlow enabled />}
        <div className={cn('flex h-full items-center justify-center', enabled && 'cursor-none')}>
          <p className="text-muted/60 font-mono text-xs">
            {enabled ? 'move your mouse here' : 'toggle the switch above'}
          </p>
        </div>
      </div>
    </div>
  );
}

function ParticlesDemo() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="space-y-4">
      <p className="text-muted text-sm">
        Neural flow particle system. Canvas-based, respects prefers-reduced-motion. Coral accent
        with cursor interaction on desktop.
      </p>
      <Switch label="Enable particles" checked={enabled} onChange={setEnabled} />
      <div className="border-border/50 relative h-80 overflow-hidden rounded-lg border">
        {enabled && <DynamicParticles />}
        <div className="flex h-full items-center justify-center">
          <p className="text-muted/60 font-mono text-xs">
            {enabled ? 'move your mouse for interaction' : 'toggle the switch above'}
          </p>
        </div>
      </div>
    </div>
  );
}

export function EffectsSection() {
  return (
    <>
      <Section number="24" title="cursor glow">
        <CursorGlowDemo />
      </Section>

      <Section number="25" title="particles">
        <ParticlesDemo />
      </Section>
    </>
  );
}
