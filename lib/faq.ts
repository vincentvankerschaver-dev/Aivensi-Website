// FAQ + stapbeschrijvingen uit Dienst Detail.dc.html. Algemene vragen (_) volgen na de dienstspecifieke.
export const STEP_DESC = ['We beginnen bij de vraag en het doel, niet bij de tool.', 'Structuur en keuzes vóór er iets gebouwd wordt.', 'Bouwen in korte cycli die je tussentijds kunt beoordelen.', 'Live zetten, meten en bijsturen op wat het oplevert.', 'Onderhoud en verdere groei als het werk erom vraagt.', 'Overdracht en documentatie zodat je niet afhankelijk bent.'];

export const SHORT: Record<string, string> = { 'webdesign-development': 'webdesign', 'ai-automatisering': 'AI en automatisering', 'e-commerce': 'e-commerce', 'seo': 'SEO', 'social-content': 'content', 'digitale-strategie': 'strategie', 'rebranding': 'rebranding' };

export const MEGA_LINE: Record<string, string> = { 'webdesign-development': 'Snel, toegankelijk, duurzaam.', 'ai-automatisering': 'AI en koppelingen die werken.', 'e-commerce': 'Verkopen binnen het systeem.', 'seo': 'Vindbaar voor mens en AI.', 'social-content': 'Content in een haalbaar ritme.', 'digitale-strategie': 'De keuze vóór de bouw.', 'rebranding': 'Identiteit die klopt.' };

