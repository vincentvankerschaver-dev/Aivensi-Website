import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="page-cream">
        <div className="wrap" style={{ minHeight: '60svh', display: 'grid', alignContent: 'center', gap: 24, paddingTop: 96, paddingBottom: 96 }}>
          <p className="t-mono accent" style={{ margin: 0 }}>404</p>
          <h1 className="t-h2">Deze pagina bestaat niet.</h1>
          <p className="t-body-lg muted" style={{ margin: 0 }}>Misschien is de URL veranderd. Begin opnieuw bij de vraag.</p>
          <p style={{ margin: 0 }}><Link href="/" className="link">Naar de homepage <span aria-hidden="true">→</span></Link></p>
        </div>
      </main>
      <Footer cta={null} />
    </>
  );
}
