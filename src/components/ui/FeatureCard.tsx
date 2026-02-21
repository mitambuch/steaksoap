/* ═══════════════════════════════════════════════════════════════
   FeatureCard — displays a single feature with icon, title, description.
   Styled to match the dark + neon yellow design system.
   ═══════════════════════════════════════════════════════════════ */

import { cn } from '@utils/cn';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-white/5 bg-white/[0.02] p-5 transition-all duration-300',
        'hover:border-accent/20 hover:bg-white/[0.04]',
        className,
      )}
    >
      <span className="mb-3 block text-2xl" role="img" aria-hidden="true">
        {icon}
      </span>
      <h3 className="text-fg/90 mb-2 font-mono text-sm font-medium">{title}</h3>
      <p className="text-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
}
