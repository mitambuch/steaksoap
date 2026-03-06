import { Button } from '@components/ui/Button';
import { useToast } from '@hooks/useToast';

import { Copyable, Section } from '../shared';

export function ToastSection() {
  const { toast } = useToast();

  return (
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
            className="border-border/50 hover:border-accent/20 duration-base flex flex-wrap items-center gap-4 rounded-lg border p-3 transition-[border-color]"
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
  );
}
