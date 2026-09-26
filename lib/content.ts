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

export const ANSWERS: Record<Key, { label: string; word: string; sub: string; body: string; link: [string, string]; caps: CapKey[]; cta: string }> = {
  gevonden: { label: 'Meer gevonden worden', word: 'makkelijker gevonden worden', sub: 'Begin bij hoe mensen zoeken.', body: 'SEO, content en techniek moeten hetzelfde verhaal vertellen. Wij bouwen een digitale basis die gevonden wordt, begrepen wordt en blijft werken.', link: ['SEO', '/diensten/seo'], caps: ['seo', 'content', 'web'], cta: 'Klaar om beter gevonden te worden?' },
  gedaan:   { label: 'Meer gedaan krijgen', word: 'sneller gedaan raken', sub: 'Laat werk werken.', body: 'Terugkerende taken, administratie en losse systemen kosten tijd. Wij brengen AI en automatisering samen tot processen die werk uit handen nemen.', link: ['Ontdek EMSRO', 'https://emsro.be'], caps: ['ai', 'strat', 'web'], cta: 'Klaar om meer werk uit handen te geven?' },
  verkopen: { label: 'Beter verkopen', word: 'beter verkopen', sub: 'Maak digitaal werkbaar.', body: 'Een webshop moet meer doen dan producten tonen. Wij bouwen de ervaring, techniek en processen rond wat er moet gebeuren: vinden, kiezen, kopen.', link: ['E-commerce', '/diensten/e-commerce'], caps: ['shop', 'seo', 'content'], cta: 'Klaar om online beter te verkopen?' },
  sterker:  { label: 'Sterker digitaal staan', word: 'sterker staan', sub: 'Begin met een betere basis.', body: 'Een website is geen visitekaartje dat je één keer bouwt. Wij maken digitale ervaringen die helder communiceren, vertrouwen bouwen en blijven werken.', link: ['Digitale strategie', '/diensten/digitale-strategie'], caps: ['strat', 'web', 'brand'], cta: 'Klaar om digitaal sterker te staan?' },
  own:      { label: '', word: 'beter werken', sub: 'Dan beginnen we met kijken.', body: 'Website, data, content, AI, processen. Meestal werkt alles — alleen niet samen. Wij brengen het samen tot één systeem dat oplevert.', link: ['Wat we bouwen', '/diensten'], caps: ['strat', 'web', 'ai'], cta: 'Vertel ons wat er beter moet.' },
};
export const CHOICES: Key[] = ['gevonden', 'gedaan', 'verkopen', 'sterker'];

// Home v4 — "Waar we goed in zijn"
export const GOOD: [string, string][] = [
  ['Alles laten samenwerken', 'Website, webshop, data en processen als één geheel.'],
  ['AI die in het proces zit', 'Alleen waar het tijd bespaart, met menselijke controle.'],
  ['Bouwen dat blijft werken', 'Snel, toegankelijk, onderhoudbaar. Jij blijft eigenaar.'],
  ['Gevonden worden, ook door AI', 'SEO en GEO vanaf de structuur.'],
];

export type Service = { idx: string; name: string; chain: string; lead: string; intro: string; get: string[]; for: string; approach: string[]; cases: string[]; description: string;
  fit?: { yes: string[]; no: string[] }; example?: { c?: string; title: string; body: string }; cost?: { intro: string; factors: string[]; outro: string }; local?: string };
