import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import { cn } from '@utils/cn';
import { Check, Copy } from 'lucide-react';

/** Click-to-copy chip — displays a value and copies it on click. */
export function Copyable({ text, className }: { text: string; className?: string }) {
  const { copy, copied } = useCopyToClipboard();

  return (
    <button
      aria-label={`Copy ${text} to clipboard`}
      onClick={() => void copy(text)}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[10px] transition-colors duration-300',
        copied
          ? 'bg-success/15 text-success'
          : 'bg-surface/50 text-muted hover:bg-surface hover:text-accent',
        className,
      )}
    >
      {copied ? 'copied' : text}
      {copied ? (
        <Check size={10} strokeWidth={2} aria-hidden="true" />
      ) : (
        <Copy size={10} strokeWidth={1.5} aria-hidden="true" />
      )}
    </button>
  );
}
