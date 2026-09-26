'use client';
/** Website Care: entry-kaarten + pakketten per spoor (websites/webshops) + vergelijking. */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TRACKS } from '@/lib/care';

type K = 'web' | 'shop';
const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

function go() {
  const el = document.getElementById('pakketten'); if (!el) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 72, behavior: reduce ? 'auto' : 'smooth' });
}

export function CareEntries() {
  const pick = (k: K) => { window.dispatchEvent(new CustomEvent('care-track', { detail: k })); requestAnimationFrame(go); };
  return (
    <div className="g2" style={{ gap: 'clamp(12px,2vw,24px)', marginTop: 'clamp(40px,5vw,72px)' }}>
      {([['web', 'Websites', 'Website Care', 'Updates, beveiliging, back-ups en monitoring voor je bedrijfswebsite.', 'Vanaf €59 / maand'],
        ['shop', 'Webshops', 'E-commerce Care', 'Je webshop mag niet stilstaan. We bewaken techniek, checkout, betalingen en integraties.', 'Vanaf €249 / maand']] as const).map(([k, tag, name, d, price]) => (
        <button key={k} type="button" className="care-entry" onClick={() => pick(k)}>
          <span className="t-mono accent">{tag}</span>
          <strong style={{ fontWeight: 800, fontSize: 'clamp(1.5rem,2.4vw,2.1rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>{name}</strong>
          <span className="t-body" style={{ color: 'var(--c-ink-700)', maxWidth: '40ch' }}>{d}</span>
          <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, paddingTop: 14, borderTop: '1px solid var(--c-cream-200)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15 }}>{price}</span>
            <span className="care-entry-arrow" aria-hidden="true">→</span>
          </span>
        </button>
      ))}
    </div>
  );
}

export function CarePlans() {
  const [track, setTrack] = useState<K>('web');
  const [cmp, setCmp] = useState(false);
  const [all, setAll] = useState(false);
  useEffect(() => {
    if (location.hash === '#webshops') setTrack('shop');
    const on = (e: Event) => { setTrack((e as CustomEvent<K>).detail); setAll(false); };
    window.addEventListener('care-track', on); return () => window.removeEventListener('care-track', on);
  }, []);
  const t = TRACKS[track];
  const more = t.base.length > 8;
  const base = all || !more ? t.base : t.base.slice(0, 6);
  const rows: [string, ...(string | number)[]][] = [...t.base.filter(b => !t.cmp.some(r => r[0] === b)).map(b => [b, 1, 1, 1] as [string, number, number, number]), ...t.cmp];

  return (
    <>
      <div className="g2" style={{ alignItems: 'end', marginBottom: 'clamp(32px,4vw,56px)' }}>
        <div style={{ display: 'grid', gap: 20 }}>
          <p className="t-mono accent" style={{ margin: 0 }}>Pakketten</p>
          <h2 id="pk" className="t-h3" style={{ margin: 0, maxWidth: '14ch' }}>{t.title}</h2>
        </div>
        <div style={{ display: 'grid', gap: 20, justifyItems: 'start' }}>
          <div role="tablist" aria-label="Soort site" className="care-tabs">
            {(['web', 'shop'] as K[]).map(k => (
              <button key={k} type="button" role="tab" aria-selected={track === k} onClick={() => { setTrack(k); setAll(false); }}>{TRACKS[k].label}</button>
            ))}
          </div>
          <p className="t-body" style={{ margin: 0, color: 'var(--c-sand-300)', maxWidth: '42ch' }}>{t.intro}</p>
        </div>
      </div>

      <div className="care-base">
        <span className="t-mono" style={{ color: 'var(--c-ember-400)' }}>In elk pakket</span>
        {base.map(b => <span key={b} style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8, fontSize: 15, color: 'var(--c-cream-100)' }}><span aria-hidden="true" style={{ color: 'var(--c-ember-400)' }}>✓</span>{b}</span>)}
        {more && <button type="button" aria-expanded={all} onClick={() => setAll(a => !a)} className="care-textbtn t-mono">{all ? 'Minder tonen' : `+${t.base.length - 6} meer`}</button>}
      </div>

      <ul className="care-plans">
        {t.plans.map(p => {
          const f = !!p.featured;
          const sub = f ? 'var(--c-ink-700)' : 'var(--c-sand-300)', mark = f ? 'var(--c-ember-600)' : 'var(--c-ember-400)';
          return (
            <li key={p.name} className={`care-plan${f ? ' is-featured' : ''}`}>
              {f && <span className="care-badge">Onze aanrader</span>}
              <div style={{ display: 'grid', gap: 10 }}>
                <h3 className="t-h4" style={{ margin: 0 }}>{p.name}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: sub, maxWidth: '32ch' }}>{p.line}</p>
              </div>
              <p style={{ margin: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 8, paddingBottom: 20, borderBottom: `1px solid ${f ? 'var(--c-cream-200)' : 'var(--c-ink-700)'}` }}>
                {p.from && <span className="t-mono" style={{ color: sub }}>{p.from}</span>}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2.2rem,3.6vw,3rem)', letterSpacing: '-0.04em', lineHeight: 1 }}>€{p.price}</span>
                <span className="t-mono" style={{ color: sub }}>/ maand</span>
                <span style={{ flexBasis: '100%', fontFamily: 'var(--font-mono)', fontSize: 12, color: sub }}>{p.custom ? 'Prijs op maat na een gesprek' : `of €${fmt(p.price * 10)} per jaar · 2 maanden gratis`}</span>
              </p>
              <p className="t-mono" style={{ margin: '-8px 0 0', display: 'flex', alignItems: 'center', gap: 10, color: sub }}><span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: '50%', background: mark }} />Reactie {p.resp}</p>
              <div style={{ display: 'grid', gap: 14, alignContent: 'start', flex: 1 }}>
                <p className="t-mono" style={{ margin: 0, color: sub }}>{p.plusLabel}</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12 }}>
                  {p.rows.map(r => <li key={r} style={{ display: 'grid', gridTemplateColumns: '20px minmax(0,1fr)', gap: 12, alignItems: 'baseline', fontSize: 15, lineHeight: 1.45 }}><span aria-hidden="true" style={{ fontWeight: 700, color: mark }}>+</span><span>{r}</span></li>)}
                </ul>
              </div>
              <Link href="/contact" className="care-cta" onClick={() => { try { sessionStorage.setItem('aivensi-care', p.name); } catch {} }}>Bespreek {p.name} <span aria-hidden="true">→</span></Link>
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: 'clamp(32px,4vw,56px)', display: 'grid', gap: 24 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <button type="button" aria-expanded={cmp} aria-controls="cmp" onClick={() => setCmp(c => !c)} className="care-textbtn" style={{ fontWeight: 700, fontSize: 15, minHeight: 44 }}>{cmp ? 'Verberg vergelijking' : 'Vergelijk alle onderdelen'}</button>
          <span className="t-mono" style={{ color: 'var(--c-sand-300)', display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}><span>Prijzen per maand, excl. btw · jaarlijks 2 maanden gratis</span><a href="#voorwaarden" style={{ color: 'var(--c-cream-50)', borderBottom: '1px solid var(--c-ink-600)' }}>Voorwaarden →</a></span>
        </div>
        {cmp && (
          <div id="cmp" className="care-cmp-wrap">
            <table className="care-cmp">
              <thead><tr><th scope="col" className="t-meta" style={{ color: 'var(--c-sand-300)', fontWeight: 400 }}>Onderdeel</th>{t.plans.map(p => <th key={p.name} scope="col">{p.name}</th>)}</tr></thead>
              <tbody>
                {rows.map(([name, ...cells]) => (
                  <tr key={name}><th scope="row">{name}</th>{cells.map((v, i) => typeof v === 'string'
                    ? <td key={i} style={{ fontFamily: 'var(--font-mono)' }}>{v}</td>
                    : <td key={i} style={{ color: v ? 'var(--c-ember-400)' : 'var(--c-ink-600)' }}><span aria-hidden="true">{v ? '✓' : '—'}</span><span className="sr">{v ? 'Inbegrepen' : 'Niet inbegrepen'}</span></td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
