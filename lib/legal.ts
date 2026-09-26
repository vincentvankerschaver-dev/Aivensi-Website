// Juridische pagina's — privacybeleid (AVG/GDPR + cookies) en algemene voorwaarden.
// Alles tussen [ ] moet Vincent invullen of bevestigen vóór livegang. Geen juridisch advies — laat nakijken.
import type { ReactNode } from 'react';

export const COMPANY = {
  name: 'AIVENSI',
  founder: '[Vincent Achternaam]',
  street: 'Stationsstraat 114',
  postal: '9250',
  city: 'Waasmunster',
  phone: '[+32 4xx xx xx xx]',
  linkedin: '[https://www.linkedin.com/in/…]',
  linkedinCompany: '[https://www.linkedin.com/company/aivensi]',
  legal: 'AIVENSI',
  address: 'Stationsstraat 114, 9250 Waasmunster, België',
  kbo: '[BE 0xxx.xxx.xxx]',
  email: 'hello@aivensi.be',
  updated: '25 september 2026',
};

/** true als het veld echt ingevuld is (geen [placeholder]). Gebruikt om lege waarden uit schema en UI te houden. */
export const filled = (v: string) => !!v && !v.startsWith('[');

export type LegalSection = { id: string; title: string; body: ReactNode };
