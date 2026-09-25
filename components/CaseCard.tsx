import Image from 'next/image';
import Link from 'next/link';
import type { Case } from '@/lib/content';

/** Editorial case-kaart: beeld 4:3, naam, meta, serif-tagline. Zonder beeld: leeg kader met label (geen verzonnen screenshot). */
export function CaseCard({ c, heading = 'h2' }: { c: Case; heading?: 'h2' | 'h3' }) {
  const H = heading;
  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Link href={`/werk/${c.slug}`} aria-label={`Case ${c.name}`} className="frame" style={{ aspectRatio: '4 / 3' }}>
        {c.img
          ? <Image src={c.img} alt={c.alt} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover', objectPosition: 'top left' }} />
          : <span className="t-meta muted frame-empty">{c.name} — screenshot volgt</span>}
      </Link>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'baseline' }}>
        <H className="t-h4" style={{ margin: 0 }}>{c.name}</H>
        <span className="t-meta muted">{c.meta}</span>
      </div>
      <p className="t-serif" style={{ margin: 0, fontSize: 'var(--t-serif)' }}>{c.tag}</p>
    </article>
  );
}
