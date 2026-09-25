import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Plan een gesprek',
  description: 'Dertig minuten, aan tafel in het Waasland of online. Vertel kort waar je staat — antwoord binnen twee werkdagen.',
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="page-cream" aria-labelledby="contact-title">
          <div className="wrap" style={{ paddingTop: 'clamp(64px,9vw,128px)', paddingBottom: 'clamp(64px,9vw,128px)' }}>
            <p className="t-mono accent" style={{ margin: '0 0 40px' }}>Start een gesprek</p>
            <div className="g2" style={{ gridTemplateColumns: 'minmax(0,5fr) minmax(0,7fr)', gap: 'clamp(40px,6vw,112px)' }}>
              <div style={{ display: 'grid', gap: 28 }}>
                <h1 id="contact-title" className="t-h2">Plan een gesprek.</h1>
                <p className="t-body-lg muted" style={{ margin: 0 }}>Dertig minuten, aan tafel of online. Antwoord binnen twee werkdagen.</p>
                <dl className="t-body" style={{ margin: 0, display: 'grid', gridTemplateColumns: '110px minmax(0,1fr)', gap: '14px 20px', paddingTop: 28, borderTop: '1px solid var(--c-ink-900)' }}>
                  <dt className="t-meta muted" style={{ paddingTop: 3 }}>Locatie</dt><dd style={{ margin: 0 }}>Waasmunster, Waasland</dd>
                  <dt className="t-meta muted" style={{ paddingTop: 3 }}>Werkgebied</dt><dd style={{ margin: 0 }}>Waasland, Vlaanderen en digitaal overal</dd>
                  <dt className="t-meta muted" style={{ paddingTop: 3 }}>Gesprek</dt><dd style={{ margin: 0 }}>Aan tafel of online, 30 minuten, gratis</dd>
                </dl>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer cta="Of bekijk eerst het werk." />
    </>
  );
}
