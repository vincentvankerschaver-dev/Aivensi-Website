import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Faq } from '@/components/Faq';
import { CareEntries, CarePlans } from '@/components/CarePlans';
import { CARE_FAQ, CARE_LIFE, TRACKS } from '@/lib/care';
import { SITE } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Website Care — onderhoud, monitoring en beveiliging',
  description: 'Updates, beveiliging, back-ups, monitoring en support voor je website of webshop. Website Care vanaf €59/mnd, E-commerce Care vanaf €249/mnd, excl. btw. Maandelijks opzegbaar.',
  alternates: { canonical: '/website-care' },
};

const SCHEMA = [
  {
    '@context': 'https://schema.org', '@type': 'Service', name: 'Website Care', url: `${SITE}/website-care`,
    serviceType: 'Website-onderhoud', provider: { '@type': 'ProfessionalService', name: 'AIVENSI', url: SITE },
    offers: [...TRACKS.web.plans, ...TRACKS.shop.plans].map(p => ({
      '@type': 'Offer', name: p.name, priceCurrency: 'EUR', price: p.price,
      priceSpecification: { '@type': 'UnitPriceSpecification', price: p.price, priceCurrency: 'EUR', unitCode: 'MON', valueAddedTaxIncluded: false, ...(p.from ? { minPrice: p.price } : {}) },
    })),
  },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: CARE_FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
];

