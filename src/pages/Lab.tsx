import { SeoHead } from '@components/features/SeoHead';
import { Container } from '@components/layout/Container';

/** Lab — experimental prototyping space. */
export default function Lab() {
  return (
    <>
      <SeoHead title="Lab" description="Experimental prototyping space." />
      <Container>
        <h1 className="text-fg mb-6 text-3xl font-medium">Lab</h1>
        <p className="text-muted">
          Prototype ideas here. This page is your sandbox for experiments.
        </p>
      </Container>
    </>
  );
}
