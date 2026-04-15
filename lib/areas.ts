export type Area = {
  slug: string;
  name: string;
  tagline: string;
  priceBand: string;
  demand: string;
  bestFor: string[];
  intro: string;
  vibe: string;
  image: string;
};

export const areas: Area[] = [
  {
    slug: "karen",
    name: "Karen",
    tagline: "Large compounds and mature greenery in Nairobi's most established address.",
    priceBand: "KES 65M – 500M",
    demand: "High",
    bestFor: ["Families", "Diplomats", "Long-term owners"],
    intro:
      "Karen sits at the top of the Nairobi residential pyramid. Expect standalone homes on half-acre or larger plots hedge-lined roads and a quieter rhythm that pulls buyers out of the denser inner city.",
    vibe: "Country-club calm with proximity to shopping anchors like The Hub and Galleria.",
    image: "/images/listings/listing-karen-villa-cover-01.webp",
  },
  {
    slug: "runda",
    name: "Runda",
    tagline: "Gated-estate living favored by diplomats and executives on the city's north side.",
    priceBand: "KES 80M – 350M",
    demand: "High",
    bestFor: ["Families with school needs", "Expatriate households"],
    intro:
      "Runda is synonymous with managed compounds private security and generous lot sizes. The estate model appeals to buyers who want a quieter residential setting and a cleaner daily routine.",
    vibe: "Low-traffic tree-lined streets close to UN offices and international schools.",
    image: "/images/listings/listing-runda-townhouse-exterior-01.webp",
  },
  {
    slug: "lavington",
    name: "Lavington",
    tagline: "Family-scale homes with solid schools and an easy inner-city commute.",
    priceBand: "KES 35M – 150M",
    demand: "Steady",
    bestFor: ["Growing families", "Upgraders from apartment living"],
    intro:
      "Lavington balances the privacy of standalone houses and townhouses with real convenience. It has matured into one of Nairobi's most dependable mid-to-upper residential corridors.",
    vibe: "Mature trees quiet back roads and a strong coffee-and-school weekday rhythm.",
    image: "/images/listings/listing-lavington-kitchen-01.webp",
  },
  {
    slug: "kilimani",
    name: "Kilimani",
    tagline: "Nairobi's densest apartment market with the strongest rental visibility.",
    priceBand: "KES 14M – 80M",
    demand: "Very high",
    bestFor: ["Investors", "Young professionals", "Short-stay operators"],
    intro:
      "Kilimani is where most new apartment supply has landed over the last decade. It is the default answer for buyers prioritizing location walkability and resale exit options.",
    vibe: "High-rise skyline cafes restaurants and a 24-hour feel uncommon elsewhere in Nairobi.",
    image: "/images/listings/listing-kilimani-apartment-living-01.webp",
  },
  {
    slug: "westlands",
    name: "Westlands",
    tagline: "The city's commercial core paired with premium serviced residences.",
    priceBand: "KES 18M – 120M",
    demand: "Very high",
    bestFor: ["Executives", "Dual-income couples", "Serviced-residence buyers"],
    intro:
      "Westlands pulls buyers who want to live inside the business district. Serviced residences and high-finish apartments dominate the new supply and rental demand stays consistently deep.",
    vibe: "Fast urban tempo with offices malls and a long list of dining options.",
    image: "/images/listings/listing-westlands-bedroom-01.webp",
  },
  {
    slug: "kileleshwa",
    name: "Kileleshwa",
    tagline: "Leafy apartments between Kilimani's density and Lavington's calm.",
    priceBand: "KES 16M – 70M",
    demand: "High",
    bestFor: ["Families in apartments", "Buyers wanting quieter units"],
    intro:
      "Kileleshwa is the middle ground between the buzzier Kilimani and the quieter Lavington. Buyers who want apartment living without too much noise often land here.",
    vibe: "Greener streetscape with slower traffic and a more residential tone.",
    image: "/images/listings/listing-kileleshwa-balcony-view-01.webp",
  },
];
