import Link from 'next/link';
import type { LegalSection } from '@/lib/legal';
import { COMPANY } from '@/lib/legal';

/** Juridische pagina: kop, inhoudstafel (sticky op desktop, bovenaan op mobiel), secties. Server component. */
export function LegalPage({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <section className="page-cream" aria-labelledby="legal-title">
        <div className="wrap" style={{ paddingTop: 'clamp(56px,8vw,112px)', paddingBottom: 'clamp(32px,4vw,56px)', display: 'grid', gap: 20 }}>
          <nav aria-label="Kruimelpad" className="t-mono muted crumbs"><Link href="/">Home</Link><span aria-hidden="true">/</span><span className="accent" aria-current="page">{eyebrow}</span></nav>
          <h1 id="legal-title" className="t-h2">{title}</h1>
          <p className="t-body-lg muted" style={{ margin: 0 }}>{intro}</p>
          <p className="t-meta muted" style={{ margin: 0 }}>Laatst bijgewerkt: {COMPANY.updated}</p>
        </div>
      </section>
      <section className="page-cream" aria-label="Inhoud">
        <div className="wrap legal">
          <nav aria-label="Op deze pagina" className="legal-toc">
            <p className="t-mono muted" style={{ margin: '0 0 12px' }}>Op deze pagina</p>
            <ol>
              {sections.map(s => <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}
            </ol>
          </nav>
          <article className="legal-body">
            {sections.map(s => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`} className="t-h4 sec-h">{s.title}</h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
