import { SeoHead } from '@components/features/SeoHead';

export default function Home() {
  return (
    <>
      <SeoHead />

      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-3xl flex-col justify-center px-6">
        <p className="text-accent font-mono text-sm tracking-wide">v4.0 — fresh start</p>
        <h1 className="text-fg mt-3 text-3xl font-medium tracking-tight md:text-5xl">
          Build something great.
        </h1>
        <p className="text-muted mt-4 max-w-lg text-base leading-relaxed md:text-lg">
          Clean slate, zero bloat. Everything you need, nothing you don&apos;t.
          <br />
          Let&apos;s go.
        </p>
        <div className="bg-accent mt-8 h-px w-16" />
      </div>
    </>
  );
}
