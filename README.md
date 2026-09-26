# AIVENSI — scroll motion system (Next.js App Router)

```
nextjs/
├── app/layout.tsx            html.no-js → js gate, next/font, metadata, JSON-LD
├── app/page.tsx              homepage: 6 stages (v4)
├── app/globals.css           importeert DS-tokens + scroll.css; layout- en type-rollen
├── app/scroll.css            motion-CSS (stage + reveal)
├── app/tokens/*.css          kopie van de AIVENSI design-system tokens (bron: _ds/…/tokens)
├── components/ScrollStage.tsx
├── components/Reveal.tsx
├── components/HomeFlow.tsx   home v4: vraag → antwoord → wie → en daarna (Care) → slotzin (client)
├── components/Footer.tsx     variant 'mark' (karaoke-kop + beeldmerk + ember-bol) | 'plain'
├── components/Snelcheck.tsx  AI-check per dienst → sessionStorage → /contact
├── components/ContactTabs.tsx  Kies een moment (Cal.com) / Stuur een bericht
├── components/InsightsBrowser.tsx  filter · uitgelicht 21:9 · asymmetrisch duo
├── app/api/snelcheck/route.ts  server-route naar Claude (begrensd, met fallback)
├── lib/snelcheck.ts          vragen + fallback per dienst
├── components/CareLayer.tsx  homepage "En daarna?" levenscyclus (client, IO)
├── components/Waasland.tsx   kaart (client, IO) — niet meer op home
├── components/Manifest.tsx   Over: regels lichten op via IO (client)
├── components/Nav.tsx        Nav + Footer
├── lib/content.ts            goedgekeurde copy
└── public/                   ginkgo-tree.jpg, vincent.jpg
```

Geen dependencies. 0 kB animation-library.

## Installatie
1. `npm i` in `nextjs/`, daarna `npm run dev`.
2. Stage-kleuren komen uit `app/tokens/colors.css` (`--c-ink-900`, `--c-cream-50`, `--c-sand-400`, `--c-ink-600`, `--c-ember-400/600`) — geen hex in componenten.
3. Fonts via `next/font/google`; `tokens/typography.css` leest `--next-font-*`. Geen Google `@import` meer.
4. JS-gate: `<html class="no-js">` + inline `classList.replace('no-js','js')` in `<head>`; `suppressHydrationWarning` op `<html>` omdat de class vóór hydration wijzigt.
5. Routes: `/`, `/werk`, `/werk/[slug]`, `/diensten`, `/diensten/[slug]`, `/over`, `/contact`, `/insights`, `/regio/waasland`, `sitemap.xml`, `robots.txt`. Redirects (308) in `next.config.ts`: `/cases/*`→`/werk/*`, `/diensten/ai-automation`→`ai-automatisering`, `/diensten/strategie`→`digitale-strategie`, `/blog*`→`/insights`, `/start-je-project`→`/contact`, `/aanpak`→`/over`.

## Omgevingsvariabelen
- `ANTHROPIC_API_KEY` (server) — Snelle check. Zonder key: vaste fallback-tips per dienst, UI meldt dan niet "opgesteld met AI".
- `ANTHROPIC_MODEL` (optioneel, default `claude-sonnet-4-5`).
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (optioneel) — gedeelde rate limit voor de AI-routes.
- `NEXT_PUBLIC_BOOKING_URL` — Cal.com-embed op /contact. Zonder: voorkeursmoment (namiddag ma–vr) dat meegaat in het bericht; er wordt niets als geboekt bevestigd.

## Waarom dit performant is
- **Geen scroll-listener.** Scroll-events vuren tot 120×/s en dwingen JS op de main thread. IntersectionObserver meldt alleen wanneer een sectie de middenband van de viewport binnen- of buitengaat (één drempel), asynchroon, buiten de scroll-pipeline.
- **Middenband i.p.v. ratio.** De observer-root is een band van ≈0.5vh rond het viewport-midden. Aaneensluitende secties snijden die band één voor één; de snijdende sectie is dominant. `intersectionRatio` zou lange en korte secties onvergelijkbaar maken en bij snel scrollen een verkeerde sectie kiezen.
- **Geen requestAnimationFrame, geen React-state per frame.** De observer zet CSS custom properties direct; React rendert niet opnieuw tijdens scrollen.
- **CSS custom properties + transitions.** De browser tweent `background-color` en `color` zelf op de compositor-thread; JS bepaalt alleen het doel.
- **Eén fixed backdrop.** Één element, één composited layer, één kleurovergang — in plaats van N secties met eigen achtergrond die elk opnieuw geschilderd worden. Secties zijn transparant en staan in de normale flow.
- **Alleen transform/opacity in de reveal.** Geen layout (top/height/margin) → geen reflow, geen repaint van tekst. `will-change: transform` staat uitsluitend op regels met een actieve scroll-gedreven animatie.

