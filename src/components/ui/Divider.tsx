import { cn } from '@utils/cn';

interface DividerProps {
  label?: string;
  className?: string;
}

/** Horizontal divider with optional centered label. */
export const Divider = ({ label, className }: DividerProps) => {
  if (!label) {
    return <hr className={cn('border-border my-6 border-t', className)} />;
  }

  return (
    <div className={cn('my-6 flex items-center gap-3', className)}>
      <div className="border-border flex-1 border-t" />
      <span className="text-muted font-mono text-[10px] tracking-[0.2em] uppercase">{label}</span>
      <div className="border-border flex-1 border-t" />
    </div>
  );
};
