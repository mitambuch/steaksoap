/* ═══════════════════════════════════════════════════════════════
   SetupWizard — fixed-size carousel modal for guided dev setup.
   The box NEVER moves or resizes. Content slides in/out.
   Everything is centered. The tone is warm and encouraging.
   Progress is saved in versioned localStorage.
   ═══════════════════════════════════════════════════════════════ */

import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import { cn } from '@utils/cn';
import { ExternalLink, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { CommandCopy } from './CommandCopy';
import {
  getPlatformShortcut,
  PLATFORM_SHORTCUT_PLACEHOLDER,
  type WizardSlide,
  wizardSlides,
} from './steps';

interface SetupWizardProps {
  onClose: () => void;
}

// WHY: Version the persistence so slide changes in updates don't crash.
// Bump this when the slide count or order changes.
const WIZARD_VERSION = 5;

/** Detect platform for Claude helper messages */
function getPlatform(): string {
  return navigator.platform.toLowerCase().includes('mac') ? 'Mac' : 'Windows';
}

export function SetupWizard({ onClose }: SetupWizardProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { copy: copyHelper, copied: helperCopied } = useCopyToClipboard();

  // WHY: Versioned persistence — reset if slides change between updates
  const [currentStep, setCurrentStep] = useState(() => {
    try {
      const raw = localStorage.getItem('steaksoap_wizard');
      if (!raw) return 0;
      const data = JSON.parse(raw) as { version?: number; step?: number };
      if (data.version !== WIZARD_VERSION) return 0;
      if (typeof data.step !== 'number' || data.step < 0 || data.step >= wizardSlides.length)
        return 0;
      return data.step;
    } catch {
      return 0;
    }
  });

  // WHY: Styled quit confirmation replaces window.confirm — stays in the box
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      'steaksoap_wizard',
      JSON.stringify({ version: WIZARD_VERSION, step: currentStep }),
    );
  }, [currentStep]);

  // WHY: Restore focus to the element that opened the wizard on close
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    return () => {
      prev?.focus();
    };
  }, []);

  /** Unique group names excluding welcome/done — used for dot indicators */
  const groups = useMemo(() => {
    const seen = new Set<string>();
    return wizardSlides
      .filter(s => s.group && s.type !== 'welcome' && s.type !== 'done')
      .reduce<string[]>((acc, s) => {
        if (s.group && !seen.has(s.group)) {
          seen.add(s.group);
          acc.push(s.group);
        }
        return acc;
      }, []);
  }, []);

  const slide = wizardSlides[currentStep];
  const isLastStep = currentStep === wizardSlides.length - 1;
  const currentGroup = slide?.group ?? '';
  const currentGroupIndex = currentGroup ? groups.indexOf(currentGroup) : -1;

  // WHY: Escape + backdrop + X all route through handleClose for consistent UX
  const handleClose = useCallback(() => {
    const s = wizardSlides[currentStep];
    if (!s) {
      onClose();
      return;
    }
    if (s.type === 'welcome' || s.type === 'done') {
      onClose();
      return;
    }
    setShowQuitConfirm(true);
  }, [currentStep, onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showQuitConfirm) {
          setShowQuitConfirm(false);
        } else {
          handleClose();
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleClose, showQuitConfirm]);

  // WHY: Focus trap — Tab must not escape the modal (a11y)
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusables = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    modal.addEventListener('keydown', trap);
    return () => modal.removeEventListener('keydown', trap);
  }, [currentStep, showQuitConfirm]);

  // WHY: Array access can return undefined in strict TS
  if (!slide) return null;

  function handleNext() {
    if (isLastStep) {
      localStorage.setItem(
        'steaksoap_wizard',
        JSON.stringify({ version: WIZARD_VERSION, step: currentStep, done: true }),
      );
      onClose();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  }

  function handlePrev() {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  }

  /** Jump to a slide by its id */
  function goToSlide(id: string) {
    const idx = wizardSlides.findIndex(s => s.id === id);
    if (idx >= 0) setCurrentStep(idx);
  }

  /** Reset wizard to the beginning */
  function handleRestart() {
    localStorage.removeItem('steaksoap_wizard');
    setCurrentStep(0);
  }

  /** Close and mark as done */
  function handleFinish() {
    localStorage.setItem(
      'steaksoap_wizard',
      JSON.stringify({ version: WIZARD_VERSION, step: currentStep, done: true }),
    );
    onClose();
  }

  /** Build a contextual help message for Claude AI */
  function buildClaudeMessage(s: WizardSlide): string {
    return [
      "I'm setting up a development environment for the first time.",
      `I'm on: ${s.title}.`,
      `What I need to do: ${s.body}`,
      s.actionType === 'copy' && s.actionValue ? `The command is: ${s.actionValue}` : '',
      s.command ? `The verify command is: ${s.command}` : '',
      `I'm on ${getPlatform()} using VS Code.`,
      'Can you help me step by step?',
    ]
      .filter(Boolean)
      .join('\n');
  }

  /** Resolve platform-aware values at render time */
  function resolveSlide(s: WizardSlide): WizardSlide {
    if (s.actionValue === PLATFORM_SHORTCUT_PLACEHOLDER) {
      return { ...s, actionValue: getPlatformShortcut() };
    }
    return s;
  }

  // WHY: Resolve platform shortcut placeholder at render, not in data
  const resolved = resolveSlide(slide);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={handleClose}
        role="presentation"
      />

      {/* Modal — FIXED SIZE */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wizard-title"
        className={cn(
          'bg-bg border-border relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border shadow-2xl transition-all duration-300',
          // WHY: Quit confirm is compact — let content dictate height instead of fixed 620px
          showQuitConfirm ? 'h-auto' : 'h-155',
        )}
      >
        {/* ── QUIT CONFIRMATION — replaces content when active ── */}
        {showQuitConfirm ? (
          <div className="flex flex-col items-center justify-center px-8 py-12 text-center">
            <span className="text-4xl" aria-hidden="true">
              {'\u23F8\uFE0F'}
            </span>
            <h2 className="text-fg mt-4 text-xl font-bold">Taking a break?</h2>
            <p className="text-muted mt-3 max-w-xs text-sm leading-relaxed">
              No worries! Your progress is saved. You&apos;ll pick up right where you left off.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowQuitConfirm(false)}
                className="bg-accent text-bg rounded-full px-6 py-2.5 font-mono text-xs font-medium transition-all hover:brightness-90"
              >
                Continue setup
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-muted border-border hover:border-accent/30 hover:text-fg rounded-full border px-6 py-2.5 font-mono text-xs transition-colors"
              >
                Resume later
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ── Header — step counter + dots + close ──────────── */}
            {resolved.type !== 'welcome' && resolved.type !== 'done' ? (
              <div className="shrink-0 px-6 pt-4 pb-3">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-muted font-mono text-[11px]">
                    {resolved.optional
                      ? 'Optional'
                      : `Step ${currentGroupIndex + 1} of ${groups.length}`}
                  </span>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-muted hover:text-fg p-1 transition-colors"
                    aria-label="Close"
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                </div>

                {/* Dots — one per group, excluding welcome/done */}
                <div className="flex items-center justify-center gap-1.5">
                  {groups.map((group, i) => (
                    <div
                      key={group}
                      className={cn(
                        'h-1.5 rounded-full transition-all duration-300',
                        i < currentGroupIndex
                          ? 'bg-accent w-1.5'
                          : i === currentGroupIndex
                            ? 'bg-accent w-5'
                            : 'bg-border w-1.5',
                      )}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* Close button on welcome/done (no header) */
              <button
                type="button"
                onClick={resolved.type === 'welcome' ? onClose : handleClose}
                className="text-muted hover:text-fg absolute top-4 right-4 z-10 p-1 transition-colors"
                aria-label="Close"
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}

            {/* ── Content area — flex-1, safety scroll, centered ── */}
            <div
              key={currentStep}
              className="wizard-slide-in flex flex-1 flex-col items-center justify-center overflow-y-auto px-6"
            >
              {/* ── WELCOME layout ──────────────────────────────── */}
              {resolved.type === 'welcome' && (
                <div className="flex w-full max-w-md flex-col items-center px-2 text-center">
                  <span className="text-5xl" aria-hidden="true">
                    {'\u{1F44B}'}
                  </span>
                  <h2 id="wizard-title" className="text-fg mt-5 text-2xl font-bold">
                    Welcome to steaksoap
                  </h2>
                  <p className="text-muted mt-3 max-w-[300px] text-sm leading-relaxed">
                    We&apos;re going to set up your workspace together. It&apos;s mostly downloading
                    a few apps and pasting some commands. Easy stuff.
                  </p>

                  <div className="mt-8 flex items-center gap-5">
                    <div className="text-center">
                      <span className="text-accent font-mono text-xl font-bold">~15</span>
                      <span className="text-muted mt-0.5 block text-[11px]">min</span>
                    </div>
                    <div className="bg-border h-6 w-px" />
                    <div className="text-center">
                      <span className="text-accent font-mono text-xl font-bold">9</span>
                      <span className="text-muted mt-0.5 block text-[11px]">steps</span>
                    </div>
                    <div className="bg-border h-6 w-px" />
                    <div className="text-center">
                      <span className="text-accent font-mono text-xl font-bold">0</span>
                      <span className="text-muted mt-0.5 block text-[11px]">experience needed</span>
                    </div>
                  </div>

                  <div className="bg-accent/10 border-accent/20 mt-8 max-w-[320px] rounded-xl border px-4 py-3">
                    <p className="text-accent text-xs leading-relaxed">
                      {'\u{1F4A1}'} Pro tip: if something goes wrong at any step, there&apos;s a
                      &quot;Copy help message&quot; button. Paste it to an AI like Claude and
                      it&apos;ll guide you through it.
                    </p>
                  </div>
                </div>
              )}

              {/* ── DONE layout ─────────────────────────────────── */}
              {resolved.type === 'done' && (
                <div className="flex w-full max-w-md flex-col items-center px-2 text-center">
                  <span className="text-5xl" aria-hidden="true">
                    {'\u{1F389}'}
                  </span>
                  <h2 id="wizard-title" className="text-fg mt-4 text-2xl font-bold">
                    Congratulations!
                  </h2>
                  <p className="text-muted mt-3 max-w-[300px] text-sm leading-relaxed">
                    You just set up a professional development environment. Seriously &mdash;
                    that&apos;s not nothing. Be proud.
                  </p>

                  {/* Cheat sheet */}
                  <div className="mt-6 w-full max-w-[280px] space-y-2">
                    <p className="text-xs">
                      <span className="text-accent font-mono">pnpm dev</span>
                      <span className="text-muted"> {'\u2192'} start your project anytime</span>
                    </p>
                    <p className="text-xs">
                      <span className="text-accent font-mono">claude</span>
                      <span className="text-muted"> {'\u2192'} talk to your AI assistant</span>
                    </p>
                    <p className="text-xs">
                      <span className="text-accent font-mono">/spec</span>
                      <span className="text-muted"> {'\u2192'} tell Claude what to build</span>
                    </p>
                  </div>

                  {/* AI coaching tip */}
                  <div className="bg-accent/10 border-accent/20 mt-6 max-w-[300px] rounded-xl border px-4 py-3">
                    <p className="text-accent text-xs leading-relaxed">
                      {'\u{1F4A1}'} Our advice: always have an AI open while you work. Paste any
                      error, ask any question. It&apos;s like having a mentor available 24/7.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 mb-2 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleFinish}
                      className="bg-accent text-bg rounded-full px-6 py-2.5 font-mono text-xs font-medium transition-all hover:brightness-90"
                    >
                      Start building {'\u2192'}
                    </button>
                    <button
                      type="button"
                      onClick={handleRestart}
                      className="text-muted border-border hover:border-accent/30 hover:text-fg rounded-full border px-4 py-2.5 font-mono text-xs transition-colors"
                    >
                      Restart tutorial
                    </button>
                  </div>
                </div>
              )}

              {/* ── INTRO layout — centered, emoji, context ────── */}
              {resolved.type === 'intro' && (
                <div className="flex w-full max-w-md flex-col items-center px-2 text-center">
                  {resolved.emoji && (
                    <span className="text-4xl" aria-hidden="true">
                      {resolved.emoji}
                    </span>
                  )}
                  <h2 id="wizard-title" className="text-fg mt-4 text-lg font-bold">
                    {resolved.title}
                  </h2>
                  <p className="text-muted mt-3 max-w-[320px] text-sm leading-relaxed whitespace-pre-line">
                    {resolved.body}
                  </p>
                </div>
              )}

              {/* ── ACTION layout — centered, prominent button ──── */}
              {resolved.type === 'action' && (
                <div className="flex w-full max-w-md flex-col items-center px-2 text-center">
                  {resolved.emoji && (
                    <span className="text-3xl" aria-hidden="true">
                      {resolved.emoji}
                    </span>
                  )}
                  <h2 id="wizard-title" className="text-fg mt-3 text-lg font-bold">
                    {resolved.title}
                  </h2>
                  <p className="text-muted mt-2 max-w-[320px] text-sm leading-relaxed whitespace-pre-line">
                    {resolved.body}
                  </p>

                  <div className="mt-5 w-full max-w-[320px]">
                    {resolved.actionType === 'copy' && resolved.actionValue ? (
                      <CommandCopy command={resolved.actionValue} label={resolved.actionLabel} />
                    ) : resolved.actionType === 'link' && resolved.actionValue ? (
                      <a
                        href={resolved.actionValue}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-accent text-bg inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-mono text-sm transition-all hover:shadow-[0_0_20px_rgba(255,107,107,0.3)] hover:brightness-90"
                      >
                        {resolved.actionLabel} <ExternalLink size={14} aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>

                  {resolved.hint && (
                    <p className="text-muted/70 mt-3 max-w-[300px] text-xs leading-relaxed">
                      {resolved.hint}
                    </p>
                  )}

                  {resolved.celebration && (
                    <p className="text-accent mt-4 font-mono text-xs">{resolved.celebration}</p>
                  )}
                </div>
              )}

              {/* ── VERIFY layout — centered, green success box ── */}
              {resolved.type === 'verify' && (
                <div className="flex w-full max-w-md flex-col items-center px-2 text-center">
                  {resolved.emoji && (
                    <span className="text-3xl" aria-hidden="true">
                      {resolved.emoji}
                    </span>
                  )}
                  <h2 id="wizard-title" className="text-fg mt-3 text-lg font-bold">
                    {resolved.title}
                  </h2>
                  <p className="text-muted mt-2 text-sm">{resolved.body}</p>

                  {resolved.command && (
                    <div className="mt-4 w-full max-w-[320px]">
                      <CommandCopy command={resolved.command} label="Paste in terminal" />
                    </div>
                  )}

                  {resolved.expected && (
                    <div className="bg-success/10 border-success/20 mt-4 max-w-[320px] rounded-xl border px-4 py-2.5">
                      <p className="text-success text-xs">
                        {'\u2713'} {resolved.expected}
                      </p>
                    </div>
                  )}

                  {resolved.failHint && (
                    <p className="text-muted/60 mt-3 max-w-[300px] text-xs">
                      <span className="text-muted">Didn&apos;t work?</span> {resolved.failHint}
                    </p>
                  )}

                  {resolved.celebration && (
                    <p className="text-accent mt-4 font-mono text-xs">{resolved.celebration}</p>
                  )}
                </div>
              )}
            </div>

            {/* ── Footer — navigation + Claude helper ──────────── */}
            {resolved.type !== 'welcome' && resolved.type !== 'done' && (
              <div className="border-border shrink-0 border-t px-6 pt-4 pb-5">
                {/* Claude helper — one discreet line */}
                <div className="mb-3 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => void copyHelper(buildClaudeMessage(resolved))}
                    className={cn(
                      'font-mono text-[11px] transition-colors',
                      helperCopied ? 'text-success' : 'text-muted/50 hover:text-muted',
                    )}
                  >
                    {helperCopied
                      ? '\u2713 Copied \u2014 paste it to an AI'
                      : 'Stuck? Copy help message'}
                  </button>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  {/* Back — ALWAYS present (disabled on step 1) */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentStep <= 1}
                    className="text-muted hover:text-fg font-mono text-xs transition-colors disabled:invisible"
                  >
                    {'\u2190'} Back
                  </button>

                  <div className="flex items-center gap-2">
                    {/* Skip extras — secondary button on optional slides */}
                    {resolved.optional && (
                      <button
                        type="button"
                        onClick={() => goToSlide('done')}
                        className="text-muted/60 hover:text-muted font-mono text-[11px] transition-colors"
                      >
                        Skip extras
                      </button>
                    )}

                    {/* Next — contextual label */}
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-accent text-bg rounded-full px-5 py-2 font-mono text-xs font-medium transition-all hover:brightness-90"
                    >
                      {resolved.type === 'intro' ? 'Got it \u2192' : 'Done, next \u2192'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Welcome footer — just the CTA */}
            {resolved.type === 'welcome' && (
              <div className="flex shrink-0 justify-center px-6 pb-8">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-accent text-bg rounded-full px-8 py-3 font-mono text-sm font-medium transition-all hover:brightness-90"
                >
                  Let&apos;s do this {'\u2192'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
