// All values below are sourced from the live audit of https://www.medaltax.com
// (September 2026). Where the existing site did not provide a fact, the field
// is explicitly marked CONTENT_REQUIRED rather than invented. Do not fill these
// in with placeholder marketing claims — replace only with verified information
// from Medal Tax.

export const site = {
  name: "Medal Tax",
  legalDescriptor: "Tax consultancy & business advisory firm", // from homepage/about copy
  establishedYear: 2016, // stated on About page: "Established in 2016"
  url: "https://www.medaltax.com",
  email: "info@medaltax.com",
  phones: {
    primary: "+91 98433 55992",
    secondary: "+91 89252 93929", // used as WhatsApp "Support" number sitewide
  },
  whatsappGeneral: "+918925293929",
  offices: [
    {
      label: "Head Office",
      lines: ["#55, Rameshnagar 4th St", "Pallavan Nagar, Maduravoyal", "Chennai - 600095."],
      mapsUrl:
        "https://www.google.com/maps/place/13%C2%B003'39.7%22N+80%C2%B010'08.1%22E/@13.0610387,80.1663284,17z",
    },
    {
      label: "Branch Office",
      lines: ["#91/2, Cutchery Street", "Next to Indian Bank", "Tirupathur - 635601."],
      mapsUrl:
        "https://www.google.com/maps/place/12%C2%B029'31.3%22N+78%C2%B034'03.5%22E/@12.4920235,78.5650521,17z",
    },
  ],
  socials: {
    // Icons existed in the header/footer with no verified destination URLs (all
    // linked to "#" in the source HTML). CONTENT_REQUIRED: confirm real handles.
    facebook: null,
    twitter: null,
    youtube: null,
    instagram: null,
  },
  // The existing "Customer Satisfaction / Years of Experience / Happy Clients"
  // counters on the homepage rendered as "0%", "0+", "0+" — i.e. the numbers
  // were never actually populated on the live site. Per the content rule,
  // we do not invent figures to fill these in.
  statsAvailable: false,
} as const;

export const aboutCopy = {
  intro:
    "Established in 2016, Medal Tax is a tax consultancy firm providing audit, tax consulting, management advisory, accounting, and corporate compliance and secretarial services.",
  team: "Our firm is backed by a team of GST practitioners, corporate financial advisors, and tax consultants, delivering financial guidance and solutions tailored to businesses and individuals.",
  positioning:
    "Medal Tax stays current with tax laws, notifications, and industry developments through continuous engagement with professionals and business leaders, so clients receive up-to-date, strategic, compliance-driven tax and financial services.",
  vision:
    "To be a leading tax consultancy and financial advisory firm, empowering businesses and individuals with expert tax solutions, compliance-driven strategies, and financial excellence.",
  mission:
    "To provide accurate, efficient, and compliance-driven tax and financial solutions — simplifying taxation, ensuring regulatory adherence, and supporting businesses and individuals with clear financial guidance.",
} as const;

// Team members as published on the live "About Us" page. Titles below are the
// role labels used on the existing site — not invented. Karthik and Imran are
// added per the service-specific contacts supplied for this project; their
// job titles/bios are not published anywhere on the existing site, so no
// title beyond their named specialism is asserted.
export const team = [
  {
    name: "Vinoth Kumar",
    role: "Tax Consultant & Advisory",
    phone: "+91 89252 93929",
    whatsapp: "918925293929",
  },
  {
    name: "Karthik",
    role: "Income Tax Filing",
    phone: "+91 96294 73631",
    whatsapp: "919629473631",
  },
  {
    name: "Imran",
    role: "Amazon Seller Onboarding",
    phone: "+91 97315 62158",
    whatsapp: "919731562158",
  },
  {
    name: "Vicky",
    role: "APOB Registration",
    phone: "+91 86100 14497",
    whatsapp: "918610014497",
  },
  {
    name: "Shalini",
    role: "GST Filing",
    phone: "+91 86440 88880",
    whatsapp: "918644088880",
  },
  {
    name: "Nivedha",
    role: "GST Registration",
    phone: "+91 93448 92750",
    whatsapp: "919344892750",
  },
] as const;

export function telHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function whatsappHref(waNumber: string, message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${waNumber}?text=${encoded}`;
}