export default function WebsiteCare() {
  return (
    <>
      <Nav />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

        <section className="page-cream" aria-labelledby="care-title">
          <div className="wrap" style={{ paddingTop: 'clamp(56px,8vw,112px)', paddingBottom: 'clamp(56px,7vw,96px)' }}>
            <nav aria-label="Kruimelpad" className="t-mono muted crumbs"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/diensten">Diensten</Link><span aria-hidden="true">/</span><span className="accent" aria-current="page">Website Care</span></nav>
            <h1 id="care-title" className="t-hero" style={{ maxWidth: '14ch' }}>Je website verdient onderhoud.</h1>
            <div className="g2" style={{ alignItems: 'end', marginTop: 'clamp(28px,4vw,48px)', paddingTop: 'clamp(20px,2.4vw,28px)', borderTop: '1px solid var(--c-cream-200)' }}>
              <p className="t-serif" style={{ margin: 0, maxWidth: '26ch' }}>Je website bouwen is één ding. Zorgen dat hij blijft werken is iets anders.</p>
              <p className="t-body-lg" style={{ margin: 0, color: 'var(--c-ink-700)', maxWidth: '44ch' }}>Van updates en beveiliging tot back-ups, monitoring en technische ondersteuning. AIVENSI houdt je website gezond terwijl jij je op je bedrijf richt — met één vast aanspreekpunt.</p>
            </div>
            <CareEntries />
            <p className="t-body" style={{ margin: '24px 0 0', color: 'var(--c-ink-700)' }}>Bouwen we je site? Dan zit Care standaard in het voorstel. Jij kiest of je het neemt.</p>
          </div>
        </section>

        <section className="page-cream" aria-labelledby="laag" style={{ background: 'var(--c-cream-100)' }}>
          <div className="wrap" style={{ paddingTop: 'clamp(64px,9vw,128px)', paddingBottom: 'clamp(64px,9vw,128px)' }}>
            <div style={{ display: 'grid', gap: 20, marginBottom: 'clamp(40px,5vw,72px)' }}>
              <p className="t-mono accent" style={{ margin: 0 }}>Geen achtste dienst</p>
              <h2 id="laag" className="t-h3" style={{ margin: 0, maxWidth: '18ch' }}>Zeven kerndiensten. Eén doorlopende laag.</h2>
            </div>
            <div className="care-lifebar" aria-hidden="true">
              <span><span className="t-mono muted">Kerndiensten</span><span style={{ height: 2, background: 'var(--c-ink-900)' }} /></span>
              <span><span className="t-mono accent">Website Care</span><span style={{ height: 2, background: 'var(--c-ember-500)' }} /></span>
            </div>
            <ol className="care-life">
              {CARE_LIFE.map(([tag, t, d, care]) => (
                <li key={t} className={care ? 'is-care' : undefined}>
                  <span className="t-mono">{tag}</span>
                  <strong style={{ fontWeight: 800, fontSize: 'clamp(1.3rem,2vw,1.7rem)', letterSpacing: '-0.025em', lineHeight: 1.05 }}>{t}</strong>
                  <span style={{ fontSize: 14, lineHeight: 1.5 }}>{d}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="pakketten" className="page-ink" aria-labelledby="pk" style={{ scrollMarginTop: 72 }}>
          <div className="wrap" style={{ paddingTop: 'clamp(72px,10vw,144px)', paddingBottom: 'clamp(72px,10vw,144px)' }}>
            <CarePlans />
            <div className="g2" style={{ alignItems: 'center', gap: 'clamp(20px,3vw,48px)', marginTop: 'clamp(40px,5vw,72px)', padding: 'clamp(24px,3vw,36px)', border: '1px solid var(--c-ink-700)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'grid', gap: 12 }}>
                <p className="t-mono accent" style={{ margin: 0 }}>Site niet door ons gebouwd?</p>
                <strong style={{ fontWeight: 800, fontSize: 'clamp(1.3rem,2vw,1.7rem)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>We starten met een instapcheck.</strong>
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                <p className="t-body" style={{ margin: 0, color: 'var(--c-sand-300)', maxWidth: '48ch' }}>We lichten techniek, plugins, hosting en beveiliging door en zeggen eerlijk of Care meteen kan of wat er eerst moet gebeuren. Start je daarna met Care, dan verrekenen we het volledige bedrag.</p>
                <p className="t-mono" style={{ margin: 0, color: 'var(--c-cream-100)' }}>Eenmalig · website €149 · webshop €249 · excl. btw</p>
              </div>
            </div>
          </div>
        </section>

        <section className="page-cream" aria-labelledby="grens" style={{ background: 'var(--c-cream-100)' }}>
          <div className="wrap" style={{ paddingTop: 'clamp(64px,9vw,128px)', paddingBottom: 'clamp(64px,9vw,128px)' }}>
            <div style={{ display: 'grid', gap: 20, marginBottom: 'clamp(32px,4vw,56px)' }}>
              <p className="t-mono accent" style={{ margin: 0 }}>Duidelijke grens</p>
              <h2 id="grens" className="t-h3" style={{ margin: 0, maxWidth: '18ch' }}>Care houdt je site gezond. Nieuwe dingen bouwen we apart.</h2>
            </div>
            <div className="g2 care-split">
              <div style={{ background: 'var(--c-ink-900)', color: 'var(--c-cream-50)' }}>
                <p className="t-mono" style={{ margin: 0, color: 'var(--c-ember-400)' }}>Website Care</p>
                <strong>Onderhoud, monitoring, beveiliging en support.</strong>
                <span className="t-body" style={{ color: 'var(--c-sand-300)', maxWidth: '44ch' }}>Vast bedrag per maand. Alles wat nodig is om wat er staat veilig, snel en werkend te houden.</span>
              </div>
              <div style={{ background: 'var(--c-cream-50)' }}>
                <p className="t-mono muted" style={{ margin: 0 }}>Development</p>
                <strong>Nieuwe functionaliteit, redesigns en maatwerk.</strong>
                <span className="t-body" style={{ color: 'var(--c-ink-700)', maxWidth: '44ch' }}>Apart voorstel per opdracht, zodat je vooraf weet wat het kost. <Link href="/diensten/webdesign-development" className="in-link" style={{ color: 'var(--c-ember-600)' }}>Webdesign &amp; development →</Link></span>
              </div>
            </div>
          </div>
        </section>

        <section id="voorwaarden" className="page-cream" aria-labelledby="cvragen" style={{ scrollMarginTop: 72 }}>
          <div className="wrap g2" style={{ paddingTop: 'clamp(64px,9vw,128px)', paddingBottom: 'clamp(64px,9vw,128px)', gap: 'clamp(32px,5vw,96px)' }}>
            <div style={{ display: 'grid', gap: 20, alignContent: 'start' }}>
              <p className="t-mono accent" style={{ margin: 0 }}>Vragen</p>
              <h2 id="cvragen" className="t-h3" style={{ margin: 0, maxWidth: '14ch' }}>Wat mensen vaak vragen.</h2>
            </div>
            <Faq items={CARE_FAQ} />
          </div>
        </section>
      </main>
      <Footer cta="Laat je site niet verouderen." />
    </>
  );
}
