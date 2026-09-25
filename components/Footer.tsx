import Link from 'next/link';

/** Footer met optionele slot-CTA. Eén knop, geen concurrerende CTA's. */
export function Footer({ cta = 'Wil je dat dit beter werkt?', tone = 'ink' }: { cta?: string | null; tone?: 'ink' | 'cream' }) {
  return (
    <div className={`page-${tone}`}>
      {cta && (
        <section className="wrap" aria-labelledby="footer-cta" style={{ paddingTop: 'clamp(80px,11vw,160px)', paddingBottom: 'clamp(48px,6vw,80px)' }}>
          <h2 id="footer-cta" className="t-h2">{cta}</h2>
          <p style={{ marginTop: 'clamp(32px,5vw,56px)' }}><Link href="/contact" className="btn">Plan een gesprek <span aria-hidden="true">→</span></Link></p>
        </section>
      )}
      <footer className="wrap rule t-meta muted" style={{ paddingTop: 28, paddingBottom: 48, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px 40px' }}>
        <nav aria-label="Footer" style={{ display: 'flex', flexWrap: 'wrap', gap: '0 28px' }}>
          {[['/werk', 'Werk'], ['/diensten', 'Diensten'], ['/insights', 'Insights'], ['/over', 'Over'], ['/regio/waasland', 'Waasland'], ['/contact', 'Contact']].map(([h, l]) => (
            <Link key={h} href={h} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, color: 'inherit' }}>{l}</Link>
          ))}
        </nav>
        <span style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>Waasmunster · Waasland · © 2026 AIVENSI</span>
      </footer>
    </div>
  );
}