> De implementatie minimaliseert main-thread werk tijdens scroll en gebruikt compositor-vriendelijke animaties, waardoor een hoge en stabiele framerate haalbaar is. Werkelijke performance blijft afhankelijk van device, browser, content en overige pagina-elementen.
- **Scroll-driven CSS.** `animation-timeline: view()` koppelt de reveal aan de viewport-positie en draait volledig op de compositor. Stagger per regel via verschoven `animation-range`.
- **Regeldetectie één keer.** `Reveal` meet `offsetTop` per woord na mount, bij `document.fonts.ready` en bij resize (debounced 150 ms). Nooit tijdens scroll. SSR rendert één masker met alle woorden; de eerste client-render is identiek → geen hydration mismatch.

## Fallback-matrix
| Feature | Ondersteund | Niet ondersteund |
|---|---|---|
| `animation-timeline: view()` (Chrome/Edge 115+, Safari 26) | scroll-gekoppelde reveal | IntersectionObserver → `.is-visible` → CSS-transition (900 ms, 90 ms stagger) |
| IntersectionObserver | stage-kleur + fallback-reveal | initial stage blijft; tekst zichtbaar |
| JavaScript | volledige motion | `html.js` ontbreekt → geen transform, alles zichtbaar, `initial` stage-kleur via inline style |
| `prefers-reduced-motion` | — | reveal uit, kleurwissel onmiddellijk (transition-duration 0) |

## Contrast (AA, gekoppeld per stage — DS-tokens)
- **ink** `--c-ink-900`: fg `--c-cream-50` ≈17:1 · muted `--c-sand-400` ≈10:1 · accent `--c-ember-400` ≈6:1
- **cream** `--c-cream-50`: fg `--c-ink-900` ≈17:1 · muted `--c-ink-600` ≈7:1 · accent `--c-ember-600` ≈5:1
- Berekend; bevestig in DevTools vóór livegang. bg/fg wisselen als één paar met dezelfde duur en easing.

## Testchecklist
`npm install` · `npm run check` (= `tsc --noEmit` + `eslint .` + `next build`) — **niet uitgevoerd in deze omgeving** (geen Node-runtime); draai lokaal vóór merge.

## Dependencies (2026-09-24)
- `next` **15.5.26** (Maintenance LTS, bevat de augustus-fixes GHSA-2xp9-vwfh-vxw4 / CVE-2026-75604 en de hardening van 22 sept.) · `eslint-config-next` **15.5.26** (zelfde versie als Next).
- `react` / `react-dom` `^19.1.7` (React 19.1-lijn met de react-server-dom-patches).
- Lint: ESLint 9 flat config in `eslint.config.mjs` (`next/core-web-vitals` + `next/typescript` via `@eslint/eslintrc` FlatCompat). Script `lint` = `eslint .`; `next lint` wordt niet meer gebruikt en `eslint.ignoreDuringBuilds` staat aan zodat de build het deprecated pad niet aanroept.
- Gepland: Next.js **15.5.27** verschijnt 30 september 2026 (security release) — bump `next` en `eslint-config-next` samen.
Handmatig: Chrome, Safari, Firefox; 320/375/390/768/1440 px; snel/langzaam/omhoog scrollen; resize; trage fonts (throttle); reduced motion; toetsenbord; JS uit; lange koppen (regelval); geen horizontale overflow; CPU 4× throttle.

## Openstaand (REMAINING)
- Contact form backend: REMAINING — formulier valideert en opent een voorbereide mailto; er wordt geen verzending bevestigd.
- Assets: EMSRO screenshots (case-hero, /werk, homepage), AIVENSI logo SVG — ✅ gekozen: beeldmerk "twee schakels" (public/aivensi-mark-light.svg / -dark.svg).
- Insight-artikelen: alleen titels, geen detailroutes (kaarten tonen "Binnenkort").
- Beelden Inzichten (uitgelicht + duo) en werkplaats-foto's: `img: null` in `lib/content.ts` → kader "Beeld/Foto volgt". Foto's in `public/` zetten en `img` invullen.
- Rate limit AI-routes (lib/guard.ts): zet `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` voor een gedeelde teller op Vercel; zonder valt hij terug op geheugen per instantie.
- Meetpunten (lib/track.ts) staan klaar maar sturen niets door tot er een analytics-tool gekozen is.
- Open: "Plan een gesprek" vs "Start een gesprek" hangt af van de Cal.com-link.

## Valkuilen
- `overflow:hidden` alleen op `.reveal-line-mask` — nooit op de sectie (breekt `position:sticky`).
- Gebruik `svh`, niet `vh`.
- Een `Reveal` verwacht een string als child; `<br>`, `<em>` of andere inline-opmaak wordt niet ondersteund — splits in twee `Reveal`s of gebruik een gewone kop.
- Regeldetectie leest `offsetTop` per woord: één layout-read na mount, na `document.fonts.ready` en na resize (150 ms debounce). Bij hermeting hermonteren de regels; met `view()` is dat onzichtbaar (positie-gebonden), met de IO-fallback blijft `.is-visible` op de kop staan.
