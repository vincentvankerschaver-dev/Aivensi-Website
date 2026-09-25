import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { SectionIntro } from '@/components/SectionIntro';
import { INSIGHTS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Korte, praktische stukken over websites, AI, SEO en samenhang — uit projecten, niet uit trendrapporten.',
  alternates: { canonical: '/insights' },
};

export default function Insights() {
  return (
    <>
      <Nav />
      <main id="main">
        <SectionIntro eyebrow="Insights" title="Wat we leren, schrijven we op." tone="cream">
          <p className="t-body-lg muted" style={{ margin: 0 }}>Korte, praktische stukken over websites, AI, SEO en samenhang — uit projecten, niet uit trendrapporten.</p>
        </SectionIntro>
        <section className="page-cream" aria-label="Artikelen">
          <div className="wrap" style={{ paddingBottom: 'clamp(64px,9vw,128px)' }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid var(--c-ink-900)' }}>
              {INSIGHTS.map(p => (
                <li key={p.slug} className="svc-row" style={{ cursor: 'default' }}>
                  <span className="t-meta accent">{p.idx}</span>
                  <h2 className="t-h4" style={{ margin: 0, fontSize: 'clamp(1.3rem,2.4vw,2.1rem)' }}>{p.title}</h2>
                  <span className="t-body muted svc-hide">{p.blurb}</span>
                  <span className="t-meta muted svc-hide" style={{ whiteSpace: 'nowrap' }}>{p.tag} · Binnenkort</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer cta="Liever een gesprek dan een artikel?" />
    </>
  );
}
