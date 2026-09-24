/**
 * Single source of truth for "who we help" content — used by both the
 * homepage teaser section and the dedicated /who-we-help page, so the two
 * can't drift the way they did before Phase 9 (each kept its own separate,
 * slightly different copy of the same four audiences).
 */
export const audiences = [
  {
    slug: "individuals",
    title: "Individuals & professionals",
    teaser: "Salaried employees, freelancers and professionals filing returns and planning ahead.",
    body: "Salaried employees, freelancers and professionals who need accurate income tax filing, planning, and support if a notice or assessment comes up.",
    services: [{ name: "Income Tax Filing", slug: "income-tax-filing" }],
  },
  {
    slug: "businesses",
    title: "Businesses & companies",
    teaser: "GST, TDS, accounting, audit and corporate compliance for growing businesses.",
    body: "GST, TDS, accounting, audit, and corporate compliance for businesses at every stage — from a new company's first filings to ongoing statutory audit.",
    services: [
      { name: "GST Services", slug: "gst-services" },
      { name: "Accounting Services", slug: "accounting-services" },
      { name: "Audit Services", slug: "audit-services" },
      { name: "Corporate Services", slug: "corporate-services" },
    ],
  },
  {
    slug: "ecommerce",
    title: "E-commerce & Amazon sellers",
    teaser: "Seller onboarding, GST setup and listing support for online sellers.",
    body: "Sellers setting up or scaling a marketplace presence, who need account onboarding handled alongside GST and tax compliance.",
    services: [
      { name: "Amazon Seller Onboarding", slug: "amazon-seller-onboarding" },
      { name: "Import Export Code (IEC) Registration", slug: "import-export-code" },
    ],
  },
  {
    slug: "non-residents",
    title: "Non-residents & cross-border clients",
    teaser: "PAN, tax filing, FEMA/RBI matters and repatriation support for NRIs.",
    body: "NRIs and foreign nationals with Indian income, investments or property, needing PAN, tax filing, and FEMA/RBI guidance.",
    services: [{ name: "Services for Non-Residents", slug: "non-resident-services" }],
  },
] as const;

export type Audience = (typeof audiences)[number];
