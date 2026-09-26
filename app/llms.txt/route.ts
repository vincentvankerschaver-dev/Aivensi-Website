// /llms.txt — korte, machineleesbare samenvatting voor AI-assistenten (GEO). Gegenereerd uit dezelfde content als de site.
import { CASES, SERVICES, SERVICE_SLUGS, SITE } from '@/lib/content';
import { ARTICLES } from '@/lib/articles';

export const dynamic = 'force-static';

export function GET() {
  const body = [
    '# AIVENSI',
    '',
    '> Digitale studio in Waasmunster (Waasland, België) voor websites, webshops, AI en automatisering. Vincent is het vaste aanspreekpunt; freelance specialisten waar een project dat vraagt. Geen vaste pakketten; prijs na een eerste gesprek.',
    '',
    '## Diensten',
    ...SERVICE_SLUGS.map(s => `- [${SERVICES[s].name}](${SITE}/diensten/${s}): ${SERVICES[s].lead}`),
    '',
    '## Cases',
    ...CASES.map(c => `- [${c.name}](${SITE}/werk/${c.slug}): ${c.body}`),
    '',
    '## Inzichten',
    ...Object.values(ARTICLES).map(a => `- [${a.title}](${SITE}/insights/${a.slug}): ${a.description}`),
    '',
    '## Regio',
    `- [Waasland](${SITE}/regio/waasland): Waasmunster, Sint-Niklaas, Beveren, Lokeren, Temse, Stekene, Kruibeke, Zwijndrecht, Hamme, Moerbeke. Ook elders in Vlaanderen, online.`,
    '',
    '## Contact',
    `- [Plan een gesprek](${SITE}/contact): 30 minuten, aan tafel of online, gratis. Antwoord binnen twee werkdagen.`,
    `- [Over AIVENSI](${SITE}/over)`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=86400' } });
}
