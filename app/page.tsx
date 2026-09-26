import { Nav } from '@/components/Nav';
import { HomeFlow } from '@/components/HomeFlow';

// Home v4 — "De vraag eerst". Alle stages + footer-slotzin in HomeFlow (client), want de slotzin volgt de gekozen vraag.
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <HomeFlow />
      </main>
    </>
  );
}
