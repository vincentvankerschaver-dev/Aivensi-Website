'use client';
/** Contactformulier — labels, foutmeldingen, snelle-check-kader en gekozen moment.
 *  Contact form backend: REMAINING. Zonder backend bevestigen we GEEN verzending; we tonen een eerlijke melding + mailto. */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CHECK_KEY, type CarriedCheck } from '@/lib/snelcheck';
import { store } from '@/lib/storage';
import { track } from '@/lib/track';

const TOPICS = ['Website', 'AI & automatisering', 'E-commerce', 'SEO / vindbaarheid', 'Content', 'Strategie', 'Rebranding', 'Weet ik nog niet'];
const TOPIC_FOR: Record<string, string> = { 'Webdesign & development': 'Website', 'AI & automatisering': 'AI & automatisering', 'E-commerce': 'E-commerce', 'SEO': 'SEO / vindbaarheid', 'Social & content': 'Content', 'Digitale strategie': 'Strategie', 'Rebranding': 'Rebranding' };

export const readCheck = (): CarriedCheck | null => store.json<CarriedCheck>(CHECK_KEY);

export function ContactForm({ moment, onClearMoment }: { moment?: string | null; onClearMoment?: () => void }) {
  const [ready, setReady] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [check, setCheck] = useState<CarriedCheck | null>(null);
  const [topic, setTopic] = useState('');

  useEffect(() => { const k = readCheck(); if (k) { setCheck(k); setTopic(TOPIC_FOR[k.dienst] ?? ''); } }, []);
  const dropCheck = () => { store.remove(CHECK_KEY); setCheck(null); };

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
    track({ name: 'contact_verstuurd', props: { via: 'formulier', metCheck: !!check, metMoment: !!moment } });
    setReady(f);
  };

  if (ready) {
    const lines = ['Naam: ' + ready.get('naam'), 'E-mail: ' + ready.get('email'), 'Bedrijf: ' + (ready.get('bedrijf') || '—'), 'Onderwerp: ' + (ready.get('onderwerp') || '—')];
    if (moment) lines.push('Voorkeursmoment: ' + moment);
    lines.push('', String(ready.get('bericht')));
    if (check) lines.push('', 'Snelle check · ' + check.dienst, ...check.antwoorden.map(a => '- ' + a), ...(check.advies?.length ? ['Eerste indruk:', ...check.advies.map(a => '- ' + a)] : []));
    const href = 'mailto:hello@aivensi.be?subject=' + encodeURIComponent('Gesprek plannen — ' + (ready.get('onderwerp') || 'AIVENSI')) + '&body=' + encodeURIComponent(lines.join('\n'));
    return (
      <div role="status" className="c-panel" style={{ display: 'grid', gap: 16 }}>
        <p className="t-serif" style={{ margin: 0 }}>Nog één stap.</p>
        <p className="t-body muted" style={{ margin: 0 }}>Het formulier verzendt nog niet automatisch. Open je mailprogramma met dit bericht ingevuld — antwoord binnen twee werkdagen.</p>
        <p style={{ margin: 0, display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
          <a href={href} className="btn">Open in je mail <span aria-hidden="true">→</span></a>
          <button type="button" onClick={() => setReady(null)} className="link" style={{ background: 'none', border: 0, borderBottom: '1px solid currentColor', cursor: 'pointer', font: 'inherit', fontWeight: 700 }}>Terug naar het formulier</button>
        </p>
        <p className="t-body muted" style={{ margin: 0 }}>Liever eerst lezen? <Link href="/insights" className="link">Bekijk de inzichten →</Link></p>
      </div>
    );
  }

  const Err = ({ id }: { id: string }) => errors[id] ? <p id={`${id}-err`} role="alert" style={{ margin: 0, color: 'var(--color-error)', fontSize: 13 }}>{errors[id]}</p> : null;

  return (
    <form onSubmit={submit} noValidate aria-label="Contactformulier" className="c-panel" style={{ display: 'grid', gap: 20 }}>
      {moment && (
        <div className="c-note" role="region" aria-label="Gekozen moment">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
            <p className="t-meta accent" style={{ margin: 0 }}>Voorkeursmoment</p>
            {onClearMoment && <button type="button" onClick={onClearMoment} className="t-meta muted sc-text">Wissen ×</button>}
          </div>
          <p style={{ margin: 0, fontWeight: 700 }}>{moment}</p>
          <p className="muted" style={{ margin: 0, fontSize: 13 }}>Gaat mee in je bericht. Je krijgt een bevestiging per mail.</p>
        </div>
      )}
      {check && (
        <div className="c-note" role="region" aria-label="Je snelle check">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
            <p className="t-meta accent" style={{ margin: 0 }}>Je snelle check · {check.dienst}</p>
            <button type="button" onClick={dropCheck} className="t-meta muted sc-text">Niet meesturen ×</button>
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 6, fontSize: 14, lineHeight: 1.5, color: 'var(--c-ink-700)' }}>
            {check.antwoorden.map(a => <li key={a}>{a}</li>)}
          </ul>
          <p className="muted" style={{ margin: 0, fontSize: 13 }}>Dit sturen we mee, zodat het gesprek meteen bij jouw situatie begint.</p>
        </div>
      )}
      <div className="f2">
        <div className="fld"><label htmlFor="naam">Naam</label><input id="naam" name="naam" autoComplete="name" required aria-invalid={!!errors.naam} aria-describedby={errors.naam ? 'naam-err' : undefined} /><Err id="naam" /></div>
        <div className="fld"><label htmlFor="email">E-mail</label><input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined} /><Err id="email" /></div>
      </div>
      <div className="fld"><label htmlFor="bedrijf">Bedrijf <span className="muted">(optioneel)</span></label><input id="bedrijf" name="bedrijf" autoComplete="organization" /></div>
      <div className="fld"><label htmlFor="onderwerp">Waar wringt het vooral?</label>
        <select id="onderwerp" name="onderwerp" value={topic} onChange={e => setTopic(e.target.value)}>
          <option value="" disabled>Kies…</option>
          {TOPICS.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="fld"><label htmlFor="bericht">Vertel kort waar je staat</label><textarea id="bericht" name="bericht" rows={5} required aria-invalid={!!errors.bericht} aria-describedby={errors.bericht ? 'bericht-err' : undefined} placeholder="Wat heb je vandaag, wat werkt niet samen, wat moet het opleveren?" /><Err id="bericht" /></div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 8 }}>
        <button type="submit" className="btn">Verstuur <span aria-hidden="true">→</span></button>
        <span className="t-meta muted">Geen nieuwsbrief. Geen opvolgmails.</span>
      </div>
      <p className="muted" style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>We gebruiken je gegevens alleen om je vraag te beantwoorden. Lees het <Link href="/privacy" style={{ borderBottom: '1px solid currentColor' }}>privacybeleid</Link>.</p>
    </form>
  );
}
