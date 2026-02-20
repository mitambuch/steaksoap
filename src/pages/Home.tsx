import { SeoHead } from '@components/features/SeoHead';

const stack = ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS'] as const;

const commands = [
  { cmd: 'pnpm dev', desc: 'start dev server' },
  { cmd: 'pnpm build', desc: 'build for production' },
  { cmd: 'pnpm validate', desc: 'lint + types + tests + build' },
  { cmd: 'pnpm setup:update', desc: 'pull template updates' },
] as const;

export default function Home() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-bg text-fg overflow-hidden">
      <SeoHead title="Welcome" description="Starter — professional React boilerplate." />

      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(200,255,0,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[450px] sm:w-[450px] md:h-[600px] md:w-[600px]"
        style={{
          background: 'radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-10 px-6 py-16">
        {/* Version badge */}
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span>Starter</span>
          <span className="text-accent/30">—</span>
          <span className="text-accent/70">v{__APP_VERSION__}</span>
        </div>

        {/* Title */}
        <h1 className="text-center text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Ready to <span className="text-accent">build</span>
          <span className="animate-blink text-accent">_</span>
        </h1>

        {/* Subtitle */}
        <p className="text-center text-base text-muted sm:text-lg">
          Your next project starts here.
        </p>

        {/* Stack badges */}
        <div className="flex flex-wrap justify-center gap-2">
          {stack.map(tech => (
            <span
              key={tech}
              className="rounded-full border border-accent/20 px-3 py-1 font-mono text-xs text-accent/80"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Terminal block */}
        <div className="w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
          {/* Terminal title bar */}
          <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5">
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="ml-2 font-mono text-[10px] text-muted/60">terminal</span>
          </div>

          {/* Commands */}
          <div className="space-y-1.5 px-4 py-3 font-mono text-sm">
            {commands.map(({ cmd, desc }) => (
              <div key={cmd} className="flex items-center justify-between gap-4">
                <span>
                  <span className="text-accent">$</span> <span className="text-fg/80">{cmd}</span>
                </span>
                <span className="hidden text-[11px] text-muted/50 sm:block">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer hint */}
        <p className="text-center font-mono text-xs text-muted/40">
          Edit <span className="text-accent/30">src/pages/Home.tsx</span> to start.
        </p>
      </div>
    </section>
  );
}
