'use client';
/** Contactformulier — UI compleet met labels en foutmeldingen.
 *  Contact form backend: REMAINING. Zonder backend bevestigen we GEEN verzending; we tonen een eerlijke melding + mailto. */
import { useState } from 'react';
import Link from 'next/link';

const TOPICS = ['Website', 'AI & automatisering', 'E-commerce', 'SEO / vindbaarheid', 'Content', 'Strategie', 'Rebranding', 'Weet ik nog niet'];

export function ContactForm() {
  const [ready, setReady] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const err: Record<string, string> = {};
    if (!String(f.get('naam')).trim()) err.naam = 'Vul je naam in.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(f.get('email')))) err.email = 'Vul een geldig e-mailadres in.';
    if (!String(f.get('bericht')).trim()) err.bericht = 'Vertel kort waar je staat.';
    setErrors(err);
    if (Object.keys(err).length) return;
    // REMAINING: POST naar API-route of formulierdienst. Tot dan: mailto met dezelfde inhoud.
    setReady(f);
  };

  if (ready) {
    const body = ['Naam: ' + ready.get('naam'), 'E-mail: ' + ready.get('email'), 'Bedrijf: ' + (ready.get('bedrijf') || '—'), 'Onderwerp: ' + (ready.get('onderwerp') || '—'), '', String(ready.get('bericht'))].join('\n');
    const href = 'mailto:hello@aivensi.be?subject=' + encodeURIComponent('Gesprek plannen — ' + (ready.get('onderwerp') || 'AIVENSI')) + '&body=' + encodeURIComponent(body);
    return (
      <div role="status" className="card" style={{ display: 'grid', gap: 16 }}>
        <p className="t-serif" style={{ margin: 0 }}>Nog één stap.</p>
        <p className="t-body muted" style={{ margin: 0 }}>Het formulier verzendt nog niet automatisch. Open je mailprogramma met dit bericht ingevuld — antwoord binnen twee werkdagen.</p>
        <p style={{ margin: 0, display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
          <a href={href} className="btn">Open in je mail <span aria-hidden="true">→</span></a>
          <button type="button" onClick={() => setReady(null)} className="link" style={{ background: 'none', border: 0, cursor: 'pointer', font: 'inherit', fontWeight: 700 }}>Terug naar het formulier</button>
        </p>
        <p className="t-body muted" style={{ margin: 0 }}>Liever eerst lezen? <Link href="/insights" className="link">Bekijk de insights →</Link></p>
      </div>
    );
  }

  const Err = ({ id }: { id: string }) => errors[id] ? <p id={`${id}-err`} role="alert" className="t-meta" style={{ margin: 0, color: 'var(--color-error)', textTransform: 'none', letterSpacing: 0, fontSize: 13 }}>{errors[id]}</p> : null;

  return (
    <form onSubmit={submit} noValidate aria-label="Contactformulier" className="card" style={{ display: 'grid', gap: 20 }}>
      <div className="f2">
        <div className="fld"><label htmlFor="naam">Naam</label><input id="naam" name="naam" autoComplete="name" required aria-invalid={!!errors.naam} aria-describedby={errors.naam ? 'naam-err' : undefined} /><Err id="naam" /></div>
        <div className="fld"><label htmlFor="email">E-mail</label><input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined} /><Err id="email" /></div>
      </div>
      <div className="fld"><label htmlFor="bedrijf">Bedrijf <span className="muted">(optioneel)</span></label><input id="bedrijf" name="bedrijf" autoComplete="organization" /></div>
      <div className="fld"><label htmlFor="onderwerp">Waar wringt het vooral?</label>
        <select id="onderwerp" name="onderwerp" defaultValue="">
          <option value="" disabled>Kies…</option>
          {TOPICS.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="fld"><label htmlFor="bericht">Vertel kort waar je staat</label><textarea id="bericht" name="bericht" rows={5} required aria-invalid={!!errors.bericht} aria-describedby={errors.bericht ? 'bericht-err' : undefined} placeholder="Wat heb je vandaag, wat werkt niet samen, wat moet het opleveren?" /><Err id="bericht" /></div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 8 }}>
        <button type="submit" className="btn">Verstuur <span aria-hidden="true">→</span></button>
        <span className="t-meta muted">Geen nieuwsbrief. Geen opvolgmails.</span>
      </div>
    </form>
  );
}
