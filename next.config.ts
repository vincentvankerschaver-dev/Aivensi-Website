import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  // Linting loopt via de ESLint CLI (npm run lint), niet via het deprecated `next lint` in de build.
  eslint: { ignoreDuringBuilds: true },
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
