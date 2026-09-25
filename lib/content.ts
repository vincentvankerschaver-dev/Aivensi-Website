// Goedgekeurde copy + bestaande content uit de prototypes (content.js, Case/Dienst/Over/Contact .dc.html).
// Wijzig hier, nergens anders. Geen verzonnen cijfers, testimonials of teamleden.
export const SITE = 'https://aivensi.be';
export type Key = 'gevonden' | 'gedaan' | 'verkopen' | 'sterker' | 'own';

export const CAP = {
  web:     { idx: '01', name: 'Webdesign & development', line: 'Sites die snel zijn, toegankelijk en jaren meegaan.', slug: 'webdesign-development' },
  ai:      { idx: '02', name: 'AI & automatisering', line: 'Begrensde AI en werkende koppelingen. Het handwerk eruit.', slug: 'ai-automatisering' },
  shop:    { idx: '03', name: 'E-commerce', line: 'Verkopen als onderdeel van het systeem, niet ernaast.', slug: 'e-commerce' },
  seo:     { idx: '04', name: 'SEO', line: 'Vindbaar bij mensen én bij taalmodellen.', slug: 'seo' },
  content: { idx: '05', name: 'Social & content', line: 'Inhoud uit je eigen werk, in een ritme dat vol te houden is.', slug: 'social-content' },
  strat:   { idx: '06', name: 'Digitale strategie', line: 'De keuze vóór de bouw: wat het moet opleveren.', slug: 'digitale-strategie' },
  brand:   { idx: '07', name: 'Rebranding', line: 'Een identiteit die klopt met waar je naartoe gaat.', slug: 'rebranding' },
} as const;
export type CapKey = keyof typeof CAP;

export const ANSWERS: Record<Key, { label: string; word: string; sub: string; body: string; link: [string, string]; caps: CapKey[] }> = {
  gevonden: { label: 'Meer gevonden worden', word: 'makkelijker gevonden worden', sub: 'Begin bij hoe mensen zoeken.', body: 'SEO, content en techniek moeten hetzelfde verhaal vertellen. Wij bouwen een digitale basis die gevonden wordt, begrepen wordt en blijft werken.', link: ['SEO', '/diensten/seo'], caps: ['seo', 'content', 'web'] },
  gedaan:   { label: 'Meer gedaan krijgen', word: 'sneller gedaan raken', sub: 'Laat werk werken.', body: 'Terugkerende taken, administratie en losse systemen kosten tijd. Wij brengen AI en automatisering samen tot processen die werk uit handen nemen.', link: ['Ontdek EMSRO', 'https://emsro.be'], caps: ['ai', 'strat', 'web'] },
  verkopen: { label: 'Beter verkopen', word: 'beter verkopen', sub: 'Maak digitaal werkbaar.', body: 'Een webshop moet meer doen dan producten tonen. Wij bouwen de ervaring, techniek en processen rond wat er moet gebeuren: vinden, kiezen, kopen.', link: ['E-commerce', '/diensten/e-commerce'], caps: ['shop', 'seo', 'content'] },
  sterker:  { label: 'Sterker digitaal staan', word: 'sterker staan', sub: 'Begin met een betere basis.', body: 'Een website is geen visitekaartje dat je één keer bouwt. Wij maken digitale ervaringen die helder communiceren, vertrouwen bouwen en blijven werken.', link: ['Digitale strategie', '/diensten/digitale-strategie'], caps: ['strat', 'web', 'brand'] },
  own:      { label: '', word: 'beter werken', sub: 'Dan beginnen we met kijken.', body: 'Website, data, content, AI, processen. Meestal werkt alles — alleen niet samen. Wij brengen het samen tot één systeem dat oplevert.', link: ['Wat we bouwen', '/diensten'], caps: ['strat', 'web', 'ai'] },
};
export const CHOICES: Key[] = ['gevonden', 'gedaan', 'verkopen', 'sterker'];

