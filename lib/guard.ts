/**
 * Bescherming voor de AI-routes (/api/snelcheck, /api/vraag).
 *
 * 1. sameOrigin — aanvragen van een andere website worden geweigerd.
 * 2. readJson   — maximaal 4 kB per aanvraag; groter wordt geweigerd.
 * 3. rateLimit  — maximaal N vragen per IP per venster.
 *    - Met UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN: gedeelde teller in Upstash Redis
 *      (werkt over alle serverinstanties heen — nodig op Vercel).
 *    - Zonder: teller in het geheugen van één instantie (ok lokaal, lek op serverless).
 *    Geen npm-pakket nodig: Upstash heeft een gewone REST-API.
 */
const MAX_BYTES = 4096;

export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return req.headers.get('sec-fetch-site') !== 'cross-site';
  try { return new URL(origin).host === (req.headers.get('x-forwarded-host') ?? req.headers.get('host')); } catch { return false; }
}

export async function readJson<T>(req: Request): Promise<T | null> {
  const len = Number(req.headers.get('content-length') ?? 0);
  if (len > MAX_BYTES) return null;
  const txt = await req.text();
  if (txt.length > MAX_BYTES) return null;
  try { return JSON.parse(txt) as T; } catch { return null; }
}

export const clientIp = (req: Request) => (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'anon';

const mem = new Map<string, number[]>();

/** true = limiet bereikt. */
export async function rateLimit(bucket: string, ip: string, max: number, windowSec: number): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL, token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    const key = `rl:${bucket}:${ip}:${Math.floor(Date.now() / 1000 / windowSec)}`;
    try {
      const r = await fetch(`${url}/pipeline`, {
        method: 'POST',
        headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
        body: JSON.stringify([['INCR', key], ['EXPIRE', key, String(windowSec)]]),
        signal: AbortSignal.timeout(2000),
      });
      const data = await r.json() as { result: number }[];
      return (data[0]?.result ?? 0) > max;
    } catch { /* Upstash onbereikbaar → val terug op geheugen */ }
  }
  const now = Date.now(), k = `${bucket}:${ip}`, list = (mem.get(k) ?? []).filter(t => now - t < windowSec * 1000);
  list.push(now); mem.set(k, list);
  return list.length > max;
}

/** Haalt links en URL's uit AI-antwoorden (geen doorverwijzing naar externe sites via de assistent). */
export const stripLinks = (s: string) => s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/https?:\/\/\S+|www\.\S+/gi, '').replace(/\s{2,}/g, ' ').trim();
