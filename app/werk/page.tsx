import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { SectionIntro } from '@/components/SectionIntro';
import { CaseCard } from '@/components/CaseCard';
import { CASES } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Werk',
  description: 'Twee projecten waarin strategie, design, development en AI samen één geheel vormen: Ginkgo Tree en EMSRO.',
  alternates: { canonical: '/werk' },
};

export default function Werk() {
  return (
    <>
      <Nav />
      <main id="main">
        <SectionIntro eyebrow="Werk" title="Gebouwd. Getest. In gebruik." serif="Geen portfolio. Twee projecten en wat ze ons leerden.">
          <p className="t-body-lg muted" style={{ margin: 0 }}>Strategie, design, development en AI die samen één geheel vormen.</p>
        </SectionIntro>
        <section className="page-cream" aria-label="Cases">
          <div className="wrap" style={{ paddingTop: 'clamp(64px,9vw,128px)', paddingBottom: 'clamp(64px,9vw,128px)', display: 'grid', gap: 'clamp(64px,9vw,128px)' }}>
            <div className="cases">{CASES.map(c => <CaseCard key={c.slug} c={c} />)}</div>
            <p className="t-serif" style={{ margin: 0 }}>Geen mockups. Geen beloftes. Werk.</p>
          </div>
        </section>
      </main>
      <Footer cta="Jouw project als volgende case?" />
    </>
  );
}
