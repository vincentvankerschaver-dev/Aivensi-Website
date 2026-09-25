import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Waasland } from '@/components/Waasland';
import { CASES, TOWNS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Waasland — digitale studio uit Waasmunster',
  description: 'AIVENSI werkt vanuit Waasmunster voor bedrijven in het Waasland: Sint-Niklaas, Beveren, Lokeren, Temse, Stekene, Kruibeke, Zwijndrecht, Hamme en Moerbeke.',
  alternates: { canonical: '/regio/waasland' },
};

export default function Regio() {
  const gt = CASES[0];
  return (
    <>
      <Nav />
      <main id="main">
        <section className="page-cream" aria-labelledby="regio-title">
          <div className="wrap g2" style={{ paddingTop: 'clamp(64px,9vw,128px)', paddingBottom: 'clamp(64px,9vw,128px)', alignItems: 'center', gap: 'clamp(32px,5vw,96px)' }}>
            <div style={{ display: 'grid', gap: 24 }}>
              <p className="t-mono accent" style={{ margin: 0 }}>Regio</p>
              <h1 id="regio-title" className="t-h2">Uit Waasmunster. Voor het Waasland.</h1>
              <p className="t-body-lg muted" style={{ margin: 0 }}>Aan tafel in Sint-Niklaas, Lokeren of Temse. Online overal.</p>
              <p className="t-serif" style={{ margin: 0, fontSize: 'var(--t-serif)' }}>Dichtbij genoeg om te begrijpen. Breed genoeg om te bouwen.</p>
            </div>
            <div className="stage" data-stage="cream" style={{ '--stage-bg': 'var(--c-cream-50)', '--stage-fg': 'var(--c-ink-900)', '--stage-muted': 'var(--c-ink-600)', '--stage-accent': 'var(--c-ember-600)' } as React.CSSProperties}>
              <Waasland />
            </div>
          </div>
        </section>
        <section className="page-ink" aria-labelledby="gemeenten">
          <div className="wrap" style={{ paddingTop: 'clamp(64px,9vw,128px)', paddingBottom: 'clamp(64px,9vw,128px)' }}>
            <h2 id="gemeenten" className="t-h3" style={{ margin: '0 0 clamp(32px,5vw,56px)' }}>Waar we aan tafel zitten</h2>
            <ul className="t-meta" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '0 32px' }}>
              {TOWNS.map(([name, , , km], i) => (
                <li key={name} className="rule" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '16px 0' }}>
                  <span style={{ color: i === 0 ? 'var(--c-ember-400)' : 'inherit' }}>{name}</span><span className="muted">{i === 0 ? 'thuisbasis' : `${km} km`}</span>
                </li>
              ))}
            </ul>
            <p className="t-body muted" style={{ margin: 'clamp(32px,5vw,56px) 0 0', maxWidth: '52ch' }}>Een bedrijf uit de streek dat we bouwden: <Link href={`/werk/${gt.slug}`} className="link">{gt.name} in Waasmunster →</Link></p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
