import type { NextConfig } from "next";

/**
 * URL MIGRATION MAP — old medaltax.com URL -> new URL, all as permanent
 * (301) redirects. See MIGRATION.md at the project root for the full
 * audit-to-redirect table in one place. Every legacy indexable URL found
 * during the audit is preserved here; none are dropped or sent to the
 * homepage.
 */
const redirects = [
  { source: "/income-tax-2", destination: "/services/income-tax-filing" },
  { source: "/gst-2", destination: "/services/gst-services" },
  { source: "/tds-2", destination: "/services/tds-services" },
  { source: "/digital-signature-2", destination: "/services/digital-signature" },
  { source: "/corporate-governance", destination: "/services/corporate-governance" },
  { source: "/non-residents", destination: "/services/non-resident-services" },
  { source: "/accounting-services", destination: "/services/accounting-services" },
  { source: "/audit-services", destination: "/services/audit-services" },
  { source: "/corporate-services", destination: "/services/corporate-services" },
  { source: "/corporate-finance", destination: "/services/corporate-finance" },
  { source: "/amazon-onboarding-support", destination: "/services/amazon-seller-onboarding" },
  { source: "/about-us-2", destination: "/about" },
  { source: "/contact-us-2", destination: "/contact" },
  { source: "/privacy-policy-2", destination: "/privacy-policy" },
];

const nextConfig: NextConfig = {
  images: {
    /**
     * Committed sources are WebP. Measured at effort 9, AVIF encodes 14-41%
     * smaller again on this set, so it is worth serving — but as a negotiated
     * variant rather than a second set of files in the repo. Next picks AVIF
     * for browsers whose Accept header allows it and falls back to WebP.
     */
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return redirects.map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
