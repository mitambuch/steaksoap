import { ShowcaseLanding } from '@components/features/ShowcaseLanding';
import { siteConfig } from '@config/site';

export default function Home() {
  return (
    <ShowcaseLanding
      seoTitle={`${siteConfig.name} — AI-first React starter kit`}
      seoDescription="The 100% free AI-native React system. You describe it. The AI builds it. Made for solo builders."
    />
  );
}
