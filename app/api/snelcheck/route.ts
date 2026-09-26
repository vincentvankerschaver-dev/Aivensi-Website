/**
 * POST /api/snelcheck — begrensde AI-check per dienst.
 * Input: { slug, answers: string[] } — elk antwoord moet één van de vaste opties zijn (geen vrije tekst → geen prompt-injectie).
 * Zonder ANTHROPIC_API_KEY, bij fout of timeout: vaste fallback-tips (source: 'fallback').
 * Bescherming: same-origin, max 4 kB, rate limit 8 per 10 min per IP (lib/guard.ts — Upstash indien geconfigureerd).
 */
import { NextResponse } from 'next/server';
import { CHECKS, FALLBACK_INTRO, type CheckResult } from '@/lib/snelcheck';
import { SERVICES } from '@/lib/content';
import { clientIp, rateLimit, readJson, sameOrigin } from '@/lib/guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Niet toegestaan.' }, { status: 403 });
  const body = await readJson<{ slug?: unknown; answers?: unknown }>(req);
  if (!body) return NextResponse.json({ error: 'Ongeldige aanvraag.' }, { status: 400 });
  const slug = typeof body.slug === 'string' ? body.slug : '';
  const c = CHECKS[slug];
  const answers = Array.isArray(body.answers) ? body.answers : [];
  if (!c || answers.length !== c.qs.length || !answers.every((a, i) => typeof a === 'string' && c.qs[i].opts.includes(a))) {
    return NextResponse.json({ error: 'Ongeldige antwoorden.' }, { status: 400 });
  }
  const fallback: CheckResult = { intro: FALLBACK_INTRO, tips: c.fallback, source: 'fallback' };
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key || await rateLimit('snelcheck', clientIp(req), 8, 600)) return NextResponse.json(fallback);

  const service = SERVICES[slug]?.name ?? slug;
  const system = `Je bent de begrensde adviesassistent van AIVENSI, een digitale studio uit Waasmunster (België). Geef op basis van de antwoorden van een kmo een eerste indruk voor de dienst "${service}". Regels: Nederlands (België), je-vorm, nuchter en concreet. Geen prijzen, geen percentages, geen tijdsbesparing in uren, geen garanties, geen toolnamen. AI alleen voorstellen waar het past; soms is een eenvoudige koppeling of een formulier beter. Antwoord ALLEEN als JSON: {"intro":"één zin die hun situatie samenvat","tips":["stap 1","stap 2","stap 3"]}. Elke stap maximaal 28 woorden.`;
  const qa = c.qs.map((q, i) => `${q.q} → ${answers[i]}`).join('\n');

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5', max_tokens: 400, system, messages: [{ role: 'user', content: qa }] }),
      signal: AbortSignal.timeout(12_000),
    });
    if (!r.ok) return NextResponse.json(fallback);
    const data = await r.json() as { content?: { type: string; text?: string }[] };
    const txt = data.content?.find(b => b.type === 'text')?.text ?? '';
    const j = JSON.parse(txt.slice(txt.indexOf('{'), txt.lastIndexOf('}') + 1)) as { intro?: unknown; tips?: unknown };
    const tips = Array.isArray(j.tips) ? j.tips.filter((t): t is string => typeof t === 'string' && !!t.trim()).slice(0, 3).map(t => t.trim().slice(0, 280)) : [];
    if (!tips.length) return NextResponse.json(fallback);
    const intro = typeof j.intro === 'string' && j.intro.trim() ? j.intro.trim().slice(0, 240) : FALLBACK_INTRO;
    return NextResponse.json({ intro, tips, source: 'ai' } satisfies CheckResult);
  } catch {
    return NextResponse.json(fallback);
  }
}
