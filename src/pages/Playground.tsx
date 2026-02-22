import { SeoHead } from '@components/features/SeoHead';
import { Avatar } from '@components/ui/Avatar';
import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { Input } from '@components/ui/Input';
import { Modal } from '@components/ui/Modal';
import { Select } from '@components/ui/Select';
import { Skeleton } from '@components/ui/Skeleton';
import { Textarea } from '@components/ui/Textarea';
import { Tooltip } from '@components/ui/Tooltip';
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

/* ═══════════════════════════════════════════════════════════════ */

export default function Playground() {
  const [modalOpen, setModalOpen] = useState(false);

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
              <Swatch name="background" token="bg" dark="#0A0A0A" light="#F4F4F0" />
              <Swatch name="foreground" token="fg" dark="#F0F0F0" light="#1A1A1A" />
              <Swatch name="muted" token="muted" dark="#666666" light="#71717A" />
              <Swatch name="surface" token="surface" dark="#141414" light="#EAEAE6" />
              <Swatch name="border" token="border" dark="#262626" light="#D4D4CF" />
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
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
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

          {/* 04 — Widgets */}
          <Section number="04" title="widgets">
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
