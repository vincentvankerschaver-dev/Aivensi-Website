import type { Metadata } from 'next';
import Image from 'next/image';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Over — Ik ben Vincent. Ik bouw AIVENSI.',
  description: 'AIVENSI is founder-led: één persoon die strategie, design, development en AI samenbrengt. Ruim tien jaar in e-commerce, web, SEO, AI en automatisering.',
  alternates: { canonical: '/over' },
};

const STEPS = [
  ['Begrijpen', 'Waar sta je vandaag en waar liggen de grootste kansen? Eerst luisteren, dan pas iets voorstellen.'],
  ['Strategie', 'Wat heb je digitaal écht nodig — en wat niet? We beslissen samen wat we bouwen en in welke volgorde.'],
  ['Bouwen', 'Strategie wordt een werkende digitale oplossing. Getest op echte toestellen, met echte content.'],
  ['Groeien', 'Daarna blijven we verbeteren, automatiseren en optimaliseren. Wat het oplevert bepaalt de volgende stap.'],
];

export default function Over() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="page-cream" aria-labelledby="over-title">
          <div className="wrap" style={{ paddingTop: 'clamp(64px,9vw,128px)', paddingBottom: 'clamp(64px,9vw,128px)' }}>
            <p className="t-mono accent" style={{ margin: '0 0 40px' }}>Over AIVENSI</p>
            <div className="who" style={{ alignItems: 'start' }}>
              <div className="frame" style={{ aspectRatio: '4 / 5', maxWidth: 440 }}>
                <Image src="/vincent.jpg" alt="Vincent, oprichter van AIVENSI" fill priority sizes="(max-width: 900px) 100vw, 440px" style={{ objectFit: 'cover', objectPosition: '60% 20%' }} />
              </div>
              <div style={{ display: 'grid', gap: 28 }}>
                <h1 id="over-title" className="t-h2">Ik ben Vincent. Ik bouw AIVENSI.</h1>
                <p className="t-body-lg" style={{ margin: 0, maxWidth: '52ch' }}>Geen agency van veertig mensen. Wel iemand die strategie, design, development en AI zelf samenbrengt — en die jarenlang heeft gezien hoe bedrijven te veel losse tools verzamelen terwijl niets met elkaar praat.</p>
                <p className="t-body-lg muted" style={{ margin: 0, maxWidth: '52ch' }}>Daarom bestaat AIVENSI: om digitale groei eenvoudiger, slimmer en praktischer te maken. Ruim tien jaar in e-commerce, web, SEO, AI en automatisering. Gevestigd in Waasmunster, aan het werk in het Waasland en daarbuiten.</p>
                <blockquote className="t-serif" style={{ margin: '12px 0 0', padding: '28px 0 0', borderTop: '1px solid var(--c-ink-900)' }}>“Technologie is pas waardevol als ze iets vooruit helpt.”</blockquote>
              </div>
            </div>
          </div>
        </section>
        <section className="page-ink" aria-labelledby="werkwijze">
          <div className="wrap" style={{ paddingTop: 'clamp(64px,9vw,128px)', paddingBottom: 'clamp(64px,9vw,128px)' }}>
            <p className="t-mono accent" style={{ margin: '0 0 40px' }}>Manier van werken</p>
            <h2 id="werkwijze" className="t-h3" style={{ margin: '0 0 clamp(40px,6vw,72px)', maxWidth: '14ch' }}>Geen digitale ruis. Wel vooruitgang.</h2>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {STEPS.map(([t, d], i) => (
                <li key={t} className="step rule">
                  <span className="t-mono accent" style={{ fontSize: 'clamp(2rem,4vw,3.4rem)', letterSpacing: 0, lineHeight: 1 }}>0{i + 1}</span>
                  <div><h3 className="t-h4" style={{ margin: '0 0 6px' }}>{t}</h3><p className="t-body muted" style={{ margin: 0, maxWidth: '48ch' }}>{d}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="page-cream" aria-labelledby="overtuiging">
          <div className="wrap g2" style={{ paddingTop: 'clamp(64px,9vw,128px)', paddingBottom: 'clamp(64px,9vw,128px)' }}>
            <h2 id="overtuiging" className="t-h4" style={{ margin: 0, fontSize: 'clamp(1.8rem,3.6vw,3rem)', lineHeight: 1.05 }}>Ik geloof niet in digitale projecten om digitaal bezig te zijn.</h2>
            <p className="t-body-lg muted" style={{ margin: 0, maxWidth: '50ch' }}>Een website, AI-tool of automatisering moet uiteindelijk iets verbeteren: meer klanten, meer zichtbaarheid, minder administratie, meer verkoop of meer ruimte om te ondernemen. Als dat niet duidelijk is, bouwen we het niet.</p>
          </div>
        </section>
      </main>
      <Footer cta="Laten we kijken wat digitaal voor jouw bedrijf kan betekenen." />
    </>
  );
}
