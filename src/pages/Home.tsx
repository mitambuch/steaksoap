import { SeoHead } from '@components/features/SeoHead';
import { homePage } from '@data/pages';

export default function Home() {
  return (
    <>
      <SeoHead />

      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-3xl flex-col justify-center px-6">
        <p className="text-accent-text font-mono text-sm tracking-wide">{homePage.tagline}</p>
        <h1 className="text-fg mt-3 text-3xl font-medium tracking-tight md:text-5xl">
          {homePage.headline}
        </h1>
        <p className="text-muted mt-4 max-w-lg text-base leading-relaxed md:text-lg">
          {homePage.subline.split('\n').map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
        <div className="bg-accent mt-8 h-px w-16" />
      </div>
    </>
  );
}
