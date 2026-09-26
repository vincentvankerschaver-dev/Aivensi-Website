'use client';
/** Snelle check per dienst: 4 vaste vragen → /api/snelcheck → 3 stappen. Resultaat gaat via sessionStorage mee naar /contact. */
import { useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/storage';
import { track } from '@/lib/track';
import { CHECKS, CHECK_KEY, FALLBACK_INTRO, type CarriedCheck, type CheckResult } from '@/lib/snelcheck';

export function Snelcheck({ slug, serviceName }: { slug: string; serviceName: string }) {
  const c = CHECKS[slug];
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  if (!c) return null;
  const n = c.qs.length, q = c.qs[Math.min(step, n - 1)], asking = !busy && !result;

  const finish = async (a: string[]) => {
    setBusy(true);
    let res: CheckResult = { intro: FALLBACK_INTRO, tips: c.fallback, source: 'fallback' };
    try {
      const r = await fetch('/api/snelcheck', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ slug, answers: a }) });
      if (r.ok) res = await r.json();
    } catch { /* fallback blijft */ }
    setBusy(false); setResult(res);
    track({ name: 'snelcheck_afgerond', props: { dienst: slug, bron: res.source } });
  };
  const pick = (t: string) => {
    const a = ans.slice(0, step); a[step] = t; setAns(a);
    if (step + 1 < n) setStep(step + 1); else finish(a);
  };
  const carry = () => {
    const payload: CarriedCheck = { dienst: serviceName, antwoorden: c.qs.map((qq, i) => `${qq.q} — ${ans[i]}`), advies: result?.tips };
    store.set(CHECK_KEY, JSON.stringify(payload));
  };
  const restart = () => { setStep(0); setAns([]); setBusy(false); setResult(null); };

  return (
    <section aria-labelledby="sc-title" className="sc">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px 24px' }}>
        <div style={{ display: 'grid', gap: 10 }}>
          <p className="t-mono accent" style={{ margin: 0 }}>Snelle check · 1 minuut</p>
          <h2 id="sc-title" className="t-h4 sec-h" style={{ maxWidth: '22ch' }}>{c.title}</h2>
        </div>
        <span aria-live="polite" className="t-meta muted">{result ? 'Klaar' : busy ? 'Bezig' : `Vraag ${step + 1} van ${n}`}</span>
      </div>

      {asking && (
        <div className="sc-fade" style={{ display: 'grid', gap: 18 }}>
          <div aria-hidden="true" style={{ display: 'flex', gap: 6 }}>
            {c.qs.map((_, i) => <span key={i} style={{ flex: 1, height: 3, background: i <= step ? 'var(--c-ember-500)' : 'var(--c-cream-200)', transition: 'background .3s' }} />)}
          </div>
          <fieldset style={{ margin: 0, padding: 0, border: 0, display: 'grid', gap: 14 }}>
            <legend style={{ padding: 0, margin: '0 0 14px', fontWeight: 700, fontSize: 'clamp(1.1rem,1.6vw,1.35rem)', letterSpacing: '-0.015em' }}>{q.q}</legend>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {q.opts.map(t => <button key={t} type="button" className="sc-opt" aria-pressed={ans[step] === t} onClick={() => pick(t)}>{t}</button>)}
            </div>
          </fieldset>
          {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="t-meta muted sc-text">← Vorige vraag</button>}
        </div>
      )}

      {busy && (
        <p role="status" className="t-body muted" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="sc-dot" /><span className="sc-dot" style={{ animationDelay: '.15s' }} /><span className="sc-dot" style={{ animationDelay: '.3s' }} /> Even je antwoorden op een rij zetten…
        </p>
      )}

      {result && (
        <div className="sc-fade" style={{ display: 'grid', gap: 22 }}>
          <p className="t-serif" style={{ margin: 0, fontSize: 'clamp(1.3rem,2vw,1.7rem)', maxWidth: '40ch' }}>{result.intro}</p>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid var(--c-ink-900)' }}>
            {result.tips.map(t => <li key={t} className="t-body" style={{ padding: '16px 0', borderBottom: '1px solid var(--color-border)', maxWidth: 'none' }}>{t}</li>)}
          </ol>
          <p className="muted" style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>{result.source === 'ai' ? 'Eerste indruk op basis van je antwoorden, opgesteld met AI.' : 'Eerste indruk op basis van je antwoorden.'} Geen prijzen of beloftes — dat bespreken we in het gesprek. <Link href="/privacy#ai" style={{ borderBottom: '1px solid currentColor' }}>Hoe we AI gebruiken</Link></p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20 }}>
            <Link href="/contact" onClick={carry} className="btn">Bespreek dit in een gesprek <span aria-hidden="true">→</span></Link>
            <button type="button" onClick={restart} className="t-meta muted sc-text">Opnieuw ↺</button>
          </div>
        </div>
      )}
    </section>
  );
}