export const SERVICES: Record<string, Service> = {
  'webdesign-development': { idx: '01', name: 'Webdesign & development', chain: 'Design · Development', lead: 'Sites en applicaties die snel zijn, toegankelijk zijn en jaren meegaan.',
    description: 'Webdesign en development in het Waasland: structuur eerst, interface daarna. Snel, toegankelijk en gebouwd om te blijven werken.',
    intro: 'Een website is geen brochure maar een werkend onderdeel van je bedrijf. We ontwerpen de structuur eerst, de interface daarna — en bouwen alleen wat die structuur nodig heeft.',
    get: ['Informatiearchitectuur en wireframes vóór er één pixel ontworpen wordt', 'Ontwerp in het ritme van je merk: typografie, wit, hiërarchie', 'Development in WordPress/Elementor of Next.js, afhankelijk van wat je nodig hebt', 'Snelheid, toegankelijkheid (WCAG AA) en SEO-structuur ingebouwd, niet achteraf'],
    for: 'Bedrijven waarvan de website niet meer klopt met wat ze vandaag doen, of die van template naar eigen systeem willen.',
    approach: ['Begrijpen: doelen, bezoekers, bestaande content en SEO-waarde', 'Structureren: sitemap, paginatypes, redirects', 'Ontwerpen: layout-systeem en componenten', 'Bouwen, testen op echte toestellen, live', 'Meten en verbeteren'], fit: {"yes":["Je site klopt niet meer met wat je vandaag doet of aanbiedt.","Je wil van een template naar een eigen structuur die meegroeit.","Je website moet samenwerken met andere systemen: planning, offertes, CRM of webshop."],"no":["Je zoekt een snelle one-pager op basis van een template.","Je wil een nieuw ontwerp, maar structuur en inhoud mogen niet veranderen."]},
    example: {"c":"ginkgo-tree","title":"Vijf werelden, één site.","body":"Ginkgo Tree combineert culinaire ervaringen, kunst, events, workshops en verhuur. Online voelden die onderdelen los aan. We begonnen bij wat bezoekers komen doen — ontdekken, plannen, huren — en bouwden daar één structuur voor, met een eventkalender, een verhuurkalender en interactieve contentmodules. Geen bedrijfswebsite meer, maar een plek waar elke bezoeker zijn eigen weg vindt."},
    cost: {"intro":"We werken niet met vaste pakketten. Wat een website kost, hangt vooral af van:","factors":["Hoeveel paginatypes er nodig zijn en hoeveel inhoud er al is","Koppelingen met andere systemen, zoals agenda, CRM of betalingen","WordPress/Elementor of Next.js","Wie teksten en beelden aanlevert"],"outro":"Na het eerste gesprek krijg je een voorstel met een duidelijke prijs. Geen verrassingen achteraf."},
    local: "Vanuit Waasmunster werken we voor bedrijven in Sint-Niklaas, Lokeren, Temse, Beveren en de rest van het Waasland — aan tafel waar het kan, online waar het handiger is.",
    cases: ['ginkgo-tree'] },
  'ai-automatisering': { idx: '02', name: 'AI & automatisering', chain: 'AI · Automatisering', lead: 'Begrensde AI en werkende koppelingen. Het handwerk tussen systemen eruit.',
    description: 'AI en automatisering voor kmo\'s: assistenten, koppelingen en automatische opvolging met duidelijke grenzen. Minder handwerk, meer overzicht.',
    intro: 'AI is geen doel. We zoeken de plekken in je proces waar een assistent, een slimme suggestie of een koppeling écht tijd bespaart — en bouwen die met duidelijke grenzen.',
    get: ['Procesanalyse: waar zit het repetitieve werk?', 'AI-assistenten en spraak-naar-tekst-flows (bv. offerte inspreken)', 'Koppelingen tussen website, CRM, boekhouding, planning en mail', 'Automatische opvolging, statussen en meldingen', 'Logging, fallback en menselijke controle waar het moet'],
    for: 'Bedrijven met terugkerend administratief werk, losse tools die niet met elkaar praten, of een AI-idee dat concreet moet worden.',
    approach: ['Proces in kaart', 'Kies één flow met zichtbaar effect', 'Bouw, test met echte data', 'Begrens en documenteer', 'Breid uit wat werkt'], fit: {"yes":["Je team verliest elke week tijd aan overtypen, opvolgen of zoeken.","Je gebruikt meerdere tools die niet met elkaar praten.","Je hebt een AI-idee, maar weet niet waar het veilig kan."],"no":["Je zoekt een chatbot omdat iedereen er een heeft.","Het proces zelf ligt nog niet vast."]},
    example: {"c":"emsro","title":"Van offerte tot werkdag.","body":"Bij EMSRO zaten offertes, planning, werkbonnen en facturen verspreid over systemen; elke overgang was handwerk. We brachten ze samen in één werkomgeving en voegden AI alleen toe waar het tijd bespaart: een offerte inspreken, een werfverslag omzetten naar een offerte, een bedrijfsassistent die vragen beantwoordt. Automatisering doet de opvolging, statussen en meldingen."},
    cost: {"intro":"Wat een AI- of automatiseringstraject kost, hangt vooral af van:","factors":["Hoeveel systemen gekoppeld moeten worden","Of die systemen al een koppeling of API hebben","Hoeveel controle en logging het proces vraagt","Klein starten met één flow of meteen breder gaan"],"outro":"Meestal beginnen we met één flow met zichtbaar effect. Daarna beslis je of we uitbreiden."},
    local: "Voor kmo's in het Waasland en daarbuiten. We komen graag langs om het proces ter plekke te zien — daar zit meestal het antwoord.",
    cases: ['emsro'] },
  'e-commerce': { idx: '03', name: 'E-commerce', chain: 'Development · Groei', lead: 'Verkopen als onderdeel van het systeem, niet als losse webshop ernaast.',
    description: 'E-commerce die aansluit op je content, data en processen. Shopstructuur, checkout, koppelingen en meting.',
    intro: 'Een webshop die los staat van je content, data en processen kost meer dan ze oplevert. We bouwen verkopen in als onderdeel van je digitale geheel.',
    get: ['Shopstructuur en productarchitectuur', 'Checkout zonder wrijving, betaal- en verzendkoppelingen', 'Koppeling met voorraad, facturatie en opvolging', 'Productcontent en SEO per categorie', 'Meting van wat verkoopt en waarom'],
    for: 'Bedrijven die online willen verkopen zonder een tweede administratie te creëren.',
    approach: ['Aanbod en marge begrijpen', 'Shopstructuur ontwerpen', 'Bouwen en koppelen', 'Lanceren met meetplan', 'Optimaliseren op data'], fit: {"yes":["Je verkoopt online, maar bestellingen vragen nog veel handwerk.","Je webshop staat los van je website, voorraad of facturatie.","Je wil starten met online verkopen en het meteen goed opzetten."],"no":["Je zoekt enkel een account op een marktplaats, zonder eigen shop.","Je wil vooral snel live, zonder te kijken naar de processen erachter."]},
    example: {"title":"Van bestelling tot factuur, zonder overtypen.","body":"Een typisch traject: een bedrijf verkoopt via een losse webshop, en elke bestelling wordt met de hand in de boekhouding en de planning gezet. We bouwen de shopstructuur rond hoe klanten zoeken en kiezen, koppelen de checkout aan betaling, verzending en facturatie, en meten welke producten en pagina's verkopen. De shop wordt een deel van het bedrijf, geen extra administratie."},
    cost: {"intro":"Wat een webshop kost, hangt vooral af van:","factors":["Het aantal producten en varianten","Koppelingen met voorraad, facturatie en verzending","Hoeveel productcontent er al is","Een bestaand platform overzetten of nieuw starten"],"outro":"Na het eerste gesprek krijg je een voorstel met een duidelijke prijs. Geen verrassingen achteraf."},
    local: "Voor handelaars en producenten in het Waasland die lokaal bekend zijn en online willen verkopen — of net omgekeerd.",
    cases: [] },
  'seo': { idx: '04', name: 'SEO', chain: 'Groei', lead: 'Vindbaar bij mensen én bij taalmodellen. Structuur eerst, tekst daarna.',
    description: 'SEO en GEO vanuit het Waasland: technische basis, zoekintentie, lokale vindbaarheid en begrijpelijk voor AI-zoekmachines.',
    intro: 'Hoger in Google, zonder trucjes. En vandaag ook: begrijpelijk voor AI-zoekmachines en assistenten die je bedrijf als bron moeten kunnen aanhalen.',
    get: ['Technische audit: crawlbaarheid, snelheid, indexatie, structured data', 'Zoekintentie en contentstructuur per pagina', 'Lokale SEO voor het Waasland zonder keyword-lijsten', 'GEO: entiteiten, antwoordbare content, schema.org', 'Meting via Search Console en AI-antwoordtests'],
    for: 'Bedrijven die gevonden willen worden op wat ze echt doen, in Google én in AI-antwoorden.',
    approach: ['Audit en baseline', 'Structuur en schema', 'Content per intentie', 'Interne links en autoriteit', 'Meten, bijsturen'], fit: {"yes":["Je wordt niet gevonden op wat je echt doet.","Je site is vernieuwd en je posities in Google zijn gezakt.","Je wil ook in AI-antwoorden als bron verschijnen."],"no":["Je zoekt snelle resultaten via trucjes of linkpakketten.","Er is geen ruimte om inhoud of structuur aan te passen."]},
    example: {"title":"Eerst de basis, dan de tekst.","body":"Een typisch traject: een bedrijf heeft een mooie site, maar Google begrijpt niet goed wat het doet of waar. We starten met een technische audit en een baseline in Search Console, herschikken de structuur rond zoekintentie en voegen schema.org toe, zodat zoekmachines en AI-assistenten herkennen wie je bent. Pas daarna schrijven we nieuwe inhoud, voor de vragen waar echt op gezocht wordt."},
    cost: {"intro":"Wat een SEO-traject kost, hangt vooral af van:","factors":["De grootte en technische staat van de site","Hoeveel pagina's nieuwe of herschreven inhoud nodig hebben","Een lokale focus of breder","Een eenmalige audit of doorlopende opvolging"],"outro":"Je krijgt vooraf een voorstel met de scope en met wat we meten."},
    local: "Lokale SEO voor het Waasland: gevonden worden in Sint-Niklaas, Lokeren of Temse zonder lijsten met plaatsnamen, met pagina's die echt over de regio gaan.",
    cases: ['ginkgo-tree'] },
  'social-content': { idx: '05', name: 'Social & content', chain: 'Groei', lead: 'Inhoud die uit je eigen werk komt, met een ritme dat vol te houden is.',
    description: 'Social en content voor kmo\'s: pijlers uit je eigen werk, een haalbaar ritme en hergebruik over kanalen.',
    intro: 'Geen contentfabriek. We halen de verhalen uit wat je al doet — projecten, vragen van klanten, inzichten — en zetten ze om in een ritme dat je zelf kan volhouden.',
    get: ['Contentpijlers gekoppeld aan je diensten', 'Kalender met haalbaar ritme', 'Teksten, korte video-scripts en visuals in je eigen toon', 'Hergebruik: één inzicht, meerdere kanalen', 'Meting van wat gesprekken oplevert'],
    for: 'Bedrijven die zichtbaar willen zijn zonder er elke dag mee bezig te zijn.',
    approach: ['Pijlers en toon', 'Kalender', 'Productie', 'Publicatie en opvolging', 'Evaluatie per kwartaal'], fit: {"yes":["Je hebt genoeg te vertellen, maar geen tijd of ritme.","Je posts staan los van je website en je diensten.","Je wil zichtbaar zijn zonder contentfabriek."],"no":["Je zoekt vooral volgers of viraal bereik.","Er is intern niemand die af en toe input kan geven."]},
    example: {"title":"Eén verhaal, vier kanalen.","body":"Een typisch traject: een vakbedrijf doet elke week interessant werk, maar niemand deelt het. We halen de verhalen uit projecten en klantvragen, maken er contentpijlers van die bij de diensten horen, en zetten een kalender op die vol te houden is. Eén projectverhaal wordt een post, een korte video, een alinea op de site en een antwoord in de FAQ."},
    cost: {"intro":"Wat social en content kosten, hangt vooral af van:","factors":["Het aantal kanalen en het publicatieritme","Wie teksten, foto's en video maakt","Een eenmalige opzet of doorlopende productie","Hoeveel bestaand materiaal er al is"],"outro":"Na het eerste gesprek krijg je een voorstel met een duidelijke prijs. Geen verrassingen achteraf."},
    local: "Voor bedrijven in het Waasland die vooral lokaal zichtbaar willen zijn, zonder algemene marketingpraat.",
    cases: ['ginkgo-tree'] },
  'digitale-strategie': { idx: '06', name: 'Digitale strategie', chain: 'Strategie', lead: 'De keuze vóór de bouw: wat dit moet opleveren en waaraan we dat meten.',
    description: 'Digitale strategie: doorlichting van website, data, content, tools en processen, met doelen, prioriteiten en een roadmap.',
    intro: 'Voor we iets bouwen, bepalen we wat het moet opleveren. Strategie is bij AIVENSI geen document maar een set beslissingen: wat wel, wat niet, in welke volgorde.',
    get: ['Digitale doorlichting: website, data, content, tools, processen', 'Doelen en meetbare indicatoren', 'Prioriteiten en roadmap in fases', 'Keuze van technologie en tools', 'Begeleiding bij uitvoering'],
    for: 'Bedrijven die veel losse tools hebben en geen samenhang, of voor een grote digitale stap staan.',
    approach: ['Gesprek en doorlichting', 'Kansen en knelpunten', 'Roadmap', 'Beslissen', 'Starten met fase één'], fit: {"yes":["Je hebt veel losse tools en weet niet meer wat wat doet.","Je wil investeren in digitaal, maar weet niet waar eerst.","Je website, data en processen groeiden naast elkaar in plaats van samen."],"no":["Je zoekt een lijvig rapport voor in de kast.","De beslissingen liggen al vast en je zoekt enkel bevestiging."]},
    example: {"title":"Beslissingen, geen document.","body":"Een typisch traject: een bedrijf heeft een website, een CRM, een boekhoudpakket en een paar Excel-lijsten, en niets werkt samen. We lichten website, data, content, tools en processen door, bepalen wat het moet opleveren en waaraan we dat meten, en leggen een roadmap in fases vast. Daarna kies je: zelf uitvoeren, met ons, of een mix."},
    cost: {"intro":"Wat een strategietraject kost, hangt vooral af van:","factors":["Hoeveel systemen en processen we doorlichten","Met hoeveel mensen we praten","Alleen strategie, of ook begeleiding bij de uitvoering","De grootte van de organisatie"],"outro":"Na het eerste gesprek krijg je een voorstel met een duidelijke prijs. Geen verrassingen achteraf."},
    local: "Voor kmo's in het Waasland. De doorlichting doen we het liefst aan tafel, bij jou.",
    cases: ['emsro'] },
  'rebranding': { idx: '07', name: 'Rebranding', chain: 'Strategie · Design', lead: 'Een identiteit die klopt met waar je naartoe gaat.',
    description: 'Rebranding: positionering, tone of voice en visuele identiteit die weer één stem vormen — toegepast op website, social en documenten.',
    intro: 'Een merk verandert wanneer het bedrijf verandert. We herzien positionering, toon en visuele identiteit zodat alles wat digitaal is weer één stem heeft.',
    get: ['Positionering en kernboodschap', 'Tone of voice en verbale identiteit', 'Visuele richting: typografie, kleur, beeld', 'Toepassing op website, social en documenten', 'Merkgids die je team echt gebruikt'],
    for: 'Bedrijven waarvan de huisstijl niet meer past bij het aanbod, het niveau of de ambitie.',
    approach: ['Wie ben je vandaag, waar ga je naartoe', 'Positionering', 'Visuele richting', 'Toepassing', 'Overdracht'], fit: {"yes":["Je bedrijf is gegroeid, maar je merk niet mee.","Je logo, site en communicatie vertellen elk iets anders.","Je slaat een nieuwe richting in en wil dat zichtbaar maken."],"no":["Je zoekt alleen een nieuw logo, los van de rest.","Er is geen ruimte om ook website en communicatie mee te nemen."]},
    example: {"title":"Van logo naar systeem.","body":"Een typisch traject: een bedrijf is veranderd, maar het logo en de website komen nog uit de beginperiode. We starten bij de positionering: voor wie, waarom, wat maakt het anders. Daaruit volgen woordmerk, typografie, kleur en toon, vastgelegd in een merkgids. Daarna zetten we het door in website, documenten en social, zodat het merk overal hetzelfde verhaal vertelt."},
    cost: {"intro":"Wat een rebranding kost, hangt vooral af van:","factors":["Het bestaande merk bijsturen of volledig nieuw","Hoeveel toepassingen meegaan: site, documenten, signalisatie","Of naamgeving deel uitmaakt van het traject","Hoe uitgebreid de merkgids moet zijn"],"outro":"Na het eerste gesprek krijg je een voorstel met een duidelijke prijs. Geen verrassingen achteraf."},
    local: "Voor bedrijven in het Waasland die gegroeid zijn en er ook zo willen uitzien.",
    cases: [] },
};
export const SERVICE_SLUGS = Object.keys(SERVICES);

