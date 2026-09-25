import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Row } from '@/components/SectionIntro';
import { CASES, SERVICES, SERVICE_SLUGS, SITE } from '@/lib/content';

type Params = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return SERVICE_SLUGS.map(slug => ({ slug })); }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params; const s = SERVICES[slug];
  if (!s) return {};
  return { title: s.name, description: s.description, alternates: { canonical: `/diensten/${slug}` } };
}

export default async function Dienst({ params }: Params) {
  const { slug } = await params; const s = SERVICES[slug];
  if (!s) notFound();
  const i = SERVICE_SLUGS.indexOf(slug);
  const prev = SERVICE_SLUGS[(i + SERVICE_SLUGS.length - 1) % SERVICE_SLUGS.length], next = SERVICE_SLUGS[(i + 1) % SERVICE_SLUGS.length];
  const cases = CASES.filter(c => s.cases.includes(c.slug));
  const schema = { '@context': 'https://schema.org', '@type': 'Service', name: s.name, description: s.description, url: `${SITE}/diensten/${slug}`, provider: { '@type': 'Organization', name: 'AIVENSI' }, areaServed: 'Waasland' };
  return (
    <>
      <Nav />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <section className="page-cream" aria-labelledby="dienst-title">
          <div className="wrap" style={{ paddingTop: 'clamp(64px,9vw,128px)', paddingBottom: 'clamp(48px,6vw,80px)', display: 'grid', gap: 24 }}>
            <p className="t-mono muted" style={{ margin: 0 }}><Link href="/diensten">Diensten</Link> · {s.idx} · <span className="accent">{s.chain}</span></p>
            <h1 id="dienst-title" className="t-h2">{s.name}</h1>
            <p className="t-serif muted" style={{ margin: 0 }}>{s.lead}</p>
          </div>
        </section>
        <section className="page-cream" aria-label="Inhoud" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="wrap" style={{ paddingBottom: 'clamp(48px,6vw,88px)' }}>
            <Row label="Waarom"><p className="t-body-lg" style={{ margin: 0, maxWidth: '56ch' }}>{s.intro}</p></Row>
            <Row label="Wat je krijgt">
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {s.get.map((g, n) => <li key={g} className="t-body-lg" style={{ display: 'grid', gridTemplateColumns: '32px minmax(0,1fr)', gap: 16, padding: '16px 0', borderTop: n ? '1px solid var(--color-border)' : 0 }}><span className="t-meta accent" style={{ paddingTop: 6 }}>0{n + 1}</span><span>{g}</span></li>)}
              </ul>
            </Row>
            <Row label="Voor wie"><p className="t-body-lg muted" style={{ margin: 0, maxWidth: '56ch' }}>{s.for}</p></Row>
            <Row label="Aanpak" last>
              <ol className="t-meta" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: '12px 0', fontSize: 13 }}>
                {s.approach.map((a, n) => <li key={a} style={{ display: 'flex', alignItems: 'center' }}><span>{a}</span>{n < s.approach.length - 1 && <span aria-hidden="true" className="muted" style={{ margin: '0 16px' }}>→</span>}</li>)}
              </ol>
            </Row>
          </div>
        </section>
        {cases.length > 0 && (
          <section className="page-ink" aria-label="Bewijs">
            <div className="wrap" style={{ paddingTop: 'clamp(56px,8vw,112px)', paddingBottom: 'clamp(56px,8vw,112px)' }}>
              <p className="t-mono accent" style={{ margin: '0 0 32px' }}>Bewijs</p>
              {cases.map(c => (
                <Link key={c.slug} href={`/werk/${c.slug}`} className="rule" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, padding: '24px 0' }}>
                  <span className="t-h3">{c.name}</span><span className="t-serif muted" style={{ fontSize: 'clamp(1.1rem,1.8vw,1.5rem)' }}>{c.tag} →</span>
                </Link>
              ))}
            </div>
          </section>
        )}
        <nav className="page-cream" aria-label="Dienst-navigatie">
          <div className="wrap t-meta" style={{ paddingTop: 'clamp(32px,4vw,56px)', paddingBottom: 'clamp(32px,4vw,56px)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16 }}>
            <Link href={`/diensten/${prev}`} className="muted" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>← {SERVICES[prev].name}</Link>
            <Link href={`/diensten/${next}`} className="muted" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>{SERVICES[next].name} →</Link>
          </div>
        </nav>
      </main>
      <Footer />
    </>
  );
}
