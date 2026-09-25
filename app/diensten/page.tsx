import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { SectionIntro } from '@/components/SectionIntro';
import { ServiceRow } from '@/components/ServiceRow';
import { SERVICES } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Diensten — zeven capabilities, één systeem',
  description: 'Webdesign & development, AI & automatisering, e-commerce, SEO, social & content, digitale strategie en rebranding — als één samenhangend systeem.',
  alternates: { canonical: '/diensten' },
};

export default function Diensten() {
  return (
    <>
      <Nav />
      <main id="main">
        <SectionIntro eyebrow="Diensten" title="Zeven capabilities. Eén systeem." serif="Geen losse diensten die je apart inkoopt.">
          <p className="t-body-lg muted" style={{ margin: 0 }}>Elke capability heeft een plek in de lijn van strategie tot groei. Je kan met één beginnen — maar ze zijn ontworpen om samen te werken.</p>
        </SectionIntro>
        <section className="page-cream" aria-label="Alle diensten">
          <div className="wrap" style={{ paddingTop: 'clamp(56px,8vw,112px)', paddingBottom: 'clamp(56px,8vw,112px)' }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid var(--c-ink-900)' }}>
              {Object.entries(SERVICES).map(([slug, s]) => <ServiceRow key={slug} slug={slug} idx={s.idx} name={s.name} lead={s.lead} chain={s.chain} />)}
            </ul>
          </div>
        </section>
      </main>
      <Footer cta="Weet je niet waar te beginnen? Dan beginnen we daar." />
    </>
  );
}
