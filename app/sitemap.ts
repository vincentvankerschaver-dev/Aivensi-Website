import type { MetadataRoute } from 'next';
import { CASE_SLUGS, SERVICE_SLUGS, SITE } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls = ['', '/werk', '/diensten', '/over', '/contact', '/insights', '/regio/waasland',
    ...SERVICE_SLUGS.map(s => `/diensten/${s}`), ...CASE_SLUGS.map(s => `/werk/${s}`)];
  return urls.map(u => ({ url: `${SITE}${u}`, lastModified: now, changeFrequency: u === '' ? 'weekly' : 'monthly', priority: u === '' ? 1 : 0.7 }));
}
