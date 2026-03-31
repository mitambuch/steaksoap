// ═══════════════════════════════════════════════════
// Stat — metric display card
//
// WHAT: Renders a label-value pair for statistics
// WHEN: Use in dashboards or summary sections
// CHANGE COLORS: Edit design tokens in src/index.css
// ═══════════════════════════════════════════════════

import { cn } from '@utils/cn';

interface StatProps {
  label: string;
  value: string;
  trend?: { value: string; positive: boolean };
  className?: string;
}

/** Metric display with label, value, and optional trend indicator. */
export const Stat = ({ label, value, trend, className }: StatProps) => {
  return (
    <div className={cn('flex flex-col', className)}>
      <span className="text-muted font-mono text-[10px] tracking-[0.2em] uppercase">{label}</span>
      <span className="text-fg mt-1 text-3xl font-bold">{value}</span>
      {trend && (
        <span
          className={cn(
            'mt-1 text-xs font-medium',
            trend.positive ? 'text-success-text' : 'text-danger-text',
          )}
        >
          {trend.positive ? '\u2191' : '\u2193'} {trend.value}
        </span>
      )}
    </div>
  );
};
