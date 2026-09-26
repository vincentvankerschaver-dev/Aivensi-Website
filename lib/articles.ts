// Uitgeschreven inzichten. Alleen artikels met een body krijgen een eigen pagina (/insights/[slug]).
// Geen verzonnen cijfers of klanten; voorbeelden komen uit eigen werk (EMSRO) of zijn algemeen.
export type Block =
  | { t: 'p'; text: string }
  | { t: 'h2'; text: string; id: string }
  | { t: 'list'; items: [string, string][] }
  | { t: 'quote'; text: string };

export type Article = {
  slug: string; title: string; description: string; published: string; updated: string;
  services: string[]; cases: string[]; faq: [string, string][]; body: Block[];
};

export const ARTICLES: Record<string, Article> = {
  'waar-ai-vandaag-tijd-bespaart': {
    slug: 'waar-ai-vandaag-tijd-bespaart',
    title: 'Waar AI vandaag echt tijd kan besparen',
    description: 'Geen visie, wel concrete plekken in het proces van een kmo waar AI vandaag al werkt — en waar een eenvoudige automatisering beter is.',
    published: '2026-08-20', updated: '2026-09-25',
    services: ['ai-automatisering', 'digitale-strategie'], cases: ['emsro'],
    body: [
      { t: 'p', text: 'Over AI wordt veel beloofd. Voor een kmo is de vraag eenvoudiger: waar gaat vandaag tijd verloren aan werk dat een systeem beter of sneller kan? Het antwoord ligt zelden bij een chatbot op de homepage. Het ligt in de overgangen tussen taken: van gesprek naar offerte, van werf naar verslag, van bestelling naar factuur.' },
      { t: 'h2', id: 'waar-het-werkt', text: 'Vijf plekken waar AI vandaag werkt' },
      { t: 'list', items: [
        ['Offertes opstellen', 'Je spreekt in wat er moet gebeuren; AI zet het om in een gestructureerde offerte met posten en omschrijvingen. Jij controleert en verstuurt. Het typwerk verdwijnt, de beslissing blijft bij jou.'],
        ['Verslagen omzetten', 'Notities of een ingesproken werfverslag worden een net document, of meteen een voorstel voor meerwerk. Handig voor wie op locatie werkt en ’s avonds geen administratie meer wil doen.'],
        ['Mails en klantvragen sorteren', 'AI leest binnenkomende vragen, herkent waarover het gaat en zet een antwoordvoorstel klaar. Terugkerende vragen krijgen sneller een antwoord; uitzonderingen komen bij een mens terecht.'],
        ['Gegevens overnemen uit documenten', 'Leveranciersfacturen, bestelbonnen of formulieren: AI haalt de velden eruit en zet ze op de juiste plek. Minder overtypen, minder fouten.'],
        ['Opvolging niet vergeten', 'Een offerte zonder antwoord, een klant die nog moet betalen, een afspraak die bevestigd moet worden. AI kan signaleren en een bericht voorstellen; een eenvoudige automatisering verstuurt het op het juiste moment.'],
      ] },
      { t: 'h2', id: 'waar-niet', text: 'Waar AI niet de beste keuze is' },
      { t: 'p', text: 'Niet elk probleem vraagt een taalmodel. Als een taak altijd dezelfde stappen volgt — een formulier dat een record aanmaakt, een status die een mail triggert — dan is een gewone koppeling goedkoper, sneller en voorspelbaarder. AI is sterk bij tekst, variatie en interpretatie. Het is zwak bij beslissingen die altijd exact hetzelfde moeten uitvallen.' },
      { t: 'p', text: 'Een goede vuistregel: als je de regel in één zin kan opschrijven, automatiseer je hem. Als je moet zeggen “het hangt ervan af”, kan AI helpen — met een mens die het resultaat nakijkt.' },
      { t: 'h2', id: 'begrensd', text: 'Waarom begrensd bouwen belangrijk is' },
      { t: 'p', text: 'AI maakt fouten. Daarom bouwen we elke toepassing met duidelijke grenzen: één taak per assistent, alleen de gegevens die nodig zijn, en een mens die beslist waar het ertoe doet. We loggen wat de AI voorstelde en wat er gebeurde, zodat je achteraf kan zien waarom iets zo liep.' },
      { t: 'quote', text: 'AI stelt voor. Jij beslist.' },
      { t: 'h2', id: 'beginnen', text: 'Hoe je begint' },
      { t: 'list', items: [
        ['Kies één proces', 'Het werk dat elke week terugkomt en waar iedereen over klaagt. Niet het meest ambitieuze, wel het meest voelbare.'],
        ['Zet de stappen op papier', 'Van aanvraag tot afronding: wie doet wat, waar staat de informatie, waar loopt het vast.'],
        ['Breng de gegevens samen', 'AI werkt pas goed als de informatie op één plek staat. Vaak is dat de eerste en belangrijkste stap.'],
        ['Automatiseer één overgang', 'Met een mens die controleert. Meet of het tijd bespaart en fouten voorkomt, en breid pas daarna uit.'],
      ] },
      { t: 'h2', id: 'emsro', text: 'Uit de praktijk: EMSRO' },
      { t: 'p', text: 'Met EMSRO, ons eigen product voor bedrijven die op locatie werken, brengen we offertes, planning, werkbonnen en facturen samen in één werkomgeving. AI zit er waar ze praktisch waarde toevoegt: een offerte inspreken, een werfverslag omzetten naar een offerte, een bedrijfsassistent die vragen beantwoordt. De rest — statussen, meldingen, opvolging — is gewone automatisering. Die combinatie is het punt.' },
    ],
    faq: [
      ['Is AI iets voor een klein bedrijf?', 'Ja, als er terugkerend werk is met tekst of documenten: offertes, verslagen, mails. Voor vaste stappen zonder variatie is een gewone automatisering vaak beter en goedkoper.'],
      ['Wat gebeurt er met onze gegevens?', 'We kiezen per toepassing welke gegevens een AI-model mag zien, beperken dat tot wat nodig is en leggen vast waar het verwerkt wordt. Gevoelige gegevens blijven buiten het model als dat kan.'],
      ['Waar begin je best?', 'Bij één proces dat elke week terugkomt. Zet de stappen op papier, breng de gegevens samen, en automatiseer daarna één overgang met menselijke controle.'],
    ],
  },
};
export const ARTICLE_SLUGS = Object.keys(ARTICLES);
