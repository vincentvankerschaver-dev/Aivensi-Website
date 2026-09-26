import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Faq } from '@/components/Faq';
import { ServiceSidebar } from '@/components/ServiceSidebar';
import { Snelcheck } from '@/components/Snelcheck';
import { Vraagbox } from '@/components/Vraagbox';
import { CHECKS } from '@/lib/snelcheck';
import { CASES, RELATED, SERVICES, SERVICE_SLUGS, SITE } from '@/lib/content';
import { AutoLink } from '@/components/AutoLink';
import { ARTICLES } from '@/lib/articles';
import { DIENST_CTA, SHORT, STEP_DESC, faqFor } from '@/lib/faq';

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
            <nav aria-label="Kruimelpad" className="t-mono muted crumbs"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/diensten">Diensten</Link><span aria-hidden="true">/</span><span className="accent" aria-current="page">{s.name}</span></nav>
            <h1 id="dienst-title" className="t-hero" style={{ maxWidth: '16ch', fontSize: 'clamp(2.4rem,6vw,6rem)', overflowWrap: 'break-word', hyphens: 'auto' }}>{s.name.includes(' & ') ? <>{s.name.split(' & ')[0]}<span style={{ color: 'var(--c-ember-500)' }}> &amp; </span>{s.name.split(' & ')[1]}</> : s.name}</h1>
            <div className="g2" style={{ alignItems: 'end', marginTop: 'clamp(24px,3vw,40px)', paddingTop: 'clamp(20px,2.4vw,28px)', borderTop: '1px solid var(--color-border)' }}>
              <p className="t-serif muted" style={{ margin: 0, maxWidth: '30ch' }}>{s.lead}</p>
              <p className="t-mono accent" style={{ margin: 0 }}>Schakel · {s.chain}</p>
            </div>
          </div>
        </section>

        <section className="page-cream" aria-label="Inhoud">
          <div className="wrap split">
            <ServiceSidebar current={slug} topic={SHORT[slug] ?? s.name} />
            <article style={{ display: 'grid', gap: 'clamp(48px,6vw,88px)' }}>
              <div style={{ display: 'grid', gap: 20 }}>
                <h2 className="t-h4 sec-h">Waarom dit ertoe doet</h2>
                <p style={{ margin: 0, fontSize: 'clamp(1.15rem,1.6vw,1.4rem)', lineHeight: 1.5, maxWidth: '52ch' }}><AutoLink text={s.intro} self={slug} /></p>
                <p className="t-body-lg muted" style={{ margin: 0, maxWidth: '52ch' }}><AutoLink text={s.for} self={slug} /></p>
                {s.local && <p className="t-body muted" style={{ margin: 0, maxWidth: '52ch' }}>{s.local}</p>}
              </div>
              {s.fit && (
                <div style={{ display: 'grid', gap: 24 }}>
                  <h2 className="t-h4 sec-h">Wanneer dit past</h2>
                  <div className="fit2">
                    <div><p className="t-mono accent" style={{ margin: 0 }}>Past goed als</p><ul>{s.fit.yes.map(t => <li key={t}><span aria-hidden="true" className="accent">+</span><span>{t}</span></li>)}</ul></div>
                    <div><p className="t-mono muted" style={{ margin: 0 }}>Minder geschikt als</p><ul className="muted">{s.fit.no.map(t => <li key={t}><span aria-hidden="true">–</span><span>{t}</span></li>)}</ul></div>
                  </div>
                </div>
              )}
              <div style={{ display: 'grid', gap: 24 }}>
                <h2 className="t-h4 sec-h">Wat je krijgt</h2>
                <ul className="get-grid">
                  {s.get.map(g => <li key={g}><span aria-hidden="true" className="get-check">✓</span><span className="t-body">{g}</span></li>)}
                </ul>
              </div>
              {CHECKS[slug] && <Snelcheck slug={slug} serviceName={s.name} />}
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
              {s.example && (() => {
                const ex = s.example.c ? CASES.find(c => c.slug === s.example!.c) : undefined;
                const inner = (<>
                  <span className="t-mono" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, color: 'var(--c-ember-400)' }}><span>{ex ? `Case · ${ex.name}` : 'Voorbeeld · typisch traject'}</span>{ex && <span aria-hidden="true" className="ex-arrow">→</span>}</span>
                  <strong style={{ fontWeight: 800, fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>{s.example.title}</strong>
                  <span className="t-body" style={{ color: 'var(--c-sand-300)', maxWidth: '56ch' }}>{s.example.body}</span>
                </>);
                return (
                  <div style={{ display: 'grid', gap: 24 }}>
                    <h2 className="t-h4 sec-h">Uit de praktijk</h2>
                    {ex ? <Link href={`/werk/${ex.slug}`} className="ex-card">{inner}</Link> : <div className="ex-card">{inner}</div>}
                  </div>
                );
              })()}
              {s.cost && (
                <div style={{ display: 'grid', gap: 20 }}>
                  <h2 className="t-h4 sec-h">Wat de investering bepaalt</h2>
                  <p className="t-body-lg muted" style={{ margin: 0, maxWidth: '52ch' }}>{s.cost.intro}</p>
                  <ol className="cost-list">{s.cost.factors.map((t, n) => <li key={t}><span className="t-mono accent">0{n + 1}</span><span className="t-body">{t}</span></li>)}</ol>
                  <p className="t-body" style={{ margin: 0, fontWeight: 600, maxWidth: '52ch' }}>{s.cost.outro}</p>
                </div>
              )}
              <div style={{ display: 'grid', gap: 24 }}>
                <h2 className="t-h4 sec-h">Veelgestelde vragen</h2>
                <Faq items={faq} />
              </div>
              {Object.values(ARTICLES).filter(x => x.services.includes(slug)).map(x => (
                <div key={x.slug} style={{ display: 'grid', gap: 12 }}>
                  <p className="t-mono muted" style={{ margin: 0 }}>Om verder te lezen</p>
                  <Link href={`/insights/${x.slug}`} className="rel-list" style={{ display: 'grid', gap: 6, padding: '18px 0', borderBottom: '1px solid var(--color-border)' }}><span className="rel-name">{x.title} →</span><span className="t-body muted">{x.description}</span></Link>
                </div>
              ))}
              {RELATED[slug] && (
                <div style={{ display: 'grid', gap: 24 }}>
                  <h2 className="t-h4 sec-h">Hoort hier vaak bij</h2>
                  <ul className="rel-list">
                    {RELATED[slug].map(r => (
                      <li key={r}><Link href={`/diensten/${r}`}><span className="rel-name">{SERVICES[r].name}</span><span aria-hidden="true" className="accent">→</span><span className="t-body muted" style={{ gridColumn: '1 / -1' }}>{SERVICES[r].lead}</span></Link></li>
                    ))}
                  </ul>
                </div>
              )}
              <Vraagbox enabled={!!process.env.ANTHROPIC_API_KEY} context={`dienstpagina ${s.name}`} />
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
      <Footer cta={DIENST_CTA[slug] ?? 'Klaar om hier werk van te maken?'} />
    </>
  );
}