export type Service = { idx: string; name: string; chain: string; lead: string; intro: string; get: string[]; for: string; approach: string[]; cases: string[]; description: string };
export const SERVICES: Record<string, Service> = {
  'webdesign-development': { idx: '01', name: 'Webdesign & development', chain: 'Design · Development', lead: 'Sites en applicaties die snel zijn, toegankelijk zijn en jaren meegaan.',
    description: 'Webdesign en development in het Waasland: structuur eerst, interface daarna. Snel, toegankelijk en gebouwd om te blijven werken.',
    intro: 'Een website is geen brochure maar een werkend onderdeel van je bedrijf. We ontwerpen de structuur eerst, de interface daarna — en bouwen alleen wat die structuur nodig heeft.',
    get: ['Informatiearchitectuur en wireframes vóór er één pixel ontworpen wordt', 'Ontwerp in het ritme van je merk: typografie, wit, hiërarchie', 'Development in WordPress/Elementor of Next.js, afhankelijk van wat je nodig hebt', 'Snelheid, toegankelijkheid (WCAG AA) en SEO-structuur ingebouwd, niet achteraf'],
    for: 'Bedrijven waarvan de website niet meer klopt met wat ze vandaag doen, of die van template naar eigen systeem willen.',
    approach: ['Begrijpen: doelen, bezoekers, bestaande content en SEO-waarde', 'Structureren: sitemap, paginatypes, redirects', 'Ontwerpen: layout-systeem en componenten', 'Bouwen, testen op echte toestellen, live', 'Meten en verbeteren'], cases: ['ginkgo-tree'] },
  'ai-automatisering': { idx: '02', name: 'AI & automatisering', chain: 'AI · Automatisering', lead: 'Begrensde AI en werkende koppelingen. Het handwerk tussen systemen eruit.',
    description: 'AI en automatisering voor kmo\'s: assistenten, koppelingen en automatische opvolging met duidelijke grenzen. Minder handwerk, meer overzicht.',
    intro: 'AI is geen doel. We zoeken de plekken in je proces waar een assistent, een slimme suggestie of een koppeling écht tijd bespaart — en bouwen die met duidelijke grenzen.',
    get: ['Procesanalyse: waar zit het repetitieve werk?', 'AI-assistenten en spraak-naar-tekst-flows (bv. offerte inspreken)', 'Koppelingen tussen website, CRM, boekhouding, planning en mail', 'Automatische opvolging, statussen en meldingen', 'Logging, fallback en menselijke controle waar het moet'],
    for: 'Bedrijven met terugkerend administratief werk, losse tools die niet met elkaar praten, of een AI-idee dat concreet moet worden.',
    approach: ['Proces in kaart', 'Kies één flow met zichtbaar effect', 'Bouw, test met echte data', 'Begrens en documenteer', 'Breid uit wat werkt'], cases: ['emsro'] },
  'e-commerce': { idx: '03', name: 'E-commerce', chain: 'Development · Groei', lead: 'Verkopen als onderdeel van het systeem, niet als losse webshop ernaast.',
    description: 'E-commerce die aansluit op je content, data en processen. Shopstructuur, checkout, koppelingen en meting.',
    intro: 'Een webshop die los staat van je content, data en processen kost meer dan ze oplevert. We bouwen verkopen in als onderdeel van je digitale geheel.',
    get: ['Shopstructuur en productarchitectuur', 'Checkout zonder wrijving, betaal- en verzendkoppelingen', 'Koppeling met voorraad, facturatie en opvolging', 'Productcontent en SEO per categorie', 'Meting van wat verkoopt en waarom'],
    for: 'Bedrijven die online willen verkopen zonder een tweede administratie te creëren.',
    approach: ['Aanbod en marge begrijpen', 'Shopstructuur ontwerpen', 'Bouwen en koppelen', 'Lanceren met meetplan', 'Optimaliseren op data'], cases: [] },
  'seo': { idx: '04', name: 'SEO', chain: 'Groei', lead: 'Vindbaar bij mensen én bij taalmodellen. Structuur eerst, tekst daarna.',
    description: 'SEO en GEO vanuit het Waasland: technische basis, zoekintentie, lokale vindbaarheid en begrijpelijk voor AI-zoekmachines.',
    intro: 'Hoger in Google, zonder trucjes. En vandaag ook: begrijpelijk voor AI-zoekmachines en assistenten die je bedrijf als bron moeten kunnen aanhalen.',
    get: ['Technische audit: crawlbaarheid, snelheid, indexatie, structured data', 'Zoekintentie en contentstructuur per pagina', 'Lokale SEO voor het Waasland zonder keyword-lijsten', 'GEO: entiteiten, antwoordbare content, schema.org', 'Meting via Search Console en AI-antwoordtests'],
    for: 'Bedrijven die gevonden willen worden op wat ze echt doen, in Google én in AI-antwoorden.',
    approach: ['Audit en baseline', 'Structuur en schema', 'Content per intentie', 'Interne links en autoriteit', 'Meten, bijsturen'], cases: ['ginkgo-tree'] },
  'social-content': { idx: '05', name: 'Social & content', chain: 'Groei', lead: 'Inhoud die uit je eigen werk komt, met een ritme dat vol te houden is.',
    description: 'Social en content voor kmo\'s: pijlers uit je eigen werk, een haalbaar ritme en hergebruik over kanalen.',
    intro: 'Geen contentfabriek. We halen de verhalen uit wat je al doet — projecten, vragen van klanten, inzichten — en zetten ze om in een ritme dat je zelf kan volhouden.',
    get: ['Contentpijlers gekoppeld aan je diensten', 'Kalender met haalbaar ritme', 'Teksten, korte video-scripts en visuals in je eigen toon', 'Hergebruik: één inzicht, meerdere kanalen', 'Meting van wat gesprekken oplevert'],
    for: 'Bedrijven die zichtbaar willen zijn zonder er elke dag mee bezig te zijn.',
    approach: ['Pijlers en toon', 'Kalender', 'Productie', 'Publicatie en opvolging', 'Evaluatie per kwartaal'], cases: ['ginkgo-tree'] },
  'digitale-strategie': { idx: '06', name: 'Digitale strategie', chain: 'Strategie', lead: 'De keuze vóór de bouw: wat dit moet opleveren en waaraan we dat meten.',
    description: 'Digitale strategie: doorlichting van website, data, content, tools en processen, met doelen, prioriteiten en een roadmap.',
    intro: 'Voor we iets bouwen, bepalen we wat het moet opleveren. Strategie is bij AIVENSI geen document maar een set beslissingen: wat wel, wat niet, in welke volgorde.',
    get: ['Digitale doorlichting: website, data, content, tools, processen', 'Doelen en meetbare indicatoren', 'Prioriteiten en roadmap in fases', 'Keuze van technologie en tools', 'Begeleiding bij uitvoering'],
    for: 'Bedrijven die veel losse tools hebben en geen samenhang, of voor een grote digitale stap staan.',
    approach: ['Gesprek en doorlichting', 'Kansen en knelpunten', 'Roadmap', 'Beslissen', 'Starten met fase één'], cases: ['emsro'] },
  'rebranding': { idx: '07', name: 'Rebranding', chain: 'Strategie · Design', lead: 'Een identiteit die klopt met waar je naartoe gaat.',
    description: 'Rebranding: positionering, tone of voice en visuele identiteit die weer één stem vormen — toegepast op website, social en documenten.',
    intro: 'Een merk verandert wanneer het bedrijf verandert. We herzien positionering, toon en visuele identiteit zodat alles wat digitaal is weer één stem heeft.',
    get: ['Positionering en kernboodschap', 'Tone of voice en verbale identiteit', 'Visuele richting: typografie, kleur, beeld', 'Toepassing op website, social en documenten', 'Merkgids die je team echt gebruikt'],
    for: 'Bedrijven waarvan de huisstijl niet meer past bij het aanbod, het niveau of de ambitie.',
    approach: ['Wie ben je vandaag, waar ga je naartoe', 'Positionering', 'Visuele richting', 'Toepassing', 'Overdracht'], cases: [] },
};
export const SERVICE_SLUGS = Object.keys(SERVICES);

