'use client';
/**
 * Karaoke: woorden lichten één keer op zodra de tekst voor 60% in beeld is (IO). Zonder JS of bij reduced motion: meteen volledig.
 * tone: 'ink' (donkere sectie) | 'cream' (lichte sectie) — bepaalt de gedimde startkleur.
 */
import { useEffect, useRef, type CSSProperties, type ElementType } from 'react';

export function Karaoke({ text, as: Tag = 'p', tone = 'ink', className = '', style, id, delay = 0 }: { text: string; as?: ElementType; tone?: 'ink' | 'cream'; className?: string; style?: CSSProperties; id?: string; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.removeAttribute('data-in');
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting || e.boundingClientRect.bottom < 0) { el.setAttribute('data-in', ''); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [text]);
  const words = text.split(' ');
  const step = Math.min(0.16, 1.6 / words.length);
  return (
    <Tag ref={ref} id={id} className={`kar kar-${tone} ${className}`.trim()} style={style} aria-label={text}>
      {words.map((w, i) => <span key={`${w}-${i}`} aria-hidden="true" className="kar-w" style={{ transitionDelay: `${(delay + 0.1 + i * step).toFixed(2)}s` }}>{w} </span>)}
    </Tag>
  );
}
