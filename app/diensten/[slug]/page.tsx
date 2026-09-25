import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Faq } from '@/components/Faq';
import { ServiceSidebar } from '@/components/ServiceSidebar';
import { CASES, SERVICES, SERVICE_SLUGS, SITE } from '@/lib/content';
import { SHORT, STEP_DESC, faqFor } from '@/lib/faq';

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
  const faq = faqFor(slug);
  const schema = [
    { '@context': 'https://schema.org', '@type': 'Service', name: s.name, description: s.description, url: `${SITE}/diensten/${slug}`, provider: { '@type': 'Organization', name: 'AIVENSI' }, areaServed: 'Waasland' },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['Home', '/'], ['Diensten', '/diensten'], [s.name, `/diensten/${slug}`]].map(([name, p], n) => ({ '@type': 'ListItem', position: n + 1, name, item: SITE + p })) },
  ];
  return (
    <>
      <Nav />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <section className="page-cream" aria-labelledby="dienst-title">
          <div className="wrap" style={{ paddingTop: 'clamp(56px,8vw,112px)', paddingBottom: 'clamp(40px,5vw,64px)' }}>
            <nav aria-label="Kruimelpad" className="t-mono muted crumbs"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/diensten">Diensten</Link><span aria-hidden="true">/</span><span className="accent" aria-current="page">{s.idx}</span></nav>
            <div className="g2" style={{ alignItems: 'end' }}>
              <h1 id="dienst-title" className="t-hero">{s.name}</h1>
              <div style={{ display: 'grid', gap: 20 }}>
                <p className="t-serif muted" style={{ margin: 0, maxWidth: '30ch' }}>{s.lead}</p>
                <p className="t-mono muted" style={{ margin: 0 }}>Schakel · {s.chain}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="page-cream" aria-label="Inhoud">
          <div className="wrap split">
            <ServiceSidebar current={slug} topic={SHORT[slug] ?? s.name} />
            <article style={{ display: 'grid', gap: 'clamp(48px,6vw,88px)' }}>
              <div style={{ display: 'grid', gap: 20 }}>
                <h2 className="t-h4 sec-h">Waarom dit ertoe doet</h2>
                <p style={{ margin: 0, fontSize: 'clamp(1.15rem,1.6vw,1.4rem)', lineHeight: 1.5, maxWidth: '52ch' }}>{s.intro}</p>
                <p className="t-body-lg muted" style={{ margin: 0, maxWidth: '52ch' }}>{s.for}</p>
              </div>
              <div style={{ display: 'grid', gap: 24 }}>
                <h2 className="t-h4 sec-h">Wat je krijgt</h2>
                <ul className="get-grid">
                  {s.get.map(g => <li key={g}><span aria-hidden="true" className="get-check">✓</span><span className="t-body">{g}</span></li>)}
                </ul>
              </div>
              <div style={{ display: 'grid', gap: 24 }}>
                <div className="g2" style={{ alignItems: 'end', gap: 24 }}>
                  <h2 className="t-h4 sec-h">Hoe we werken</h2>
                  <p className="t-body muted" style={{ margin: 0, maxWidth: '40ch' }}>Geen stappen om de stappen: elke fase levert iets op dat je kunt zien en beoordelen.</p>
                </div>
                <ol className="steps">
                  {s.approach.map((a, n) => (
                    <li key={a}><span className="step-n">0{n + 1}</span><div style={{ display: 'grid', gap: 6 }}><span style={{ fontWeight: 800, fontSize: 'clamp(1.1rem,1.5vw,1.3rem)', letterSpacing: '-0.02em' }}>{a}</span><span className="muted" style={{ fontSize: 14, lineHeight: 1.55 }}>{STEP_DESC[n]}</span></div></li>
                  ))}
                </ol>
              </div>
              {cases.length > 0 && (
                <div style={{ display: 'grid', gap: 24 }}>
                  <h2 className="t-h4 sec-h">Bewijs</h2>
                  <div style={{ borderTop: '1px solid var(--c-ink-900)' }}>
                    {cases.map(c => (
                      <Link key={c.slug} href={`/werk/${c.slug}`} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, padding: '24px 0', borderBottom: '1px solid var(--color-border)' }}>
                        <span className="t-h4">{c.name}</span><span className="t-serif muted" style={{ fontSize: 'clamp(1.1rem,1.6vw,1.35rem)' }}>{c.tag} →</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ display: 'grid', gap: 24 }}>
                <h2 className="t-h4 sec-h">Veelgestelde vragen</h2>
                <Faq items={faq} />
              </div>
            </article>
          </div>
        </section>

        <nav className="page-cream" aria-label="Dienst-navigatie" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="wrap t-mono" style={{ paddingTop: 'clamp(32px,4vw,56px)', paddingBottom: 'clamp(32px,4vw,56px)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16 }}>
            <Link href={`/diensten/${prev}`} className="muted" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>← {SERVICES[prev].name}</Link>
            <Link href={`/diensten/${next}`} className="muted" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>{SERVICES[next].name} →</Link>
          </div>
        </nav>
      </main>
      <Footer cta="Wil je dat dit beter werkt?" />
    </>
  );
}