export type Case = { slug: string; idx: string; name: string; tag: string; meta: string; body: string; img: string | null; alt: string; url: string | null; role: string;
  context: string; problem: string; approach: string; design: string; tech: string; result: string; insights: string[]; modules: string[]; description: string };
export const CASES: Case[] = [
  { slug: 'ginkgo-tree', idx: '01', name: 'Ginkgo Tree', tag: 'Van website naar wereld.', meta: 'Design → bouwen → beleven', img: '/ginkgo-tree.jpg', alt: 'Homepage van ginkgotree.be', url: 'https://www.ginkgotree.be/',
    body: 'Een digitale ervaring die Ginkgo Tree een eigen gezicht geeft — van eerste indruk tot ontdekking.',
    description: 'Case Ginkgo Tree (Waasmunster): van bedrijfswebsite naar digitaal ecosysteem met eventkalender, verhuurkalender en interactieve contentervaringen.',
    role: 'Strategie · UX · Design · Development · AI · Content',
    context: 'Ginkgo Tree in Waasmunster combineert culinaire ervaringen, kunst, evenementen, workshops, gatherings en verhuur. Een plek met veel dimensies — en een website die die dimensies moest samenbrengen.',
    problem: 'Vijf soorten bezoekers met vijf verschillende doelen. Wie wil eten, wie wil een workshop volgen, wie wil de ruimte huren: alles voelde als losse onderdelen naast elkaar.',
    approach: 'Eén digitale wereld met duidelijke ingangen: ontdekken, beleven, plannen, huren en inspireren. De eventkalender en verhuurkalender kregen elk een eigen flow, binnen één samenhangende structuur.',
    design: 'Warm, rustig en editorial — aansluitend bij de plek. Interactieve contentervaringen (Japanese Flavours Map, Japanese Art Journey, The Circle of Japanese Arts) maken van de site meer dan een bedrijfswebsite.',
    tech: 'Website met eventkalender en verhuurkalender, interactieve contentmodules en AI-functionaliteit die de ervaring persoonlijker maakt.',
    result: 'Van bedrijfswebsite naar digitaal ecosysteem waarin bezoekers ontdekken, plannen, huren en zich laten inspireren — met één structuur voor alle bezoekersdoelen.',
    insights: ['Een website kan een digitaal ecosysteem worden.', 'Verschillende bezoekersdoelen vragen aparte flows, niet aparte sites.', 'Content wordt pas beleving als ze interactief is.'],
    modules: ['Website', 'Eventkalender', 'Verhuurkalender', 'Japanese Flavours Map', 'Japanese Art Journey', 'The Circle of Japanese Arts', 'AI'] },
  { slug: 'emsro', idx: '02', name: 'EMSRO', tag: 'Van handwerk naar systeem.', meta: 'Luisteren → verbinden → automatiseren', img: null, alt: '', url: 'https://emsro.be',
    body: 'EMSRO brengt offertes, planning en facturen samen in één digitale werkomgeving.',
    description: 'Case EMSRO: eigen digitaal product van AIVENSI dat offertes, planning en facturen samenbrengt in één digitale werkomgeving.',
    role: 'Strategie · UX/UI · Development · AI · Automatisering',
    context: 'EMSRO is een digitaal product van AIVENSI voor bedrijven die op locatie werken: installateurs, aannemers, techniekers. EMSRO brengt offertes, planning en facturen samen in één digitale werkomgeving.',
    problem: 'Offertes, planning, werkbonnen en facturen zaten verspreid over systemen. Elke overgang was handwerk.',
    approach: 'Eén digitaal zenuwcentrum met één doorlopende flow: aanvraag → offerte → planning → werkbon → factuur → opvolging. Gebouwd, getest en vereenvoudigd op basis van echte feedback.',
    design: 'Complexe processen, eenvoudige interface: duidelijke dashboardstructuur, contextuele acties, zo weinig stappen mogelijk, mobiel bruikbaar op de werf.',
    tech: 'Next.js en Supabase. AI waar het praktisch waarde toevoegt: de EMSRO Bedrijfsassistent, AI Offerte Inspreken en Werfverslag → Offerte. Automatisering voor follow-up, statussen, meldingen en facturatie.',
    result: 'Minder administratie, meer overzicht. Een product dat met het bedrijf meegroeit en blijft verbeteren op basis van gebruik.',
    insights: ['Complexe processen vragen een eenvoudige interface.', 'AI werkt pas als ze in het proces zit, niet ernaast.', 'Bouwen, testen, vereenvoudigen — in die volgorde, telkens opnieuw.'],
    modules: ['Aanvraag', 'Offerte', 'Planning', 'Werkbon', 'Factuur', 'Opvolging', 'Bedrijfsassistent'] },
];
export const CASE_SLUGS = CASES.map(c => c.slug);

