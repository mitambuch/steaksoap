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
import { useState } from 'react';

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="text-fg border-border mb-4 border-b pb-2 font-mono text-lg font-semibold">
      {children}
    </h2>
  );
}

export default function Playground() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SeoHead title="Playground" description="Interactive component showcase." />
      <div className="bg-bg text-fg min-h-screen px-4 py-12 md:px-8">
        <div className="mx-auto max-w-4xl space-y-16">
          {/* Page header */}
          <div>
            <h1 className="text-accent font-mono text-3xl font-bold">UI Playground</h1>
            <p className="text-muted mt-2 font-mono text-sm">
              Every component in every variant and state.
            </p>
          </div>

          {/* Button */}
          <section>
            <SectionTitle>Button</SectionTitle>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button isLoading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </section>

          {/* Input */}
          <section>
            <SectionTitle>Input</SectionTitle>
            <div className="grid max-w-md gap-4">
              <Input label="Default" placeholder="Type something..." />
              <Input label="With helper" helperText="This is a helper text" />
              <Input label="With error" error="This field is required" />
            </div>
          </section>

          {/* Textarea */}
          <section>
            <SectionTitle>Textarea</SectionTitle>
            <div className="grid max-w-md gap-4">
              <Textarea label="Message" placeholder="Write your message..." />
              <Textarea label="With error" error="Too short" rows={3} />
            </div>
          </section>

          {/* Select */}
          <section>
            <SectionTitle>Select</SectionTitle>
            <div className="grid max-w-md gap-4">
              <Select
                label="Language"
                placeholder="Choose a language"
                options={[
                  { value: 'fr', label: 'French' },
                  { value: 'en', label: 'English' },
                  { value: 'de', label: 'German' },
                ]}
              />
              <Select
                label="With error"
                error="Selection required"
                options={[{ value: 'opt', label: 'Option' }]}
              />
            </div>
          </section>

          {/* Card */}
          <section>
            <SectionTitle>Card</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card padding="sm">
                <p className="text-sm">Small padding</p>
              </Card>
              <Card>
                <p className="text-sm">Medium padding (default)</p>
              </Card>
              <Card padding="lg">
                <p className="text-sm">Large padding</p>
              </Card>
              <Card padding="none" className="overflow-hidden">
                <div className="bg-accent/10 p-4">
                  <p className="text-sm">No padding + custom content</p>
                </div>
              </Card>
            </div>
          </section>

          {/* Badge */}
          <section>
            <SectionTitle>Badge</SectionTitle>
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
            </div>
          </section>

          {/* Avatar */}
          <section>
            <SectionTitle>Avatar</SectionTitle>
            <div className="flex items-center gap-4">
              <Avatar alt="Alice" size="sm" />
              <Avatar alt="Bob" fallback="BD" size="md" />
              <Avatar alt="Charlie" size="lg" />
              <Avatar src="https://i.pravatar.cc/150?u=demo" alt="Demo User" size="lg" />
            </div>
          </section>

          {/* Skeleton */}
          <section>
            <SectionTitle>Skeleton</SectionTitle>
            <div className="max-w-sm space-y-4">
              <Skeleton variant="text" />
              <Skeleton variant="text" width="60%" />
              <div className="flex items-center gap-4">
                <Skeleton variant="circle" width="3rem" height="3rem" />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="75%" />
                </div>
              </div>
              <Skeleton variant="rect" width="100%" height="8rem" />
            </div>
          </section>

          {/* Tooltip */}
          <section>
            <SectionTitle>Tooltip</SectionTitle>
            <div className="flex flex-wrap items-center gap-6">
              <Tooltip content="Top tooltip" position="top">
                <Button variant="secondary" size="sm">
                  Top
                </Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" position="bottom">
                <Button variant="secondary" size="sm">
                  Bottom
                </Button>
              </Tooltip>
              <Tooltip content="Left tooltip" position="left">
                <Button variant="secondary" size="sm">
                  Left
                </Button>
              </Tooltip>
              <Tooltip content="Right tooltip" position="right">
                <Button variant="secondary" size="sm">
                  Right
                </Button>
              </Tooltip>
            </div>
          </section>

          {/* Modal */}
          <section>
            <SectionTitle>Modal</SectionTitle>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Example Modal">
              <p className="text-muted text-sm">
                This is a modal with focus trap, Escape to close, and backdrop click.
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={() => setModalOpen(false)}>
                  Confirm
                </Button>
              </div>
            </Modal>
          </section>
        </div>
      </div>
    </>
  );
}
