import { SeoHead } from '@components/features/SeoHead';
import { Container } from '@components/layout/Container';
import { labPage } from '@data/pages';

/** Lab — experimental prototyping space. */
export default function Lab() {
  return (
    <>
      <SeoHead title={labPage.seo.title} description={labPage.seo.description} />
      <Container>
        <h1 className="text-fg mb-6 text-3xl font-medium">{labPage.headline}</h1>
        <p className="text-muted">{labPage.subline}</p>
      </Container>
    </>
  );
}
