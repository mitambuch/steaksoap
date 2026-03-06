import { Button } from '@components/ui/Button';
import { ArrowRight } from 'lucide-react';

import { Section } from '../shared';

export function CTASection() {
  return (
    <Section number="18" title="call to action">
      <div className="border-accent/10 bg-accent/2 rounded-2xl border p-8 text-center md:p-12">
        <h3 className="text-fg text-2xl font-medium md:text-3xl">Ready to build something?</h3>
        <p className="text-muted mx-auto mt-3 max-w-md text-sm leading-relaxed md:text-base">
          Start building today. Sign up in seconds and launch your first project in minutes.
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
          Free trial &middot; No credit card required &middot; Cancel anytime
        </p>
      </div>
    </Section>
  );
}
