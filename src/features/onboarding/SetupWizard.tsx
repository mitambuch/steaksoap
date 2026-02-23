/* ═══════════════════════════════════════════════════════════════
   SetupWizard — fixed-size carousel modal for guided dev setup.
   The box NEVER moves or resizes. Content slides in/out.
   Each slide fits in one glance — no scroll, no overwhelm.
   Progress is saved in versioned localStorage.
   ═══════════════════════════════════════════════════════════════ */

import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import { cn } from '@utils/cn';
import { ArrowRight, ExternalLink, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { CommandCopy } from './CommandCopy';
import { type WizardSlide, wizardSlides } from './steps';

interface SetupWizardProps {
  onClose: () => void;
}

// WHY: Version the persistence so slide changes in updates don't crash
const WIZARD_VERSION = 2;

/** Detect platform for Claude helper messages */
function getPlatform(): string {
  return navigator.platform.toLowerCase().includes('mac') ? 'Mac' : 'Windows';
}

/** Unique group names in slide order — used for dot indicators */
const groups = [...new Set(wizardSlides.map(s => s.group))];

/** Count of required (non-optional) groups minus welcome/done */
const REQUIRED_STEPS = groups.filter(
  g => g !== 'welcome' && g !== 'done' && !wizardSlides.find(s => s.group === g && s.optional),
).length;

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

  // WHY: Escape should close, but mid-setup ask confirmation to avoid accidental loss
  const handleClose = useCallback(() => {
    const slide = wizardSlides[currentStep];
    if (!slide) {
      onClose();
      return;
    }
    if (slide.type === 'welcome' || slide.type === 'done') {
      onClose();
      return;
    }
    if (
      window.confirm('Quit the setup? Your progress is saved \u2014 you can come back anytime.')
    ) {
      onClose();
    }
  }, [currentStep, onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleClose]);

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
  }, [currentStep]);

  const slide = wizardSlides[currentStep];
  const isLastStep = currentStep === wizardSlides.length - 1;
  const currentGroup = slide?.group ?? '';
  const currentGroupIndex = groups.indexOf(currentGroup);

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

  /** Jump straight to the done slide */
  function skipToEnd() {
    setCurrentStep(wizardSlides.length - 1);
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

  /** Dynamic button label based on slide type */
  function getNextLabel(): string {
    if (currentStep === 0) return "Let's do this";
    if (isLastStep) return 'Done!';
    // WHY: slide is narrowed by the early return above, but TS can't see into closures
    if (slide?.type === 'explain') return 'Got it';
    return 'Done, next';
  }

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
        className="bg-bg border-border relative z-10 flex h-[520px] max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border shadow-2xl"
      >
        {/* ── Header — step counter + dots + close ──────────── */}
        {slide.type !== 'welcome' && slide.type !== 'done' ? (
          <div className="shrink-0 px-6 pt-4 pb-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-muted font-mono text-[11px]">
                {slide.optional ? 'Optional' : `Step ${currentGroupIndex + 1} of ${groups.length}`}
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

            {/* Dots — one per group */}
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
            onClick={slide.type === 'welcome' ? onClose : handleClose}
            className="text-muted hover:text-fg absolute top-4 right-4 z-10 p-1 transition-colors"
            aria-label="Close"
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}

        {/* ── Content area — flex-1, safety scroll ──────────── */}
        <div key={currentStep} className="wizard-slide-in flex-1 overflow-y-auto px-6 py-6">
          {/* ── WELCOME layout ────────────────────────────────── */}
          {slide.type === 'welcome' && (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <span className="text-5xl" aria-hidden="true">
                {'\u{1F44B}'}
              </span>
              <h2 id="wizard-title" className="text-fg mt-4 text-2xl font-bold">
                Welcome to steaksoap
              </h2>
              <p className="text-muted mt-3 max-w-xs text-sm leading-relaxed">
                Let&apos;s set up your dev environment together. It takes about 15 minutes and zero
                coding knowledge.
              </p>

              <div className="mt-8 flex items-center gap-5">
                <div className="text-center">
                  <span className="text-accent font-mono text-xl font-bold">~15</span>
                  <span className="text-muted mt-0.5 block text-[11px]">min</span>
                </div>
                <div className="bg-border h-6 w-px" />
                <div className="text-center">
                  <span className="text-accent font-mono text-xl font-bold">{REQUIRED_STEPS}</span>
                  <span className="text-muted mt-0.5 block text-[11px]">steps</span>
                </div>
                <div className="bg-border h-6 w-px" />
                <div className="text-center">
                  <span className="text-accent font-mono text-xl font-bold">0</span>
                  <span className="text-muted mt-0.5 block text-[11px]">experience needed</span>
                </div>
              </div>

              <p className="text-muted/70 mt-6 max-w-[280px] text-xs">
                If you get stuck, you can copy a help message and paste it to Claude AI.
              </p>
            </div>
          )}

          {/* ── DONE layout ───────────────────────────────────── */}
          {slide.type === 'done' && (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <span className="text-5xl" aria-hidden="true">
                {'\u{1F389}'}
              </span>
              <h2 id="wizard-title" className="text-fg mt-4 text-2xl font-bold">
                You did it!
              </h2>
              <p className="text-muted mt-3 max-w-xs text-sm leading-relaxed">
                Your dev environment is ready. Here&apos;s what to remember:
              </p>
              <div className="mt-6 w-full max-w-xs space-y-2 text-left">
                <p className="text-sm">
                  <span className="text-accent font-mono">pnpm dev</span>{' '}
                  <span className="text-muted">{'\u2192'} start your project</span>
                </p>
                <p className="text-sm">
                  <span className="text-accent font-mono">claude</span>{' '}
                  <span className="text-muted">{'\u2192'} talk to your AI assistant</span>
                </p>
                <p className="text-sm">
                  <span className="text-accent font-mono">/spec</span>{' '}
                  <span className="text-muted">{'\u2192'} plan your first feature</span>
                </p>
              </div>
              <p className="text-muted/60 mt-6 text-xs">
                Stuck? Paste any error to Claude at claude.ai
              </p>
            </div>
          )}

          {/* ── EXPLAIN layout ────────────────────────────────── */}
          {slide.type === 'explain' && (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              {slide.emoji && (
                <span className="text-5xl" aria-hidden="true">
                  {slide.emoji}
                </span>
              )}
              <h2 id="wizard-title" className="text-fg mt-4 text-xl font-bold">
                {slide.title}
              </h2>
              <p className="text-muted mt-3 max-w-sm text-sm leading-relaxed">{slide.body}</p>
            </div>
          )}

          {/* ── ACTION layout ─────────────────────────────────── */}
          {slide.type === 'action' && (
            <div className="flex flex-1 flex-col">
              <h2 id="wizard-title" className="text-fg text-xl font-bold">
                {slide.title}
              </h2>
              <p className="text-muted mt-2 text-sm leading-relaxed">{slide.body}</p>

              <div className="mt-6">
                {slide.actionType === 'copy' && slide.actionValue ? (
                  <CommandCopy command={slide.actionValue} label={slide.actionLabel} />
                ) : slide.actionType === 'link' && slide.actionValue ? (
                  <a
                    href={slide.actionValue}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent text-bg inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-mono text-sm font-medium transition-all duration-300 hover:brightness-90 active:scale-[0.97]"
                  >
                    {slide.actionLabel}
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                ) : null}
              </div>

              {slide.hint && (
                <p className="text-muted mt-3 text-xs leading-relaxed">{slide.hint}</p>
              )}

              {slide.celebration && (
                <p className="text-accent mt-auto pt-4 font-mono text-xs font-medium">
                  {slide.celebration}
                </p>
              )}
            </div>
          )}

          {/* ── VERIFY layout ─────────────────────────────────── */}
          {slide.type === 'verify' && (
            <div className="flex flex-1 flex-col">
              <h2 id="wizard-title" className="text-fg text-xl font-bold">
                {slide.title}
              </h2>
              <p className="text-muted mt-2 text-sm leading-relaxed">{slide.body}</p>

              {slide.command && (
                <div className="mt-4">
                  <CommandCopy command={slide.command} label="Paste in terminal" />
                </div>
              )}

              {slide.expected && (
                <div className="bg-success/10 border-success/20 mt-4 rounded-lg border p-3">
                  <p className="text-success text-xs font-medium">
                    {'\u2713'} {slide.expected}
                  </p>
                </div>
              )}

              {slide.failHint && (
                <p className="text-muted mt-3 text-xs leading-relaxed">
                  <span className="text-fg font-medium">Didn&apos;t work?</span> {slide.failHint}
                </p>
              )}

              {slide.celebration && (
                <p className="text-accent mt-auto pt-4 font-mono text-xs font-medium">
                  {slide.celebration}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── Footer — navigation + Claude helper ───────────── */}
        <div className="border-border shrink-0 border-t px-6 py-3">
          {/* Claude helper — compact, in the footer */}
          {slide.type !== 'welcome' && slide.type !== 'done' && (
            <div className="mb-3 flex items-center justify-center">
              <button
                type="button"
                onClick={() => void copyHelper(buildClaudeMessage(slide))}
                className={cn(
                  'font-mono text-[11px] transition-colors',
                  helperCopied ? 'text-success' : 'text-muted/60 hover:text-muted',
                )}
              >
                {helperCopied
                  ? '\u2713 Copied \u2014 paste it at claude.ai'
                  : 'Stuck? Copy help message for Claude'}
              </button>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex items-center justify-between">
            {/* Left button — Back or Skip */}
            {slide.optional ? (
              <button
                type="button"
                onClick={skipToEnd}
                className="text-muted hover:text-fg font-mono text-xs transition-colors"
              >
                Skip all extras {'\u2192'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="text-muted hover:text-fg font-mono text-xs transition-colors disabled:invisible"
              >
                {'\u2190'} Back
              </button>
            )}

            {/* Right button — contextual label */}
            <button
              type="button"
              onClick={handleNext}
              className="bg-accent text-bg inline-flex items-center gap-2 rounded-full px-5 py-2 font-mono text-xs font-medium transition-all duration-300 hover:brightness-90 active:scale-[0.97]"
            >
              {getNextLabel()}
              <ArrowRight size={12} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
