import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Karaoke } from '@/components/Karaoke';
import { SERVICES, SERVICE_SLUGS, SITE, TOWNS } from '@/lib/content';
import { COMPANY, filled } from '@/lib/legal';

const NAME = filled(COMPANY.founder) ? COMPANY.founder : 'Vincent';

export const metadata: Metadata = {
  title: 'Over — Digitale studio in Waasmunster',
  description: 'AIVENSI ontwerpt en bouwt websites, webshops, AI-toepassingen en automatisering voor kmo\'s in het Waasland. Gevestigd in Waasmunster, geleid door oprichter Vincent.',
  alternates: { canonical: '/over' },
};

const SCHEMA = {
  '@context': 'https://schema.org', '@type': 'AboutPage', name: 'Over AIVENSI', url: `${SITE}/over`,
  mainEntity: { '@type': 'Person', name: NAME, jobTitle: 'Oprichter', url: `${SITE}/over`, ...(filled(COMPANY.linkedin) ? { sameAs: [COMPANY.linkedin] } : {}),
    worksFor: { '@type': 'ProfessionalService', name: 'AIVENSI', address: { '@type': 'PostalAddress', addressLocality: 'Waasmunster', addressRegion: 'Oost-Vlaanderen', addressCountry: 'BE' }, areaServed: ['Waasland', ...TOWNS.slice(1).map(t => t[0])] },
    knowsAbout: ['Webdesign', 'Webdevelopment', 'E-commerce', 'AI', 'Automatisering', 'SEO'] },
};

const FACTS: [string, React.ReactNode][] = [
  ['Naam', NAME],
  ['Rol', 'Oprichter en aanspreekpunt — strategie, design, development, AI'],
  ['Team', 'Vast netwerk van freelance specialisten, per project samengesteld'],
  ['Basis', 'Waasmunster, Oost-Vlaanderen'],
  ['Regio', 'Waasland — Sint-Niklaas, Lokeren, Beveren, Temse, Hamme — en online'],
  ['Ervaring', 'Ruim tien jaar in e-commerce, web, SEO, AI en automatisering'],
  ['Stack', 'WordPress/Elementor · Next.js · Supabase'],
  ...(filled(COMPANY.linkedin) ? [['LinkedIn', <a key="li" href={COMPANY.linkedin} target="_blank" rel="noopener me" style={{ borderBottom: '1px solid currentColor' }}>Profiel ↗</a>] as [string, React.ReactNode]] : []),
  ['Contact', <Link key="c" href="/contact" style={{ borderBottom: '1px solid currentColor' }}>Plan een gesprek →</Link>],
];

const TIMELINE: [string, string, React.ReactNode, boolean?][] = [
  ['Eerder', 'E-commerce, web en SEO', 'Webshops bouwen en laten groeien, websites ontwerpen, gevonden worden in Google. De basis van alles wat AIVENSI nu doet.'],
  ['Daarna', 'AI en automatisering', 'Koppelingen tussen systemen, terugkerend werk automatiseren, AI inzetten waar het effectief tijd bespaart in plaats van als gimmick.'],
  ['AIVENSI', 'Eén studio voor het hele systeem', <>Strategie, design, development en AI samengebracht voor kmo&rsquo;s in het Waasland, met freelance specialisten waar nodig en één aanspreekpunt. Eerste referentie uit de streek: <Link href="/werk/ginkgo-tree" style={{ borderBottom: '1px solid currentColor', color: 'var(--c-ink-900)' }}>Ginkgo Tree, Waasmunster</Link>.</>],
  ['Nu', 'EMSRO, eigen product', <>EMSRO brengt offertes, planning en facturen samen in één digitale werkomgeving. Gebouwd op wat ik bij klanten zag ontbreken — en getest in de praktijk. <Link href="/werk/emsro" style={{ borderBottom: '1px solid currentColor', color: 'var(--c-ink-900)' }}>Lees de case →</Link></>, true],
];

