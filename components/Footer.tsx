import Link from 'next/link';

const MQ = (text: string, n: number) =>
  Array.from({ length: n }).flatMap((_, i) => [<span key={`t${i}`}>{text}</span>, <span key={`d${i}`} className="accent">·</span>]);

/** Footer. variant 'marquee' = dubbele marquee + ronde ember-knop (standaard op subpagina's). */
export function Footer({ cta = 'Laten we praten over wat digitaal beter kan.', variant = 'marquee' }: { cta?: string | null; variant?: 'marquee' | 'plain'; tone?: 'ink' | 'cream' }) {
  return (
    <div className="page-ink ftr">
      {cta && variant === 'marquee' && (
        <>
          <section className="ftr-mq-wrap" aria-labelledby="footer-cta">
            <h2 id="footer-cta" className="sr">{cta}</h2>
            <div aria-hidden="true" style={{ overflow: 'hidden' }}><div className="ftr-mq">{MQ('Laten we praten', 4)}</div></div>
            <div aria-hidden="true" style={{ overflow: 'hidden' }}><div className="ftr-mq-r">{MQ('over wat digitaal beter kan', 3)}</div></div>
            <Link href="/contact" className="ftr-round"><span>Plan een<br />gesprek <span aria-hidden="true">→</span></span></Link>
          </section>
          <div className="wrap t-mono" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, color: 'var(--c-sand-300)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>Eén gesprek. Geen pitch.</span>
            <Link href="/werk" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, color: 'var(--c-cream-50)' }}>Of bekijk eerst het werk →</Link>
          </div>
        </>
      )}
      {cta && variant === 'plain' && (
        <section className="wrap" aria-labelledby="footer-cta" style={{ paddingTop: 'clamp(80px,11vw,160px)', paddingBottom: 'clamp(48px,6vw,80px)' }}>
          <h2 id="footer-cta" className="t-h2">{cta}</h2>
          <p style={{ marginTop: 'clamp(32px,5vw,56px)' }}><Link href="/contact" className="btn">Plan een gesprek <span aria-hidden="true">→</span></Link></p>
        </section>
      )}
      <footer className="wrap t-meta" style={{ marginTop: 'clamp(40px,6vw,72px)', borderTop: '1px solid var(--c-ink-700)', paddingTop: 28, paddingBottom: 48, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px 40px', color: 'var(--c-sand-300)' }}>
        <nav aria-label="Footer" style={{ display: 'flex', flexWrap: 'wrap', gap: '0 28px' }}>
          {[['/werk', 'Werk'], ['/diensten', 'Diensten'], ['/insights', 'Insights'], ['/over', 'Over'], ['/regio/waasland', 'Waasland'], ['/contact', 'Contact']].map(([h, l]) => (
            <Link key={h} href={h} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, color: 'var(--c-cream-50)' }}>{l}</Link>
          ))}
        </nav>
        <span style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>Waasmunster · Waasland · © 2026 AIVENSI</span>
      </footer>
    </div>
  );
}
