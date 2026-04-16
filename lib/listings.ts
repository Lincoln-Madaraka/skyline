export type Listing = {
  id: string;
  title: string;
  area: string;
  beds: number;
  baths: number;
  price: string;
  image: string;
  alt: string;
  status: string;
  propertyType: string;
  summary: string;
  quickFact: string;
  highlights: {
    label: string;
    tooltip: string;
  }[];
  plotSize?: string;
  yearBuilt?: number;
  parking?: number;
  amenities?: string[];
  about?: string[];
};

export function findListing(id: string): Listing | undefined {
  return listings.find((l) => l.id === id);
}

export const listings: Listing[] = [
  {
    id: "karen-villa-01",
    title: "Detached Villa, Walled Compound",
    area: "Karen",
    beds: 5,
    baths: 5,
    price: "KES 180M",
    image: "/images/listings/listing-karen-villa-cover-01.webp",
    alt: "Detached villa exterior in a green upscale neighborhood",
    status: "For Sale",
    propertyType: "Villa",
    summary:
      "A private five-bedroom address with pool frontage entertaining terraces and a fully walled compound designed for quiet family living.",
    quickFact: "Best for buyers who want privacy and weekend hosting in Karen.",
    highlights: [
      {
        label: "Pool lounge",
        tooltip: "Sunlit terrace and poolside seating make the outdoor zone feel built for long weekends and evening hosting.",
      },
      {
        label: "Private compound",
        tooltip: "A full perimeter wall, controlled entry, and landscaped setback help the home feel secure and self-contained.",
      },
      {
        label: "Family layout",
        tooltip: "Five ensuite bedrooms give you enough flexibility for children guests or a live-in support setup.",
      },
    ],
    plotSize: "0.5 acre",
    yearBuilt: 2019,
    parking: 4,
    amenities: ["Pool", "Landscaped garden", "Staff quarters", "Walled compound", "Backup power", "Borehole water"],
    about: [
      "This Karen address was built for the kind of family that wants privacy without isolation. The half-acre plot sits on a quiet inner Karen road within five minutes of The Hub and fifteen of Galleria.",
      "The main house carries five ensuite bedrooms a chef's kitchen and a double-height entertaining wing that opens onto the pool. Ceilings are generous finishes lean natural and the lighting was planned rather than installed.",
      "Compound security is a full perimeter wall with controlled entry. Landscaping is mature and intentional not the raw-plot feel of newer builds.",
    ],
  },
  {
    id: "kilimani-apt-01",
    title: "Contemporary City-View Apartment",
    area: "Kilimani",
    beds: 3,
    baths: 3,
    price: "KES 28M",
    image: "/images/listings/listing-kilimani-apartment-living-01.webp",
    alt: "Bright apartment living room with city-facing windows",
    status: "For Sale",
    propertyType: "Apartment",
    summary:
      "An airy city-facing apartment with open-plan living all-day light and polished finishes that suit both owner-occupiers and investors.",
    quickFact: "A strong fit for urban buyers who want light, flow, and location.",
    highlights: [
      {
        label: "City-facing lounge",
        tooltip: "Large glazing keeps the main living space bright and gives the apartment a more elevated, premium feel.",
      },
      {
        label: "Open-plan flow",
        tooltip: "The living, dining, and kitchen relationship works well for both everyday use and easy hosting.",
      },
      {
        label: "Investor-ready",
        tooltip: "Kilimani remains one of the easier neighborhoods to position for executive tenants and resale visibility.",
      },
    ],
    plotSize: "142 sqm",
    yearBuilt: 2022,
    parking: 2,
    amenities: ["Rooftop pool", "Gym", "Concierge", "High-speed fibre", "Backup power", "Lift to lobby"],
    about: [
      "A third-floor unit in one of Kilimani's cleaner newer developments. The building is tight on maintenance and the lobby is staffed which keeps the daily experience consistent.",
      "Inside the apartment runs open-plan: a single living-dining-kitchen volume with full-height glazing on the city side. Bedrooms are quiet and placed on the opposite wing of the floorplate.",
      "Rental comps in the building have been steady and the unit is priced to attract either an owner-occupier or a yield-focused investor.",
    ],
  },
  {
    id: "lavington-kitchen-01",
    title: "Family Home with Chef's Kitchen",
    area: "Lavington",
    beds: 4,
    baths: 4,
    price: "KES 62M",
    image: "/images/listings/listing-lavington-kitchen-01.webp",
    alt: "Premium kitchen and dining area with natural textures",
    status: "For Sale",
    propertyType: "Family Home",
    summary:
      "A four-bedroom family address anchored by a generous chef's kitchen warm finishes and a hosting-friendly flow from dining to living.",
    quickFact: "Made for households that entertain often and want a real kitchen anchor.",
    highlights: [
      {
        label: "Chef's kitchen",
        tooltip: "The kitchen is designed to feel like the heart of the house, with ample prep space and a more premium finish palette.",
      },
      {
        label: "Hosting-ready",
        tooltip: "The dining and living connection helps gatherings feel easy instead of boxed into separate rooms.",
      },
      {
        label: "Family scale",
        tooltip: "Four bedrooms and generous common areas make it easier to grow into the home rather than outgrow it.",
      },
    ],
    plotSize: "0.25 acre",
    yearBuilt: 2017,
    parking: 3,
    amenities: ["Chef's kitchen", "Pantry", "Private garden", "DSQ", "Solar hot water", "Gated estate"],
    about: [
      "A detached four-bedroom home inside one of Lavington's quieter gated pockets. The kitchen is the anchor of the house and was designed for real cooking rather than just a showroom photo.",
      "The flow from kitchen to dining to living is open enough for entertaining but can be closed off for everyday family rhythm. Bedrooms sit upstairs with the master on a private wing.",
      "The garden is useful rather than ornamental: enough room for kids a trampoline and a small kitchen garden.",
    ],
  },
  {
    id: "westlands-bedroom-01",
    title: "Serviced Residence, Premium Finishes",
    area: "Westlands",
    beds: 2,
    baths: 2,
    price: "KES 22M",
    image: "/images/listings/listing-westlands-bedroom-01.webp",
    alt: "Calm upscale bedroom with layered textiles and daylight",
    status: "For Sale",
    propertyType: "Serviced Residence",
    summary:
      "A premium two-bedroom residence with hotel-inspired finishes low-maintenance comfort and a calm bedroom retreat in the heart of Westlands.",
    quickFact: "Ideal for professionals who want turnkey comfort close to the city core.",
    highlights: [
      {
        label: "Serviced living",
        tooltip: "This kind of product appeals to buyers who value convenience, consistency, and a lighter daily management burden.",
      },
      {
        label: "Turnkey finish",
        tooltip: "The finishes aim for move-in readiness rather than a renovation-heavy purchase.",
      },
      {
        label: "Workweek ease",
        tooltip: "Westlands access keeps commutes dining meetings and social routines more streamlined.",
      },
    ],
    plotSize: "98 sqm",
    yearBuilt: 2023,
    parking: 1,
    amenities: ["Daily housekeeping optional", "Gym", "Business lounge", "Concierge", "Fibre internet", "Secure parking"],
    about: [
      "A serviced two-bedroom unit in a newer Westlands residence tower. The finish level matches upper-tier hotel apartments: stone countertops engineered timber floors and integrated appliances.",
      "The product works for dual-income couples or executive occupiers who want consistency rather than weekend project-home energy.",
      "Common amenities include a gym a ground-floor cafe and optional housekeeping billed monthly.",
    ],
  },
  {
    id: "kileleshwa-balcony-01",
    title: "Skyline Balcony Apartment",
    area: "Kileleshwa",
    beds: 3,
    baths: 2,
    price: "KES 34M",
    image: "/images/listings/listing-kileleshwa-balcony-view-01.webp",
    alt: "Apartment balcony with skyline and neighborhood depth",
    status: "For Sale",
    propertyType: "Apartment",
    summary:
      "A bright three-bedroom apartment with a relaxed balcony lounge leafy outlooks and enough breathing room for daily family life.",
    quickFact: "Strong pick for buyers who want a softer neighborhood feel without leaving the city.",
    highlights: [
      {
        label: "Skyline balcony",
        tooltip: "The balcony creates an extra living moment, especially for coffee mornings, evening wind-downs, or quiet calls.",
      },
      {
        label: "Leafy outlook",
        tooltip: "Kileleshwa appeals because it often feels greener and calmer than denser inner-city pockets.",
      },
      {
        label: "Flexible living",
        tooltip: "Three bedrooms give enough room for family use guests or a dedicated home office setup.",
      },
    ],
    plotSize: "165 sqm",
    yearBuilt: 2020,
    parking: 2,
    amenities: ["Large balcony", "Borehole water", "Backup power", "Childrens play area", "CCTV", "Ample visitor parking"],
    about: [
      "A bright three-bedroom unit in a low-density Kileleshwa building. The floor plate gets generous cross-ventilation and the balcony is deep enough to actually sit on rather than just look at.",
      "The building is calmer than Kilimani equivalents and appeals to buyers who want apartment convenience without the denser urban feel.",
      "Master bedroom has its own balcony the other two share a clean family corridor with built-in wardrobes.",
    ],
  },
  {
    id: "runda-townhouse-01",
    title: "Townhouse in Gated Compound",
    area: "Runda",
    beds: 4,
    baths: 4,
    price: "KES 75M",
    image: "/images/listings/listing-runda-townhouse-exterior-01.webp",
    alt: "Townhouse exterior with compound context and curb appeal",
    status: "For Sale",
    propertyType: "Townhouse",
    summary:
      "A refined four-bedroom townhouse in a secure compound balancing family space curb appeal and easy access to diplomatic and school corridors.",
    quickFact: "Well suited to buyers prioritizing compound security and polished everyday family living.",
    highlights: [
      {
        label: "Secure compound",
        tooltip: "Shared compound control and a more managed residential setting can be a major plus for family buyers.",
      },
      {
        label: "Strong curb appeal",
        tooltip: "The exterior presentation feels clean and premium, which matters both for pride of ownership and long-term resale.",
      },
      {
        label: "School access",
        tooltip: "Runda's appeal often includes easier access to diplomatic school and low-traffic residential corridors.",
      },
    ],
    plotSize: "0.18 acre",
    yearBuilt: 2021,
    parking: 3,
    amenities: ["Gated compound", "Shared pool", "Clubhouse", "Backup power", "Borehole water", "24/7 manned security"],
    about: [
      "A four-bedroom townhouse inside a managed Runda compound. Compound-level amenities include a shared pool and a small clubhouse which take the daily maintenance load off the owner.",
      "The townhouse itself reads premium without being ostentatious: stone and timber finishes large windows and a garden at the back that backs onto a greenbelt.",
      "Access to international schools the UN corridor and the Northern Bypass makes the daily routine easier than comparable standalone homes further out.",
    ],
  },
];
