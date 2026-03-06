import { Input } from '@components/ui/Input';
import { Select } from '@components/ui/Select';
import { Textarea } from '@components/ui/Textarea';

import { Section, SubLabel } from '../shared';

export function FormsSection() {
  return (
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
  );
}