type QA = [string, string];
export const FAQ: Record<string, QA[]> = {
  _: [
    ['Werk ik met één persoon of met een team?', 'Vincent is je vaste aanspreekpunt van begin tot oplevering. Waar een project meer handen of specifieke expertise vraagt, werken we met freelance specialisten uit een vast netwerk — zonder dat jij met meerdere partijen moet afstemmen.'],
    ['Hoe verloopt een eerste gesprek?', 'Geen pitch. We bespreken wat er vandaag niet werkt, wat het moet opleveren en waaraan we dat meten. Daarna volgt een voorstel met scope, aanpak en planning.'],
    ['Wat kost dit?', 'Dat hangt af van scope en complexiteit; we werken niet met vaste pakketten. Na het eerste gesprek krijg je een concreet voorstel met een duidelijke prijs — geen verrassingen achteraf.'],
    ['Hoe lang duurt een project?', 'Een website van beperkte omvang loopt doorgaans enkele weken; een webshop, applicatie of automatiseringstraject langer. In het voorstel staat een realistische planning per fase, en je ziet tussentijds resultaat.'],
    ['Werken jullie ook buiten het Waasland?', 'Ja. We zitten in Waasmunster en komen graag langs in de regio, maar het werk zelf gebeurt digitaal. Voor bedrijven elders in Vlaanderen werken we even goed op afstand.'],
    ['Wat gebeurt er na de oplevering?', 'Je krijgt overdracht en documentatie, zodat je niet van ons afhankelijk bent. Wil je onderhoud, doorontwikkeling of opvolging van resultaten, dan spreken we dat apart af.'],
    ['Blijf ik eigenaar van wat gebouwd wordt?', 'Ja. Domein, hosting, code, content en accounts staan op jouw naam. We werken met open, gangbare technologie zodat een andere partij het later kan overnemen als dat ooit nodig is.'],
  ],
  'webdesign-development': [
    ['WordPress of Next.js?', 'Beide. WordPress/Elementor als je zelf veel content wil beheren binnen een bekend systeem; Next.js als je een applicatie, koppelingen of maatwerk-performance nodig hebt. We kiezen op basis van wat het project nodig heeft, niet op voorkeur.'],
    ['Kan ik de website zelf aanpassen?', 'Ja. We bouwen zo dat teksten, beelden en pagina\'s door jou beheerd kunnen worden, en we leggen bij oplevering uit hoe. Structurele wijzigingen doen we liever samen, zodat de samenhang blijft.'],
    ['Wordt de site ook snel en toegankelijk?', 'Dat is geen optie maar de basis: laadtijd, mobiel gebruik en toegankelijkheid (WCAG AA) zitten in het ontwerp en de bouw, niet in een nabehandeling.'],
  ],
  'ai-automatisering': [
    ['Is AI wel geschikt voor mijn bedrijf?', 'Alleen waar het aantoonbaar tijd bespaart of fouten voorkomt. We beginnen met het proces, niet met het model — en als een formulier of eenvoudige automatisering volstaat, adviseren we dat.'],
    ['Wat gebeurt er met onze gegevens?', 'We kiezen per toepassing welke data een AI-model mag zien, beperken dat tot wat nodig is en leggen vast waar het verwerkt wordt. Gevoelige gegevens blijven buiten het model als dat kan.'],
    ['Wat als de AI een fout maakt?', 'Daarom bouwen we begrensd: duidelijke taken, menselijke controle op beslissingen die ertoe doen, en logging zodat je kunt zien wat er gebeurd is. AI stelt voor; jij beslist.'],
  ],
  'e-commerce': [
    ['Welk platform gebruiken jullie voor webshops?', 'WooCommerce als de shop bij een WordPress-site hoort en het assortiment overzichtelijk is; maatwerk op Next.js als je koppelingen met voorraad, ERP of boekhouding nodig hebt. De keuze volgt uit je proces.'],
    ['Kunnen jullie koppelen met mijn boekhouding of voorraad?', 'Meestal wel. Orders, facturen en voorraad hoeven niet dubbel ingevoerd te worden; we bekijken per systeem wat via een bestaande koppeling kan en wat maatwerk vraagt.'],
  ],
  'seo': [
    ['Wat is GEO?', 'Generative Engine Optimization: je website zo structureren dat ook AI-assistenten en antwoordmachines ze begrijpen en als bron gebruiken. Het bouwt voort op degelijke SEO, geen aparte truc.'],
    ['Hoe snel zie ik resultaat?', 'Technische verbeteringen werken snel door; posities en verkeer bewegen doorgaans pas na enkele maanden. We meten vanaf dag één, zodat je ziet wat verandert en waarom.'],
    ['Garanderen jullie een eerste plaats in Google?', 'Nee, en wie dat wel doet, moet je wantrouwen. We garanderen wel een gezonde structuur, correcte techniek, content die aansluit op zoekintentie en eerlijke rapportering.'],
  ],
  'social-content': [
    ['Schrijven jullie alles voor ons?', 'We zetten de structuur, het ritme en de eerste reeks op en schrijven waar nodig mee. De inhoud komt uit jouw werk — daarom werken we bij voorkeur samen met wie het vak kent.'],
    ['Op welke kanalen moeten we zitten?', 'Waar je klanten zijn, niet overal. Voor de meeste kmo\'s is één kanaal goed onderhouden beter dan vier half.'],
  ],
  'digitale-strategie': [
    ['Wat levert een strategietraject concreet op?', 'Een document met keuzes: wat we bouwen, wat niet, in welke volgorde, en waaraan we succes afmeten. Bruikbaar als basis voor elke volgende stap, ook als je die met een andere partij zet.'],
    ['Moet ik daarna bij AIVENSI bouwen?', 'Nee. De strategie staat op zich. Vaak is het wel logisch dat wie de keuzes mee maakte ook bouwt, maar dat is jouw beslissing.'],
  ],
  'rebranding': [
    ['Ontwerpen jullie ook logo\'s en huisstijl?', 'Ja, in samenwerking met freelance ontwerpers uit ons netwerk. We bewaken dat identiteit, website en communicatie één geheel vormen.'],
    ['Moet mijn website mee veranderen bij een rebranding?', 'Niet altijd volledig. Soms volstaat een visuele update; soms is het moment om structuur en inhoud mee te herzien. We bekijken wat de identiteit nodig heeft om overal te kloppen.'],
  ],
};
export const faqFor = (slug: string): QA[] => [...(FAQ[slug] ?? []), ...FAQ._];
