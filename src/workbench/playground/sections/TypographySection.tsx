import { Copyable, Section } from '../shared';

export function TypographySection() {
  return (
    <Section number="01" title="typography">
      <div className="space-y-6">
        {[
          { text: 'headlines', classes: 'text-5xl font-bold md:text-7xl' },
          { text: 'page titles', classes: 'text-4xl font-medium md:text-6xl' },
          { text: 'section titles', classes: 'text-2xl font-medium md:text-4xl' },
        ].map(({ text, classes }) => (
          <div
            key={text}
            className="border-border/50 hover:border-accent/20 duration-base space-y-2 rounded-lg border p-4 transition-[border-color]"
          >
            <p className={`text-fg ${classes}`}>{text}</p>
            <Copyable text={classes} />
          </div>
        ))}
        <div className="border-border/50 hover:border-accent/20 duration-base space-y-2 rounded-lg border p-4 transition-[border-color]">
          <p className="text-fg text-base leading-relaxed md:text-xl">
            the quick brown fox jumps over the lazy dog. space grotesk renders beautifully at all
            sizes.
          </p>
          <Copyable text="text-base leading-relaxed md:text-xl" />
        </div>
        <div className="border-border/50 hover:border-accent/20 duration-base space-y-2 rounded-lg border p-4 transition-[border-color]">
          <p className="text-fg text-xs font-bold tracking-widest uppercase">buttons and ctas</p>
          <Copyable text="text-xs font-bold tracking-widest uppercase" />
        </div>
        <div className="border-border/50 hover:border-accent/20 duration-base space-y-2 rounded-lg border p-4 transition-[border-color]">
          <p className="text-muted font-mono text-[10px] tracking-[0.2em] uppercase">
            metadata and ui labels
          </p>
          <Copyable text="font-mono text-[10px] tracking-[0.2em] uppercase" />
        </div>
      </div>
    </Section>
  );
}
