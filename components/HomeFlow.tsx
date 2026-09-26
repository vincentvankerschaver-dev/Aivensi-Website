'use client';
/**
 * Homepage v4 — "De vraag eerst": vraag → antwoord (+ wat hierbij hoort) → wie → en daarna (Care) → slotzin.
 * State verandert alleen bij een klik — nooit tijdens scroll.
 * Keuze wordt enkel hersteld bij terug/vooruit (sessionStorage); een verse bezoek begint leeg.
 * De footer-slotzin volgt de gekozen vraag.
 */
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ANSWERS, CAP, CHOICES, GOOD, SERVICES, SERVICE_SLUGS, type Key } from '@/lib/content';
import { ScrollStage } from './ScrollStage';
import { Karaoke } from './Karaoke';
import { CareLayer } from './CareLayer';
import { Footer } from './Footer';
import { Snelcheck } from './Snelcheck';
import { store } from '@/lib/storage';
import { track } from '@/lib/track';

// Welke snelle check bij welke vraag hoort (op de homepage, onder het antwoord).
const CHECK_FOR: Partial<Record<Key, string>> = { gevonden: 'seo', gedaan: 'ai-automatisering', verkopen: 'e-commerce', sterker: 'digitale-strategie' };

const SK = 'aivensi-q', SK_OWN = 'aivensi-q-own';

