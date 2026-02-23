/* ═══════════════════════════════════════════════════════════════
   CommandCopy — a terminal-style command display with a copy button.
   Shows a monospace command with a persistent "Copy" button (no hover
   tricks on mobile). Feedback switches to "Copied" for 2 seconds.
   ═══════════════════════════════════════════════════════════════ */

import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import { cn } from '@utils/cn';
import { Check, Copy } from 'lucide-react';

interface CommandCopyProps {
  command: string;
  label?: string;
}

export function CommandCopy({ command, label }: CommandCopyProps) {
  const { copy, copied } = useCopyToClipboard();

  return (
    <div className="w-full">
      {label && (
        <p className="text-muted mb-1.5 text-xs font-medium tracking-wide uppercase">{label}</p>
      )}

      <div className="bg-surface/50 border-accent/10 flex items-center gap-3 rounded-lg border px-4 py-3">
        <code className="text-fg/90 min-w-0 flex-1 truncate font-mono text-sm">{command}</code>

        <button
          type="button"
          onClick={() => void copy(command)}
          className={cn(
            'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3 font-mono text-xs font-medium transition-all duration-200',
            copied
              ? 'bg-success/15 text-success'
              : 'bg-accent/10 text-accent hover:bg-accent/20 active:scale-95',
          )}
        >
          {copied ? (
            <>
              <Check size={14} aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} aria-hidden="true" />
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
