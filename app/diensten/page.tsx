import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ServiceSidebar } from '@/components/ServiceSidebar';
import { SERVICES, SERVICE_SLUGS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Diensten — zeven diensten, één systeem',
  description: 'Webdesign & development, AI & automatisering, e-commerce, SEO, social & content, digitale strategie en rebranding — als één samenhangend systeem.',
  alternates: { canonical: '/diensten' },
};

export default function Diensten() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="page-cream" aria-labelledby="d-title">
          <div className="wrap" style={{ paddingTop: 'clamp(56px,8vw,112px)', paddingBottom: 'clamp(40px,5vw,64px)' }}>
            <nav aria-label="Kruimelpad" className="t-mono muted crumbs"><Link href="/">Home</Link><span aria-hidden="true">/</span><span className="accent" aria-current="page">Diensten</span></nav>
            <div className="g2" style={{ alignItems: 'end' }}>
              <h1 id="d-title" className="t-hero">Zeven diensten. Eén systeem.</h1>
              <div style={{ display: 'grid', gap: 20 }}>
                <p className="t-serif muted" style={{ margin: 0, maxWidth: '30ch' }}>Los af te nemen, ontworpen om samen te werken.</p>
                <p className="t-body-lg muted" style={{ margin: 0, maxWidth: '44ch' }}>Wat de strategie beslist, bouwt het development; wat we bouwen levert de data voor de volgende stap.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="page-cream" aria-label="Alle diensten">
          <div className="wrap split">
            <ServiceSidebar topic="onze diensten" />
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid var(--c-ink-900)' }}>
              {SERVICE_SLUGS.map(slug => { const s = SERVICES[slug]; return (
                <li key={slug}>
                  <Link href={`/diensten/${slug}`} className="svc-card">
                    <span className="t-mono accent">{s.chain}</span>
                    <span className="t-h3" style={{ fontSize: 'clamp(1.6rem,3vw,2.6rem)' }}>{s.name}</span>
                    <span className="t-serif muted" style={{ fontSize: 'clamp(1.1rem,1.6vw,1.35rem)', maxWidth: '34ch' }}>{s.lead}</span>
                    <span className="t-body muted" style={{ maxWidth: '56ch' }}>{s.intro}</span>
                    <span className="link" style={{ justifySelf: 'start' }}>Meer over {s.name.toLowerCase()} <span aria-hidden="true">→</span></span>
                  </Link>
                </li>
              ); })}
              <li>
                <Link href="/website-care" className="svc-card">
                  <span className="t-mono accent">Doorlopend · na de lancering</span>
                  <span className="t-h3" style={{ fontSize: 'clamp(1.6rem,3vw,2.6rem)' }}>Website Care</span>
                  <span className="t-body muted" style={{ maxWidth: '56ch' }}>Geen achtste dienst, maar de laag eronder: onderhoud, monitoring, beveiliging en support. Websites vanaf €59/mnd, webshops vanaf €249/mnd, excl. btw.</span>
                  <span className="link" style={{ justifySelf: 'start' }}>Bekijk Website Care <span aria-hidden="true">→</span></span>
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer cta="Weet je niet waar te beginnen? Dan beginnen we daar." />
    </>
  );
}
