import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  // Linting loopt via de ESLint CLI (npm run lint), niet via het deprecated `next lint` in de build.
  eslint: { ignoreDuringBuilds: true },
  poweredByHeader: false,
  async headers() {
    // Geen externe scripts; alleen Cal.com mag als iframe (zodra NEXT_PUBLIC_BOOKING_URL gezet is).
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'" + (process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''),
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-src https://cal.com https://app.cal.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' mailto:",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join('; ');
    return [{
      source: '/:path*',
      headers: [
        { key: 'Content-Security-Policy', value: csp },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()' },
      ],
    }];
  },
  async redirects() {
    return [
      // Bestaande case-URL's blijven /werk/*; gevraagde aliassen sturen door (SEO-veilig, 308).
      { source: '/cases/:slug', destination: '/werk/:slug', permanent: true },
      // Bestaande dienst-slugs blijven; alternatieve spellingen sturen door.
      { source: '/diensten/ai-automation', destination: '/diensten/ai-automatisering', permanent: true },
      { source: '/diensten/strategie', destination: '/diensten/digitale-strategie', permanent: true },
      { source: '/blog', destination: '/insights', permanent: true },
      { source: '/blog/:slug', destination: '/insights', permanent: true },
      { source: '/start-je-project', destination: '/contact', permanent: true },
      { source: '/aanpak', destination: '/over', permanent: true },
    ];
  },
};
export default config;
