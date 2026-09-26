'use client';
/** Zachte ember-glow over de hele pagina (fixed, boven de inhoud, klikt niet mee). Volgt de muis; blijft staan waar de muis vertrok. Touch/reduced motion: statisch. */
import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const g = ref.current; if (!g) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(pointer: fine)').matches) return;
    let raf = 0, x = 0, y = 0;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX; y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; g.style.setProperty('--mx', `${x}px`); g.style.setProperty('--my', `${y}px`); });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); };
  }, []);
  return <div ref={ref} aria-hidden="true" className="cglow" />;
}
