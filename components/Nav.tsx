'use client';
/** Globale navigatie — desktop met mega-menu Diensten, mobiel menu, current-page state, Escape sluit. */
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SERVICES, SERVICE_SLUGS } from '@/lib/content';
import { MEGA_LINE } from '@/lib/faq';

const ITEMS = [['/werk', 'Werk'], ['/diensten', 'Diensten'], ['/insights', 'Inzichten'], ['/over', 'Over']] as const;

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); setMega(false); }, [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); setMega(false); } };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(t.current); };
  }, []);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const current = (h: string) => path === h || path.startsWith(h + '/');
  const openMega = () => { clearTimeout(t.current); setMega(true); };
  const closeSoon = () => { clearTimeout(t.current); t.current = setTimeout(() => setMega(false), 160); };

  return (
    <header className="nav-root">
      <a className="skip" href="#main">Naar de inhoud</a>
      <nav id="hoofdnav" aria-label="Hoofdnavigatie" className="wrap" style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <Link href="/" aria-label="AIVENSI — home" aria-current={path === '/' ? 'page' : undefined} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, minHeight: 44 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aivensi-mark-light.svg" alt="" width={34} height={34} style={{ display: 'block', flex: 'none' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26, lineHeight: 1 }}>AIVENSI</span>
          <span className="nav-desk t-meta" style={{ color: 'var(--c-sand-300)', alignSelf: 'flex-end', paddingBottom: 4, fontSize: 11 }}>Waasmunster · Waasland</span>
        </Link>
        <div className="nav-desk" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {ITEMS.map(([h, l]) => h === '/diensten' ? (
            <div key={h} ref={wrap} onMouseEnter={openMega} onMouseLeave={closeSoon}
              onBlur={() => setTimeout(() => { if (wrap.current && !wrap.current.contains(document.activeElement)) closeSoon(); }, 0)}
              style={{ display: 'flex', alignItems: 'center' }}>
              <Link href={h} aria-current={current(h) ? 'page' : undefined} aria-haspopup="true" aria-expanded={mega} aria-controls="mega-diensten"
                onFocus={openMega} onKeyDown={e => { if (e.key === 'ArrowDown') { e.preventDefault(); openMega(); } }}
                className="nav-link" style={{ borderBottomColor: current(h) ? 'currentColor' : 'transparent', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                {l} <span aria-hidden="true" style={{ fontSize: 10, display: 'inline-block', transform: `rotate(${mega ? 180 : 0}deg)`, transition: 'transform .24s var(--ease-out)' }}>▼</span>
              </Link>
              {mega && (
                <div id="mega-diensten" className="mega-panel">
                  <div className="wrap mega">
                    <div style={{ display: 'grid', gap: 24, alignContent: 'start' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
                        <p className="t-mono" style={{ margin: 0, color: 'var(--c-ember-400)' }}>Diensten — zeven diensten, één systeem</p>
                        <Link href="/diensten" className="t-mono" style={{ color: 'var(--c-sand-300)', whiteSpace: 'nowrap' }}>Alle diensten →</Link>
                      </div>
                      <ul className="mega-list">
                        {SERVICE_SLUGS.map(s => (
                          <li key={s}>
                            <Link href={`/diensten/${s}`} className="mega-item" aria-current={path === `/diensten/${s}` ? 'page' : undefined}>
                              <span className="t-meta" style={{ color: 'var(--c-ember-400)', fontSize: 11 }}>{SERVICES[s].idx}</span>
                              <span className="mega-name">{SERVICES[s].name}</span>
                              <span className="mega-arrow" aria-hidden="true">→</span>
                              <span className="mega-line">{MEGA_LINE[s]}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <aside className="mega-aside">
                      <div style={{ display: 'grid', gap: 14 }}>
                        <p className="t-meta" style={{ margin: 0, color: 'var(--c-sand-300)', fontSize: 11 }}>Niet zeker welke dienst?</p>
                        <p style={{ margin: 0, fontWeight: 800, fontSize: 'clamp(1.3rem,1.8vw,1.7rem)', lineHeight: 1.08, letterSpacing: '-0.03em', maxWidth: '16ch' }}>Begin met de vraag, niet met de dienst.</p>
                        <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.15rem', lineHeight: 1.2, color: 'var(--c-cream-100)' }}>Eerst een gesprek. Dan een voorstel.</p>
                      </div>
                      <div style={{ display: 'grid', gap: 14 }}>
                        <Link href="/contact" className="btn" style={{ justifyContent: 'center', minHeight: 48 }}>Plan een gesprek <span aria-hidden="true">→</span></Link>
                        <Link href="/werk" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 40, fontWeight: 700, fontSize: 14 }}>Of bekijk eerst het werk <span aria-hidden="true">→</span></Link>
                      </div>
                    </aside>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link key={h} href={h} aria-current={current(h) ? 'page' : undefined} className="nav-link" style={{ borderBottomColor: current(h) ? 'currentColor' : 'transparent' }}>{l}</Link>
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
            <p className="t-meta muted" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 12, lineHeight: 1.8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/aivensi-mark-light.svg" alt="" width={28} height={28} style={{ display: 'block' }} />Waasmunster · Waasland
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
