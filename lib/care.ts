export type Plan = { name: string; price: number; from?: string; resp: string; line: string; plusLabel: string; rows: string[]; featured?: boolean; custom?: boolean };
export type Track = { label: string; title: string; intro: string; base: string[]; plans: Plan[]; cmp: [string, ...(string | number)[]][] };

export const TRACKS: Record<'web' | 'shop', Track> = {
  web: {
    label: 'Websites', title: 'Kies hoeveel zorg je site nodig heeft.',
    intro: 'Voor bedrijfswebsites. Elk pakket bevat de technische basis; daarboven kies je hoeveel we meekijken en bijsturen.',
    base: ['Hosting', 'SSL', 'Automatische back-ups', 'WordPress-/core-updates', 'Plugin- en theme-updates', 'Security monitoring', 'Uptime monitoring'],
    plans: [
      { name: 'Essential', price: 59, resp: 'binnen 2 werkdagen', line: 'Veilig en up-to-date. De technische basis, zonder omkijken.', plusLabel: 'Bovenop de basis', rows: ['Basis technische controle'] },
      { name: 'Business', price: 119, resp: 'binnen 1 werkdag', line: 'Voor sites die klanten opleveren. We kijken elke maand mee en rapporteren.', plusLabel: 'Alles van Essential, plus', rows: ['Uitgebreide technische controle', 'Maandrapport: wat we deden en zagen', 'Kleine contentwijzigingen (30 min/mnd)', 'Performance monitoring', 'Maandelijkse controle'], featured: true },
      { name: 'Advanced', price: 199, resp: 'dezelfde werkdag', line: 'We sturen zelf bij waar het beter kan, en je gaat voor.', plusLabel: 'Alles van Business, plus', rows: ['Proactieve technische controle', 'Kleine contentwijzigingen (60 min/mnd)', 'Prioritaire support', 'Performance-optimalisatie', 'Technische verbeteringen'] },
    ],
    cmp: [['Reactietijd', '2 werkdagen', '1 werkdag', 'Zelfde werkdag'], ['Technische controle', 'Basis', 'Uitgebreid', 'Proactief'], ['Maandrapport', 0, 1, 1], ['Kleine contentwijzigingen', '—', '30 min/mnd', '60 min/mnd'], ['Performance monitoring', 0, 1, 1], ['Maandelijkse controle', 0, 1, 1], ['Prioritaire support', 0, 0, 1], ['Performance-optimalisatie', 0, 0, 1], ['Technische verbeteringen', 0, 0, 1]],
  },
  shop: {
    label: 'Webshops', title: 'Je webshop mag niet stilstaan.',
    intro: 'Webshops hebben meer nodig dan gewone updates. We bewaken ook checkout, betalingen, performance en integraties.',
    base: ['WooCommerce-updates', 'Plugin- en theme-updates', 'Back-ups', 'Security monitoring', 'Uptime monitoring', 'Checkout monitoring', 'Betaalprovider-controle', 'Performance monitoring', 'Maandelijkse technische controle', 'Maandrapport', 'Updates eerst getest op staging', 'Kleine wijzigingen'],
    plans: [
      { name: 'E-commerce Care', price: 249, resp: 'binnen 1 werkdag', line: 'De volledige basis voor een webshop die moet blijven verkopen.', plusLabel: 'Inbegrepen', rows: ['Alles uit de basis hierboven', 'Kleine wijzigingen (60 min/mnd)'] },
      { name: 'E-commerce Care Pro', price: 399, resp: 'dezelfde werkdag', line: 'Voor shops waar elk uur stilstand omzet kost.', plusLabel: 'Alles van Care, plus', rows: ['Kleine wijzigingen (120 min/mnd)', 'Prioritaire support', 'Proactieve optimalisatie'], featured: true },
      { name: 'Custom', price: 599, from: 'vanaf', resp: 'volgens SLA', line: 'Meerdere integraties, veel volume of maatwerk. We bekijken het samen.', plusLabel: 'Alles van Pro, plus', rows: ['Integraties en API\'s', 'Maatwerk monitoring', 'SLA en kritieke support'], custom: true },
    ],
    cmp: [['Reactietijd', '1 werkdag', 'Zelfde werkdag', 'Volgens SLA'], ['Kleine wijzigingen', '60 min/mnd', '120 min/mnd', 'Op maat'], ['Prioritaire support', 0, 1, 1], ['Proactieve optimalisatie', 0, 1, 1], ['Integraties en API\'s', 0, 0, 1], ['Maatwerk monitoring', 0, 0, 1], ['SLA en kritieke support', 0, 0, 1]],
  },
};

export const CARE_LIFE: [string, string, string, boolean][] = [
  ['Kerndienst', 'Bouwen', 'Ontwerp en development, vanuit structuur.', false],
  ['Kerndienst', 'Lanceren', 'Live, getest op echte toestellen, met redirects.', false],
  ['Care', 'Onderhouden', 'Updates, back-ups en hosting die gewoon werken.', true],
  ['Care', 'Monitoren', 'Beveiliging, uptime en techniek in het oog.', true],
  ['Care', 'Verbeteren', 'Kleine wijzigingen en snelheid, maand na maand.', true],
];

export const CARE_FAQ: [string, string][] = [
  ['Wat is het verschil met een kerndienst?', 'Een kerndienst is een project: we bouwen iets en leveren het op. Website Care is doorlopend: we zorgen dat wat gebouwd is veilig, snel en up-to-date blijft.'],
  ['Wat valt onder kleine contentwijzigingen?', 'Een tekst of beeld aanpassen, een pagina bijwerken binnen een bestaand sjabloon. Business: 30 minuten per maand, Advanced en E-commerce Care: 60 minuten, E-commerce Care Pro: 120 minuten. Niet gebruikte tijd schuift niet door. Meer werk rekenen we aan €90 per uur, of met een apart voorstel vanaf 4 uur.'],
  ['Moet mijn site door AIVENSI gebouwd zijn?', 'Nee. Voor sites die we niet zelf bouwden, starten we met een instapcheck: we lichten de techniek door en zeggen eerlijk of Care meteen kan of wat er eerst moet gebeuren. De check kost €149 voor een website en €249 voor een webshop. Start je daarna met Care, dan verrekenen we het volledige bedrag.'],
  ['Wat staat er in het maandrapport?', 'Welke updates we deden, wat we tegenhielden, hoe de uptime en snelheid waren, en wat we aanraden. Kort, zonder jargon. Vanaf Business en in alle webshoppakketten.'],
  ['Wat als ik jaarlijks betaal?', 'Dan betaal je tien maanden in plaats van twaalf: twee maanden gratis.'],
  ['Is er een minimale looptijd?', 'Nee. Care is maandelijks opzegbaar met een maand opzegtermijn. Betaal je jaarlijks, dan krijg je twee maanden gratis. Prijzen worden jaarlijks geïndexeerd.'],
  ['Kan ik van pakket wisselen?', 'Ja. Groeit je site of verandert wat je nodig hebt, dan schakel je over naar een ander pakket.'],
];
