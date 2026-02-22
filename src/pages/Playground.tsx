import { SeoHead } from '@components/features/SeoHead';
import { Avatar } from '@components/ui/Avatar';
import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { Input } from '@components/ui/Input';
import { Modal } from '@components/ui/Modal';
import { Select } from '@components/ui/Select';
import { Skeleton } from '@components/ui/Skeleton';
import { Spinner } from '@components/ui/Spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs';
import { Textarea } from '@components/ui/Textarea';
import { Tooltip } from '@components/ui/Tooltip';
import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import { useToast } from '@hooks/useToast';
import { ArrowRight, Check, Copy, Heart, Moon, Plus, Search, Sun, Zap } from 'lucide-react';
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
              every token, every component, every state. click any chip to copy.
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
        </div>
      </div>
    </>
  );
}
