'use client';
/** Accordion: één vraag open tegelijk. Alle antwoorden staan in de DOM (SEO); FAQPage-schema staat op de pagina. */
import { useState } from 'react';

export function Faq({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ borderTop: '1px solid var(--c-ink-900)' }}>
      {items.map(([q, a], n) => {
        const on = open === n, id = `faq-${n}`;
        return (
          <div key={q} style={{ borderBottom: '1px solid var(--color-border)' }}>
            <h3 style={{ margin: 0 }}>
              <button type="button" className="faq-q" aria-expanded={on} aria-controls={id} onClick={() => setOpen(on ? -1 : n)}>
                <span>{q}</span><span aria-hidden="true" className="faq-plus" style={{ transform: `rotate(${on ? 45 : 0}deg)` }}>+</span>
              </button>
            </h3>
            <div id={id} className="faq-a" data-open={on}><div><p className="t-body muted" style={{ margin: 0, padding: '0 40px 20px 0', maxWidth: '56ch' }}>{a}</p></div></div>
          </div>
        );
      })}
    </div>
  );
}
