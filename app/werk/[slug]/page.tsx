import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Row } from '@/components/SectionIntro';
import { CASES, CASE_SLUGS, SITE } from '@/lib/content';

type Params = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return CASE_SLUGS.map(slug => ({ slug })); }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params; const c = CASES.find(x => x.slug === slug);
  if (!c) return {};
  return { title: `${c.name} — ${c.tag}`, description: c.description, alternates: { canonical: `/werk/${c.slug}` }, openGraph: c.img ? { images: [c.img] } : undefined };
}

export default async function CasePage({ params }: Params) {
  const { slug } = await params; const c = CASES.find(x => x.slug === slug);
  if (!c) notFound();
  const other = CASES.find(x => x.slug !== c.slug)!;
  const sections: [string, string][] = [['Context', c.context], ['Probleem', c.problem], ['Aanpak', c.approach], ['Design', c.design], ['Technologie', c.tech], ['Resultaat', c.result]];
  const schema = { '@context': 'https://schema.org', '@type': 'CreativeWork', name: c.name, description: c.description, url: `${SITE}/werk/${c.slug}`, creator: { '@type': 'Organization', name: 'AIVENSI' }, ...(c.url ? { sameAs: c.url } : {}) };
  return (
    <>
      <Nav />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <section className="page-cream" aria-labelledby="case-title">
          <div className="wrap" style={{ paddingTop: 'clamp(64px,9vw,128px)', paddingBottom: 'clamp(32px,4vw,48px)', display: 'grid', gap: 24 }}>
            <p className="t-mono muted" style={{ margin: 0 }}><Link href="/werk">Werk</Link> · Case {c.idx}</p>
            <h1 id="case-title" className="t-h2">{c.name}</h1>
            <p className="t-serif muted" style={{ margin: 0 }}>{c.tag}</p>
            <p className="t-meta muted" style={{ margin: 0 }}>{c.role}</p>
          </div>
          <div className="wrap" style={{ paddingBottom: 'clamp(56px,8vw,112px)' }}>
            <div className="frame" style={{ aspectRatio: '21 / 9' }}>
              {c.img ? <Image src={c.img} alt={c.alt} fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'top left' }} />
                : <span className="t-meta muted frame-empty">{c.name} — screenshot volgt</span>}
            </div>
          </div>
        </section>
        <section className="page-cream" aria-label="Case-inhoud" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="wrap" style={{ paddingTop: 'clamp(24px,3vw,40px)', paddingBottom: 'clamp(48px,6vw,88px)' }}>
            {sections.map(([label, text], i) => (
              <Row key={label} label={`0${i + 1} — ${label}`} last={i === sections.length - 1}><p className="t-body-lg" style={{ margin: 0, maxWidth: '58ch' }}>{text}</p></Row>
            ))}
          </div>
        </section>
        <section className="page-ink" aria-label="Wat samenkomt en inzichten">
          <div className="wrap g2" style={{ paddingTop: 'clamp(64px,9vw,128px)', paddingBottom: 'clamp(64px,9vw,128px)', gap: 'clamp(32px,5vw,80px)' }}>
            <div>
              <p className="t-mono accent" style={{ margin: '0 0 32px' }}>Wat samenkomt</p>
              <ol className="t-meta" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {c.modules.map((m, i) => <li key={m} className="rule" style={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', gap: 16 }}><span>{m}</span><span className="muted">0{i + 1}</span></li>)}
              </ol>
            </div>
            <div>
              <p className="t-mono accent" style={{ margin: '0 0 32px' }}>Inzichten</p>
              {c.insights.map(t => <p key={t} className="t-serif rule" style={{ margin: 0, padding: '20px 0', fontSize: 'clamp(1.3rem,2.2vw,1.9rem)' }}>{t}</p>)}
            </div>
            {c.url && <p style={{ margin: 0 }}><a href={c.url} target="_blank" rel="noopener" className="link">Bezoek de website <span aria-hidden="true">↗</span></a></p>}
          </div>
        </section>
        <nav className="page-cream" aria-label="Case-navigatie">
          <div className="wrap t-meta" style={{ paddingTop: 'clamp(32px,4vw,56px)', paddingBottom: 'clamp(32px,4vw,56px)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16 }}>
            <Link href="/werk" className="muted" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>← Alle cases</Link>
            <Link href={`/werk/${other.slug}`} className="muted" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>Volgende: {other.name} →</Link>
          </div>
        </nav>
      </main>
      <Footer cta="Heb je een digitaal idee?" />
    </>
  );
}
