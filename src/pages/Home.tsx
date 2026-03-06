import { SeoHead } from '@components/features/SeoHead';
import { siteConfig } from '@config/site';

export default function Home() {
  return (
    <>
      <SeoHead />

      <div className="mx-auto max-w-3xl px-6 py-20 md:py-32">
        <h1 className="text-fg text-3xl font-medium tracking-tight md:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="text-muted mt-4 max-w-lg text-base leading-relaxed md:text-lg">
          {siteConfig.description}
        </p>
        <div className="bg-accent mt-8 h-px w-12" />
      </div>
    </>
  );
}
