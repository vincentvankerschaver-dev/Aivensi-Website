import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ContactTabs } from '@/components/ContactTabs';
import { Vraagbox } from '@/components/Vraagbox';
import { Faq } from '@/components/Faq';
import { CONTACT_FAQ } from '@/lib/faq';

export const metadata: Metadata = {
  title: 'Plan een gesprek',
  description: 'Dertig minuten, aan tafel in het Waasland of online. Vertel kort waar je staat — antwoord binnen twee werkdagen.',
  alternates: { canonical: '/contact' },
};

const SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: CONTACT_FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };

export default function Contact() {
  return (
    <>
      <Nav />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <section className="page-cream" aria-labelledby="contact-title">
          <div className="wrap" style={{ paddingTop: 'clamp(64px,9vw,128px)', paddingBottom: 'clamp(64px,9vw,128px)' }}>
            <nav aria-label="Kruimelpad" className="t-mono muted crumbs"><Link href="/">Home</Link><span aria-hidden="true">/</span><span className="accent" aria-current="page">Plan een gesprek</span></nav>
            <div className="g2 c-grid" style={{ alignItems: 'end', marginBottom: 'clamp(48px,7vw,96px)' }}>
              <h1 id="contact-title" className="t-hero">Eén gesprek.<br />Geen pitch.</h1>
              <div style={{ display: 'grid', gap: 20 }}>
                <p className="t-serif" style={{ margin: 0, color: 'var(--c-ink-700)', maxWidth: '30ch' }}>Dertig minuten, aan tafel of online.</p>
                <p className="t-meta muted" style={{ margin: 0 }}>Antwoord binnen twee werkdagen</p>
              </div>
            </div>
            <div className="g2 c-grid" style={{ gap: 'clamp(40px,6vw,112px)' }}>
              <div className="side c-side" style={{ display: 'grid', gap: 28 }}>
                <p className="t-body-lg" style={{ margin: 0, color: 'var(--c-ink-700)', maxWidth: '44ch' }}>We bespreken wat er vandaag niet werkt, wat het moet opleveren en waaraan we dat meten. Daarna volgt een voorstel — of niet, als het niet past.</p>
                <dl className="t-body" style={{ margin: 0, display: 'grid', gridTemplateColumns: '110px minmax(0,1fr)', gap: '14px 20px', paddingTop: 28, borderTop: '1px solid var(--c-ink-900)' }}>
                  <dt className="t-meta muted" style={{ paddingTop: 3 }}>Locatie</dt><dd style={{ margin: 0 }}>Waasmunster, Waasland</dd>
                  <dt className="t-meta muted" style={{ paddingTop: 3 }}>Werkgebied</dt><dd style={{ margin: 0 }}>Waasland, Vlaanderen en digitaal overal</dd>
                  <dt className="t-meta muted" style={{ paddingTop: 3 }}>Gesprek</dt><dd style={{ margin: 0 }}>Aan tafel of online, 30 minuten, gratis</dd>
                </dl>
              </div>
              <ContactTabs />
            </div>
            <div style={{ marginTop: 'clamp(48px,7vw,96px)' }}>
              <Vraagbox enabled={!!process.env.ANTHROPIC_API_KEY} context="contactpagina" eyebrow="Nog niet klaar voor een gesprek?" placeholder="Bv. is AI iets voor een bedrijf van 12 mensen?" examples={['Is AI iets voor een bedrijf van 12 mensen?', 'Wat gebeurt er na het eerste gesprek?', 'Werken jullie ook in Gent?']} />
            </div>
          </div>
        </section>
        <section className="page-cream" aria-labelledby="c-faq" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="wrap split" style={{ gridTemplateColumns: 'minmax(0,4fr) minmax(0,8fr)' }}>
            <div style={{ display: 'grid', gap: 20, alignContent: 'start' }}>
              <p className="t-mono accent" style={{ margin: 0 }}>Voor je contact opneemt</p>
              <h2 id="c-faq" className="t-h4 sec-h" style={{ maxWidth: '14ch' }}>Veelgestelde vragen</h2>
            </div>
            <Faq items={CONTACT_FAQ} />
          </div>
        </section>
      </main>
      <Footer cta="Liever meteen een moment kiezen?" />
    </>
  );
}
