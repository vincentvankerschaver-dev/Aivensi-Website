import Link from 'next/link';
import type { ReactNode } from 'react';

// Contextuele interne links: het eerste passende woord in een alinea wordt een link naar de bijhorende dienst.
// Max. één link per alinea, nooit naar de pagina zelf. Bewust kort gehouden — meer is spam.
const TERMS: [RegExp, string][] = [
  [/\bSEO\b/, 'seo'],
  [/\bwebshops?\b/i, 'e-commerce'],
  [/\bautomatisering\b/i, 'ai-automatisering'],
  [/\bkoppelingen?\b/i, 'ai-automatisering'],
  [/\bwebsites?\b/i, 'webdesign-development'],
  [/\bstrategie\b/i, 'digitale-strategie'],
  [/\bcontent\b/i, 'social-content'],
  [/\bidentiteit\b/i, 'rebranding'],
];

export function AutoLink({ text, self }: { text: string; self?: string }): ReactNode {
  for (const [re, slug] of TERMS) {
    if (slug === self) continue;
    const m = re.exec(text);
    if (!m) continue;
    const i = m.index, w = m[0];
    return <>{text.slice(0, i)}<Link href={`/diensten/${slug}`} className="in-link">{w}</Link>{text.slice(i + w.length)}</>;
  }
  return text;
}