export default function Over() {
  return (
    <>
      <Nav />
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

        <section className="page-ink over-hero" aria-labelledby="over-title">
          <Image src="/over-hero.jpg" alt="" aria-hidden="true" fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.55 }} />
          <div aria-hidden="true" className="over-hero-shade" />
          <div className="wrap" style={{ position: 'relative', width: '100%', paddingTop: 'clamp(96px,14vw,200px)', paddingBottom: 'clamp(48px,7vw,96px)', display: 'grid', gap: 28 }}>
            <p className="t-mono accent" style={{ margin: 0 }}>Over AIVENSI</p>
            <Karaoke as="h1" id="over-title" tone="ink" className="t-hero" style={{ fontSize: 'clamp(2.8rem,8vw,7.2rem)' }} text="Wie er achter AIVENSI zit." />
            <div className="g2" style={{ alignItems: 'end', paddingTop: 12, marginTop: 12, borderTop: '1px solid rgba(250,248,244,0.18)' }}>
              <Karaoke tone="ink" delay={0.9} className="t-serif" style={{ margin: 0, color: 'var(--c-cream-100)', maxWidth: '26ch' }} text="Een digitale studio in Waasmunster, geleid door Vincent." />
              <div style={{ display: 'grid', gap: 24 }}>
                <p className="t-body-lg" style={{ margin: 0, color: 'var(--c-sand-300)', maxWidth: '46ch' }}>Websites, webshops, AI-toepassingen en automatisering voor kmo&rsquo;s in het Waasland. Eén aanspreekpunt van strategie tot oplevering, met een vast netwerk van freelance specialisten waar het project dat vraagt.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24 }}>
                  <Link href="/contact" className="btn">Plan een gesprek <span aria-hidden="true">→</span></Link>
                  <Link href="/werk" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, fontWeight: 700, fontSize: 15 }}>Bekijk het werk <span aria-hidden="true">→</span></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-cream" aria-labelledby="bio">
          <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 'clamp(40px,6vw,96px)', alignItems: 'start', paddingTop: 'clamp(64px,9vw,144px)', paddingBottom: 'clamp(64px,9vw,144px)' }}>
            <div style={{ display: 'grid', gap: 24 }}>
              <p className="t-mono accent" style={{ margin: 0 }}>Wie</p>
              <h2 id="bio" className="t-h3" style={{ maxWidth: '16ch' }}>Eén aanspreekpunt, geen agency-structuur</h2>
              <div className="t-body-lg muted" style={{ display: 'grid', gap: 18, maxWidth: '50ch' }}>
                <p style={{ margin: 0 }}>Ik heb ruim tien jaar gewerkt in e-commerce, web, SEO en later AI en automatisering. Wat ik telkens zag: bedrijven hebben genoeg tools, maar die staan los van elkaar. De website weet niet wat de webshop verkoopt; de AI-tool staat naast het proces dat ze zou moeten versnellen.</p>
                <p style={{ margin: 0 }}>AIVENSI is mijn antwoord daarop. Ik ben je vaste aanspreekpunt en bewaak strategie, design en development als één geheel. Waar een project meer handen of specifieke expertise vraagt, werk ik met freelancers die ik ken en vertrouw — zonder dat jij met vijf mensen moet afstemmen. Wat we afspreken is wat er komt.</p>
                <p style={{ margin: 0 }}>AI gebruik ik waar het tijd bespaart — offertes inspreken, werfverslagen omzetten, terugkerend werk automatiseren. Nergens anders.</p>
              </div>
              <blockquote className="t-serif" style={{ margin: '12px 0 0', paddingTop: 24, borderTop: '1px solid var(--c-ink-900)', maxWidth: '30ch' }}>Technologie is pas waardevol als ze iets vooruit helpt.</blockquote>
            </div>
            <div style={{ display: 'grid', gap: 32 }}>
              <div className="frame" style={{ aspectRatio: '4 / 5' }}>
                <Image src="/vincent.jpg" alt="Vincent, oprichter van AIVENSI" fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectFit: 'cover', objectPosition: '60% 20%' }} />
              </div>
              <dl style={{ margin: 0, borderTop: '1px solid var(--c-ink-900)' }}>
                {FACTS.map(([k, v]) => <div key={k} className="dl-row"><dt className="t-mono muted" style={{ paddingTop: 3 }}>{k}</dt><dd className="t-body" style={{ margin: 0 }}>{v}</dd></div>)}
              </dl>
            </div>
          </div>
        </section>

        <section className="page-ink" aria-labelledby="doe">
          <div className="wrap" style={{ paddingTop: 'clamp(64px,9vw,144px)', paddingBottom: 'clamp(64px,9vw,144px)' }}>
            <div className="g2" style={{ alignItems: 'end', marginBottom: 'clamp(40px,6vw,72px)' }}>
              <div>
                <p className="t-mono accent" style={{ margin: '0 0 32px' }}>Wat ik doe</p>
                <h2 id="doe" className="t-h3">Zeven diensten, één systeem</h2>
              </div>
              <p className="t-body-lg muted" style={{ margin: 0, maxWidth: '44ch' }}>Je kunt ze apart afnemen, maar ze zijn ontworpen om samen te werken: wat de strategie beslist, bouwt het development, en wat we bouwen levert de data voor de volgende stap.</p>
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid var(--c-ink-700)' }}>
              {SERVICE_SLUGS.map(slug => (
                <li key={slug}>
                  <Link href={`/diensten/${slug}`} className="svc-row" style={{ borderBottom: '1px solid var(--c-ink-700)' }}>
                    <span style={{ fontWeight: 800, fontSize: 'clamp(1.25rem,1.9vw,1.6rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{SERVICES[slug].name}</span>
                    <span className="t-body muted svc-hide">{SERVICES[slug].lead}</span>
                    <span className="svc-hide" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="page-cream" aria-labelledby="traject">
          <div className="wrap" style={{ paddingTop: 'clamp(64px,9vw,144px)', paddingBottom: 'clamp(64px,9vw,144px)' }}>
            <p className="t-mono accent" style={{ margin: '0 0 32px' }}>Traject</p>
            <h2 id="traject" className="t-h3" style={{ margin: '0 0 clamp(40px,6vw,72px)', maxWidth: '16ch' }}>Hoe AIVENSI is ontstaan</h2>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid var(--c-ink-900)' }}>
              {TIMELINE.map(([when, title, body, now]) => (
                <li key={when} className="tl">
                  <span className={`t-mono ${now ? 'accent' : 'muted'}`}><span className="tl-num">{when}</span></span>
                  <div style={{ display: 'grid', gap: 8, maxWidth: '52ch' }}>
                    <strong style={{ fontWeight: 800, fontSize: 'clamp(1.25rem,1.9vw,1.6rem)', letterSpacing: '-0.02em' }}>{title}</strong>
                    <p className="t-body muted" style={{ margin: 0 }}>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer cta="Wil je weten wat dit voor jouw bedrijf betekent?" />
    </>
  );
}
