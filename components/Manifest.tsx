'use client';
/** Manifest — regels lichten één voor één op wanneer ze de middenband van de viewport bereiken.
 *  IntersectionObserver, geen scroll-listener; reduced motion / no-JS: alles direct leesbaar. */
import { useEffect, useRef } from 'react';

export function Manifest({ lines }: { lines: string[][] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current; if (!root) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { root.querySelectorAll('.mf').forEach(el => el.setAttribute('data-in', '')); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.setAttribute('data-in', ''); }), { rootMargin: '-30% 0px -40% 0px', threshold: 0 });
    root.querySelectorAll('.mf').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="manifest">
      {lines.map((parts, i) => (
        <p key={i} className="mf">{parts.map((t, j) => j % 2 ? <em key={j}>{t}</em> : t)}</p>
      ))}
    </div>
  );
}
