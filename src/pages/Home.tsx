import { SeoHead } from '@components/features/SeoHead';
import { cn } from '@utils/cn';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

function CopyBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      {label && (
        <span className="text-muted mb-1.5 block font-mono text-[10px] tracking-widest uppercase">
          {label}
        </span>
      )}
      <div className="bg-surface border-border flex items-center justify-between rounded-lg border px-4 py-3">
        <code className="text-fg font-mono text-sm">{code}</code>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            'ml-3 shrink-0 rounded-md p-1.5 transition-colors',
            copied ? 'text-success bg-success/10' : 'text-muted hover:text-fg hover:bg-surface',
          )}
          aria-label={copied ? 'Copied' : 'Copy to clipboard'}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SeoHead
        title="Welcome"
        description="Your steaksoap project is ready. Follow the steps to make it yours with Claude Code."
      />

      <div className="mx-auto max-w-2xl px-4 py-16 md:py-24">
        {/* ── Hero ─────────────────────────────────────── */}
        <div className="text-center">
          <span className="text-accent mb-4 block font-mono text-[10px] tracking-widest uppercase">
            ready to build
          </span>
          <h1 className="text-fg text-3xl font-medium tracking-tight md:text-5xl">
            welcome to steaksoap
          </h1>
          <p className="text-muted mt-4 text-base leading-relaxed md:text-lg">
            your project is cloned and running.
            <br />
            now let's make it yours.
          </p>
        </div>

        {/* ── Steps ────────────────────────────────────── */}
        <div className="mt-16 space-y-10">
          {/* Step 1 */}
          <section>
            <h2 className="text-fg mb-4 text-lg font-medium">
              <span className="text-accent mr-2 font-mono text-sm">01</span>
              open your terminal in this project
            </h2>
            <p className="text-muted text-sm leading-relaxed">
              in VS Code: press{' '}
              <kbd className="bg-surface border-border rounded-sm border px-1.5 py-0.5 font-mono text-xs">
                Ctrl+`
              </kbd>{' '}
              (or{' '}
              <kbd className="bg-surface border-border rounded-sm border px-1.5 py-0.5 font-mono text-xs">
                Cmd+`
              </kbd>{' '}
              on mac) to open the integrated terminal.
            </p>
          </section>

          {/* Step 2 */}
          <section>
            <h2 className="text-fg mb-4 text-lg font-medium">
              <span className="text-accent mr-2 font-mono text-sm">02</span>
              launch claude code
            </h2>
            <CopyBlock code="claude" />
          </section>

          {/* Step 3 */}
          <section>
            <h2 className="text-fg mb-4 text-lg font-medium">
              <span className="text-accent mr-2 font-mono text-sm">03</span>
              tell claude what you want to build
            </h2>
            <CopyBlock
              label="example prompt"
              code={`I want to build a portfolio site for a photographer. Clean, minimal, dark. Start with /init to set up the project identity.`}
            />
            <p className="text-muted mt-3 text-sm leading-relaxed">
              claude will ask you questions about your project — name, colors, fonts, vibe — then
              transform everything to match your vision. this page gets replaced by your real
              homepage.
            </p>
          </section>
        </div>

        {/* ── What's included ──────────────────────────── */}
        <div className="border-border mt-16 border-t pt-12">
          <h2 className="text-muted mb-6 font-mono text-[10px] tracking-widest uppercase">
            what's included
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: '25 slash commands', desc: 'for Claude Code' },
              { label: '12 contextual rules', desc: 'for consistent AI behavior' },
              { label: 'design system', desc: 'dark + light mode, tokens' },
              { label: 'component playground', desc: '/playground' },
              { label: 'original template', desc: '/steaksoap' },
              { label: '33 tests', desc: 'vitest + testing library' },
            ].map(item => (
              <div
                key={item.label}
                className="bg-surface/50 border-border rounded-lg border px-4 py-3"
              >
                <span className="text-fg text-sm font-medium">{item.label}</span>
                <span className="text-muted ml-2 text-xs">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Pro tips ─────────────────────────────────── */}
        <div className="border-border mt-12 border-t pt-12">
          <h2 className="text-muted mb-6 font-mono text-[10px] tracking-widest uppercase">
            pro tips
          </h2>
          <ul className="text-muted space-y-3 text-sm leading-relaxed">
            <li>
              <span className="text-accent mr-2">→</span>
              type <code className="text-fg font-mono text-xs">/help</code> in Claude Code to see
              all commands
            </li>
            <li>
              <span className="text-accent mr-2">→</span>
              visit{' '}
              <a href="/playground" className="text-fg underline underline-offset-2">
                /playground
              </a>{' '}
              to see all UI components
            </li>
            <li>
              <span className="text-accent mr-2">→</span>
              visit{' '}
              <a href="/steaksoap" className="text-fg underline underline-offset-2">
                /steaksoap
              </a>{' '}
              for the original template reference
            </li>
            <li>
              <span className="text-accent mr-2">→</span>
              run <code className="text-fg font-mono text-xs">pnpm validate</code> before every
              commit
            </li>
          </ul>
        </div>

        {/* ── Footer credit ────────────────────────────── */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/mitambuch/steaksoap"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent inline-flex items-center gap-1.5 font-mono text-xs transition-colors"
          >
            built with steaksoap <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </>
  );
}
