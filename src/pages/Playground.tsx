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
import { useToast } from '@hooks/useToast';
import { ArrowRight, Check, Copy, Heart, Moon, Plus, Search, Sun, Zap } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';

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
    <section className="border-border border-t pt-12">
      <div className="mb-8 flex items-baseline gap-3">
        <span className="text-accent font-mono text-[10px] tracking-widest uppercase">
          {number}
        </span>
        <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
          // {title}
        </span>
      </div>
      {children}
    </section>
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
    <div className="flex items-center gap-4">
      <div
        className="border-border h-10 w-10 shrink-0 rounded-sm border"
        style={{ backgroundColor: `var(--color-${token})` }}
      />
      <div>
        <p className="text-fg text-sm font-medium">{name}</p>
        <p className="text-muted font-mono text-[10px]">
          {dark} / {light}
        </p>
      </div>
    </div>
  );
}

/* ─── Icon Showcase Item ──────────────────────────────────────── */

function IconItem({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-fg">{children}</div>
      <span className="text-muted font-mono text-[10px] tracking-widest uppercase">{name}</span>
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
      <div className="bg-bg text-fg min-h-screen px-4 py-12 md:px-8">
        <div className="mx-auto max-w-5xl space-y-16">
          {/* Header */}
          <div>
            <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
              steaksoap
            </span>
            <h1 className="text-fg mt-2 text-4xl font-medium tracking-tight md:text-6xl">devkit</h1>
            <p className="text-muted mt-4 max-w-md text-base leading-relaxed">
              every token, every component, every state. the visual reference for this design
              system.
            </p>
          </div>

          {/* 01 — Typography */}
          <Section number="01" title="typography">
            <div className="space-y-8">
              <div className="grid gap-2 md:grid-cols-[160px_1fr]">
                <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
                  display xl
                </span>
                <p className="text-fg text-5xl font-bold md:text-7xl">headlines</p>
              </div>
              <div className="grid gap-2 md:grid-cols-[160px_1fr]">
                <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
                  display l
                </span>
                <p className="text-fg text-4xl font-medium md:text-6xl">page titles</p>
              </div>
              <div className="grid gap-2 md:grid-cols-[160px_1fr]">
                <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
                  heading
                </span>
                <p className="text-fg text-2xl font-medium md:text-4xl">section titles</p>
              </div>
              <div className="grid gap-2 md:grid-cols-[160px_1fr]">
                <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
                  body
                </span>
                <p className="text-fg text-base leading-relaxed md:text-xl">
                  the quick brown fox jumps over the lazy dog. space grotesk renders beautifully at
                  all sizes.
                </p>
              </div>
              <div className="grid gap-2 md:grid-cols-[160px_1fr]">
                <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
                  label
                </span>
                <p className="text-fg text-xs font-bold tracking-widest uppercase">
                  buttons and ctas
                </p>
              </div>
              <div className="grid gap-2 md:grid-cols-[160px_1fr]">
                <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
                  mono micro
                </span>
                <p className="text-muted font-mono text-[10px] tracking-widest uppercase">
                  metadata and ui labels
                </p>
              </div>
            </div>
          </Section>

          {/* 02 — Colors */}
          <Section number="02" title="colors">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <Swatch name="accent" token="accent" dark="#D4FF00" light="#D4FF00" />
              <Swatch name="background" token="bg" dark="#0A0A0A" light="#D8D8D0" />
              <Swatch name="foreground" token="fg" dark="#F0F0F0" light="#1A1A1A" />
              <Swatch name="muted" token="muted" dark="#666666" light="#5C5C56" />
              <Swatch name="surface" token="surface" dark="#141414" light="#C8C8C0" />
              <Swatch name="border" token="border" dark="#262626" light="#B8B8B0" />
              <Swatch name="success" token="success" dark="#4ADE80" light="#16A34A" />
              <Swatch name="warning" token="warning" dark="#EAB308" light="#CA8A04" />
              <Swatch name="danger" token="danger" dark="#F87171" light="#DC2626" />
              <Swatch name="info" token="info" dark="#60A5FA" light="#2563EB" />
            </div>
          </Section>

          {/* 03 — UI Elements */}
          <Section number="03" title="ui elements">
            {/* Buttons */}
            <div className="space-y-8">
              <div>
                <span className="text-muted mb-3 block font-mono text-[10px] tracking-widest uppercase">
                  buttons
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">primary</Button>
                  <Button variant="secondary">secondary</Button>
                  <Button variant="ghost">ghost</Button>
                  <Button variant="danger">danger</Button>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Button size="sm">small</Button>
                  <Button size="md">medium</Button>
                  <Button size="lg">large</Button>
                  <Button size="icon" aria-label="icon button">
                    <Plus size={20} strokeWidth={1.5} aria-hidden="true" />
                  </Button>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Button isLoading>loading</Button>
                  <Button disabled>disabled</Button>
                </div>
              </div>

              {/* Badges */}
              <div>
                <span className="text-muted mb-3 block font-mono text-[10px] tracking-widest uppercase">
                  badges
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>default</Badge>
                  <Badge variant="outline">outline</Badge>
                  <Badge variant="success">success</Badge>
                  <Badge variant="warning">warning</Badge>
                  <Badge variant="danger">danger</Badge>
                  <Badge variant="info">info</Badge>
                </div>
              </div>

              {/* Inputs */}
              <div>
                <span className="text-muted mb-3 block font-mono text-[10px] tracking-widest uppercase">
                  inputs
                </span>
                <div className="grid max-w-md gap-4">
                  <Input label="default" placeholder="type something..." />
                  <Input label="with helper" helperText="this is a helper text" />
                  <Input label="with error" error="this field is required" />
                </div>
              </div>

              {/* Textarea */}
              <div>
                <span className="text-muted mb-3 block font-mono text-[10px] tracking-widest uppercase">
                  textarea
                </span>
                <div className="grid max-w-md gap-4">
                  <Textarea label="message" placeholder="write your message..." />
                </div>
              </div>

              {/* Select */}
              <div>
                <span className="text-muted mb-3 block font-mono text-[10px] tracking-widest uppercase">
                  select
                </span>
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

              {/* Cards */}
              <div>
                <span className="text-muted mb-3 block font-mono text-[10px] tracking-widest uppercase">
                  cards
                </span>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Card hover padding="lg">
                    <p className="text-fg text-sm font-medium">hover card</p>
                    <p className="text-muted mt-1 text-xs">with scale effect</p>
                  </Card>
                  <Card padding="md">
                    <p className="text-fg text-sm font-medium">default card</p>
                    <p className="text-muted mt-1 text-xs">medium padding</p>
                  </Card>
                  <Card padding="sm">
                    <p className="text-fg text-sm font-medium">compact card</p>
                    <p className="text-muted mt-1 text-xs">small padding</p>
                  </Card>
                </div>
              </div>

              {/* Avatar */}
              <div>
                <span className="text-muted mb-3 block font-mono text-[10px] tracking-widest uppercase">
                  avatars
                </span>
                <div className="flex items-center gap-4">
                  <Avatar alt="small" size="sm" />
                  <Avatar alt="medium" fallback="AB" size="md" />
                  <Avatar alt="large" size="lg" />
                  <Avatar src="https://i.pravatar.cc/150?u=devkit" alt="with image" size="lg" />
                </div>
              </div>

              {/* Skeleton */}
              <div>
                <span className="text-muted mb-3 block font-mono text-[10px] tracking-widest uppercase">
                  skeleton
                </span>
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

              {/* Tooltip */}
              <div>
                <span className="text-muted mb-3 block font-mono text-[10px] tracking-widest uppercase">
                  tooltip
                </span>
                <div className="flex flex-wrap items-center gap-4">
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

              {/* Modal */}
              <div>
                <span className="text-muted mb-3 block font-mono text-[10px] tracking-widest uppercase">
                  modal
                </span>
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

          {/* 04 — Toast */}
          <Section number="04" title="toast">
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() =>
                  toast({ variant: 'success', message: 'action completed successfully.' })
                }
              >
                success
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  toast({ variant: 'error', title: 'error', message: 'something went wrong.' })
                }
              >
                error
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => toast({ variant: 'warning', message: 'careful with that action.' })}
              >
                warning
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  toast({ variant: 'info', message: 'new version available for download.' })
                }
              >
                info
              </Button>
            </div>
          </Section>

          {/* 05 — Icons */}
          <Section number="05" title="icons">
            <div className="space-y-8">
              {/* Common icons */}
              <div>
                <span className="text-muted mb-4 block font-mono text-[10px] tracking-widest uppercase">
                  common icons — lucide react
                </span>
                <div className="flex flex-wrap items-end gap-8">
                  <IconItem name="search">
                    <Search size={18} strokeWidth={1.5} />
                  </IconItem>
                  <IconItem name="arrow-right">
                    <ArrowRight size={18} strokeWidth={1.5} />
                  </IconItem>
                  <IconItem name="check">
                    <Check size={18} strokeWidth={1.5} />
                  </IconItem>
                  <IconItem name="copy">
                    <Copy size={18} strokeWidth={1.5} />
                  </IconItem>
                  <IconItem name="zap">
                    <Zap size={18} strokeWidth={1.5} />
                  </IconItem>
                  <IconItem name="heart">
                    <Heart size={18} strokeWidth={1.5} />
                  </IconItem>
                  <IconItem name="sun">
                    <Sun size={18} strokeWidth={1.5} />
                  </IconItem>
                  <IconItem name="moon">
                    <Moon size={18} strokeWidth={1.5} />
                  </IconItem>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <span className="text-muted mb-4 block font-mono text-[10px] tracking-widest uppercase">
                  sizes
                </span>
                <div className="flex items-end gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <Zap size={14} strokeWidth={1.5} />
                    <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
                      14 inline
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Zap size={18} strokeWidth={1.5} />
                    <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
                      18 standard
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Zap size={24} strokeWidth={1.5} />
                    <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
                      24 large
                    </span>
                  </div>
                </div>
              </div>

              {/* Stroke width comparison */}
              <div>
                <span className="text-muted mb-4 block font-mono text-[10px] tracking-widest uppercase">
                  stroke weight
                </span>
                <div className="flex items-end gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <Heart size={20} strokeWidth={2} />
                    <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
                      2 default
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Heart size={20} strokeWidth={1.5} />
                    <span className="text-accent font-mono text-[10px] tracking-widest uppercase">
                      1.5 classe2
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Heart size={20} strokeWidth={1} />
                    <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
                      1 thin
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* 06 — Tabs */}
          <Section number="06" title="tabs">
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

          {/* 07 — Spinner */}
          <Section number="07" title="spinner">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <Spinner size="sm" />
                <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
                  sm
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner size="md" />
                <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
                  md
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner size="lg" />
                <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
                  lg
                </span>
              </div>
            </div>
          </Section>

          {/* 08 — Widgets */}
          <Section number="08" title="widgets">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Stat card */}
              <Card padding="lg">
                <span className="text-muted font-mono text-[10px] tracking-widest uppercase">
                  total users
                </span>
                <p className="text-fg mt-2 text-3xl font-bold">12,847</p>
                <p className="text-success mt-1 text-xs font-medium">+14.2% from last month</p>
              </Card>
              {/* Profile card */}
              <Card padding="lg">
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
