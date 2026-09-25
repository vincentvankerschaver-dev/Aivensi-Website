import type { ReactNode } from 'react';

/** Paginakop voor subpagina's: eyebrow · H1 · serif-regel · optionele intro. Server component. */
export function SectionIntro({ eyebrow, title, serif, children, tone = 'ink', id = 'page-title' }:
  { eyebrow: ReactNode; title: string; serif?: string; children?: ReactNode; tone?: 'ink' | 'cream'; id?: string }) {
  return (
    <section className={`page-${tone}`} aria-labelledby={id}>
      <div className="wrap" style={{ paddingTop: 'clamp(64px,9vw,128px)', paddingBottom: 'clamp(48px,6vw,96px)', display: 'grid', gap: 24 }}>
        <p className="t-mono accent" style={{ margin: 0 }}>{eyebrow}</p>
        <h1 id={id} className="t-h2">{title}</h1>
        {serif && <p className="t-serif muted" style={{ margin: 0 }}>{serif}</p>}
        {children}
      </div>
    </section>
  );
}

/** Genummerde definitierij (label links, tekst rechts). */
export function Row({ label, children, last = false }: { label: ReactNode; children: ReactNode; last?: boolean }) {
  return (
    <div className="row" style={{ paddingTop: 'clamp(32px,4vw,56px)', paddingBottom: 'clamp(32px,4vw,56px)', borderBottom: last ? 0 : '1px solid var(--color-border)' }}>
      <p className="t-mono muted" style={{ margin: 0 }}>{label}</p>
      <div>{children}</div>
    </div>
  );
}
