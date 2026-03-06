import { Banner } from '@components/ui/Banner';

import { Section } from '../shared';

export function BannersSection() {
  return (
    <Section number="19" title="banners & alerts">
      <div className="space-y-3">
        <Banner variant="info">
          New version available — <span className="font-medium underline">update now</span>
        </Banner>
        <Banner variant="success">
          Deployment successful. Your site is live at project.vercel.app
        </Banner>
        <Banner variant="warning">Your API key expires in 3 days. Rotate it in settings.</Banner>
        <Banner variant="danger">Build failed. Check the error log for details.</Banner>
        <Banner variant="accent">
          v3.0 just dropped — redesigned dashboard, 8 new features, improved performance
        </Banner>
      </div>
    </Section>
  );
}
