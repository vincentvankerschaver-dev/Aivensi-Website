import Link from 'next/link';
import { SERVICES, SERVICE_SLUGS } from '@/lib/content';

/** Sticky zijbalk: alle diensten + donker CTA-blok. Server Component. */
export function ServiceSidebar({ current, topic }: { current?: string; topic: string }) {
  return (
    <aside className="side">
      <nav aria-label="Alle diensten">
        <p className="t-mono muted" style={{ margin: '0 0 12px' }}>Diensten</p>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid var(--c-ink-900)' }}>
          {SERVICE_SLUGS.map(s => (
            <li key={s}>
              <Link href={`/diensten/${s}`} className="side-link" aria-current={s === current ? 'page' : undefined}>
                <span className="t-meta accent" style={{ fontSize: 11 }}>{SERVICES[s].idx}</span>
                <span>{SERVICES[s].name}</span>
                <span className="side-arrow accent" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="side-cta">
        <p className="t-meta" style={{ margin: 0, color: 'var(--c-sand-300)', fontSize: 11 }}>Vragen over {topic}?</p>
        <p style={{ margin: 0, fontWeight: 800, fontSize: 'clamp(1.25rem,1.7vw,1.5rem)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>Eerst een gesprek. Dan een voorstel.</p>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--c-sand-300)' }}>Eén aanspreekpunt, geen verkooppraatje. We kijken samen wat dit voor jouw bedrijf moet opleveren.</p>
        <Link href="/contact" className="btn" style={{ justifyContent: 'center', minHeight: 48 }}>Plan een gesprek <span aria-hidden="true">→</span></Link>
      </div>
    </aside>
  );
}