export function HomeFlow() {
  const [key, setKey] = useState<Key | null>(null);
  const [typed, setTyped] = useState('');
  const [own, setOwn] = useState('');
  const [hover, setHover] = useState<Key | null>(null);
  const [live, setLive] = useState('');
  const ansRef = useRef<HTMLElement>(null), titleRef = useRef<HTMLHeadingElement>(null), resetRef = useRef<HTMLButtonElement>(null);

  const reset = () => {
    store.remove(SK, SK_OWN);
    setKey(null); setTyped(''); setHover(null); setLive('Vraag hersteld.');
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const back = nav?.type === 'back_forward';
    const k = back ? (store.get(SK) as Key | null) : null;
    if (!back) { store.remove(SK, SK_OWN); }
    if (k && ANSWERS[k]) { setKey(k); setTyped(store.get(SK_OWN) || ''); setTimeout(() => resetRef.current?.focus({ preventScroll: true }), 100); }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || !store.get(SK)) return;
      store.remove(SK, SK_OWN);
      setKey(null); setTyped(''); setHover(null); setLive('Vraag hersteld.');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const pick = (k: Key, text: string, srcEl: Element | null) => {
    store.set(SK, k); store.set(SK_OWN, text);
    track({ name: 'vraag_gekozen', props: { vraag: k } });
    const src = srcEl?.getBoundingClientRect();
    setKey(k); setTyped(text); setOwn(''); setHover(null);
    setLive('Antwoord geladen: ' + (k === 'own' ? text || 'jouw vraag' : ANSWERS[k].label.toLowerCase()) + '.');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Na de render: de gekozen tekst vliegt naar de antwoordkop (eenmalig, transform-only), dan één scroll.
    requestAnimationFrame(() => {
      const ans = ansRef.current, t = titleRef.current; if (!ans || !t) return;
      const top = ans.getBoundingClientRect().top + window.scrollY - 72;
      if (reduce || !src) { window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' }); return; }
      const d = t.getBoundingClientRect(), cs = getComputedStyle(t), g = document.createElement('div');
      g.textContent = t.textContent; g.setAttribute('aria-hidden', 'true');
      Object.assign(g.style, { position: 'absolute', left: d.left + scrollX + 'px', top: d.top + scrollY + 'px', width: d.width + 'px', fontFamily: cs.fontFamily, fontWeight: cs.fontWeight, fontSize: cs.fontSize, lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing, color: 'var(--c-cream-50)', zIndex: '60', pointerEvents: 'none', transformOrigin: 'left top', margin: '0', willChange: 'transform' });
      g.style.transform = `translate(${src.left - d.left}px, ${src.top - d.top}px) scale(${Math.max(0.15, src.height / d.height)})`;
      t.style.opacity = '0'; document.body.appendChild(g);
      requestAnimationFrame(() => { g.style.transition = 'transform 480ms cubic-bezier(.2,.7,.2,1), color 480ms'; g.style.transform = 'none'; g.style.color = cs.color; window.scrollTo({ top, behavior: 'smooth' }); });
      setTimeout(() => { g.remove(); t.style.opacity = ''; }, 520);
    });
  };

  const chosen = !!key, a = ANSWERS[key ?? 'own'];
  const word = hover ? ANSWERS[hover].word : chosen && key !== 'own' ? a.word : 'beter werken';
  const title = !chosen ? 'Nog geen vaste vraag. Prima.' : key === 'own' ? `“${typed}”` : `${a.label}.`;
  const capSlugs = a.caps.map(k => CAP[k].slug) as string[];
  const rest = SERVICE_SLUGS.filter(s => !capSlugs.includes(s));

  return (
    <>
      <p className="sr" aria-live="polite">{live}</p>
      <ScrollStage initial="ink">
        {/* 01 De vraag */}
        <section data-scroll-stage data-stage="ink" className="wrap q-hero" aria-labelledby="vraag">
          <div className="q-center">
            {/* H1 = wat AIVENSI is (zoekwoorden); de grote vraag is de visuele kop */}
            <h1 className="q-kicker">Digitale studio in Waasmunster voor websites, webshops, AI en automatisering.</h1>
            <div style={{ display: 'grid', width: '100%' }}>
              <p aria-hidden="true" className="t-display q-title" style={{ gridArea: '1/1', visibility: 'hidden', margin: 0 }}>Wat moet digitaal makkelijker gevonden worden?</p>
              <p id="vraag" className="t-display q-title" style={{ gridArea: '1/1', justifySelf: 'center', margin: 0 }}>
                Wat moet digitaal <span style={{ color: 'var(--c-ember-400)' }}>{word}?</span>
              </p>
            </div>
            <div role="group" aria-label="Kies wat digitaal beter moet werken" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>
              <p className="t-body-lg muted" style={{ margin: 0 }}>Kies waar je wil beginnen.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
                {CHOICES.map(k => (
                  <button key={k} type="button" className="choice" aria-pressed={key === k} onClick={e => pick(k, '', e.currentTarget.firstElementChild)}
                    onMouseEnter={() => setHover(k)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(k)} onBlur={() => setHover(null)}>
                    <span>{ANSWERS[k].label}</span>
                  </button>
                ))}
              </div>
              <form onSubmit={e => { e.preventDefault(); if (own.trim()) pick('own', own.trim(), e.currentTarget.querySelector('input')); }} style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 520, textAlign: 'left' }}>
                <label htmlFor="andere" className="t-mono muted">Andere vraag</label>
                <div className="field">
                  <input id="andere" value={own} onChange={e => setOwn(e.target.value)} placeholder="Typ wat er beter moet…" autoComplete="off" maxLength={140} />
                  <button type="submit">Ga →</button>
                </div>
              </form>
            </div>
          </div>
          <div className="t-meta" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, color: 'var(--c-sand-300)' }}>
            <span style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px' }}>Recent werk: <Link href="/werk/ginkgo-tree" style={{ color: 'var(--stage-fg)', borderBottom: '1px solid var(--c-ink-600)' }}>Ginkgo Tree</Link><span aria-hidden="true">·</span><Link href="/werk/emsro" style={{ color: 'var(--stage-fg)', borderBottom: '1px solid var(--c-ink-600)' }}>EMSRO</Link><Link href="/werk" className="accent">Alle werk →</Link></span>
            <span className="t-note" style={{ textTransform: 'none', letterSpacing: 0 }}>{chosen ? '↓ Het antwoord' : 'Kies of typ — de pagina vormt zich rond je antwoord'}</span>
          </div>
        </section>

        {/* 02 Het antwoord */}
        <section ref={ansRef} id="antwoord" data-scroll-stage data-stage="cream" className="wrap home-sec" aria-labelledby="antwoord-titel">
          <p className="t-mono accent" style={{ margin: '0 0 32px' }}>{chosen ? 'Jouw vraag' : 'Zonder vaste vraag'}</p>
          <h2 ref={titleRef} id="antwoord-titel" className="t-h2" style={{ margin: 0 }}>{title}</h2>
          <p className="t-serif" style={{ margin: '24px 0 0', color: 'var(--c-ink-700)' }}>{a.sub}</p>
          <div className="g2" style={{ marginTop: 'clamp(32px,5vw,56px)' }}>
            <p className="t-body-lg" style={{ margin: 0, color: 'var(--c-ink-700)', maxWidth: '44ch' }}>{a.body}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20 }}>
              <Link href="/contact" className="btn">Plan een gesprek <span aria-hidden="true">→</span></Link>
              {a.link[1].startsWith('http')
                ? <a href={a.link[1]} target="_blank" rel="noopener" className="link">{a.link[0]} <span aria-hidden="true">↗</span></a>
                : <Link href={a.link[1]} className="link">{a.link[0]} <span aria-hidden="true">→</span></Link>}
              {chosen && <button ref={resetRef} type="button" onClick={reset} className="t-meta muted" style={{ background: 'none', border: 0, padding: '8px 0', minHeight: 44, cursor: 'pointer' }}>Andere vraag ↺</button>}
            </div>
          </div>

          <div style={{ marginTop: 'clamp(64px,9vw,128px)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px 24px', paddingBottom: 16, borderBottom: '1px solid var(--c-ink-900)' }}>
              <h3 className="t-h4" style={{ margin: 0 }}>Wat hierbij hoort</h3>
              <span className="t-mono muted">{chosen ? 'Voor deze vraag' : 'Waar de meesten beginnen'}</span>
            </div>
            <div className="fit">
              <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {a.caps.map(k => (
                  <li key={k}>
                    <Link href={`/diensten/${CAP[k].slug}`} className="fit-row">
                      <span style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <span className="fit-name">{CAP[k].name}</span>
                        <span className="t-body-lg" style={{ color: 'var(--c-ink-700)', maxWidth: '44ch' }}>{CAP[k].line}</span>
                      </span>
                      <span className="fit-arrow" aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ol>
              <aside aria-label="Rest van het systeem" style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 'clamp(24px,3vw,40px)' }}>
                <p className="t-mono muted" style={{ margin: 0 }}>Rest van het systeem</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid var(--c-cream-200)' }}>
                  {rest.map(s => (
                    <li key={s}><Link href={`/diensten/${s}`} className="rest-row"><span>{SERVICES[s].name}</span><span className="rest-arrow" aria-hidden="true">→</span></Link></li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
          {key && CHECK_FOR[key] && (
            <div style={{ marginTop: 'clamp(48px,7vw,96px)' }}>
              <Snelcheck key={key} slug={CHECK_FOR[key]!} serviceName={SERVICES[CHECK_FOR[key]!].name} />
            </div>
          )}
        </section>

        {/* 03 Wie is AIVENSI */}
        <section data-scroll-stage data-stage="ink" className="wrap home-sec" aria-labelledby="wie">
          <div className="who" style={{ alignItems: 'end', marginBottom: 'clamp(48px,7vw,104px)' }}>
            <div style={{ position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden', maxWidth: 420, background: 'var(--c-ink-800)', border: '1px solid var(--c-ink-700)' }}>
              <Image src="/vincent.jpg" alt="Vincent, oprichter van AIVENSI" fill sizes="(max-width: 900px) 100vw, 420px" style={{ objectFit: 'cover', objectPosition: '60% 20%' }} />
            </div>
            <div style={{ display: 'grid', gap: 24 }}>
              <p className="t-mono accent" style={{ margin: 0 }}>Wie is AIVENSI</p>
              <Karaoke as="h2" id="wie" tone="ink" className="t-h3" text="Een digitale studio in Waasmunster, geleid door Vincent." />
              <p className="t-body-lg muted" style={{ margin: 0 }}>Eén vast aanspreekpunt voor strategie, design, development en AI, met freelance specialisten waar een project dat vraagt.</p>
              <p className="t-body-lg" style={{ margin: 0 }}>Uit Waasmunster. Aan het werk in de hele buurt.</p>
              <Link href="/over" className="link" style={{ justifySelf: 'start' }}>Meer over AIVENSI <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <h3 className="t-serif" style={{ margin: 0, fontWeight: 400, fontSize: 'clamp(1.6rem,3vw,2.6rem)', lineHeight: 1.1, paddingBottom: 16, borderBottom: '1px solid var(--c-ink-700)', maxWidth: 'none' }}>Waar we goed in zijn</h3>
          <ul className="good">
            {GOOD.map(([h, t]) => (
              <li key={h}>
                <strong style={{ fontWeight: 800, fontSize: 'clamp(1.3rem,2vw,1.7rem)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>{h}</strong>
                <span className="t-body muted" style={{ maxWidth: '44ch' }}>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 04 En daarna? — Care-laag */}
        <section data-scroll-stage data-stage="cream" className="wrap home-sec" aria-labelledby="care">
          <CareLayer />
        </section>

        {/* 05 Slotzin per gekozen vraag */}
        <div data-scroll-stage data-stage="ink"><Footer cta={a.cta} /></div>
      </ScrollStage>
    </>
  );
}
