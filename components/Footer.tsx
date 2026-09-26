'use client';
/**
 * Footer. variant 'mark' (standaard op alle pagina's): serif karaoke-kop + beeldmerk gecentreerd achter de ember-bol.
 * 'plain': kop + knop. cta={null}: alleen de footerbalk.
 * Karaoke: woorden lichten op zodra de kop voor 60% in beeld is (IO, eenmalig). Magneet op de bol: alleen bij pointer, uit bij reduced motion.
 */
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { COMPANY } from '@/lib/legal';
import { SERVICES, SERVICE_SLUGS } from '@/lib/content';

const NAV: [string, string][] = [['/werk', 'Werk'], ['/insights', 'Inzichten'], ['/over', 'Over'], ['/regio/waasland', 'Waasland'], ['/contact', 'Contact']];

function Round() {
  const [m, setM] = useState({ x: 0, y: 0 });
  return (
    <Link href="/contact" className="ftr-round"
      onMouseMove={e => { if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; const r = e.currentTarget.getBoundingClientRect(); setM({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25 }); }}
      onMouseLeave={() => setM({ x: 0, y: 0 })}
      style={{ transform: `translate(${m.x}px,${m.y}px)` }}>
      <span>Plan een<br />gesprek <span aria-hidden="true">→</span></span>
    </Link>
  );
}

function Karaoke({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.removeAttribute('data-in');
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting || e.boundingClientRect.bottom < 0) { el.setAttribute('data-in', ''); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [text]);
  return (
    <h2 ref={ref} id="footer-cta" className="ftr-kar" aria-label={text}>
      {text.split(' ').map((w, i) => <span key={`${w}-${i}`} aria-hidden="true" className="ftr-w" style={{ transitionDelay: `${(0.15 + i * 0.16).toFixed(2)}s` }}>{w} </span>)}
    </h2>
  );
}

export function Footer({ cta = 'Laten we iets bouwen dat werkt.', variant = 'mark' }: { cta?: string | null; variant?: 'mark' | 'plain' }) {
  return (
    <div className="page-ink ftr">
      {cta && variant === 'mark' && (
        <section className="wrap ftr-mark" aria-labelledby="footer-cta">
          <Karaoke text={cta} />
          <div className="ftr-stage">
            {/* Beeldmerk: tekent zich één keer zodra de kop in beeld is; bij hover/focus op de bol klikken de schakels vast (optie 1f) */}
            <svg aria-hidden="true" viewBox="0 12 64 42" preserveAspectRatio="xMidYMid meet" className="ftr-svg ftr-mk">
              <rect className="fill" x="28" y="18" width="8" height="30" fill="var(--c-ember-500)" />
              <g className="gl"><rect className="ln" pathLength={1} x="6" y="18" width="30" height="30" rx="4" fill="none" stroke="var(--c-cream-50)" strokeWidth="3" /></g>
              <g className="gr"><rect className="ln ln-r" pathLength={1} x="28" y="18" width="30" height="30" rx="4" fill="none" stroke="var(--c-ember-500)" strokeWidth="3" /></g>
            </svg>
            <Round />
          </div>
        </section>
      )}
      {cta && variant === 'plain' && (
        <section className="wrap" aria-labelledby="footer-cta" style={{ paddingTop: 'clamp(80px,11vw,160px)' }}>
          <h2 id="footer-cta" className="t-h2">{cta}</h2>
          <p style={{ marginTop: 'clamp(32px,5vw,56px)' }}><Link href="/contact" className="btn">Plan een gesprek <span aria-hidden="true">→</span></Link></p>
        </section>
      )}
      <footer className="wrap ftr-bar" style={{ marginTop: cta && variant === 'mark' ? 'clamp(24px,3vw,40px)' : 'clamp(72px,10vw,144px)' }}>
        <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26, lineHeight: 1 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/aivensi-mark-light.svg" alt="" width={40} height={40} style={{ display: 'block' }} />AIVENSI
          </Link>
          <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--c-sand-300)' }}>Digitale groei, versterkt door AI.</span>
        </div>
        <nav aria-label="Diensten" style={{ display: 'flex', flexDirection: 'column', fontSize: 15, fontWeight: 600 }}>
          <Link href="/diensten" className="t-meta" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, color: 'var(--c-ember-400)' }}>Diensten</Link>
          {SERVICE_SLUGS.map(s => <Link key={s} href={`/diensten/${s}`} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 40, color: 'var(--c-cream-50)' }}>{SERVICES[s].name}</Link>)}
        </nav>
        <nav aria-label="Footer" style={{ display: 'flex', flexDirection: 'column', fontSize: 15, fontWeight: 600 }}>
          {NAV.map(([h, l]) => <Link key={h} href={h} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, color: 'var(--c-cream-50)' }}>{l}</Link>)}
        </nav>
        <div className="t-meta" style={{ display: 'grid', gap: 12, alignContent: 'start', color: 'var(--c-sand-300)', lineHeight: 1.7 }}>
          <Link href="/regio/waasland" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, color: 'var(--c-sand-300)' }}>Waasmunster · Waasland · België <span aria-hidden="true" style={{ marginLeft: 6 }}>→</span></Link>
        </div>
        <div className="ftr-base t-note">
          <span>© 2026 {COMPANY.legal} · {COMPANY.street}, {COMPANY.postal} {COMPANY.city} · Ond.nr. {COMPANY.kbo}</span>
          <nav aria-label="Juridisch" className="ftr-legal">
            <Link href="/privacy">Privacybeleid</Link>
            <Link href="/privacy#cookies">Cookies</Link>
            <Link href="/voorwaarden">Algemene voorwaarden</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
