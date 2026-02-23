/* ═══════════════════════════════════════════════════════════════
   VerifyCheck — "did it work?" verification block.
   Shows a command the user can paste to confirm a step succeeded,
   plus the expected output so they know what "success" looks like.
   ═══════════════════════════════════════════════════════════════ */

import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import { cn } from '@utils/cn';
import { Check, CircleCheck, Copy } from 'lucide-react';

interface VerifyCheckProps {
  command: string;
  expected: string;
}

export function VerifyCheck({ command, expected }: VerifyCheckProps) {
  const { copy, copied } = useCopyToClipboard();

  return (
    <div className="bg-success/5 border-success/15 rounded-lg border p-4">
      <div className="mb-2 flex items-center gap-2">
        <CircleCheck size={16} className="text-success shrink-0" aria-hidden="true" />
        <span className="text-success text-sm font-medium">Check if it worked</span>
      </div>

      <p className="text-muted mb-2 text-sm">Paste this in the terminal:</p>

      <button
        type="button"
        onClick={() => void copy(command)}
        className="bg-surface/50 border-success/10 group/verify flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left"
      >
        <code className="text-fg/80 min-w-0 flex-1 truncate font-mono text-sm">{command}</code>
        <span
          className={cn(
            'shrink-0 font-mono text-xs transition-colors',
            copied ? 'text-success' : 'text-muted group-hover/verify:text-accent',
          )}
        >
          {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
        </span>
      </button>

      <p className="text-muted mt-2 text-sm">
        You should see: <span className="text-fg/70 font-medium">{expected}</span>
      </p>
    </div>
  );
}
