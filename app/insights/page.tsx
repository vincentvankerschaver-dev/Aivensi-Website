import type { Metadata } from 'next';
import Image from 'next/image';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { InsightsBrowser } from '@/components/InsightsBrowser';
import { WERKPLAATS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Inzichten',
  description: 'Korte, praktische stukken over websites, AI, SEO en samenhang — uit projecten, niet uit trendrapporten.',
  alternates: { canonical: '/insights' },
};

const OFFSET = ['0px', 'clamp(40px,8vw,120px)', 'clamp(16px,3vw,48px)'];

export default function Insights() {
  return (
    <>
      <Nav />
      <main id="main">
        <InsightsBrowser />
        {WERKPLAATS.some(w => w.img) && (
        <section className="page-ink" aria-labelledby="werkplaats">
          <div className="wrap" style={{ paddingTop: 'clamp(72px,10vw,144px)', paddingBottom: 'clamp(72px,10vw,144px)' }}>
            <div className="g2" style={{ alignItems: 'end', marginBottom: 'clamp(40px,6vw,72px)' }}>
              <h2 id="werkplaats" className="t-serif" style={{ margin: 0, fontWeight: 400, fontSize: 'clamp(2rem,4.4vw,4rem)', lineHeight: 1.04, maxWidth: '14ch' }}>Uit de werkplaats</h2>
              <p className="t-body-lg muted" style={{ margin: 0 }}>Waar de inzichten vandaan komen: schetsen, schermen en gesprekken aan tafel.</p>
            </div>
            <div className="shop">
              {WERKPLAATS.filter(w => w.img).map((w, i) => (
                <figure key={w.cap} style={{ margin: `${OFFSET[i]} 0 0`, display: 'grid', gap: 12 }}>
                  <div className="frame" style={{ aspectRatio: w.ratio }}>
                    <Image src={w.img!} alt={w.alt} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <figcaption className="t-meta muted">{w.cap}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
        )}
      </main>
      <Footer cta="Liever een gesprek dan een artikel?" />
    </>
  );
}
