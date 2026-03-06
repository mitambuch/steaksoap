import { Avatar } from '@components/ui/Avatar';
import { Card } from '@components/ui/Card';
import { Star } from 'lucide-react';

import { TESTIMONIALS } from '../data';
import { Section } from '../shared';

export function TestimonialsSection() {
  return (
    <Section number="16" title="testimonials">
      <div className="grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map(t => (
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
  );
}
