import { useCounter } from './useCounter';

/**
 * Example feature component — demonstrates the feature-based pattern.
 * Delete this folder when starting a real project.
 *
 * Pattern: feature folder contains component + hook + types + barrel export.
 * See docs/ARCHITECTURE.md → src/features/ for rules.
 */
export function Counter() {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-fg font-mono text-2xl tabular-nums">{count}</p>
      <div className="flex gap-2">
        <button
          onClick={decrement}
          className="border-accent/20 text-accent/80 hover:border-accent/50 hover:text-accent rounded-md border px-3 py-1 font-mono text-sm transition-colors"
        >
          −
        </button>
        <button
          onClick={reset}
          className="text-muted hover:text-fg border-border hover:border-accent/30 rounded-md border px-3 py-1 font-mono text-sm transition-colors"
        >
          reset
        </button>
        <button
          onClick={increment}
          className="border-accent/20 text-accent/80 hover:border-accent/50 hover:text-accent rounded-md border px-3 py-1 font-mono text-sm transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
