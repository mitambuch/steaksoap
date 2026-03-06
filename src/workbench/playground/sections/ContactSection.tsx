import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Select } from '@components/ui/Select';
import { Textarea } from '@components/ui/Textarea';
import { useToast } from '@hooks/useToast';

import { Section } from '../shared';

export function ContactSection() {
  const { toast } = useToast();

  return (
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
  );
}
