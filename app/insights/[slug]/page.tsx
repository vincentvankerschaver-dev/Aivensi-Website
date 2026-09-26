import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Karaoke } from '@/components/Karaoke';
import { Faq } from '@/components/Faq';
import { ARTICLES, ARTICLE_SLUGS } from '@/lib/articles';
import { CASES, SERVICES, SITE } from '@/lib/content';
import { COMPANY } from '@/lib/legal';

type Params = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return ARTICLE_SLUGS.map(slug => ({ slug })); }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params; const a = ARTICLES[slug];
  if (!a) return {};
  return { title: a.title, description: a.description, alternates: { canonical: `/insights/${slug}` }, openGraph: { type: 'article', publishedTime: a.published, modifiedTime: a.updated } };
}

const fmt = (d: string) => new Date(d).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params; const a = ARTICLES[slug];
  if (!a) notFound();
  const toc = a.body.filter((b): b is Extract<typeof b, { t: 'h2' }> => b.t === 'h2');
  const known = (s: string) => !s.startsWith('[');
  const schema = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.description, datePublished: a.published, dateModified: a.updated, url: `${SITE}/insights/${slug}`, inLanguage: 'nl-BE',
      author: { '@type': 'Person', name: known(COMPANY.founder) ? COMPANY.founder : 'Vincent', url: `${SITE}/over` }, publisher: { '@type': 'Organization', name: 'AIVENSI', url: SITE } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: a.faq.map(([q, ans]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: ans } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['Home', '/'], ['Inzichten', '/insights'], [a.title, `/insights/${slug}`]].map(([name, p], n) => ({ '@type': 'ListItem', position: n + 1, name, item: SITE + p })) },
  ];
  return (
    <>
      <Nav />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <article className="page-cream" aria-labelledby="art-title">
          <header className="wrap" style={{ paddingTop: 'clamp(56px,8vw,112px)', paddingBottom: 'clamp(32px,4vw,56px)', display: 'grid', gap: 20 }}>
            <nav aria-label="Kruimelpad" className="t-mono muted crumbs"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/insights">Inzichten</Link></nav>
            <h1 id="art-title" className="t-h2" style={{ maxWidth: '18ch' }}>{a.title}</h1>
            <p className="t-body-lg muted" style={{ margin: 0 }}>{a.description}</p>
            <p className="t-meta muted" style={{ margin: 0, display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
              <span>Door {known(COMPANY.founder) ? COMPANY.founder : 'Vincent'}</span><span aria-hidden="true">·</span><time dateTime={a.published}>{fmt(a.published)}</time>
            </p>
          </header>
          <div className="wrap legal" style={{ borderTop: '1px solid var(--c-ink-900)' }}>
            <nav aria-label="In dit artikel" className="legal-toc">
              <p className="t-mono muted" style={{ margin: '0 0 12px' }}>In dit artikel</p>
              <ol>{toc.map(h => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}</ol>
            </nav>
            <div className="legal-body art-body">
              {a.body.map((b, i) => {
                if (b.t === 'p') return <p key={i}>{b.text}</p>;
                if (b.t === 'h2') return <h2 key={i} id={b.id} className="t-h4 sec-h" style={{ scrollMarginTop: 96, marginTop: 16 }}>{b.text}</h2>;
                if (b.t === 'quote') return <Karaoke key={i} as="blockquote" tone="cream" text={b.text} className="t-serif" style={{ margin: 0, paddingTop: 20, borderTop: '1px solid var(--c-ink-900)' }} />;
                return (
                  <ol key={i} className="art-list">
                    {b.items.map(([h, t]) => <li key={h}><strong>{h}</strong><span>{t}</span></li>)}
                  </ol>
                );
              })}
              <section aria-labelledby="art-faq" style={{ display: 'grid', gap: 20, marginTop: 24 }}>
                <h2 id="art-faq" className="t-h4 sec-h">Kort gevraagd</h2>
                <Faq items={a.faq} />
              </section>
              <aside aria-label="Verder lezen" style={{ display: 'grid', gap: 16, marginTop: 24 }}>
                <p className="t-mono muted" style={{ margin: 0 }}>Hier helpen we mee</p>
                <ul className="rel-list">
                  {a.services.map(s => <li key={s}><Link href={`/diensten/${s}`}><span className="rel-name">{SERVICES[s].name}</span><span aria-hidden="true" className="accent">→</span></Link></li>)}
                  {a.cases.map(c => { const cs = CASES.find(x => x.slug === c); return cs ? <li key={c}><Link href={`/werk/${c}`}><span className="rel-name">Case: {cs.name}</span><span aria-hidden="true" className="accent">→</span></Link></li> : null; })}
                </ul>
              </aside>
            </div>
          </div>
        </article>
      </main>
      <Footer cta="Welk handwerk mag eruit?" />
    </>
  );
}
