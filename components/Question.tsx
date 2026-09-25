'use client';
/**
 * Stage 1 + 2: de vraag en het dynamische antwoord.
 * State verandert alleen bij een klik — nooit tijdens scroll.
 * Sessie-herstel via sessionStorage (alleen de keuze; geen persistente opslag).
 */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ANSWERS, CAP, CHOICES, type Key } from '@/lib/content';
import { Reveal } from './Reveal';

export function Question() {
  const [key, setKey] = useState<Key | null>(null);
  const [typed, setTyped] = useState('');
  const [own, setOwn] = useState('');
  const [hover, setHover] = useState<Key | null>(null);
  const [live, setLive] = useState('');

  useEffect(() => {
    const k = sessionStorage.getItem('aivensi-q') as Key | null;
    if (k && ANSWERS[k]) { setKey(k); setTyped(sessionStorage.getItem('aivensi-q-own') || ''); }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      sessionStorage.removeItem('aivensi-q'); sessionStorage.removeItem('aivensi-q-own');
      setKey(null); setTyped(''); setLive('Vraag hersteld.');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const pick = (k: Key, text = '') => {
    sessionStorage.setItem('aivensi-q', k); sessionStorage.setItem('aivensi-q-own', text);
    setKey(k); setTyped(text); setOwn(''); setHover(null);
    setLive('Antwoord geladen: ' + (k === 'own' ? text || 'jouw vraag' : ANSWERS[k].label.toLowerCase()) + '.');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(() => { const el = document.getElementById('antwoord'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: reduce ? 'auto' : 'smooth' }); }, 0); // eenmalig na klik, geen loop
  };
  const reset = () => {
    sessionStorage.removeItem('aivensi-q'); sessionStorage.removeItem('aivensi-q-own');
    setKey(null); setTyped(''); setLive('Vraag hersteld.');
  };

  const a = ANSWERS[key ?? 'own'];
  const word = hover ? ANSWERS[hover].word : key && key !== 'own' ? a.word : 'beter werken';
  const title = !key ? 'Nog geen vaste vraag. Prima.' : key === 'own' ? `“${typed}”` : `${a.label}.`;

  return (
    <>
      <p className="sr" aria-live="polite">{live}</p>

      <section data-scroll-stage data-stage="ink" className="stage-section wrap q-hero" aria-labelledby="vraag" style={{ justifyItems: 'center', textAlign: 'center' }}>
        <h1 id="vraag" className="t-display q-title">
          Wat moet digitaal <span style={{ color: hover ? 'var(--c-ember-400)' : 'inherit', transition: 'color 240ms' }}>{word}</span>?<span className="cursor" aria-hidden="true" />
        </h1>
        <p className="t-body-lg muted">Kies. AIVENSI bouwt het antwoord.</p>
        <div role="group" aria-label="Kies wat digitaal beter moet werken" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            {CHOICES.map(k => (
              <button key={k} type="button" className="choice" aria-pressed={key === k} onClick={() => pick(k)}
                onMouseEnter={() => setHover(k)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(k)} onBlur={() => setHover(null)}>
                {ANSWERS[k].label}
              </button>
            ))}
          </div>
          <form onSubmit={e => { e.preventDefault(); if (own.trim()) pick('own', own.trim()); }} style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 520, textAlign: 'left' }}>
            <label htmlFor="andere" className="t-mono muted">Andere vraag</label>
            <div className="field">
              <input id="andere" value={own} onChange={e => setOwn(e.target.value)} placeholder="Typ wat er beter moet…" autoComplete="off" />
              <button type="submit">Ga →</button>
            </div>
          </form>
        </div>
      </section>

      <section id="antwoord" data-scroll-stage data-stage="cream" className="stage-section wrap" aria-labelledby="antwoord-titel">
        <p className="t-mono accent">{key ? 'Jouw vraag' : 'Zonder vaste vraag'}</p>
        {/* Reveal hermeet zelf bij gewijzigde children; tekst blijft plain string */}
        <Reveal as="h2" id="antwoord-titel" className="t-h2">{title}</Reveal>
        <p className="t-serif">{a.sub}</p>
        <div className="g2">
          <p className="t-body-lg muted">{a.body}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20 }}>
            <Link href="/contact" className="btn">Plan een gesprek <span aria-hidden="true">→</span></Link>
            {a.link[1].startsWith('http')
              ? <a href={a.link[1]} target="_blank" rel="noopener" className="link">{a.link[0]} <span aria-hidden="true">↗</span></a>
              : <Link href={a.link[1]} className="link">{a.link[0]} <span aria-hidden="true">→</span></Link>}
            {key && <button type="button" onClick={reset} className="t-meta muted" style={{ background: 'none', border: 0, padding: '8px 0', minHeight: 44, cursor: 'pointer', fontFamily: 'inherit' }}>Andere vraag ↺</button>}
          </div>
        </div>
        <div style={{ marginTop: 'clamp(40px,6vw,80px)' }}>
          <div className="rule" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24, paddingBottom: 16, borderTop: 0, borderBottom: '1px solid currentColor' }}>
            <h3 className="t-h4">Wat hierbij hoort</h3>
            <Link href="/diensten" className="t-mono muted" style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center' }}>Alles →</Link>
          </div>
          <ul className="caps" tabIndex={0} aria-label="Drie capabilities — scrol horizontaal op kleine schermen">
            {a.caps.map(k => (
              <li key={k}>
                <span className="t-meta accent">{CAP[k].idx}</span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <span className="t-h4">{CAP[k].name}</span>
                  <span className="t-body muted">{CAP[k].line}</span>
                  <Link href={`/diensten/${CAP[k].slug}`} className="link" style={{ alignSelf: 'flex-start', borderColor: 'transparent' }}>Meer <span aria-hidden="true">→</span></Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
