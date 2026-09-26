import { ImageResponse } from 'next/og';

// Deelafbeelding (Open Graph) voor alle pagina's zonder eigen afbeelding. Kleuren = DS-tokens (ink-900, cream-50, ember-500, sand-300); hier letterlijk omdat de renderer geen CSS-variabelen kent.
export const alt = 'AIVENSI — Digitale groei, versterkt door AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 80, background: '#15140F', color: '#FAF8F4', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', position: 'relative', width: 96, height: 64 }}>
            <div style={{ position: 'absolute', left: 0, top: 4, width: 56, height: 56, border: '6px solid #FAF8F4', borderRadius: 8 }} />
            <div style={{ position: 'absolute', left: 40, top: 4, width: 56, height: 56, border: '6px solid #C9522B', borderRadius: 8 }} />
          </div>
          <div style={{ fontSize: 44, fontStyle: 'italic', fontFamily: 'serif' }}>AIVENSI</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -3, lineHeight: 1, maxWidth: 900 }}>Digitale groei, versterkt door AI.</div>
          <div style={{ fontSize: 28, color: '#DCD6C6' }}>Websites · webshops · AI · automatisering — Waasmunster, Waasland</div>
        </div>
      </div>
    ),
    size,
  );
}
