'use client';
/**
 * ScrollStage — één vaste achtergrondlaag voor de hele pagina.
 *
 * fixed backdrop → IntersectionObserver → dominante sectie → CSS custom properties → kleur.
 * Geen scroll-listener, geen requestAnimationFrame, geen library. De observer meldt alleen
 * wijzigingen in zichtbaarheid; de eigenlijke overgang is een CSS-transition.
 *
 * Secties: <section data-scroll-stage data-stage="ink|cream">
 */
import { useEffect, useRef, type ReactNode } from 'react';

export type Stage = 'ink' | 'cream';

/**
 * Vooraf gecontroleerde paren uit de AIVENSI design tokens (app/tokens/colors.css).
 * Elke fg/muted/accent haalt ≥ AA op zijn bg (berekend; bevestig in DevTools).
 *   ink   #15140F: cream-50 ≈17:1 · sand-400 ≈10:1 · ember-400 ≈6:1
 *   cream #FAF8F4: ink-900 ≈17:1 · ink-600 ≈7:1 · ember-600 ≈5:1
 */
export const STAGES: Record<Stage, { bg: string; fg: string; muted: string; accent: string }> = {
  ink:   { bg: 'var(--c-ink-900)',  fg: 'var(--c-cream-50)', muted: 'var(--c-sand-400)', accent: 'var(--c-ember-400)' },
  cream: { bg: 'var(--c-cream-50)', fg: 'var(--c-ink-900)',  muted: 'var(--c-ink-600)',  accent: 'var(--c-ember-600)' },
};

/**
 * De observer-root is een dunne band rond het midden van de viewport (≈0.5vh).
 * Omdat secties aaneensluiten snijdt telkens één sectie die band; bij overlap wint
 * de sectie met de grootste doorsnede. Dit is robuuster dan intersectionRatio
 * (die lange en korte secties niet vergelijkbaar maakt) en heeft maar één drempel nodig.
 */
const ROOT_MARGIN = '-50% 0px -49.5% 0px';

export function ScrollStage({ children, initial = 'ink' }: { children: ReactNode; initial?: Stage }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const sections = Array.from(el.querySelectorAll<HTMLElement>('[data-scroll-stage]'));
    if (!sections.length) return;

    // Doorsnede (px) met de middenband per sectie; alleen bijgewerkt door de observer.
    const visible = new Map<HTMLElement, number>();
    let current: Stage | null = null;

    const setStage = (stage: Stage) => {
      if (stage === current) return;
      current = stage;
      const t = STAGES[stage];
      el.style.setProperty('--stage-bg', t.bg);
      el.style.setProperty('--stage-fg', t.fg);
      el.style.setProperty('--stage-muted', t.muted);
      el.style.setProperty('--stage-accent', t.accent);
      el.dataset.stage = stage;
    };

    const io = new IntersectionObserver(entries => {
      for (const e of entries) visible.set(e.target as HTMLElement, e.isIntersecting ? e.intersectionRect.height : 0);
      // Dominant = sectie die de middenband snijdt (grootste doorsnede bij overlap).
      let best: HTMLElement | null = null, max = 0;
      visible.forEach((h, s) => { if (h > max) { max = h; best = s; } });
      if (best) setStage(((best as HTMLElement).dataset.stage as Stage) || initial);
    }, { threshold: 0, rootMargin: ROOT_MARGIN });

    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, [initial]);

  const t = STAGES[initial];
  return (
    <div
      ref={root}
      className="stage"
      data-stage={initial}
      style={{ '--stage-bg': t.bg, '--stage-fg': t.fg, '--stage-muted': t.muted, '--stage-accent': t.accent } as React.CSSProperties}
    >
      <div className="stage-backdrop" aria-hidden="true" />
      {children}
    </div>
  );
}
