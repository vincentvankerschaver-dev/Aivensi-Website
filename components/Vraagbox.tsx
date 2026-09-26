'use client';
/** Vraagbox — begrensde AI-vraag. Antwoordt alleen uit de eigen site-inhoud (bron wordt server-side opgebouwd in /api/vraag). */
import { useId, useState } from 'react';
import Link from 'next/link';
import { track } from '@/lib/track';

const DEFAULT_EX = ['Kan dit gekoppeld worden aan mijn boekhouding?', 'Hoeveel kost een website ongeveer?', 'Werken jullie ook in Gent?'];

export function Vraagbox({ enabled = true, context = 'de website', eyebrow = 'Staat je vraag er niet bij?', placeholder = 'Bv. kan mijn planning aan mijn boekhouding gekoppeld worden?', examples = DEFAULT_EX }:
  { enabled?: boolean; context?: string; eyebrow?: string; placeholder?: string; examples?: string[] }) {
  const id = useId();
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<{ a: string; src: string } | null>(null);

  if (!enabled) return null; // zonder ANTHROPIC_API_KEY geen 'niet bereikbaar'-box op elke pagina
  const ask = async (text: string) => {
    const v = text.trim(); if (!v || busy) return;
    setBusy(true); setRes(null);
    track({ name: 'vraagbox_gebruikt', props: { pagina: context } });
    try {
      const r = await fetch('/api/vraag', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ q: v, context }) });
      const j = await r.json();
      setRes({ a: j.a || 'De assistent is even niet bereikbaar. Stel je vraag gerust via een gesprek.', src: j.src || 'niet in bron' });
    } catch {
      setRes({ a: 'De assistent is even niet bereikbaar. Stel je vraag gerust via een gesprek.', src: 'niet in bron' });
    }
    setBusy(false);
  };

  return (
    <section className="vb" aria-labelledby={`${id}-h`}>
      <div style={{ display: 'grid', gap: 10 }}>
        <p className="t-meta" style={{ margin: 0, color: 'var(--c-ember-400)' }}>{eyebrow}</p>
        <h2 id={`${id}-h`} style={{ margin: 0, fontWeight: 800, fontSize: 'clamp(1.3rem,1.9vw,1.7rem)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch' }}>Stel ze hier. Het antwoord komt uit onze eigen pagina&apos;s, niet uit de lucht.</h2>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--c-sand-300)', maxWidth: '52ch' }}>Begrensde AI: ze antwoordt alleen op basis van wat op deze site staat. Weet ze het niet, dan zegt ze dat — en verwijst ze naar een gesprek.</p>
      </div>
      <form onSubmit={e => { e.preventDefault(); ask(q); }} style={{ display: 'grid', gap: 12 }}>
        <label htmlFor={`${id}-q`} className="t-meta" style={{ color: 'var(--c-sand-300)' }}>Jouw vraag</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <input id={`${id}-q`} value={q} onChange={e => setQ(e.target.value)} required maxLength={240} autoComplete="off" placeholder={placeholder} />
          <button type="submit" className="btn" disabled={busy} style={{ minHeight: 48, opacity: busy ? 0.6 : 1 }}>{busy ? 'Even kijken…' : 'Vraag stellen'}</button>
        </div>
      </form>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {examples.map(t => <button key={t} type="button" className="vb-ex" onClick={() => { setQ(t); ask(t); }}>{t}</button>)}
      </div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--c-sand-400)' }}>Vul geen persoonsgegevens in. Je vraag gaat naar een AI-model om te beantwoorden en wordt niet bewaard. <Link href="/privacy#ai" style={{ borderBottom: '1px solid currentColor' }}>Privacy</Link></p>
      <div role="status" aria-live="polite">
        {res && (
          <div style={{ display: 'grid', gap: 14, paddingTop: 20, borderTop: '1px solid var(--c-ink-700)' }}>
            <p style={{ margin: 0, fontSize: 'var(--t-body)', lineHeight: 'var(--t-body-lh)', maxWidth: '56ch', whiteSpace: 'pre-line' }}>{res.a}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, fontWeight: 700, fontSize: 15, borderBottom: '1px solid var(--c-ember-500)' }}>Plan een gesprek <span aria-hidden="true">→</span></Link>
              <span className="t-meta" style={{ color: 'var(--c-sand-400)' }}>Bron: {res.src}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
