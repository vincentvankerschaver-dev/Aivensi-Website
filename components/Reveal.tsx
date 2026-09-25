'use client';
/**
 * Reveal — tekst komt regel per regel uit een typografisch masker omhoog.
 *
 * Markup per regel:
 *   <div class="reveal-line-mask"><span class="reveal-line">…</span></div>
 *
 * Regeldetectie: de tekst wordt als woorden gerenderd (SSR-veilig, één masker), na mount
 * één keer gemeten (offsetTop per woord) en gegroepeerd in regels. Herberekend bij resize
 * (debounced) en wanneer fonts laden. Nooit tijdens scroll.
 *
 * Motion: CSS scroll-driven (animation-timeline: view()) waar ondersteund; anders
 * IntersectionObserver → .is-visible → CSS-transition. Zonder JS of met reduced motion:
 * alles direct zichtbaar.
 */
import { createElement, useEffect, useLayoutEffect, useRef, useState, type ElementType } from 'react';

type Props = { as?: ElementType; children: string; className?: string; id?: string };

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function Reveal({ as: Tag = 'h2', children, className = '', id }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const words = children.trim().split(/\s+/);
  const [lines, setLines] = useState<string[][] | null>(null); // null = nog niet gemeten (SSR-identiek)

  // 1. Regels meten — één layout-read, nooit per frame.
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer = 0;

    const measure = () => {
      const spans = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'));
      if (!spans.length) return;
      const groups: string[][] = [];
      let lastTop = -1;
      for (const s of spans) {
        const top = s.offsetTop;
        if (top !== lastTop) { groups.push([]); lastTop = top; }
        groups[groups.length - 1].push(s.textContent || '');
      }
      setLines(prev => (prev && prev.length === groups.length && prev.every((l, i) => l.join(' ') === groups[i].join(' '))) ? prev : groups);
    };

    const remeasure = () => {
      // Terug naar één regel zodat woorden opnieuw natuurlijk kunnen breken, dan meten.
      setLines(null);
      setTimeout(measure, 0); // volgende tick, na de re-render
    };
    const onResize = () => { clearTimeout(timer); timer = window.setTimeout(remeasure, 150); };

    measure();
    (document as Document & { fonts?: FontFaceSet }).fonts?.ready.then(remeasure);
    window.addEventListener('resize', onResize, { passive: true });
    return () => { window.removeEventListener('resize', onResize); clearTimeout(timer); };
  }, [children]);

  // 2. Fallback voor browsers zonder scroll-driven animations.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.classList.add('is-visible'); return; }
    if (CSS.supports('animation-timeline: view()')) return;
    const io = new IntersectionObserver(([e]) => {
      // Zichtbaar zodra het element in beeld komt, of al boven de viewport ligt
      // (pagina geladen/gesprongen halverwege) — zo blijft niets permanent verborgen.
      if (e.isIntersecting || e.boundingClientRect.bottom < 0) { el.classList.add('is-visible'); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Ongemeten: alle woorden in één masker (server en eerste client-render identiek).
  const rendered = lines ?? [words];

  const lineNodes = rendered.map((line, i) => (
    <span className="reveal-line-mask" key={i}>
      <span className="reveal-line" style={{ '--i': i } as React.CSSProperties}>
        {line.map((w, j) => (
          <span data-word key={j}>{w}{j < line.length - 1 ? ' ' : ''}</span>
        ))}
      </span>
    </span>
  ));
  // createElement i.p.v. <Tag ref> — polymorfe ref is anders niet strict te typen.
  return createElement(Tag as string, { ref, id, className: `reveal ${className}`.trim() }, lineNodes);
}
