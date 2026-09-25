import Image from 'next/image';
import Link from 'next/link';
import { ScrollStage } from '@/components/ScrollStage';
import { Reveal } from '@/components/Reveal';
import { Question } from '@/components/Question';
import { Waasland } from '@/components/Waasland';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { CASES } from '@/lib/content';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
      <ScrollStage initial="ink">
        {/* Stage 1 (ink) + Stage 2 (cream) */}
        <Question />

        {/* Stage 3 — INK */}
        <section data-scroll-stage data-stage="ink" className="stage-section wrap" aria-labelledby="bewijs">
          <p className="t-mono accent">01 — Bewijs</p>
          <Reveal as="h2" id="bewijs" className="t-h2">Gebouwd. Getest. In gebruik.</Reveal>
          <div className="cases" style={{ marginTop: 'clamp(24px,4vw,48px)' }}>
            {CASES.map(c => (
              <article key={c.slug} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Link href={`/werk/${c.slug}`} aria-label={`Case ${c.name}`} style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', background: 'var(--c-ink-800)', border: '1px solid var(--c-ink-700)', display: 'block' }}>
                  {c.img && <Image src={c.img} alt={c.alt} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover', objectPosition: 'top left' }} />}
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'baseline' }}>
                  <h3 className="t-h4">{c.name}</h3>
                  <span className="t-meta muted">{c.meta}</span>
                </div>
                <p className="t-serif" style={{ fontSize: 'var(--t-serif)' }}>{c.tag}</p>
                <p className="t-body muted">{c.body}</p>
              </article>
            ))}
          </div>
          <p className="t-serif rule" style={{ paddingTop: 28, marginTop: 'clamp(24px,4vw,48px)' }}>Geen mockups. Geen beloftes. Werk.</p>
        </section>

        {/* Stage 4 — CREAM */}
        <section data-scroll-stage data-stage="cream" className="stage-section wrap" aria-labelledby="waasland">
          <div className="g2" style={{ alignItems: 'center', gap: 'clamp(32px,5vw,96px)' }}>
            <div style={{ display: 'grid', gap: 20 }}>
              <p className="t-mono accent">02 — Dichtbij</p>
              <Reveal as="h2" id="waasland" className="t-h3">Uit Waasmunster. Voor het Waasland.</Reveal>
              <p className="t-body muted">Aan tafel in Sint-Niklaas, Lokeren of Temse. Online overal.</p>
              <p className="t-serif" style={{ fontSize: 'var(--t-serif)' }}>Dichtbij genoeg om te begrijpen. Breed genoeg om te bouwen.</p>
            </div>
            <Waasland />
          </div>
        </section>

        {/* Stage 5 — INK */}
        <section data-scroll-stage data-stage="ink" className="stage-section wrap" aria-labelledby="wie">
          <div className="who">
            <div style={{ position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden', maxWidth: 420, border: '1px solid var(--c-ink-700)' }}>
              <Image src="/vincent.jpg" alt="Vincent, oprichter van AIVENSI" fill sizes="(max-width: 900px) 100vw, 420px" style={{ objectFit: 'cover', objectPosition: '60% 20%' }} />
            </div>
            <div style={{ display: 'grid', gap: 24 }}>
              <p className="t-mono accent">03 — Wie</p>
              <Reveal as="h2" id="wie" className="t-h3">Ik ben Vincent. Ik bouw AIVENSI.</Reveal>
              <p className="t-body-lg muted">Eén persoon. Strategie, design, code en AI in dezelfde handen. Dus niets valt tussen de stoelen.</p>
              <blockquote className="t-serif rule" style={{ margin: 0, paddingTop: 24 }}>“Technologie is pas waardevol als ze iets vooruit helpt.”</blockquote>
              <Link href="/over" className="link" style={{ justifySelf: 'start' }}>Meer over de aanpak <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        {/* Stage 6 — CREAM */}
        <section data-scroll-stage data-stage="cream" className="stage-section wrap" aria-labelledby="gesprek" style={{ minHeight: '80svh' }}>
          <Reveal as="h2" id="gesprek" className="t-h2">Wil je dat dit beter werkt?</Reveal>
          <p><Link href="/contact" className="btn">Plan een gesprek <span aria-hidden="true">→</span></Link></p>
        </section>
        <div data-scroll-stage data-stage="cream"><Footer cta={null} tone="cream" /></div>
      </ScrollStage>
      </main>
    </>
  );
}
