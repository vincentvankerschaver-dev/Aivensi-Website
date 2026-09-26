'use client';
/** Inzichten v3: kop met onderwerpfilter · uitgelicht 21:9 · asymmetrisch duo. Artikelen hebben nog geen detailroute → "Binnenkort". */
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { INSIGHTS } from '@/lib/content';
import { ARTICLES } from '@/lib/articles';

type Post = typeof INSIGHTS[number];

function Visual({ p, ratio, sizes }: { p: Post; ratio: string; sizes: string }) {
  if (!p.img) return null; // geen leeg kader live — beeld verschijnt zodra img is ingevuld
  return (
    <div className="frame ins-img" style={{ aspectRatio: ratio }}>
      {p.img && <Image src={p.img} alt="" fill sizes={sizes} style={{ objectFit: 'cover' }} />}
    </div>
  );
}

export function InsightsBrowser() {
  const [tag, setTag] = useState('Alles');
  const cats = ['Alles', ...Array.from(new Set(INSIGHTS.map(p => p.cat)))];
  const sorted = [...INSIGHTS].sort((x, y) => Number(!!ARTICLES[y.slug]) - Number(!!ARTICLES[x.slug])); // uitgeschreven artikels eerst
  const shown = tag === 'Alles' ? sorted : sorted.filter(p => p.cat === tag);
  const [feat, ...rest] = shown;
  const ratios = ['4 / 5', '16 / 11'];

  return (
    <>
      <section className="page-cream" aria-labelledby="page-title">
        <div className="wrap" style={{ paddingTop: 'clamp(56px,8vw,112px)', paddingBottom: 'clamp(32px,4vw,56px)' }}>
          <nav aria-label="Kruimelpad" className="t-mono muted crumbs"><Link href="/">Home</Link><span aria-hidden="true">/</span><span className="accent" aria-current="page">Inzichten</span></nav>
          <div className="g2" style={{ alignItems: 'end' }}>
            <h1 id="page-title" className="t-hero">Wat we leren, schrijven we op.</h1>
            <div style={{ display: 'grid', gap: 24 }}>
              <p className="t-serif" style={{ margin: 0, color: 'var(--c-ink-700)' }}>Uit het werk, niet uit trendrapporten.</p>
              <div role="group" aria-label="Onderwerpen" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cats.map(c => <button key={c} type="button" aria-pressed={c === tag} onClick={() => setTag(c)} className="c-pick t-meta" style={{ minHeight: 44, padding: '0 16px' }}>{c}</button>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-cream" aria-label="Artikelen">
        <div className="wrap" style={{ paddingBottom: 'clamp(64px,9vw,128px)' }}>
          <p aria-live="polite" className="t-mono muted" style={{ margin: '0 0 24px', paddingTop: 12, borderTop: '1px solid var(--c-ink-900)' }}>
            {shown.length} {shown.length === 1 ? 'artikel' : 'artikelen'}{tag === 'Alles' ? '' : ` · ${tag}`}
          </p>
          {feat && (
            <article className="ins-card" style={{ display: 'grid', gap: 'clamp(24px,3vw,40px)' }}>
              {feat.img ? (
                <div style={{ position: 'relative' }}>
                  <Visual p={feat} ratio="21 / 9" sizes="100vw" />
                  <span className="t-meta ins-badge">Nieuwste · {feat.cat}</span>
                </div>
              ) : <p className="t-meta accent" style={{ margin: 0 }}>Nieuwste · {feat.cat}</p>}
              <div className="g2">
                <h2 style={{ margin: 0, fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,3.6rem)', letterSpacing: '-0.04em', lineHeight: 1, textWrap: 'balance', maxWidth: '18ch' }}>{feat.title}</h2>
                <div style={{ display: 'grid', gap: 16 }}>
                  <p className="t-mono muted" style={{ margin: 0, display: 'flex', gap: 16 }}><span>{feat.date}</span><span aria-hidden="true">·</span><span>{feat.read}</span></p>
                  <p className="t-body-lg" style={{ margin: 0, color: 'var(--c-ink-700)', maxWidth: '44ch' }}>{feat.blurb}</p>
                  {ARTICLES[feat.slug] ? <Link href={`/insights/${feat.slug}`} className="link stretch" style={{ justifySelf: 'start' }}>Lees het artikel <span aria-hidden="true">→</span></Link> : <span className="t-meta muted">Verschijnt binnenkort</span>}
                </div>
              </div>
            </article>
          )}
          {rest.length > 0 && (
            <ul className="duo">
              {rest.map((p, i) => (
                <li key={p.slug} style={{ marginTop: i % 2 && p.img ? 'clamp(0px,10vw,160px)' : 0 }}>
                  <article className="ins-card" style={{ display: 'grid', gap: 20 }}>
                    {p.img && (
                      <div style={{ position: 'relative' }}>
                        <Visual p={p} ratio={ratios[i % 2]} sizes="(max-width: 900px) 100vw, 50vw" />
                        <span className="t-meta ins-badge ins-badge-light">{p.cat}</span>
                      </div>
                    )}
                    <p className="t-mono muted" style={{ margin: 0, display: 'flex', gap: 16 }}><span>{p.cat}</span><span aria-hidden="true">·</span><span>{p.date}</span><span aria-hidden="true">·</span><span>{p.read}</span></p>
                    <h2 style={{ margin: 0, fontWeight: 800, fontSize: 'clamp(1.5rem,2.6vw,2.3rem)', letterSpacing: '-0.03em', lineHeight: 1.06, textWrap: 'balance', maxWidth: '22ch' }}>{p.title}</h2>
                    <p className="t-body" style={{ margin: 0, color: 'var(--c-ink-700)' }}>{p.blurb}</p>
                    {ARTICLES[p.slug] ? <Link href={`/insights/${p.slug}`} className="link stretch" style={{ justifySelf: 'start' }}>Lees het artikel <span aria-hidden="true">→</span></Link> : <span className="t-meta muted">Verschijnt binnenkort</span>}
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
