'use client';
/** Kaart: verbindingslijnen tekenen zich via IntersectionObserver (stroke-dashoffset), geen scroll-listener.
 *  Toegankelijk als één beeld met een beschrijvende tekst (geen tien losse links naar /contact). */
import { useEffect, useRef, useState } from 'react';
import { TOWNS } from '@/lib/content';

export function Waasland() {
  const ref = useRef<SVGSVGElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setP(1); return; }
    const io = new IntersectionObserver(([e]) => setP(prev => Math.max(prev, e.intersectionRatio)), { threshold: [0, .25, .5, .75, 1] });
    io.observe(el); return () => io.disconnect();
  }, []);
  const [, hx, hy] = TOWNS[0];
  const label = 'Kaart van het Waasland met Waasmunster als thuisbasis en ' + TOWNS.slice(1).map(([n, , , km]) => `${n} (${km} km)`).join(', ') + '.';
  return (
    <svg ref={ref} viewBox="0 0 600 380" role="img" aria-label={label} style={{ width: '100%', maxWidth: 560, height: 'auto', display: 'block', justifySelf: 'end', overflow: 'visible', fontFamily: 'var(--font-mono)' }}>
      <g aria-hidden="true">
        {TOWNS.slice(1).map(([n, x, y]) => (
          <line key={n} x1={hx} y1={hy} x2={x} y2={y} stroke="var(--stage-muted)" strokeWidth={1} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} style={{ transition: 'stroke-dashoffset 300ms linear' }} />
        ))}
      </g>
      {TOWNS.map(([name, x, y, , anchor], i) => {
        const home = i === 0;
        return (
          <g key={name} aria-hidden="true">
            <circle cx={x} cy={y} r={home ? 7 : 4} fill={home ? 'var(--c-ember-500)' : 'var(--stage-bg)'} stroke={home ? 'var(--c-ember-500)' : 'var(--stage-fg)'} strokeWidth={1.5} />
            <text className="lbl" x={anchor === 'end' ? x - 14 : x + 14} y={y + 4} textAnchor={anchor} fontSize={12} letterSpacing="0.06em" fill={home ? 'var(--stage-accent)' : 'var(--stage-muted)'} style={{ textTransform: 'uppercase' }}>{name}</text>
          </g>
        );
      })}
    </svg>
  );
}
