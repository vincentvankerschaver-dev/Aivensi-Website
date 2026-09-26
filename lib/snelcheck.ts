// Snelle check per dienst (bron: Snelcheck.dc.html). Gedeeld door client (vragen) en server-route (validatie + fallback).
export type Check = { title: string; qs: { q: string; opts: string[] }[]; fallback: string[] };

export const CHECKS: Record<string, Check> = {
  'ai-automatisering': {
    title: 'Welk handwerk kan eruit?',
    qs: [
      { q: 'Wat kost jullie elke week de meeste tijd?', opts: ['Offertes maken', 'Planning en afspraken', 'Facturen en opvolging', 'Mails en klantvragen beantwoorden'] },
      { q: 'Waar zit die informatie nu?', opts: ['Verspreid over mail en Excel', 'In één pakket dat niet koppelt', 'In meerdere losse tools', 'Vooral in hoofden en op papier'] },
      { q: 'Met hoeveel mensen doen jullie dit werk?', opts: ['Alleen ik', '2 tot 5', '6 tot 20', 'Meer dan 20'] },
      { q: 'Wat zou het meeste opleveren?', opts: ['Minder typwerk', 'Minder fouten en vergeten taken', 'Sneller antwoorden naar klanten', 'Beter overzicht'] },
    ],
    fallback: ['Begin met het ene proces dat elke week terugkomt en zet de stappen op papier, van aanvraag tot afronding.', 'Breng samen wat nu verspreid zit: één plek waar gegevens één keer ingevoerd worden.', 'Automatiseer daarna de overgang die het vaakst misloopt, met een mens die het resultaat controleert.'],
  },
  'webdesign-development': {
    title: 'Wat moet je site beter doen?',
    qs: [
      { q: 'Wat moet je website vooral opleveren?', opts: ['Aanvragen en offertevragen', 'Vertrouwen bij nieuwe klanten', 'Informatie voor bestaande klanten', 'Sollicitaties'] },
      { q: 'Hoe oud is je huidige site?', opts: ['Nog geen site', 'Minder dan 2 jaar', '2 tot 5 jaar', 'Ouder dan 5 jaar'] },
      { q: 'Wie past de inhoud nu aan?', opts: ['Ikzelf', 'Iemand intern', 'Een externe partij', 'Eigenlijk niemand'] },
      { q: 'Wat stoort je het meest?', opts: ['Ziet er verouderd uit', 'Traag of slecht op gsm', 'Levert niets op', 'Moeilijk aan te passen'] },
    ],
    fallback: ['Bepaal eerst wat de site moet opleveren en voor wie, en schrap wat daar niet aan bijdraagt.', 'Zet de structuur op papier voor je aan design denkt: welke pagina\'s, welke vragen, welke volgende stap.', 'Kies de technologie op basis van wie de inhoud beheert, niet op basis van wat in de mode is.'],
  },
  'e-commerce': {
    title: 'Waar loopt je webshop vast?',
    qs: [
      { q: 'Waar sta je vandaag?', opts: ['Nog geen webshop', 'Webshop die weinig verkoopt', 'Webshop die groeit maar wringt', 'Verkoop via platformen'] },
      { q: 'Hoeveel producten verkoop je ongeveer?', opts: ['Minder dan 50', '50 tot 500', '500 tot 5000', 'Meer dan 5000'] },
      { q: 'Wat gebeurt er na een bestelling?', opts: ['Alles manueel', 'Deels gekoppeld', 'Volledig gekoppeld', 'Weet ik niet goed'] },
      { q: 'Waar wil je het eerst verbetering?', opts: ['Meer bezoekers', 'Meer bezoekers die kopen', 'Minder werk per bestelling', 'Beter inzicht in wat verkoopt'] },
    ],
    fallback: ['Kijk eerst waar bezoekers afhaken: bij het zoeken, het kiezen of het afrekenen.', 'Koppel bestellingen aan voorraad en facturatie zodat niets twee keer ingevoerd moet worden.', 'Meet per categorie wat verkoopt, zodat content en aanbod op data gebouwd worden.'],
  },
  'seo': {
    title: 'Hoe vindbaar ben je echt?',
    qs: [
      { q: 'Hoe vinden nieuwe klanten je nu vooral?', opts: ['Via Google', 'Via mond-tot-mond', 'Via social media', 'Weet ik eigenlijk niet'] },
      { q: 'Waar wil je gevonden worden?', opts: ['In mijn gemeente', 'In het Waasland', 'In heel Vlaanderen', 'Online, overal'] },
      { q: 'Staat elke dienst op een eigen pagina?', opts: ['Ja', 'Deels', 'Nee, alles op één pagina', 'Weet ik niet'] },
      { q: 'Meet je nu wat je site oplevert?', opts: ['Ja, regelmatig', 'Soms', 'Nee', 'Weet niet hoe'] },
    ],
    fallback: ['Geef elke dienst een eigen pagina die één zoekvraag duidelijk beantwoordt.', 'Zorg dat je bedrijfsgegevens, regio en diensten overal hetzelfde en machineleesbaar vermeld staan.', 'Koppel Search Console en kijk maandelijks welke zoekvragen je binnenbrengen en welke nog ontbreken.'],
  },
  'social-content': {
    title: 'Wat vertel je, en hoe vaak?',
    qs: [
      { q: 'Hoe vaak post je nu?', opts: ['Bijna nooit', 'Af en toe', 'Elke week', 'Meerdere keren per week'] },
      { q: 'Op welk kanaal zitten je klanten vooral?', opts: ['LinkedIn', 'Facebook', 'Instagram', 'Geen idee'] },
      { q: 'Waar haal je inspiratie vandaan?', opts: ['Afgewerkte projecten', 'Vragen van klanten', 'Nieuws uit de sector', 'Moeilijk, dat is net het probleem'] },
      { q: 'Wat wil je vooral bereiken?', opts: ['Meer naamsbekendheid', 'Meer aanvragen', 'Nieuwe medewerkers', 'Vertrouwen bij bestaande klanten'] },
    ],
    fallback: ['Kies één kanaal waar je klanten zitten en laat de rest voorlopig los.', 'Haal je onderwerpen uit je eigen werk: projecten, klantvragen en wat je onderweg leert.', 'Leg een ritme vast dat je volhoudt, ook in drukke weken, en hergebruik één inzicht over meerdere berichten.'],
  },
  'digitale-strategie': {
    title: 'Waar begin je best?',
    qs: [
      { q: 'Hoeveel digitale tools gebruiken jullie ongeveer?', opts: ['1 tot 3', '4 tot 8', 'Meer dan 8', 'Geen idee'] },
      { q: 'Praten die tools met elkaar?', opts: ['Ja', 'Deels', 'Nee', 'Weet ik niet'] },
      { q: 'Wie beslist over digitale keuzes?', opts: ['Ikzelf', 'Een collega', 'Een externe partij', 'Niemand echt'] },
      { q: 'Wat is de grootste vraag voor de komende jaren?', opts: ['Groeien zonder meer mensen', 'Beter gevonden worden', 'Minder administratie', 'Klaar zijn voor AI'] },
    ],
    fallback: ['Maak een lijst van alle tools en wat ze doen, en markeer waar dezelfde gegevens dubbel ingevoerd worden.', 'Kies één doel voor het komende jaar en meet waar je vandaag staat.', 'Bepaal de volgorde: eerst de basis die alles verbindt, daarna wat erop bouwt.'],
  },
  'rebranding': {
    title: 'Klopt je merk nog?',
    qs: [
      { q: 'Hoe oud is je huidige huisstijl?', opts: ['Minder dan 3 jaar', '3 tot 7 jaar', 'Ouder dan 7 jaar', 'Er is geen echte huisstijl'] },
      { q: 'Wat is er veranderd sinds je merk ontstond?', opts: ['Ons aanbod', 'Onze doelgroep', 'Onze grootte', 'Weinig, maar het voelt niet meer juist'] },
      { q: 'Is je merk overal hetzelfde?', opts: ['Ja', 'Grotendeels', 'Nee, elk kanaal is anders', 'Weet ik niet'] },
      { q: 'Wat wil je dat mensen voelen?', opts: ['Vertrouwen', 'Vakmanschap', 'Vernieuwing', 'Nabijheid'] },
    ],
    fallback: ['Schrijf in één zin wie je vandaag bent en voor wie, voor je naar logo of kleur kijkt.', 'Leg alles naast elkaar wat nu naar buiten gaat en markeer waar de toon of stijl afwijkt.', 'Pas eerst de plekken aan die klanten het vaakst zien: website, offertes en het eerste contact.'],
  },
};

export type CheckResult = { intro: string; tips: string[]; source: 'ai' | 'fallback' };
export const FALLBACK_INTRO = 'Dit zou ik als eerste bekijken.';

/** Wat de check meegeeft naar /contact (sessionStorage 'aivensi-check'). */
export type CarriedCheck = { dienst: string; antwoorden: string[]; advies?: string[] };
export const CHECK_KEY = 'aivensi-check';
