import { Copyable } from './Copyable';

/** Color swatch card displaying a token with copy-able values. */
export function Swatch({
  name,
  token,
  dark,
  light,
}: {
  name: string;
  token: string;
  dark: string;
  light: string;
}) {
  return (
    <div className="border-border/50 hover:border-accent/20 flex items-center gap-4 rounded-lg border p-3 transition-[border-color] duration-300">
      <div
        className="border-border h-10 w-10 shrink-0 rounded-sm border"
        style={{ backgroundColor: `var(--color-${token})` }}
      />
      <div className="space-y-1">
        <p className="text-fg text-sm font-medium">{name}</p>
        <div className="flex flex-wrap gap-1">
          <Copyable text={`bg-${token}`} />
          <Copyable text={`text-${token}`} />
          <Copyable text={dark} />
          <Copyable text={light} />
        </div>
      </div>
    </div>
  );
}
