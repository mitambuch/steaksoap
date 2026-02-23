/* ═══════════════════════════════════════════════════════════════
   SetupWizard — full-screen guided setup for complete beginners.
   Walks through installing VS Code, Node.js, Git, pnpm, and
   cloning + launching steaksoap. Progress is saved in localStorage
   so users can close and come back. Each step has a copy button,
   a verify check, troubleshooting, and a Claude AI safety net.
   ═══════════════════════════════════════════════════════════════ */

import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import { cn } from '@utils/cn';
import { ArrowRight, BookOpen, ExternalLink, MessageCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { CommandCopy } from './CommandCopy';
import { type WizardStep, wizardSteps } from './steps';
import { Troubleshoot } from './Troubleshoot';
import { VerifyCheck } from './VerifyCheck';

interface SetupWizardProps {
  onClose: () => void;
}

/** Detect user platform for contextual Claude helper messages */
function getPlatform(): string {
  return navigator.platform.toLowerCase().includes('mac') ? 'Mac' : 'Windows';
}

export function SetupWizard({ onClose }: SetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem('steaksoap_wizard_step');
    return saved ? parseInt(saved, 10) : 0;
  });

  const { copy: copyHelper, copied: helperCopied } = useCopyToClipboard();

  // WHY: Persist progress so users can close the browser and come back
  useEffect(() => {
    localStorage.setItem('steaksoap_wizard_step', String(currentStep));
  }, [currentStep]);

  // WHY: Lock body scroll when wizard is open to prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const totalSteps = wizardSteps.length;
  const step = wizardSteps[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const isLastStep = currentStep === totalSteps - 1;

  // WHY: Array access can return undefined in strict mode — guard early
  if (!step) return null;

  function handleNext() {
    if (isLastStep) {
      localStorage.setItem('steaksoap_wizard_done', 'true');
      onClose();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  }

  function handlePrev() {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  }

  /** Build a contextual help message for Claude AI */
  function buildClaudeMessage(s: WizardStep): string {
    return [
      "I'm setting up a development environment for the first time.",
      `I'm on step ${s.number}: ${s.title}.`,
      `What I need to do: ${s.body}`,
      s.action.type === 'copy' ? `The command is: ${s.action.value}` : '',
      `I'm on ${getPlatform()} using VS Code.`,
      'Can you help me step by step?',
    ]
      .filter(Boolean)
      .join('\n');
  }

  return (
    <div className="bg-bg fixed inset-0 z-50 overflow-y-auto">
      {/* ── Progress bar (fixed top) ────────────────────────── */}
      <div className="bg-bg/80 fixed top-0 right-0 left-0 z-10 backdrop-blur-md">
        <div className="bg-border h-1 w-full">
          <div
            className="bg-accent h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-3">
          <span className="text-muted font-mono text-xs">
            Step {step.number} of {totalSteps}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-fg rounded-md p-1.5 transition-colors"
            aria-label="Close setup wizard"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Step content ────────────────────────────────────── */}
      <div className="mx-auto max-w-2xl px-6 pt-24 pb-32">
        {/* Step number (large, decorative) */}
        <span className="text-accent/20 font-mono text-6xl font-bold select-none">
          {String(step.number).padStart(2, '0')}
        </span>

        {/* Optional badge */}
        {step.optional && (
          <span className="bg-accent/10 text-accent ml-3 inline-block rounded-full px-3 py-0.5 align-top font-mono text-xs font-medium">
            Optional
          </span>
        )}

        {/* Title */}
        <h2 className="text-fg mt-2 text-2xl font-bold md:text-3xl">{step.title}</h2>
        <p className="text-accent mt-1 font-mono text-sm">{step.subtitle}</p>

        {/* Body */}
        <p className="text-muted mt-6 text-base leading-relaxed">{step.body}</p>

        {/* ── Action ──────────────────────────────────────── */}
        <div className="mt-8">
          {step.action.type === 'copy' ? (
            <CommandCopy command={step.action.value} label={step.action.label} />
          ) : (
            <a
              href={step.action.value}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent/90 inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-medium text-[#0a0a0a] transition-all duration-300 active:scale-[0.97]"
            >
              {step.action.label}
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
        </div>

        {/* After action note */}
        {step.afterAction && (
          <p className="text-muted mt-4 text-sm leading-relaxed">{step.afterAction}</p>
        )}

        {/* ── Verify ──────────────────────────────────────── */}
        {step.verify && (
          <div className="mt-6">
            <VerifyCheck command={step.verify.command} expected={step.verify.expected} />
          </div>
        )}

        {/* ── Troubleshoot ────────────────────────────────── */}
        {step.troubleshoot && (
          <div className="mt-6">
            <Troubleshoot
              question={step.troubleshoot.question}
              solutions={step.troubleshoot.solutions}
            />
          </div>
        )}

        {/* ── Final step: next steps block ────────────────── */}
        {isLastStep && (
          <div className="bg-surface/30 border-border mt-8 rounded-lg border p-6">
            <h3 className="text-fg mb-4 flex items-center gap-2 font-mono text-sm font-medium">
              <BookOpen size={16} className="text-accent" aria-hidden="true" />
              What to do next
            </h3>
            <ul className="space-y-3">
              {[
                'To start working: open VS Code \u2192 Terminal \u2192 pnpm dev',
                'To build features: open Claude Code \u2192 describe what you want',
                'Stuck? Copy any error and paste it to Claude at claude.ai',
                'Bookmark the README in your project for all commands',
              ].map(tip => (
                <li key={tip} className="text-muted flex gap-2 text-sm leading-relaxed">
                  <ArrowRight
                    size={14}
                    className="text-accent mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Celebration ─────────────────────────────────── */}
        {step.celebration && (
          <p className="text-accent mt-6 font-mono text-sm font-medium">{step.celebration}</p>
        )}

        {/* ── Claude helper (safety net) ──────────────────── */}
        {!isLastStep && (
          <div className="border-border mt-10 border-t pt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-muted text-sm">Completely stuck?</span>
              <button
                type="button"
                onClick={() => void copyHelper(buildClaudeMessage(step))}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs transition-all duration-200',
                  helperCopied
                    ? 'bg-success/15 text-success'
                    : 'bg-surface/50 text-muted hover:text-accent hover:bg-surface/80',
                )}
              >
                <MessageCircle size={14} aria-hidden="true" />
                {helperCopied ? 'Copied! Paste it at claude.ai' : 'Copy this message to Claude'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Navigation (fixed bottom) ───────────────────────── */}
      <div className="bg-bg/80 fixed right-0 bottom-0 left-0 z-10 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="text-muted hover:text-fg rounded-full px-4 py-2 font-mono text-sm transition-colors disabled:invisible"
          >
            &larr; Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="bg-accent hover:bg-accent/90 inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-medium text-[#0a0a0a] transition-all duration-300 active:scale-[0.97]"
          >
            {isLastStep ? "Done — let's go!" : 'Done, next step'}
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
