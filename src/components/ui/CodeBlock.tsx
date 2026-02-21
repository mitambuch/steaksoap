/* ═══════════════════════════════════════════════════════════════
   CodeBlock — terminal-style code display for quick start steps.
   Matches the existing AnimatedTerminal aesthetic.
   ═══════════════════════════════════════════════════════════════ */

import { cn } from '@utils/cn';

interface CodeBlockProps {
  step: number;
  label: string;
  command: string;
  output?: string;
  className?: string;
}

export function CodeBlock({ step, label, command, output, className }: CodeBlockProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-3">
        <span className="bg-accent/10 text-accent flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs font-medium">
          {step}
        </span>
        <span className="text-fg/70 font-mono text-sm">{label}</span>
      </div>
      <div className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="text-accent/80">$</span>
          <code className="text-fg/80">{command}</code>
        </div>
        {output && (
          <pre className="text-accent/50 mt-2 font-mono text-xs whitespace-pre-wrap">{output}</pre>
        )}
      </div>
    </div>
  );
}
