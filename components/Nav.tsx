'use client';
/** Globale navigatie — desktop + mobiel menu, current-page state, Escape sluit. */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [['/werk', 'Werk'], ['/diensten', 'Diensten'], ['/insights', 'Insights'], ['/over', 'Over']] as const;

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);
  const current = (h: string) => path === h || path.startsWith(h + '/');

  return (
    <header className="nav-root">
      <a className="skip" href="#main">Naar de inhoud</a>
      <nav id="hoofdnav" aria-label="Hoofdnavigatie" className="wrap" style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <Link href="/" aria-label="AIVENSI — home" aria-current={path === '/' ? 'page' : undefined} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26, lineHeight: 1 }}>AIVENSI</Link>
        <div className="nav-desk" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {ITEMS.map(([h, l]) => (
            <Link key={h} href={h} aria-current={current(h) ? 'page' : undefined} style={{ fontSize: 15, fontWeight: 600, padding: '10px 0', borderBottom: `1px solid ${current(h) ? 'currentColor' : 'transparent'}` }}>{l}</Link>
          ))}
          <Link href="/contact" aria-current={current('/contact') ? 'page' : undefined} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, fontSize: 15, fontWeight: 700, borderBottom: '1px solid var(--c-ember-500)' }}>Plan een gesprek <span aria-hidden="true">→</span></Link>
        </div>
        <button type="button" className="nav-mob t-meta" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(o => !o)}>
          <span>{open ? 'Sluiten' : 'Menu'}</span>
          <span aria-hidden="true" className="nav-burger" />
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" role="dialog" aria-label="Menu" className="nav-sheet">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {ITEMS.map(([h, l], i) => (
              <Link key={h} href={h} aria-current={current(h) ? 'page' : undefined} className="nav-sheet-item">
                <span className="t-meta accent">0{i + 1}</span><span>{l}</span>
              </Link>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 20, paddingTop: 32 }}>
            <Link href="/contact" className="btn" style={{ justifyContent: 'center', minHeight: 56 }}>Plan een gesprek →</Link>
            <p className="t-meta muted" style={{ margin: 0, lineHeight: 1.8 }}>Waasmunster · Waasland<br />Digitale groei, versterkt door AI.</p>
          </div>
        </div>
      )}
    </header>
  );
}
