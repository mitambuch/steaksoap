import { SeoHead } from '@components/features/SeoHead';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/Accordion';
import { Avatar } from '@components/ui/Avatar';
import { AvatarGroup } from '@components/ui/AvatarGroup';
import { Badge } from '@components/ui/Badge';
import { Banner } from '@components/ui/Banner';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { Divider } from '@components/ui/Divider';
import { EmptyState } from '@components/ui/EmptyState';
import { Input } from '@components/ui/Input';
import { Kbd } from '@components/ui/Kbd';
import { Modal } from '@components/ui/Modal';
import { ProgressBar } from '@components/ui/ProgressBar';
import { Select } from '@components/ui/Select';
import { Skeleton } from '@components/ui/Skeleton';
import { Spinner } from '@components/ui/Spinner';
import { Stat } from '@components/ui/Stat';
import { Switch } from '@components/ui/Switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs';
import { Textarea } from '@components/ui/Textarea';
import { Timeline } from '@components/ui/Timeline';
import { Tooltip } from '@components/ui/Tooltip';
import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import { useToast } from '@hooks/useToast';
import { cn } from '@utils/cn';
import {
  ArrowRight,
  Check,
  Copy,
  FileX,
  Heart,
  Inbox,
  Moon,
  Plus,
  Search,
  SearchX,
  Star,
  Sun,
  Zap,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';

/* ─── Copyable chip — click to copy, used everywhere ──────── */

function Copyable({ text, className }: { text: string; className?: string }) {
  const { copy, copied } = useCopyToClipboard();

  return (
    <button
      onClick={() => void copy(text)}
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[10px] transition-all duration-300 ${
        copied
          ? 'bg-success/15 text-success'
          : 'bg-surface/50 text-muted hover:bg-surface hover:text-accent'
      } ${className ?? ''}`}
    >
      {copied ? 'copied' : text}
      {copied ? (
        <Check size={10} strokeWidth={2} aria-hidden="true" />
      ) : (
        <Copy size={10} strokeWidth={1.5} aria-hidden="true" />
      )}
    </button>
  );
}

/* ─── DevKit Section ────────────────────────────────────────── */

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-border/50 border-t pt-12">
      <div className="mb-8 flex items-baseline gap-3">
        <span className="text-accent font-mono text-[10px] tracking-[0.2em] uppercase">
          {number}
        </span>
        <span className="text-muted/60 font-mono text-[10px] tracking-[0.2em] uppercase">
          // {title}
        </span>
      </div>
      {children}
    </section>
  );
}

/* ─── Sub-label ─────────────────────────────────────────────── */

function SubLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-muted mb-4 block font-mono text-[10px] tracking-[0.2em] uppercase">
      {children}
    </span>
  );
}

/* ─── Color Swatch ──────────────────────────────────────────── */

function Swatch({
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
    <div className="border-border/50 hover:border-accent/20 flex items-center gap-4 rounded-lg border p-3 transition-all duration-300">
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

/* ─── Icon Showcase Item ──────────────────────────────────────── */

function IconItem({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="border-border/50 hover:border-accent/20 flex items-center gap-3 rounded-lg border px-3 py-2 transition-all duration-300">
      <div className="text-fg">{children}</div>
      <Copyable text={name} />
    </div>
  );
}

/* ─── Switch Demo (stateful) ────────────────────────────────── */

function SwitchDemo() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  return (
    <div className="space-y-3">
      <Switch label="Enable notifications" checked={notifications} onChange={setNotifications} />
      <Switch label="Dark mode" checked={darkMode} onChange={setDarkMode} />
      <Switch label="Send analytics" checked={analytics} onChange={setAnalytics} />
      <Switch label="Disabled option" checked={false} disabled />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */

export default function Playground() {
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  return (
    <>
      <SeoHead
        title="playground"
        description="design system devkit — all components, tokens, and typography."
      />
      <div className="bg-bg text-fg min-h-screen px-6 py-12 md:px-8">
        <div className="mx-auto max-w-5xl space-y-16">
          {/* Header */}
          <div>
            <span className="text-accent font-mono text-[10px] tracking-[0.2em] uppercase">
              steaksoap
            </span>
            <h1 className="text-fg mt-3 text-4xl font-medium tracking-tight md:text-6xl">devkit</h1>
            <p className="text-muted mt-4 max-w-lg text-base leading-relaxed">
              every token, every component, every pattern. click any chip to copy. scroll down for
              ready-to-use modules.
            </p>
            <div className="bg-accent mt-6 h-px w-12" />
          </div>

          {/* 01 — Typography */}
          <Section number="01" title="typography">
            <div className="space-y-6">
              <div className="border-border/50 hover:border-accent/20 space-y-2 rounded-lg border p-4 transition-all duration-300">
                <p className="text-fg text-5xl font-bold md:text-7xl">headlines</p>
                <Copyable text="text-5xl font-bold md:text-7xl" />
              </div>
              <div className="border-border/50 hover:border-accent/20 space-y-2 rounded-lg border p-4 transition-all duration-300">
                <p className="text-fg text-4xl font-medium md:text-6xl">page titles</p>
                <Copyable text="text-4xl font-medium md:text-6xl" />
              </div>
              <div className="border-border/50 hover:border-accent/20 space-y-2 rounded-lg border p-4 transition-all duration-300">
                <p className="text-fg text-2xl font-medium md:text-4xl">section titles</p>
                <Copyable text="text-2xl font-medium md:text-4xl" />
              </div>
              <div className="border-border/50 hover:border-accent/20 space-y-2 rounded-lg border p-4 transition-all duration-300">
                <p className="text-fg text-base leading-relaxed md:text-xl">
                  the quick brown fox jumps over the lazy dog. space grotesk renders beautifully at
                  all sizes.
                </p>
                <Copyable text="text-base leading-relaxed md:text-xl" />
              </div>
              <div className="border-border/50 hover:border-accent/20 space-y-2 rounded-lg border p-4 transition-all duration-300">
                <p className="text-fg text-xs font-bold tracking-widest uppercase">
                  buttons and ctas
                </p>
                <Copyable text="text-xs font-bold tracking-widest uppercase" />
              </div>
              <div className="border-border/50 hover:border-accent/20 space-y-2 rounded-lg border p-4 transition-all duration-300">
                <p className="text-muted font-mono text-[10px] tracking-[0.2em] uppercase">
                  metadata and ui labels
                </p>
                <Copyable text="font-mono text-[10px] tracking-[0.2em] uppercase" />
              </div>
            </div>
          </Section>

          {/* 02 — Colors */}
          <Section number="02" title="colors">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Swatch name="accent" token="accent" dark="#FF6B6B" light="#FF6B6B" />
              <Swatch name="background" token="bg" dark="#0A0A0A" light="#B0B0A8" />
              <Swatch name="foreground" token="fg" dark="#F0F0F0" light="#1A1A1A" />
              <Swatch name="muted" token="muted" dark="#8A8A8A" light="#4A4A44" />
              <Swatch name="surface" token="surface" dark="#141414" light="#A4A49C" />
              <Swatch name="border" token="border" dark="#262626" light="#96968E" />
              <Swatch name="success" token="success" dark="#6AFF8A" light="#00C853" />
              <Swatch name="warning" token="warning" dark="#FFD60A" light="#E6A800" />
              <Swatch name="danger" token="danger" dark="#DC2626" light="#B91C1C" />
              <Swatch name="info" token="info" dark="#52B0FF" light="#1E88E5" />
            </div>
          </Section>

          {/* 03 — Buttons */}
          <Section number="03" title="buttons">
            <div className="space-y-8">
              {/* Variants */}
              <div>
                <SubLabel>variants</SubLabel>
                <div className="space-y-3">
                  {(
                    [
                      ['primary', 'bg-accent, glow hover'],
                      ['secondary', 'glass border, accent hover'],
                      ['ghost', 'transparent, text-only'],
                      ['danger', 'glass red, destructive'],
                    ] as const
                  ).map(([variant, desc]) => (
                    <div
                      key={variant}
                      className="border-border/50 hover:border-accent/20 flex flex-wrap items-center gap-4 rounded-lg border p-4 transition-all duration-300"
                    >
                      <Button variant={variant}>{variant}</Button>
                      <Copyable text={`variant="${variant}"`} />
                      <span className="text-muted text-xs">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <SubLabel>sizes</SubLabel>
                <div className="space-y-3">
                  {(
                    [
                      ['sm', 'px-3 py-1.5 text-sm'],
                      ['md', 'px-4 py-2 text-base'],
                      ['lg', 'px-6 py-3 text-lg'],
                    ] as const
                  ).map(([size, classes]) => (
                    <div
                      key={size}
                      className="border-border/50 hover:border-accent/20 flex flex-wrap items-center gap-4 rounded-lg border p-4 transition-all duration-300"
                    >
                      <Button size={size}>{size}</Button>
                      <Copyable text={`size="${size}"`} />
                      <Copyable text={classes} />
                    </div>
                  ))}
                  <div className="border-border/50 hover:border-accent/20 flex flex-wrap items-center gap-4 rounded-lg border p-4 transition-all duration-300">
                    <Button size="icon" aria-label="icon button">
                      <Plus size={20} strokeWidth={1.5} aria-hidden="true" />
                    </Button>
                    <Copyable text='size="icon"' />
                    <span className="text-muted text-xs">h-10 w-10</span>
                  </div>
                </div>
              </div>

              {/* States */}
              <div>
                <SubLabel>states</SubLabel>
                <div className="flex flex-wrap gap-3">
                  <Button isLoading>loading</Button>
                  <Button disabled>disabled</Button>
                </div>
              </div>
            </div>
          </Section>

          {/* 04 — Badges */}
          <Section number="04" title="badges">
            <div className="space-y-3">
              {(
                [
                  ['default', 'bg-accent text-bg'],
                  ['outline', 'border-border'],
                  ['success', 'bg-success/15 text-success'],
                  ['warning', 'bg-warning/15 text-warning'],
                  ['danger', 'bg-danger/15 text-danger'],
                  ['info', 'bg-info/15 text-info'],
                ] as const
              ).map(([variant, classes]) => (
                <div
                  key={variant}
                  className="border-border/50 hover:border-accent/20 flex flex-wrap items-center gap-4 rounded-lg border p-3 transition-all duration-300"
                >
                  <Badge variant={variant}>{variant}</Badge>
                  <Copyable text={`variant="${variant}"`} />
                  <Copyable text={classes} />
                </div>
              ))}
            </div>
          </Section>

          {/* 05 — Form inputs */}
          <Section number="05" title="form inputs">
            <div className="space-y-8">
              <div>
                <SubLabel>input</SubLabel>
                <div className="grid max-w-md gap-4">
                  <Input label="default" placeholder="type something..." />
                  <Input label="with helper" helperText="this is a helper text" />
                  <Input label="with error" error="this field is required" />
                </div>
              </div>

              <div>
                <SubLabel>textarea</SubLabel>
                <div className="grid max-w-md gap-4">
                  <Textarea label="message" placeholder="write your message..." />
                </div>
              </div>

              <div>
                <SubLabel>select</SubLabel>
                <div className="grid max-w-md gap-4">
                  <Select
                    label="language"
                    placeholder="choose a language"
                    options={[
                      { value: 'fr', label: 'French' },
                      { value: 'en', label: 'English' },
                      { value: 'de', label: 'German' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* 06 — Cards */}
          <Section number="06" title="cards">
            <div className="grid gap-4 sm:grid-cols-3">
              <Card hover padding="lg">
                <p className="text-fg text-sm font-medium">hover card</p>
                <p className="text-muted mt-1 text-xs">scale + glow on hover</p>
                <Copyable text="hover padding='lg'" className="mt-3" />
              </Card>
              <Card padding="md">
                <p className="text-fg text-sm font-medium">default card</p>
                <p className="text-muted mt-1 text-xs">glass + backdrop-blur</p>
                <Copyable text="padding='md'" className="mt-3" />
              </Card>
              <Card padding="sm">
                <p className="text-fg text-sm font-medium">compact card</p>
                <p className="text-muted mt-1 text-xs">small padding</p>
                <Copyable text="padding='sm'" className="mt-3" />
              </Card>
            </div>
          </Section>

          {/* 07 — Avatars + Skeleton */}
          <Section number="07" title="avatars & skeleton">
            <div className="space-y-8">
              <div>
                <SubLabel>avatars</SubLabel>
                <div className="flex flex-wrap items-center gap-4">
                  <Avatar alt="small" size="sm" />
                  <Avatar alt="medium" fallback="AB" size="md" />
                  <Avatar alt="large" size="lg" />
                  <Avatar src="https://i.pravatar.cc/150?u=devkit" alt="with image" size="lg" />
                </div>
              </div>

              <div>
                <SubLabel>skeleton loading</SubLabel>
                <div className="max-w-sm space-y-3">
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="60%" />
                  <div className="flex items-center gap-4">
                    <Skeleton variant="circle" width="3rem" height="3rem" />
                    <div className="flex-1 space-y-2">
                      <Skeleton variant="text" />
                      <Skeleton variant="text" width="75%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* 08 — Tooltip + Modal */}
          <Section number="08" title="overlays">
            <div className="space-y-8">
              <div>
                <SubLabel>tooltip</SubLabel>
                <div className="flex flex-wrap gap-3">
                  <Tooltip content="top tooltip" position="top">
                    <Button variant="secondary" size="sm">
                      top
                    </Button>
                  </Tooltip>
                  <Tooltip content="bottom tooltip" position="bottom">
                    <Button variant="secondary" size="sm">
                      bottom
                    </Button>
                  </Tooltip>
                  <Tooltip content="left tooltip" position="left">
                    <Button variant="secondary" size="sm">
                      left
                    </Button>
                  </Tooltip>
                  <Tooltip content="right tooltip" position="right">
                    <Button variant="secondary" size="sm">
                      right
                    </Button>
                  </Tooltip>
                </div>
              </div>

              <div>
                <SubLabel>modal</SubLabel>
                <Button onClick={() => setModalOpen(true)}>open modal</Button>
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="example modal">
                  <p className="text-muted text-sm">focus trap, escape to close, backdrop click.</p>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
                      cancel
                    </Button>
                    <Button size="sm" onClick={() => setModalOpen(false)}>
                      confirm
                    </Button>
                  </div>
                </Modal>
              </div>
            </div>
          </Section>

          {/* 09 — Toast */}
          <Section number="09" title="toast">
            <div className="space-y-3">
              {(
                [
                  ['success', 'action completed successfully.'],
                  ['error', 'something went wrong.'],
                  ['warning', 'careful with that action.'],
                  ['info', 'new version available for download.'],
                ] as const
              ).map(([variant, msg]) => (
                <div
                  key={variant}
                  className="border-border/50 hover:border-accent/20 flex flex-wrap items-center gap-4 rounded-lg border p-3 transition-all duration-300"
                >
                  <Button
                    variant={variant === 'success' ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() =>
                      toast({
                        variant: variant === 'error' ? 'error' : variant,
                        message: msg,
                      })
                    }
                  >
                    {variant}
                  </Button>
                  <Copyable text={`variant="${variant}"`} />
                </div>
              ))}
            </div>
          </Section>

          {/* 10 — Icons */}
          <Section number="10" title="icons">
            <div className="space-y-8">
              <div>
                <SubLabel>common icons — lucide react</SubLabel>
                <div className="flex flex-wrap gap-3">
                  <IconItem name="Search">
                    <Search size={18} strokeWidth={1.5} />
                  </IconItem>
                  <IconItem name="ArrowRight">
                    <ArrowRight size={18} strokeWidth={1.5} />
                  </IconItem>
                  <IconItem name="Check">
                    <Check size={18} strokeWidth={1.5} />
                  </IconItem>
                  <IconItem name="Copy">
                    <Copy size={18} strokeWidth={1.5} />
                  </IconItem>
                  <IconItem name="Zap">
                    <Zap size={18} strokeWidth={1.5} />
                  </IconItem>
                  <IconItem name="Heart">
                    <Heart size={18} strokeWidth={1.5} />
                  </IconItem>
                  <IconItem name="Sun">
                    <Sun size={18} strokeWidth={1.5} />
                  </IconItem>
                  <IconItem name="Moon">
                    <Moon size={18} strokeWidth={1.5} />
                  </IconItem>
                </div>
              </div>

              <div>
                <SubLabel>sizes</SubLabel>
                <div className="flex flex-wrap gap-3">
                  <div className="border-border/50 hover:border-accent/20 flex items-center gap-3 rounded-lg border px-3 py-2 transition-all duration-300">
                    <Zap size={14} strokeWidth={1.5} />
                    <Copyable text="size={14}" />
                    <span className="text-muted text-xs">inline</span>
                  </div>
                  <div className="border-border/50 hover:border-accent/20 flex items-center gap-3 rounded-lg border px-3 py-2 transition-all duration-300">
                    <Zap size={18} strokeWidth={1.5} />
                    <Copyable text="size={18}" />
                    <span className="text-muted text-xs">standard</span>
                  </div>
                  <div className="border-border/50 hover:border-accent/20 flex items-center gap-3 rounded-lg border px-3 py-2 transition-all duration-300">
                    <Zap size={24} strokeWidth={1.5} />
                    <Copyable text="size={24}" />
                    <span className="text-muted text-xs">large</span>
                  </div>
                </div>
              </div>

              <div>
                <SubLabel>stroke weight</SubLabel>
                <div className="flex flex-wrap gap-3">
                  <div className="border-border/50 flex items-center gap-3 rounded-lg border px-3 py-2 transition-all duration-300">
                    <Heart size={20} strokeWidth={2} />
                    <span className="text-muted font-mono text-[10px]">2 default</span>
                  </div>
                  <div className="border-accent/30 flex items-center gap-3 rounded-lg border px-3 py-2 transition-all duration-300">
                    <Heart size={20} strokeWidth={1.5} className="text-accent" />
                    <span className="text-accent font-mono text-[10px]">1.5 classe2</span>
                  </div>
                  <div className="border-border/50 flex items-center gap-3 rounded-lg border px-3 py-2 transition-all duration-300">
                    <Heart size={20} strokeWidth={1} />
                    <span className="text-muted font-mono text-[10px]">1 thin</span>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* 11 — Tabs */}
          <Section number="11" title="tabs">
            <Tabs defaultValue="design">
              <TabsList>
                <TabsTrigger value="design">design</TabsTrigger>
                <TabsTrigger value="develop">develop</TabsTrigger>
                <TabsTrigger value="deploy">deploy</TabsTrigger>
              </TabsList>
              <TabsContent value="design">
                <p className="text-muted text-sm leading-relaxed">
                  start with tokens and a design system. define colors, typography, spacing, and
                  component anatomy before writing code.
                </p>
              </TabsContent>
              <TabsContent value="develop">
                <p className="text-muted text-sm leading-relaxed">
                  build components with typescript strict, functional patterns, and tailwind tokens.
                  test everything with vitest.
                </p>
              </TabsContent>
              <TabsContent value="deploy">
                <p className="text-muted text-sm leading-relaxed">
                  validate with lint, typecheck, and tests. then ship with confidence using
                  conventional commits and automated releases.
                </p>
              </TabsContent>
            </Tabs>
          </Section>

          {/* 12 — Spinner */}
          <Section number="12" title="spinner">
            <div className="flex flex-wrap gap-3">
              {(['sm', 'md', 'lg'] as const).map(size => (
                <div
                  key={size}
                  className="border-border/50 hover:border-accent/20 flex items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-300"
                >
                  <Spinner size={size} />
                  <Copyable text={`size="${size}"`} />
                </div>
              ))}
            </div>
          </Section>

          {/* 13 — Widgets */}
          <Section number="13" title="widgets">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Stat card */}
              <Card hover padding="lg">
                <span className="text-muted font-mono text-[10px] tracking-[0.2em] uppercase">
                  total users
                </span>
                <p className="text-fg mt-2 text-3xl font-bold">12,847</p>
                <p className="text-success mt-1 text-xs font-medium">+14.2% from last month</p>
              </Card>
              {/* Profile card */}
              <Card hover padding="lg">
                <div className="flex items-center gap-4">
                  <Avatar src="https://i.pravatar.cc/150?u=profile" alt="profile" size="lg" />
                  <div>
                    <p className="text-fg font-medium">jane doe</p>
                    <p className="text-muted text-sm">product designer</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Badge>design</Badge>
                  <Badge variant="outline">figma</Badge>
                  <Badge variant="outline">css</Badge>
                </div>
              </Card>
            </div>
          </Section>

          {/* ═══════════════════════════════════════════════════════
              ASSEMBLED MODULES — ready-to-use patterns
              ═══════════════════════════════════════════════════════ */}

          {/* 14 — Accordion / FAQ */}
          <Section number="14" title="accordion / faq">
            <div className="space-y-8">
              <div>
                <SubLabel>single mode (one open at a time)</SubLabel>
                <div className="border-border/50 rounded-lg border px-5">
                  <Accordion type="single" defaultOpen="faq-1">
                    <AccordionItem value="faq-1">
                      <AccordionTrigger>What is steaksoap?</AccordionTrigger>
                      <AccordionContent>
                        An AI-native React system for solo builders. 22 slash commands, 4 agents, 12
                        rules — the AI knows your codebase and follows your conventions. You
                        describe it, the AI builds it.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-2">
                      <AccordionTrigger>Do I need coding experience?</AccordionTrigger>
                      <AccordionContent>
                        Not at all. The guided setup wizard walks you through everything from
                        installing VS Code to running your first project. And once you're set up,
                        you describe what you want in plain English and the AI handles the code.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-3">
                      <AccordionTrigger>Which AI tools are supported?</AccordionTrigger>
                      <AccordionContent>
                        Claude Code (primary), Cursor, and GitHub Copilot. The commands and rules
                        are optimized for Claude Code but work with any AI coding assistant that
                        reads markdown instructions.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-4">
                      <AccordionTrigger>Is it free?</AccordionTrigger>
                      <AccordionContent>
                        Yes, 100% free and MIT licensed. Clone it, modify it, ship it. No
                        attribution required, no hidden costs, no premium tier.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-5">
                      <AccordionTrigger>How do I update to the latest version?</AccordionTrigger>
                      <AccordionContent>
                        Run <code className="text-accent font-mono text-xs">pnpm setup:update</code>{' '}
                        in your terminal. It pulls the latest improvements from the template and
                        merges them into your project without overwriting your changes.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              <div>
                <SubLabel>multiple mode (many open)</SubLabel>
                <div className="border-border/50 rounded-lg border px-5">
                  <Accordion type="multiple" defaultOpen={['multi-1', 'multi-2']}>
                    <AccordionItem value="multi-1">
                      <AccordionTrigger>First section</AccordionTrigger>
                      <AccordionContent>
                        Multiple items can be open simultaneously.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="multi-2">
                      <AccordionTrigger>Second section</AccordionTrigger>
                      <AccordionContent>
                        This one starts open too. Try clicking the first.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="multi-3">
                      <AccordionTrigger>Third section</AccordionTrigger>
                      <AccordionContent>Independent of the others.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </Section>

          {/* 15 — Pricing table */}
          <Section number="15" title="pricing table">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  name: 'Free',
                  price: '$0',
                  period: 'forever',
                  description: 'For side projects and experiments.',
                  features: ['Everything', 'No limits', 'MIT license', 'No account needed'],
                  cta: 'Already yours',
                  highlighted: false,
                  badge: null,
                },
                {
                  name: 'Still Free',
                  price: '$0',
                  period: 'still forever',
                  description: 'For serious solo builders.',
                  features: [
                    'Still everything',
                    'Still no limits',
                    'Priority support (jk, open an issue)',
                    'Custom domain (it\u2019s your project)',
                    'Remove branding (go ahead)',
                  ],
                  cta: 'Nice try',
                  highlighted: true,
                  badge: 'Popular',
                },
                {
                  name: 'Enterprise',
                  price: '$0',
                  period: 'per eternity',
                  description: 'For people who really want to pay.',
                  features: [
                    'Everything above',
                    'Team seats (git clone)',
                    'SLA guarantee (best effort lol)',
                    'Dedicated support (GitHub Issues)',
                    'Invoice billing ($0.00 due)',
                    'A thank you star on GitHub',
                  ],
                  cta: 'Contact nobody',
                  highlighted: false,
                  badge: null,
                },
              ].map(plan => (
                <div
                  key={plan.name}
                  className={cn(
                    'border-border relative flex flex-col rounded-lg border p-6 transition-all duration-300',
                    plan.highlighted
                      ? 'border-accent/40 bg-accent/3 shadow-[0_0_40px_rgba(255,107,107,0.05)]'
                      : 'hover:border-accent/15 bg-transparent',
                  )}
                >
                  {plan.badge && (
                    <span className="bg-accent text-bg absolute -top-3 right-4 rounded-full px-3 py-0.5 text-[10px] font-bold tracking-wide uppercase">
                      {plan.badge}
                    </span>
                  )}
                  <h3 className="text-fg font-mono text-sm font-medium uppercase">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-fg text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted text-sm">{plan.period}</span>
                  </div>
                  <p className="text-muted mt-2 text-sm">{plan.description}</p>

                  <ul className="mt-6 flex-1 space-y-2">
                    {plan.features.map(f => (
                      <li key={f} className="text-muted flex items-center gap-2 text-sm">
                        <Check
                          size={14}
                          strokeWidth={2}
                          className="text-success shrink-0"
                          aria-hidden="true"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.highlighted ? 'primary' : 'secondary'}
                    className="mt-6 w-full"
                    size="md"
                  >
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>
          </Section>

          {/* 16 — Testimonials */}
          <Section number="16" title="testimonials">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  quote:
                    "steaksoap changed how I build projects. I describe what I want, Claude builds it, and everything just works. Haven't touched code manually in weeks.",
                  name: 'Alex Chen',
                  role: 'Indie maker',
                  avatar: 'https://i.pravatar.cc/150?u=alex',
                },
                {
                  quote:
                    "The slash commands are game-changing. /spec → /new-feature → /review → done. It's like having a senior engineer sitting next to me at all times.",
                  name: 'Sarah Kim',
                  role: 'Solo founder',
                  avatar: 'https://i.pravatar.cc/150?u=sarah',
                },
                {
                  quote:
                    "I tried 20+ React starters. This is the only one where the AI integration isn't an afterthought. The rules and agents ARE the product.",
                  name: 'Marcus Weber',
                  role: 'Full-stack dev',
                  avatar: 'https://i.pravatar.cc/150?u=marcus',
                },
              ].map(t => (
                <Card key={t.name} padding="lg">
                  <div className="flex h-full flex-col">
                    <div className="mb-3 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill="var(--color-accent)"
                          strokeWidth={0}
                          className="text-accent"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <blockquote className="text-muted flex-1 text-sm leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <div className="border-border/50 mt-4 flex items-center gap-3 border-t pt-4">
                      <Avatar src={t.avatar} alt={t.name} size="sm" />
                      <div>
                        <p className="text-fg text-sm font-medium">{t.name}</p>
                        <p className="text-muted text-xs">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* 17 — Contact form */}
          <Section number="17" title="contact form">
            <div className="border-border/50 mx-auto max-w-lg rounded-lg border p-6">
              <h3 className="text-fg text-lg font-medium">Get in touch</h3>
              <p className="text-muted mt-1 text-sm">We usually respond within 24 hours.</p>

              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="First name" placeholder="Jane" />
                  <Input label="Last name" placeholder="Doe" />
                </div>
                <Input label="Email" type="email" placeholder="jane@example.com" />
                <Select
                  label="Subject"
                  placeholder="Select a topic"
                  options={[
                    { value: 'general', label: 'General inquiry' },
                    { value: 'support', label: 'Technical support' },
                    { value: 'feedback', label: 'Feedback' },
                    { value: 'partnership', label: 'Partnership' },
                  ]}
                />
                <Textarea label="Message" placeholder="Tell us what's on your mind..." />
                <Button
                  className="w-full"
                  onClick={() =>
                    toast({
                      variant: 'success',
                      message: "Message sent! We'll get back to you soon.",
                    })
                  }
                >
                  Send message
                </Button>
              </div>
            </div>
          </Section>

          {/* 18 — CTA section */}
          <Section number="18" title="call to action">
            <div className="border-accent/10 bg-accent/2 rounded-2xl border p-8 text-center md:p-12">
              <h3 className="text-fg text-2xl font-medium md:text-3xl">
                Ready to build something?
              </h3>
              <p className="text-muted mx-auto mt-3 max-w-md text-sm leading-relaxed md:text-base">
                Clone steaksoap, let the AI handle the code, and ship your next project faster than
                you thought possible.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button size="lg">
                  View on GitHub <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
                </Button>
                <Button variant="secondary" size="lg">
                  Read the docs
                </Button>
              </div>
              <p className="text-muted/50 mt-6 font-mono text-xs">
                Free forever &middot; MIT license &middot; No account needed
              </p>
            </div>
          </Section>

          {/* 19 — Banners */}
          <Section number="19" title="banners & alerts">
            <div className="space-y-3">
              <Banner variant="info">
                New version available — <span className="font-medium underline">update now</span>
              </Banner>
              <Banner variant="success">
                Deployment successful. Your site is live at project.vercel.app
              </Banner>
              <Banner variant="warning">
                Your API key expires in 3 days. Rotate it in settings.
              </Banner>
              <Banner variant="danger">Build failed. Check the error log for details.</Banner>
              <Banner variant="accent">
                steaksoap v3.0 just dropped — 8 new commands, redesigned wizard
              </Banner>
            </div>
          </Section>

          {/* 20 — Stats row */}
          <Section number="20" title="stats">
            <div className="space-y-8">
              <div>
                <SubLabel>inline stats</SubLabel>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Card padding="md">
                    <Stat
                      label="Total users"
                      value="12,847"
                      trend={{ value: '14.2%', positive: true }}
                    />
                  </Card>
                  <Card padding="md">
                    <Stat
                      label="Revenue"
                      value="$48.2k"
                      trend={{ value: '7.1%', positive: true }}
                    />
                  </Card>
                  <Card padding="md">
                    <Stat
                      label="Bounce rate"
                      value="24.3%"
                      trend={{ value: '3.2%', positive: false }}
                    />
                  </Card>
                  <Card padding="md">
                    <Stat
                      label="Avg. session"
                      value="4m 32s"
                      trend={{ value: '12s', positive: true }}
                    />
                  </Card>
                </div>
              </div>

              <div>
                <SubLabel>progress bars</SubLabel>
                <div className="max-w-md space-y-4">
                  <ProgressBar value={78} variant="accent" showLabel />
                  <ProgressBar value={92} variant="success" showLabel />
                  <ProgressBar value={45} variant="warning" showLabel />
                  <ProgressBar value={15} variant="danger" showLabel />
                </div>
              </div>
            </div>
          </Section>

          {/* 21 — Timeline / changelog */}
          <Section number="21" title="timeline">
            <div className="max-w-lg">
              <Timeline
                items={[
                  {
                    title: 'v2.6 — Playground mega update',
                    date: 'Feb 2026',
                    badge: (
                      <Badge variant="success" size="sm">
                        latest
                      </Badge>
                    ),
                    description:
                      'FAQ, pricing table, testimonials, contact form, 10 new components, and assembled modules.',
                  },
                  {
                    title: 'v2.5 — Wizard onboarding',
                    date: 'Feb 2026',
                    description:
                      '30-slide guided setup wizard. From zero to running project in 15 minutes.',
                  },
                  {
                    title: 'v2.0 — AI-native redesign',
                    date: 'Jan 2026',
                    badge: (
                      <Badge variant="info" size="sm">
                        major
                      </Badge>
                    ),
                    description:
                      'Complete rewrite. 22 commands, 4 agents, particle hero, neural flow design.',
                  },
                  {
                    title: 'v1.0 — Initial release',
                    date: 'Dec 2025',
                    description: 'React 19 + Vite + Tailwind starter with Claude Code integration.',
                  },
                ]}
              />
            </div>
          </Section>

          {/* 22 — Empty states */}
          <Section number="22" title="empty states">
            <div className="grid gap-4 md:grid-cols-3">
              <Card padding="md">
                <EmptyState
                  icon={<SearchX size={40} strokeWidth={1} />}
                  title="No results found"
                  description="Try adjusting your search or filters to find what you're looking for."
                  action={
                    <Button variant="secondary" size="sm">
                      Clear filters
                    </Button>
                  }
                />
              </Card>
              <Card padding="md">
                <EmptyState
                  icon={<Inbox size={40} strokeWidth={1} />}
                  title="No items yet"
                  description="Get started by creating your first item. It only takes a few seconds."
                  action={<Button size="sm">Create first item</Button>}
                />
              </Card>
              <Card padding="md">
                <EmptyState
                  icon={<FileX size={40} strokeWidth={1} />}
                  title="Something went wrong"
                  description="We couldn't load this content. Please try again or contact support."
                  action={
                    <Button variant="danger" size="sm">
                      Retry
                    </Button>
                  }
                />
              </Card>
            </div>
          </Section>

          {/* 23 — Switch, AvatarGroup, Kbd, Divider */}
          <Section number="23" title="misc components">
            <div className="space-y-8">
              <div>
                <SubLabel>switch</SubLabel>
                <SwitchDemo />
              </div>

              <div>
                <SubLabel>avatar group</SubLabel>
                <div className="flex flex-wrap items-center gap-6">
                  <AvatarGroup
                    avatars={[
                      { src: 'https://i.pravatar.cc/150?u=a', alt: 'Alice' },
                      { src: 'https://i.pravatar.cc/150?u=b', alt: 'Bob' },
                      { src: 'https://i.pravatar.cc/150?u=c', alt: 'Charlie' },
                      { src: 'https://i.pravatar.cc/150?u=d', alt: 'Diana' },
                      { src: 'https://i.pravatar.cc/150?u=e', alt: 'Eve' },
                      { src: 'https://i.pravatar.cc/150?u=f', alt: 'Frank' },
                    ]}
                    max={4}
                  />
                  <span className="text-muted text-xs">max=4 — 6 avatars</span>
                </div>
              </div>

              <div>
                <SubLabel>keyboard shortcuts</SubLabel>
                <div className="flex flex-wrap gap-3">
                  <div className="border-border/50 flex items-center gap-2 rounded-lg border px-3 py-2">
                    <Kbd>&lceil;</Kbd>
                    <span className="text-muted text-xs">+</span>
                    <Kbd>K</Kbd>
                    <span className="text-muted ml-2 text-xs">command palette</span>
                  </div>
                  <div className="border-border/50 flex items-center gap-2 rounded-lg border px-3 py-2">
                    <Kbd>&lceil;</Kbd>
                    <span className="text-muted text-xs">+</span>
                    <Kbd>S</Kbd>
                    <span className="text-muted ml-2 text-xs">save</span>
                  </div>
                  <div className="border-border/50 flex items-center gap-2 rounded-lg border px-3 py-2">
                    <Kbd>Esc</Kbd>
                    <span className="text-muted ml-2 text-xs">close</span>
                  </div>
                  <div className="border-border/50 flex items-center gap-2 rounded-lg border px-3 py-2">
                    <Kbd>&uarr;</Kbd>
                    <Kbd>&darr;</Kbd>
                    <span className="text-muted ml-2 text-xs">navigate</span>
                  </div>
                </div>
              </div>

              <div>
                <SubLabel>dividers</SubLabel>
                <div className="max-w-md space-y-0">
                  <p className="text-muted text-sm">Content above the divider.</p>
                  <Divider />
                  <p className="text-muted text-sm">Simple horizontal rule.</p>
                  <Divider label="or" />
                  <p className="text-muted text-sm">With a centered label.</p>
                  <Divider label="section break" />
                  <p className="text-muted text-sm">Content below.</p>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}
