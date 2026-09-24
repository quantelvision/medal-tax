/**
 * Curated selections. `pick` keys refer to candidate shortlists from
 * fetch-candidates.mjs (".N") and requery.mjs (".rN").
 *
 * `role` drives output geometry. `alt` is real descriptive alt text; a slot
 * used purely as a scrimmed texture behind headline copy is decorative and
 * carries alt="" instead (marked `decorative: true`).
 */
export const ROLES = {
  hero:   { w: 1280, h: 549, q: 74 }, // 21:9 scrimmed band
  banner: { w: 1280, h: 720, q: 76 }, // 16:9 service page header
  card:   { w: 960,  h: 640, q: 78 }, // 3:2 category card
  tile:   { w: 800,  h: 600, q: 78 }, // 4:3 audience tile
  intro:  { w: 960,  h: 720, q: 80 }, // 4:3 editorial inset
};

export const picks = [
  // ── Homepage ───────────────────────────────────────────────────────────
  { slot: "home-hero", page: "home", pick: "home-hero.r1", role: "hero", decorative: true,
    alt: "" },
  { slot: "home-intro", page: "home", pick: "home-intro.3", role: "intro",
    alt: "A handwritten accounting ledger, its ruled columns filled with figures in ink." },

  // ── About ──────────────────────────────────────────────────────────────
  { slot: "about-hero", page: "about", pick: "about-hero.r1", role: "hero", decorative: true,
    alt: "" },
  { slot: "about-principles", page: "about", pick: "about-principles.r0", role: "card",
    alt: "A spiral staircase photographed from above, its steps winding in an even, ordered curve." },

  // ── Services directory + category cards ────────────────────────────────
  { slot: "services-hero", page: "services", pick: "services-hero.3", role: "hero", decorative: true,
    alt: "" },
  { slot: "cat-tax", page: "services", pick: "cat-tax.0", role: "card",
    alt: "A desk calculator resting on printed spreadsheets of tax figures." },
  { slot: "cat-accounting", page: "services", pick: "cat-accounting.2", role: "card",
    alt: "A hand annotating a printed financial chart with a pen, a calculator alongside." },
  { slot: "cat-registration", page: "services", pick: "cat-registration.2", role: "card",
    alt: "A person signing a document at a desk." },
  { slot: "cat-ecommerce", page: "services", pick: "cat-ecommerce.r3", role: "card",
    alt: "A laptop showing an online storefront, a payment card resting beside it." },

  // ── Service pages ──────────────────────────────────────────────────────
  { slot: "income-tax-filing", page: "services", pick: "income-tax-filing.r0", role: "banner",
    alt: "A sheet headed \u201cTax Return\u201d rolled into a typewriter." },
  { slot: "gst-services", page: "services", pick: "gst-services.r3", role: "banner",
    alt: "Ring binders of filed records stacked on a shelf, coloured dividers visible between the pages." },
  { slot: "tds-services", page: "services", pick: "tds-services.1", role: "banner",
    alt: "Close-up of a calculator keypad on a sheet of ruled working paper." },
  { slot: "digital-signature", page: "services", pick: "digital-signature.3", role: "banner",
    alt: "A USB cryptographic token beside a laptop, used to hold a digital signature certificate." },
  { slot: "corporate-governance", page: "services", pick: "corporate-governance.3", role: "banner",
    alt: "An empty boardroom with a long dark table, leather chairs and daylight from a window." },
  { slot: "non-resident-services", page: "services", pick: "aud-nri.3", role: "banner",
    alt: "Travellers silhouetted against the glass wall of an airport terminal walkway." },
  { slot: "accounting-services", page: "services", pick: "accounting-services.r3", role: "banner",
    alt: "A printed bar-chart report lying beside a laptop keyboard." },
  { slot: "audit-services", page: "services", pick: "audit-services.r3", role: "banner",
    alt: "A magnifying glass held over a column of handwritten figures in a ledger." },
  { slot: "corporate-services", page: "services", pick: "corporate-services.1", role: "banner",
    alt: "Two people working through paperwork together at a desk, notebook and coffee to one side." },
  { slot: "corporate-finance", page: "services", pick: "corporate-finance.1", role: "banner",
    alt: "A laptop screen displaying line and pie charts of financial performance." },
  { slot: "amazon-seller-onboarding", page: "services", pick: "aud-ecommerce.3", role: "banner",
    alt: "Plain cardboard shipping cartons stacked against a pale background." },
  { slot: "import-export-code", page: "services", pick: "import-export-code.2", role: "banner",
    alt: "Container cranes at a shipping port silhouetted against a clouded sky." },
  // trademark-registration: no photograph — see media-credits.md.

  // ── Who we help ────────────────────────────────────────────────────────
  { slot: "aud-individuals", page: "who-we-help", pick: "aud-individuals.3", role: "tile",
    alt: "A person working at a laptop by a window in natural light." },
  { slot: "aud-businesses", page: "who-we-help", pick: "aud-businesses.r1", role: "tile",
    alt: "The interior of a small retail shop, goods arranged on lit display shelves." },
  { slot: "aud-ecommerce", page: "who-we-help", pick: "amazon-seller-onboarding.r1", role: "tile",
    alt: "Two parcels wrapped in plain paper and tied with string, ready to be dispatched." },
  { slot: "aud-nri", page: "who-we-help", pick: "aud-nri.2", role: "tile",
    alt: "Travellers with luggage silhouetted against an airport window at sunrise." },

  // ── Resources & Contact ────────────────────────────────────────────────
  { slot: "resources-hero", page: "resources", pick: "resources-hero.1", role: "hero", decorative: true,
    alt: "" },
  { slot: "contact-offices", page: "contact", pick: "contact-offices.r2", role: "banner",
    alt: "The Shore Temple at Mahabalipuram in Tamil Nadu, silhouetted against a sunrise sky." },
];
