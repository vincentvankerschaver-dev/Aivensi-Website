'use client';
/** Homepage "En daarna?" — levenscyclus project → Care. Lijn loopt uit wanneer de sectie in beeld komt (eenmalig). */
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const LIFE: [string, string, boolean][] = [
  ['Project', 'Bouwen', false], ['Project', 'Lanceren', false],
  ['Care', 'Onderhouden', true], ['Care', 'Monitoren', true], ['Care', 'Verbeteren', true],
];

export function CareLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { setOn(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ display: 'grid', gap: 'clamp(40px,5vw,64px)' }}>
      <div className="g2" style={{ alignItems: 'end', gap: 'clamp(20px,4vw,64px)' }}>
        <div style={{ display: 'grid', gap: 18 }}>
          <p className="t-mono accent" style={{ margin: 0 }}>En daarna?</p>
          <h2 id="care" className="t-h3" style={{ margin: 0, maxWidth: '14ch' }}>Lanceren is het begin, niet het einde.</h2>
        </div>
        <p className="t-body-lg" style={{ margin: 0, color: 'var(--c-ink-700)', maxWidth: '44ch' }}>Updates, beveiliging, back-ups en een maandrapport. Je site blijft werken, en je weet wat we deden.</p>
      </div>
      <ol className="life5">
        <span aria-hidden="true" className="life-line" />
        <span aria-hidden="true" className="life-line life-fill" style={{ width: on ? '100%' : '0%' }} />
        {LIFE.map(([tag, t, care], i) => (
          <li key={t}>
            <span aria-hidden="true" className="life-dot" style={{ background: on && care ? 'var(--c-ember-500)' : 'var(--c-cream-50)', borderColor: care ? 'var(--c-ember-500)' : 'var(--c-ink-900)', transitionDelay: `${0.3 + i * 0.3}s` }} />
            <span className="t-mono" style={{ color: care ? 'var(--c-ember-600)' : 'var(--c-ink-600)' }}>{tag}</span>
            <strong style={{ fontWeight: 800, fontSize: 'clamp(1.3rem,2vw,1.7rem)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>{t}</strong>
          </li>
        ))}
      </ol>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, paddingTop: 24, borderTop: '1px solid var(--c-ink-900)' }}>
        <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 12 }}>
          <span className="t-mono" style={{ color: 'var(--c-ink-600)' }}>Website Care</span>
          <span className="t-mono" style={{ fontSize: 'var(--t-body-lg)', textTransform: 'none', letterSpacing: 0 }}>vanaf €59/mnd</span>
        </span>
        <Link href="/website-care" className="link">Bekijk Website Care <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}
