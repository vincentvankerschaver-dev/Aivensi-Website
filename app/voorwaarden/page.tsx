import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { LegalPage } from '@/components/LegalPage';
import { COMPANY, type LegalSection } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Algemene voorwaarden',
  description: 'De algemene voorwaarden van AIVENSI voor webdesign, development, e-commerce, SEO, content, strategie en AI- en automatiseringsprojecten.',
  alternates: { canonical: '/voorwaarden' },
};

const S: LegalSection[] = [
  { id: 'toepassing', title: 'Toepassing', body: <>
    <p>Deze voorwaarden gelden voor alle offertes, overeenkomsten en prestaties van {COMPANY.legal}, met maatschappelijke zetel te {COMPANY.address}, ondernemingsnummer {COMPANY.kbo} (hierna &ldquo;AIVENSI&rdquo;).</p>
    <p>Ze zijn bedoeld voor ondernemingen (B2B). Door een offerte te aanvaarden, aanvaard je deze voorwaarden. Afwijkingen gelden alleen als ze schriftelijk zijn overeengekomen. Voorwaarden van de klant gelden niet, tenzij AIVENSI ze uitdrukkelijk aanvaardt.</p>
  </> },
  { id: 'offerte', title: 'Offerte en overeenkomst', body: <>
    <p>Een offerte is [30 dagen] geldig en beschrijft de scope, aanpak, planning en prijs. De overeenkomst start zodra de klant de offerte schriftelijk (ook per e-mail) aanvaardt.</p>
    <p>Wat niet in de offerte staat, valt buiten de scope. Extra werk of wijzigingen maken we eerst bespreekbaar en voeren we uit na akkoord, op basis van een aanvullende offerte of het afgesproken uurtarief.</p>
  </> },
  { id: 'uitvoering', title: 'Uitvoering', body: <>
    <p>AIVENSI voert het werk uit naar best vermogen en volgens de regels van het vak. Het gaat om een middelenverbintenis: we beloven een zorgvuldige aanpak, geen bepaald resultaat zoals posities in zoekmachines, omzet of bezoekersaantallen.</p>
    <p>Vincent is het vaste aanspreekpunt. Voor onderdelen kan AIVENSI freelance specialisten inschakelen; AIVENSI blijft daarbij het aanspreekpunt en verantwoordelijk tegenover de klant.</p>
    <p>Planningen zijn een realistische inschatting. Een vertraging geeft geen recht op schadevergoeding of ontbinding, tenzij een termijn uitdrukkelijk als bindend is afgesproken.</p>
  </> },
  { id: 'klant', title: 'Wat we van de klant verwachten', body: <>
    <p>De klant bezorgt tijdig de inhoud, toegangen, feedback en goedkeuringen die nodig zijn, en staat in voor de juistheid ervan. De klant garandeert dat aangeleverde teksten, beelden en merken geen rechten van derden schenden.</p>
    <p>Vertraging door ontbrekende input kan de planning verschuiven en eventueel extra kosten meebrengen.</p>
  </> },
  { id: 'oplevering', title: 'Oplevering en aanvaarding', body: <>
    <p>Na oplevering heeft de klant [10 werkdagen] om zichtbare gebreken schriftelijk te melden. Zonder melding, of zodra de oplevering in gebruik wordt genomen (bijvoorbeeld live gezet), geldt ze als aanvaard.</p>
    <p>Gemelde gebreken die binnen de afgesproken scope vallen, herstellen we kosteloos. Verborgen gebreken meldt de klant binnen [3 maanden] na ontdekking.</p>
  </> },
  { id: 'prijs', title: 'Prijs en betaling', body: <>
    <p>Prijzen staan in de offerte en zijn exclusief btw. Tenzij anders afgesproken factureren we [een voorschot bij start en het saldo bij oplevering]. Onderhoud en abonnementen worden periodiek vooraf gefactureerd.</p>
    <p>Facturen zijn betaalbaar binnen [30 dagen] na factuurdatum. Bij laattijdige betaling gelden de regels van de wet van 2 augustus 2002 betreffende de bestrijding van de betalingsachterstand bij handelstransacties: nalatigheidsinteresten en een forfaitaire vergoeding voor invorderingskosten, van rechtswege en zonder ingebrekestelling. AIVENSI mag het werk opschorten zolang een vervallen factuur niet betaald is.</p>
    <p>Kosten van derden (hosting, domeinen, licenties, API-gebruik) zijn voor rekening van de klant en staan bij voorkeur op naam van de klant.</p>
  </> },
  { id: 'eigendom', title: 'Eigendom en intellectuele rechten', body: <>
    <p>Na volledige betaling wordt de klant eigenaar van wat specifiek voor hem is gemaakt: ontwerp, code, teksten en beelden binnen het project. Domein, hosting en accounts staan op naam van de klant.</p>
    <p>AIVENSI behoudt de rechten op eigen, herbruikbare bouwstenen, methodes en know-how, en op eigen producten zoals EMSRO. De klant krijgt daarop een blijvend, niet-exclusief gebruiksrecht voor zover ze in zijn project zijn verwerkt.</p>
    <p>Open-sourcesoftware, thema&apos;s, plug-ins en diensten van derden blijven onder hun eigen licentie.</p>
    <p>AIVENSI mag het project, na oplevering, vermelden als referentie op de eigen website en in presentaties, tenzij de klant dat schriftelijk weigert.</p>
  </> },
  { id: 'ai', title: 'AI en automatisering', body: <>
    <p>Waar AI deel uitmaakt van een oplossing, bouwen we begrensd: duidelijke taken, logging en menselijke controle op beslissingen die ertoe doen. AI-uitvoer kan fouten bevatten. De klant blijft verantwoordelijk voor beslissingen die op basis van AI-uitvoer genomen worden en voor het nakijken ervan waar dat nodig is.</p>
    <p>Wijzigingen bij aanbieders van AI-modellen of andere externe diensten (prijzen, beschikbaarheid, voorwaarden) vallen buiten de controle van AIVENSI. Aanpassingen die daardoor nodig worden, bespreken we apart.</p>
  </> },
  { id: 'gegevens', title: 'Persoonsgegevens', body: <>
    <p>Verwerkt AIVENSI in opdracht van de klant persoonsgegevens, dan is de klant verwerkingsverantwoordelijke en AIVENSI verwerker in de zin van de AVG. Partijen sluiten daarvoor een verwerkersovereenkomst die voorrang heeft op deze voorwaarden. Voor gegevens die AIVENSI zelf verwerkt, zie het <Link href="/privacy">privacybeleid</Link>.</p>
  </> },
  { id: 'aansprakelijkheid', title: 'Aansprakelijkheid', body: <>
    <p>De aansprakelijkheid van AIVENSI is beperkt tot directe schade en tot het bedrag dat voor de betrokken opdracht werd gefactureerd [in de laatste 12 maanden]. AIVENSI is niet aansprakelijk voor indirecte schade, zoals gederfde winst, verlies van gegevens of omzet, of schade door diensten van derden (hosting, betaalproviders, AI-modellen, plug-ins).</p>
    <p>De klant zorgt zelf voor back-ups, tenzij onderhoud met back-ups uitdrukkelijk is afgesproken. Deze beperkingen gelden niet bij opzet of zware fout.</p>
  </> },
  { id: 'overmacht', title: 'Overmacht', body: <>
    <p>Bij overmacht — onder meer ziekte, storingen bij derden, cyberaanvallen of overheidsmaatregelen — worden de verplichtingen opgeschort zolang de overmacht duurt. Duurt ze langer dan [60 dagen], dan kan elke partij de overeenkomst beëindigen zonder schadevergoeding; reeds geleverd werk wordt gefactureerd.</p>
  </> },
  { id: 'beeindiging', title: 'Beëindiging', body: <>
    <p>Beëindigt de klant een lopend project, dan betaalt hij het werk dat al geleverd of gepland is, plus eventuele kosten die AIVENSI al gemaakt heeft. Onderhouds- en abonnementsovereenkomsten zijn opzegbaar met een opzegtermijn van [1 maand], tenzij anders afgesproken.</p>
    <p>Elke partij kan de overeenkomst onmiddellijk beëindigen als de andere partij een ernstige tekortkoming niet herstelt binnen [15 dagen] na een schriftelijke ingebrekestelling, of bij faillissement.</p>
  </> },
  { id: 'geheim', title: 'Geheimhouding', body: <>
    <p>Beide partijen houden vertrouwelijke informatie die ze van elkaar ontvangen geheim, ook na het einde van de samenwerking. Freelance specialisten die AIVENSI inschakelt, zijn aan dezelfde geheimhouding gebonden.</p>
  </> },
  { id: 'recht', title: 'Toepasselijk recht en geschillen', body: <>
    <p>Op deze voorwaarden en alle overeenkomsten is het Belgisch recht van toepassing. We proberen een meningsverschil altijd eerst in een gesprek op te lossen. Lukt dat niet, dan zijn uitsluitend de rechtbanken bevoegd van het gerechtelijk arrondissement Oost-Vlaanderen, [afdeling Dendermonde].</p>
    <p>Is een bepaling ongeldig, dan blijven de andere bepalingen gelden.</p>
  </> },
];

export default function Voorwaarden() {
  return (
    <>
      <Nav />
      <main id="main">
        <LegalPage eyebrow="Voorwaarden" title="Algemene voorwaarden" intro="Hoe we samenwerken, zwart op wit. Duidelijk voor beide kanten, zonder kleine lettertjes die verrassen." sections={S} />
      </main>
      <Footer cta={null} />
    </>
  );
}