// Diensten die vaak samen gaan (interne links "Hoort hier vaak bij").
export const RELATED: Record<string, string[]> = {
  'webdesign-development': ['seo', 'social-content', 'rebranding'],
  'ai-automatisering': ['digitale-strategie', 'webdesign-development', 'e-commerce'],
  'e-commerce': ['seo', 'ai-automatisering', 'webdesign-development'],
  'seo': ['social-content', 'webdesign-development', 'e-commerce'],
  'social-content': ['seo', 'rebranding', 'webdesign-development'],
  'digitale-strategie': ['ai-automatisering', 'webdesign-development', 'rebranding'],
  'rebranding': ['webdesign-development', 'social-content', 'digitale-strategie'],
};
/** Diensten waaraan een case gekoppeld is (omgekeerde van SERVICES[x].cases). */
export const servicesForCase = (slug: string) => SERVICE_SLUGS.filter(s => SERVICES[s].cases.includes(slug));

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
  { idx: '01', slug: 'mooie-website-nog-geen-goede-website', title: 'Waarom een mooie website nog geen goede website is', blurb: 'Design zonder structuur is decor. Wat een website goed maakt, en hoe je het herkent.', tag: 'Websites · 5 min', cat: 'Websites', date: 'Sep 2026', read: '5 min', img: null as string | null },
  { idx: '02', slug: 'waar-ai-vandaag-tijd-bespaart', title: 'Waar AI vandaag echt tijd kan besparen', blurb: 'Geen visie, wel concrete plekken in het proces van een kmo waar AI vandaag al werkt.', tag: 'AI · 6 min', cat: 'AI', date: 'Aug 2026', read: '6 min', img: null as string | null },
  { idx: '03', slug: 'seo-en-geo-waarom-je-website-ook-voor-ai-begrijpelijk-moet-zijn', title: 'SEO en GEO: waarom je website ook voor AI begrijpelijk moet zijn', blurb: 'Zoekmachines worden antwoordmachines. Wat dat verandert aan structuur, content en schema.', tag: 'SEO · GEO · 7 min', cat: 'SEO · GEO', date: 'Jul 2026', read: '7 min', img: null as string | null },
];

// Inzichten — werkplaats-foto's (img null = kader zonder beeld tot de foto's er zijn)
export const WERKPLAATS: { cap: string; ratio: string; img: string | null; alt: string }[] = [
  { cap: 'Structuur eerst', ratio: '4 / 5', img: null, alt: 'Werkplek met wireframe op het scherm' },
  { cap: 'Eerst op papier', ratio: '1 / 1', img: null, alt: 'Schets op papier' },
  { cap: 'Aan tafel', ratio: '3 / 4', img: null, alt: 'Gesprek aan tafel bij een klant' },
];

export const TOWNS: [string, number, number, number, 'start' | 'end'][] = [
  ['Waasmunster', 235, 300, 0, 'start'], ['Sint-Niklaas', 317, 176, 9, 'start'], ['Beveren', 470, 76, 20, 'start'], ['Lokeren', 117, 318, 8, 'end'],
  ['Temse', 404, 254, 10, 'start'], ['Stekene', 170, 76, 15, 'end'], ['Kruibeke', 535, 166, 20, 'start'], ['Zwijndrecht', 561, 48, 26, 'end'],
  ['Hamme', 300, 340, 6, 'start'], ['Moerbeke', 39, 166, 20, 'end'],
];
