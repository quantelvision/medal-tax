/**
 * Medal Tax — media sourcing manifest.
 *
 * One entry per image slot on the site. `query` is chosen to match the
 * section's actual message, not the page title. `group` only controls how
 * candidate contact-sheets are batched during curation.
 *
 * Deliberately absent:
 *  - Team sections (/ and /about): no stock faces. AUDIT.md bars fabricated
 *    content and lists real team photography as CONTENT REQUIRED. Stock
 *    portraits beside named staff would read as photos of them.
 *  - Legal pages + 404: served by an original brass/navy SVG motif, not stock.
 */
export const slots = [
  // ── Homepage ──────────────────────────────────────────────────────────
  { id: "home-hero",        page: "home",        group: "home",     query: "office desk paperwork",     orient: "horizontal", ratio: "21:9", intent: "Hero underlay beneath navy scrim — calm authority, no faces to camera" },
  { id: "home-intro",       page: "home",        group: "home",     query: "ledger accounting",         orient: "horizontal", ratio: "4:3",  intent: "'compliance you can rely on' — close, tactile, documentary" },

  // ── About ─────────────────────────────────────────────────────────────
  { id: "about-hero",       page: "about",       group: "about",    query: "modern office building",    orient: "horizontal", ratio: "21:9", intent: "Established-2016 solidity" },
  { id: "about-principles", page: "about",       group: "about",    query: "architecture glass facade", orient: "horizontal", ratio: "3:2",  intent: "Vision/Mission — abstract, non-literal, structural" },

  // ── Services directory + categories ───────────────────────────────────
  { id: "services-hero",    page: "services",    group: "services", query: "business documents folder", orient: "horizontal", ratio: "21:9", intent: "Directory overview" },
  { id: "cat-tax",          page: "services",    group: "services", query: "tax form calculator",       orient: "horizontal", ratio: "3:2",  intent: "Tax & Compliance category" },
  { id: "cat-accounting",   page: "services",    group: "services", query: "bookkeeping ledger",        orient: "horizontal", ratio: "3:2",  intent: "Accounting & Financial category" },
  { id: "cat-registration", page: "services",    group: "services", query: "contract signing document", orient: "horizontal", ratio: "3:2",  intent: "Business & Registration category" },
  { id: "cat-ecommerce",    page: "services",    group: "services", query: "ecommerce shipping boxes",  orient: "horizontal", ratio: "3:2",  intent: "E-Commerce & Support category" },

  // ── Service pages (13) ────────────────────────────────────────────────
  { id: "income-tax-filing",       page: "services", group: "svc-a", query: "income tax form",           orient: "horizontal", ratio: "16:9", intent: "ITR filing" },
  { id: "gst-services",            page: "services", group: "svc-a", query: "tax invoice billing",       orient: "horizontal", ratio: "16:9", intent: "GST — 'gst' alone returns poor results" },
  { id: "tds-services",            page: "services", group: "svc-a", query: "payroll salary calculation",orient: "horizontal", ratio: "16:9", intent: "TDS deduction at source" },
  { id: "digital-signature",       page: "services", group: "svc-a", query: "usb security token",        orient: "horizontal", ratio: "16:9", intent: "Class 3 DSC" },
  { id: "corporate-governance",    page: "services", group: "svc-b", query: "boardroom meeting",         orient: "horizontal", ratio: "16:9", intent: "Governance frameworks" },
  { id: "non-resident-services",   page: "services", group: "svc-b", query: "passport travel documents", orient: "horizontal", ratio: "16:9", intent: "NRI / cross-border" },
  { id: "accounting-services",     page: "services", group: "svc-b", query: "accounting bookkeeping",    orient: "horizontal", ratio: "16:9", intent: "Books & records" },
  { id: "audit-services",          page: "services", group: "svc-b", query: "audit magnifying documents",orient: "horizontal", ratio: "16:9", intent: "Statutory / internal audit" },
  { id: "corporate-services",      page: "services", group: "svc-c", query: "business registration office", orient: "horizontal", ratio: "16:9", intent: "Incorporation & secretarial" },
  { id: "corporate-finance",       page: "services", group: "svc-c", query: "financial charts analysis", orient: "horizontal", ratio: "16:9", intent: "Project reports, CMA data" },
  { id: "amazon-seller-onboarding",page: "services", group: "svc-c", query: "ecommerce packaging",       orient: "horizontal", ratio: "16:9", intent: "Marketplace seller setup" },
  { id: "import-export-code",      page: "services", group: "svc-c", query: "shipping container port",   orient: "horizontal", ratio: "16:9", intent: "IEC registration" },
  { id: "trademark-registration",  page: "services", group: "svc-c", query: "legal document stamp",      orient: "horizontal", ratio: "16:9", intent: "Brand protection" },

  // ── Who we help ───────────────────────────────────────────────────────
  { id: "aud-individuals",  page: "who-we-help", group: "misc",     query: "freelancer laptop home office", orient: "horizontal", ratio: "4:3", intent: "Individuals & professionals" },
  { id: "aud-businesses",   page: "who-we-help", group: "misc",     query: "small business owner",      orient: "horizontal", ratio: "4:3",  intent: "Businesses & companies" },
  { id: "aud-ecommerce",    page: "who-we-help", group: "misc",     query: "online seller packing",     orient: "horizontal", ratio: "4:3",  intent: "E-commerce & Amazon sellers" },
  { id: "aud-nri",          page: "who-we-help", group: "misc",     query: "airport departure travel",  orient: "horizontal", ratio: "4:3",  intent: "Non-residents & cross-border" },

  // ── Resources & Contact ───────────────────────────────────────────────
  { id: "resources-hero",   page: "resources",   group: "misc",     query: "library books reading",     orient: "horizontal", ratio: "21:9", intent: "Insights shell" },
  { id: "contact-offices",  page: "contact",     group: "misc",     query: "chennai india",             orient: "horizontal", ratio: "16:9", intent: "Locality anchor — Chennai & Tirupathur offices" },
];

/** Looping motion element — Pixabay video API. */
export const videoSlots = [
  { id: "home-process", page: "home", query: "paperwork", fallbackQuery: "office typing", intent: "'See how we work' band — muted, looping, scrimmed" },
];
