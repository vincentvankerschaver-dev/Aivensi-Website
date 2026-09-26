import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { LegalPage } from '@/components/LegalPage';
import { COMPANY, type LegalSection } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Privacybeleid',
  description: 'Welke gegevens AIVENSI verwerkt via deze website, waarom, hoe lang, met wie ze gedeeld worden en welke rechten je hebt (AVG/GDPR).',
  alternates: { canonical: '/privacy' },
};

const S: LegalSection[] = [
  { id: 'wie', title: 'Wie is verantwoordelijk', body: <>
    <p>{COMPANY.name} is verwerkingsverantwoordelijke voor de persoonsgegevens die via deze website verwerkt worden.</p>
    <dl className="legal-dl">
      <dt>Naam</dt><dd>{COMPANY.legal}</dd>
      <dt>Maatschappelijke zetel</dt><dd>{COMPANY.address}</dd>
      <dt>Ondernemingsnr.</dt><dd>{COMPANY.kbo}</dd>
      <dt>Contact</dt><dd><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></dd>
    </dl>
    <p>Voor alle vragen over privacy is Vincent je aanspreekpunt. We hebben geen functionaris voor gegevensbescherming aangesteld; dat is voor een studio van deze omvang niet verplicht.</p>
  </> },
  { id: 'welke', title: 'Welke gegevens en waarom', body: <>
    <div className="legal-table" role="table" aria-label="Verwerkingen">
      <div role="row" className="legal-tr legal-th"><span role="columnheader">Wat</span><span role="columnheader">Gegevens</span><span role="columnheader">Doel en rechtsgrond</span></div>
      <div role="row" className="legal-tr"><span role="cell">Contactformulier en e-mail</span><span role="cell">Naam, e-mail, bedrijf (optioneel), onderwerp, je bericht, eventueel je voorkeursmoment en antwoorden uit de snelle check</span><span role="cell">Je vraag beantwoorden en een gesprek voorbereiden. Stappen vóór een overeenkomst (art. 6.1.b AVG).</span></div>
      <div role="row" className="legal-tr"><span role="cell">Afspraak plannen</span><span role="cell">Naam, e-mail, gekozen moment</span><span role="cell">Het gesprek inplannen en bevestigen (art. 6.1.b AVG).</span></div>
      <div role="row" className="legal-tr"><span role="cell">Snelle check</span><span role="cell">Je gekozen antwoorden (vaste opties, geen vrije tekst). Geen naam of e-mail.</span><span role="cell">Een eerste indruk tonen op basis van je antwoorden (art. 6.1.f AVG — gerechtvaardigd belang).</span></div>
      <div role="row" className="legal-tr"><span role="cell">AI-vraagbox</span><span role="cell">De vraag die je typt en de pagina waarop je ze stelt</span><span role="cell">Je vraag beantwoorden op basis van de inhoud van deze site (art. 6.1.f AVG). Vul hier geen persoonsgegevens in.</span></div>
      <div role="row" className="legal-tr"><span role="cell">Technische serverlogs</span><span role="cell">IP-adres, browser, tijdstip, opgevraagde pagina</span><span role="cell">Beveiliging, misbruik tegengaan (o.a. een limiet op het aantal AI-vragen) en storingen oplossen (art. 6.1.f AVG).</span></div>
      <div role="row" className="legal-tr"><span role="cell">Klanten</span><span role="cell">Contact- en facturatiegegevens, projectcommunicatie</span><span role="cell">De overeenkomst uitvoeren (art. 6.1.b) en de boekhoudplicht (art. 6.1.c AVG).</span></div>
    </div>
    <p>We gebruiken je gegevens niet voor nieuwsbrieven of marketingmails, verkopen ze niet en maken geen profielen.</p>
  </> },
  { id: 'ai', title: 'AI op deze website', body: <>
    <p>De snelle check en de vraagbox gebruiken een taalmodel van Anthropic (Claude). Je antwoorden of je vraag worden daarvoor naar Anthropic gestuurd, samen met de inhoud van deze site als bron. Er gaat geen naam, e-mailadres of IP-adres mee.</p>
    <p>Volgens de voorwaarden van Anthropic worden gegevens die via hun API binnenkomen niet gebruikt om modellen te trainen. [Bewaartermijn bij Anthropic bevestigen in de actuele API-voorwaarden.]</p>
    <p>De AI neemt geen beslissingen over jou. Wat ze antwoordt is een eerste indruk, geen advies, offerte of belofte.</p>
  </> },
  { id: 'delen', title: 'Met wie we gegevens delen', body: <>
    <p>Alleen met dienstverleners die we nodig hebben om de website en ons werk te laten draaien. Met elk van hen is een verwerkersovereenkomst afgesloten of gelden hun standaard verwerkersvoorwaarden.</p>
    <ul className="legal-list">
      <li><strong>Hosting</strong>: [Vercel Inc. — of je gekozen host]</li>
      <li><strong>AI</strong>: Anthropic PBC (snelle check en vraagbox)</li>
      <li><strong>Agenda</strong>: [Cal.com, als de agenda-koppeling actief is]</li>
      <li><strong>E-mail</strong>: [je mailprovider, bv. Google Workspace of Microsoft 365]</li>
      <li><strong>Boekhouding</strong>: [je boekhoudpakket en boekhouder] — alleen voor klanten</li>
      <li><strong>Freelance specialisten</strong>: alleen de gegevens die nodig zijn voor jouw project, onder geheimhouding</li>
    </ul>
    <p>Sommige van deze partijen zitten buiten de Europese Economische Ruimte (VS). Doorgifte gebeurt dan op basis van het EU-VS Data Privacy Framework of de standaardcontractbepalingen van de Europese Commissie.</p>
  </> },
  { id: 'bewaren', title: 'Hoe lang we gegevens bewaren', body: <>
    <ul className="legal-list">
      <li><strong>Contactaanvragen zonder vervolg</strong>: [12 maanden] na het laatste contact</li>
      <li><strong>Klantgegevens en facturen</strong>: 10 jaar, zoals de Belgische boekhoudwetgeving voorschrijft</li>
      <li><strong>Vragen in de vraagbox en antwoorden uit de snelle check</strong>: niet bewaard door AIVENSI; alleen verwerkt om het antwoord te tonen</li>
      <li><strong>Serverlogs</strong>: [maximaal 30 dagen]</li>
      <li><strong>Je keuze op de homepage en de snelle check in je browser</strong>: tot je het tabblad sluit (sessionStorage)</li>
    </ul>
  </> },
  { id: 'cookies', title: 'Cookies en lokale opslag', body: <>
    <p>Deze website plaatst geen analytische, advertentie- of trackingcookies. Daarom vragen we ook geen cookietoestemming.</p>
    <p>We gebruiken alleen de tijdelijke opslag van je browser (sessionStorage) voor twee dingen die je zelf kiest: welke vraag je op de homepage aanklikte, en de antwoorden van de snelle check die je naar het contactformulier meeneemt. Dat blijft op je eigen toestel en verdwijnt als je het tabblad sluit.</p>
    <p>Lettertypes worden vanaf onze eigen server geladen, niet van Google. [Activeer je later een ingebedde agenda (Cal.com), dan kan die functionele cookies plaatsen — vermeld ze dan hier. Voeg je analytics toe, dan is vooraf toestemming nodig.]</p>
  </> },
  { id: 'rechten', title: 'Je rechten', body: <>
    <p>Je kan altijd vragen om je gegevens in te zien, te verbeteren of te laten wissen. Je kan ook vragen de verwerking te beperken, je gegevens over te dragen, of bezwaar maken tegen verwerkingen op basis van gerechtvaardigd belang.</p>
    <p>Mail naar <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. We antwoorden binnen een maand. Om misbruik te vermijden kunnen we vragen je identiteit te bevestigen.</p>
    <p>Ben je niet tevreden over hoe we met je gegevens omgaan, dan kan je klacht indienen bij de Gegevensbeschermingsautoriteit (Drukpersstraat 35, 1000 Brussel, <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener">gegevensbeschermingsautoriteit.be</a>).</p>
  </> },
  { id: 'beveiliging', title: 'Beveiliging', body: <>
    <p>De website draait volledig over een versleutelde verbinding (HTTPS). Toegang tot gegevens is beperkt tot wie ze nodig heeft, met sterke wachtwoorden en tweestapsverificatie. De sleutels voor AI-diensten staan alleen op de server, nooit in je browser.</p>
  </> },
  { id: 'klanten', title: 'Als je klant bent', body: <>
    <p>Verwerken we in een project persoonsgegevens voor jou — bijvoorbeeld klantgegevens in je webshop of in een automatisering — dan ben jij verwerkingsverantwoordelijke en zijn wij verwerker. Daarvoor sluiten we een aparte verwerkersovereenkomst. Zie ook de <Link href="/voorwaarden#gegevens">algemene voorwaarden</Link>.</p>
  </> },
  { id: 'wijzigingen', title: 'Wijzigingen', body: <>
    <p>Verandert er iets aan hoe we gegevens verwerken, dan passen we dit beleid aan en vermelden we bovenaan de datum.</p>
  </> },
];

export default function Privacy() {
  return (
    <>
      <Nav />
      <main id="main">
        <LegalPage eyebrow="Privacy" title="Privacybeleid" intro="Welke gegevens we verwerken via deze website, waarom, hoe lang, en wat je rechten zijn. Zo kort mogelijk, zo volledig als nodig." sections={S} />
      </main>
      <Footer cta={null} />
    </>
  );
}
