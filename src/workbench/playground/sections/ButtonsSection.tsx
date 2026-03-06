import { Button } from '@components/ui/Button';
import { Plus } from 'lucide-react';

import { Copyable, Section, SubLabel } from '../shared';

export function ButtonsSection() {
  return (
    <Section number="03" title="buttons">
      <div className="space-y-8">
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
                className="border-border/50 hover:border-accent/20 duration-base flex flex-wrap items-center gap-4 rounded-lg border p-4 transition-[border-color]"
              >
                <Button variant={variant}>{variant}</Button>
                <Copyable text={`variant="${variant}"`} />
                <span className="text-muted text-xs">{desc}</span>
              </div>
            ))}
          </div>
        </div>

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
                className="border-border/50 hover:border-accent/20 duration-base flex flex-wrap items-center gap-4 rounded-lg border p-4 transition-[border-color]"
              >
                <Button size={size}>{size}</Button>
                <Copyable text={`size="${size}"`} />
                <Copyable text={classes} />
              </div>
            ))}
            <div className="border-border/50 hover:border-accent/20 duration-base flex flex-wrap items-center gap-4 rounded-lg border p-4 transition-[border-color]">
              <Button size="icon" aria-label="icon button">
                <Plus size={20} strokeWidth={1.5} aria-hidden="true" />
              </Button>
              <Copyable text='size="icon"' />
              <span className="text-muted text-xs">h-10 w-10</span>
            </div>
          </div>
        </div>

        <div>
          <SubLabel>states</SubLabel>
          <div className="flex flex-wrap gap-3">
            <Button isLoading>loading</Button>
            <Button disabled>disabled</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
