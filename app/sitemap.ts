import type { MetadataRoute } from 'next';
import { CASE_SLUGS, SERVICE_SLUGS, SITE } from '@/lib/content';
import { ARTICLE_SLUGS } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  // Vaste datum van de laatste inhoudelijke wijziging — bijwerken als een pagina echt verandert.
  const updated = new Date('2026-09-26');
  const urls = ['', '/werk', '/diensten', '/website-care', '/over', '/contact', '/insights', '/regio/waasland', '/privacy', '/voorwaarden',
    ...SERVICE_SLUGS.map(s => `/diensten/${s}`), ...CASE_SLUGS.map(s => `/werk/${s}`), ...ARTICLE_SLUGS.map(s => `/insights/${s}`)];
  return urls.map(u => ({ url: `${SITE}${u}`, lastModified: updated, changeFrequency: u === '' ? 'weekly' : 'monthly', priority: u === '' ? 1 : 0.7 }));
}
