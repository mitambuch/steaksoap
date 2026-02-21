/* ═══════════════════════════════════════════════════════════════
   TechBadge — clickable badge for a tech stack item.
   Matches the hero pill-style links but larger for the stack section.
   ═══════════════════════════════════════════════════════════════ */

import { cn } from '@utils/cn';

interface TechBadgeProps {
  name: string;
  role: string;
  href: string;
  className?: string;
}

export function TechBadge({ name, role, href, className }: TechBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex flex-col items-center gap-1 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 transition-all duration-300',
        'hover:border-accent/30 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(212,255,0,0.06)]',
        className,
      )}
    >
      <span className="text-fg/80 group-hover:text-accent font-mono text-sm font-medium transition-colors duration-300">
        {name}
      </span>
      <span className="text-muted font-mono text-[10px]">{role}</span>
    </a>
  );
}
