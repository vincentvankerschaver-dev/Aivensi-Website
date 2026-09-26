'use client';
/**
 * Contact-tabs: "Kies een moment" / "Stuur een bericht".
 * Met NEXT_PUBLIC_BOOKING_URL (Cal.com): embed. Zonder: keuze van een voorkeursmoment (namiddag ma–vr)
 * dat meegaat in het bericht — we bevestigen niets wat niet echt geboekt is.
 * Komt de bezoeker van een snelle check, dan opent meteen het bericht-tabblad.
 */
import { useEffect, useRef, useState } from 'react';
import { ContactForm, readCheck } from './ContactForm';

const BOOKING = process.env.NEXT_PUBLIC_BOOKING_URL || '';
const DOW = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
const TIMES = ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
const TABS = [['cal', 'Kies een moment', 'Namiddag · ma–vr'], ['form', 'Stuur een bericht', 'Antwoord binnen 2 werkdagen']] as const;
type Tab = typeof TABS[number][0];

export function ContactTabs() {
  const [tab, setTab] = useState<Tab>('cal');
  const [days, setDays] = useState<Date[] | null>(null); // client-only: geen datum-mismatch bij hydration
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [moment, setMoment] = useState<string | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wd: Date[] = [], d0 = new Date();
    for (const d = new Date(d0.getFullYear(), d0.getMonth(), d0.getDate() + 1); wd.length < 5; d.setDate(d.getDate() + 1)) if (d.getDay() % 6) wd.push(new Date(d));
    setDays(wd);
    if (readCheck()) {
      setTab('form');
      setTimeout(() => { const el = panelRef.current; if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }, 300);
    }
  }, []);

  const onKeyTabs = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const next: Tab = tab === 'cal' ? 'form' : 'cal';
    setTab(next); tabRefs.current[TABS.findIndex(t => t[0] === next)]?.focus();
  };
  if (!BOOKING) return <div ref={panelRef}><ContactForm /></div>; // zonder Cal.com: geen agenda die niet echt boekt
  const sd = days?.[day];
  const confirm = () => { if (!sd || !slot) return; setMoment(`${DOW[sd.getDay()]} ${sd.getDate()}/${sd.getMonth() + 1} om ${slot}`); setTab('form'); setTimeout(() => tabRefs.current[1]?.focus(), 0); };

  return (
    <div ref={panelRef} style={{ display: 'grid', gap: 16 }}>
      <div role="tablist" aria-label="Hoe wil je contact opnemen?" className="c-tabs" onKeyDown={onKeyTabs}>
        {TABS.map(([id, label, sub], i) => (
          <button key={id} ref={el => { tabRefs.current[i] = el; }} type="button" role="tab" id={`tab-${id}`} aria-selected={tab === id} aria-controls={`panel-${id}`} tabIndex={tab === id ? 0 : -1} onClick={() => setTab(id)} className="c-tab">
            <span>{label}</span><span className="c-tab-sub">{sub}</span>
          </button>
        ))}
      </div>

      {tab === 'cal' && (
        <div role="tabpanel" id="panel-cal" aria-labelledby="tab-cal" className="c-panel" style={{ display: 'grid', gap: 20 }}>
          {BOOKING ? (
            <iframe src={BOOKING} title="Plan een gesprek met AIVENSI" loading="lazy" style={{ width: '100%', height: 640, border: 0, background: 'var(--c-white)' }} />
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
                <p style={{ margin: 0, fontWeight: 800, fontSize: 'clamp(1.2rem,1.8vw,1.5rem)', letterSpacing: '-0.02em' }}>Kies een moment</p>
                <p className="t-meta muted" style={{ margin: 0 }}>Namiddag · ma–vr · 30 min</p>
              </div>
              <div role="group" aria-label="Dag" className="c-days">
                {(days ?? []).map((d, i) => (
                  <button key={d.toISOString()} type="button" aria-pressed={i === day} onClick={() => { setDay(i); setSlot(null); }} className="c-pick c-day">
                    <span className="t-meta" style={{ opacity: .8 }}>{DOW[d.getDay()]}</span><span style={{ fontWeight: 800, fontSize: 18 }}>{d.getDate()}</span>
                  </button>
                ))}
              </div>
              <div role="group" aria-label="Uur" className="c-slots">
                {TIMES.map(t => <button key={t} type="button" aria-pressed={t === slot} onClick={() => setSlot(t)} className="c-pick" style={{ minHeight: 48, fontFamily: 'var(--font-mono)', fontSize: 14 }}>{t}</button>)}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 4 }}>
                <button type="button" className="btn" disabled={!slot} onClick={confirm} style={slot ? undefined : { background: 'var(--c-sand-400)', cursor: 'not-allowed' }}>
                  {slot && sd ? `Kies ${DOW[sd.getDay()]} ${sd.getDate()} om ${slot} →` : 'Kies een uur'}
                </button>
                <span className="t-meta muted">Voorkeur · bevestiging per mail</span>
              </div>
            </>
          )}
        </div>
      )}
      {tab === 'form' && (
        <div role="tabpanel" id="panel-form" aria-labelledby="tab-form">
          <ContactForm moment={moment} onClearMoment={() => setMoment(null)} />
        </div>
      )}
    </div>
  );
}
