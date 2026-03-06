import { Copyable } from './Copyable';

/** Resolve the computed hex value of a CSS custom property. */
function getResolvedColor(token: string): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${token}`)
    .trim();
  return raw || '—';
}

/** Color swatch card — reads live hex from CSS vars (single source of truth: index.css). */
export function Swatch({ name, token }: { name: string; token: string }) {
  const hex = getResolvedColor(token);

  return (
    <div className="border-border/50 hover:border-accent/20 duration-base flex items-center gap-4 rounded-lg border p-3 transition-[border-color]">
      <div
        className="border-border h-10 w-10 shrink-0 rounded-sm border"
        style={{ backgroundColor: `var(--color-${token})` }}
      />
      <div className="space-y-1">
        <p className="text-fg text-sm font-medium">{name}</p>
        <div className="flex flex-wrap gap-1">
          <Copyable text={`bg-${token}`} />
          <Copyable text={`text-${token}`} />
          <Copyable text={hex} />
        </div>
      </div>
    </div>
  );
}
