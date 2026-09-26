import type { Metadata } from 'next';
import { Manrope, Instrument_Serif, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { COMPANY, filled } from '@/lib/legal';
import { CursorGlow } from '@/components/CursorGlow';

// Fonts via next/font — gemapt op de DS-variabelen (tokens/typography.css leest --next-font-*).
const ui = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap', variable: '--next-font-ui' });
const display = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], display: 'swap', variable: '--next-font-display' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], display: 'swap', variable: '--next-font-mono' });

const SITE = 'https://aivensi.be';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'AIVENSI — Digitale groei, versterkt door AI', template: '%s — AIVENSI' },
  description: 'Digitale studio uit Waasmunster: websites, digitale producten, e-commerce, AI en automatisering als één systeem. Voor kmo\'s in het Waasland.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'nl_BE', siteName: 'AIVENSI', url: SITE },
};

const SCHEMA = {
  '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'AIVENSI', url: SITE,
  slogan: 'Digitale groei, versterkt door AI.',
  description: 'Digitale studio uit het Waasland: websites, digitale producten, e-commerce, AI en automatisering als één systeem.',
  founder: { '@type': 'Person', name: filled(COMPANY.founder) ? COMPANY.founder : 'Vincent', ...(filled(COMPANY.linkedin) ? { sameAs: [COMPANY.linkedin] } : {}) },
  address: { '@type': 'PostalAddress', ...(filled(COMPANY.street) ? { streetAddress: COMPANY.street } : {}), postalCode: COMPANY.postal, addressLocality: COMPANY.city, addressRegion: 'Oost-Vlaanderen', addressCountry: 'BE' },
  geo: { '@type': 'GeoCoordinates', latitude: 51.1063, longitude: 4.0858 }, // Waasmunster (centrum) — vervang door exacte locatie indien gewenst
  email: COMPANY.email,
  ...(filled(COMPANY.phone) ? { telephone: COMPANY.phone } : {}),
  ...(filled(COMPANY.kbo) ? { vatID: COMPANY.kbo, identifier: COMPANY.kbo } : {}),
  sameAs: [COMPANY.linkedinCompany, COMPANY.linkedin].filter(filled),
  areaServed: ['Waasmunster', 'Sint-Niklaas', 'Beveren', 'Lokeren', 'Temse', 'Stekene', 'Kruibeke', 'Zwijndrecht', 'Hamme', 'Moerbeke'],
  knowsAbout: ['Webdesign', 'Webdevelopment', 'AI', 'Automatisering', 'E-commerce', 'SEO', 'GEO', 'Content', 'Digitale strategie'],
  makesOffer: ['Webdesign & development', 'AI & automatisering', 'E-commerce', 'SEO', 'Social & content', 'Digitale strategie', 'Rebranding']
    .map(name => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: het inline script wijzigt de class vóór hydration (no-js → js).
    <html lang="nl-BE" className={`no-js ${ui.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* JS-gate: vroeg, synchroon, vóór eerste paint. Zonder JS blijft 'no-js' staan en is alles zichtbaar. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.replace('no-js','js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      </head>
      <body>{children}<CursorGlow /></body>
    </html>
  );
}
