import Link from 'next/link';

/** Dienstenregel — naam, één regel, schakel. Geen card, geen indexnummer. */
export function ServiceRow({ slug, name, lead, chain }: { slug: string; idx?: string; name: string; lead: string; chain: string }) {
  return (
    <li>
      <Link href={`/diensten/${slug}`} className="svc-row">
        <span className="t-h3" style={{ fontSize: 'clamp(1.5rem,3.2vw,2.8rem)' }}>{name}</span>
        <span className="t-body muted svc-hide">{lead}</span>
        <span className="t-meta muted svc-hide" style={{ whiteSpace: 'nowrap' }}>{chain} →</span>
      </Link>
    </li>
  );
}