export const INSIGHTS = [
  { idx: '01', slug: 'mooie-website-nog-geen-goede-website', title: 'Waarom een mooie website nog geen goede website is', blurb: 'Design zonder structuur is decor. Wat een website goed maakt, en hoe je het herkent.', tag: 'Websites · 5 min' },
  { idx: '02', slug: 'waar-ai-vandaag-tijd-bespaart', title: 'Waar AI vandaag echt tijd kan besparen', blurb: 'Geen visie, wel concrete plekken in het proces van een kmo waar AI vandaag al werkt.', tag: 'AI · 6 min' },
  { idx: '03', slug: 'seo-en-geo-waarom-je-website-ook-voor-ai-begrijpelijk-moet-zijn', title: 'SEO en GEO: waarom je website ook voor AI begrijpelijk moet zijn', blurb: 'Zoekmachines worden antwoordmachines. Wat dat verandert aan structuur, content en schema.', tag: 'SEO · GEO · 7 min' },
];

export const TOWNS: [string, number, number, number, 'start' | 'end'][] = [
  ['Waasmunster', 235, 300, 0, 'start'], ['Sint-Niklaas', 317, 176, 9, 'start'], ['Beveren', 470, 76, 20, 'start'], ['Lokeren', 117, 318, 8, 'end'],
  ['Temse', 404, 254, 10, 'start'], ['Stekene', 170, 76, 15, 'end'], ['Kruibeke', 535, 166, 20, 'start'], ['Zwijndrecht', 561, 48, 26, 'end'],
  ['Hamme', 300, 340, 6, 'start'], ['Moerbeke', 39, 166, 20, 'end'],
];
