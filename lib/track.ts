/**
 * Meetpunten — klaar voor een analytics-tool, maar stuurt nu niets door.
 * Kies een tool (bv. Plausible of Vercel Analytics), laad die in layout.tsx en vul send() in.
 * Werk dan ook het privacybeleid bij (en check of toestemming nodig is).
 */
export type TrackEvent =
  | { name: 'vraag_gekozen'; props: { vraag: string } }
  | { name: 'snelcheck_afgerond'; props: { dienst: string; bron: 'ai' | 'fallback' } }
  | { name: 'contact_verstuurd'; props: { via: 'formulier'; metCheck: boolean; metMoment: boolean } }
  | { name: 'vraagbox_gebruikt'; props: { pagina: string } };

type Plausible = (event: string, opts?: { props?: Record<string, string | number | boolean> }) => void;

export function track(e: TrackEvent) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { plausible?: Plausible };
  if (w.plausible) { w.plausible(e.name, { props: e.props }); return; }
  if (process.env.NODE_ENV === 'development') console.debug('[track]', e.name, e.props);
}
