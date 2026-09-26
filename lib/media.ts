/**
 * Central registry for site photography.
 *
 * Every entry is a static import, which is what gives `next/image` the
 * intrinsic width/height and a generated `blurDataURL` — together those are
 * what keep cumulative layout shift at zero. Importing by path string would
 * lose both.
 *
 * Alt text lives beside the image so a slot can never be used without it.
 * Slots that are purely decorative (a scrimmed texture sitting behind headline
 * copy) carry alt: "" deliberately — announcing them would add noise.
 *
 * Provenance for every file: docs/media-credits.md
 */
import type { StaticImageData } from "next/image";

import homeHero from "@/public/images/home/home-hero.webp";
import homeIntro from "@/public/images/home/home-intro.webp";
import howWeWorkPoster from "@/public/images/home/how-we-work-poster.webp";
import aboutHero from "@/public/images/about/about-hero.webp";
import aboutPrinciples from "@/public/images/about/about-principles.webp";
import servicesHero from "@/public/images/services/services-hero.webp";
import catTax from "@/public/images/services/cat-tax.webp";
import catAccounting from "@/public/images/services/cat-accounting.webp";
import catRegistration from "@/public/images/services/cat-registration.webp";
import catEcommerce from "@/public/images/services/cat-ecommerce.webp";
import incomeTaxFiling from "@/public/images/services/income-tax-filing.webp";
import gstServices from "@/public/images/services/gst-services.webp";
import tdsServices from "@/public/images/services/tds-services.webp";
import digitalSignature from "@/public/images/services/digital-signature.webp";
import corporateGovernance from "@/public/images/services/corporate-governance.webp";
import nonResidentServices from "@/public/images/services/non-resident-services.webp";
import accountingServices from "@/public/images/services/accounting-services.webp";
import auditServices from "@/public/images/services/audit-services.webp";
import corporateServices from "@/public/images/services/corporate-services.webp";
import corporateFinance from "@/public/images/services/corporate-finance.webp";
import amazonSellerOnboarding from "@/public/images/services/amazon-seller-onboarding.webp";
import importExportCode from "@/public/images/services/import-export-code.webp";
import audIndividuals from "@/public/images/who-we-help/aud-individuals.webp";
import audBusinesses from "@/public/images/who-we-help/aud-businesses.webp";
import audEcommerce from "@/public/images/who-we-help/aud-ecommerce.webp";
import audNri from "@/public/images/who-we-help/aud-nri.webp";
import resourcesHero from "@/public/images/resources/resources-hero.webp";
import contactOffices from "@/public/images/contact/contact-offices.webp";

export interface Media {
  src: StaticImageData;
  /** Empty string marks the image as decorative — see note above. */
  alt: string;
}

const m = (src: StaticImageData, alt: string): Media => ({ src, alt });

export const media = {
  homeHero: m(homeHero, ""),
  homeIntro: m(homeIntro, "A handwritten accounting ledger, its ruled columns filled with figures in ink."),
  aboutHero: m(aboutHero, ""),
  aboutPrinciples: m(aboutPrinciples, "A spiral staircase photographed from above, its steps winding in an even, ordered curve."),
  servicesHero: m(servicesHero, ""),
  resourcesHero: m(resourcesHero, ""),
  contactOffices: m(contactOffices, "The Shore Temple at Mahabalipuram in Tamil Nadu, silhouetted against a sunrise sky."),
} as const;

/**
 * Homepage hero background video playlist — plays in order, looping back to
 * the start (1 -> 2 -> ... -> 1). `media.homeHero` (the existing static
 * image) stays the fallback: it's what renders under prefers-reduced-motion,
 * before the video has started, and if playback ever fails, so it still
 * needs re-encoding/updating on its own if the imagery changes.
 *
 * Re-encoded from the originals (one was a 40MB 4K source) down to 1280x720,
 * no audio track, h264 mp4 + vp9 webm — see docs/media-credits.md. To add
 * another video, re-encode it the same way into
 * public/videos/hero/<N>.(mp4|webm) and add one entry below; nothing else
 * needs to change. Currently 4 entries — keep this array in sync with
 * whatever files actually exist in that folder if it's ever reorganized.
 */
export const heroVideos = [
  { mp4: "/videos/hero/1.mp4", webm: "/videos/hero/1.webm" },
  { mp4: "/videos/hero/2.mp4", webm: "/videos/hero/2.webm" },
  { mp4: "/videos/hero/3.mp4", webm: "/videos/hero/3.webm" },
  { mp4: "/videos/hero/4.mp4", webm: "/videos/hero/4.webm" },
] as const;

/** Poster frame for the homepage loop. */
export const howWeWork = {
  poster: howWeWorkPoster,
  mp4: "/videos/how-we-work.mp4",
  webm: "/videos/how-we-work.webm",
  /** Describes the motion for anyone who cannot see it. */
  description:
    "A hand draws a document file from a row of lever-arch binders on an office shelf.",
} as const;

/** Keyed by the category ids in lib/data/services.ts. */
export const categoryMedia: Record<string, Media> = {
  "tax-compliance": m(catTax, "A desk calculator resting on printed spreadsheets of tax figures."),
  "accounting-financial": m(catAccounting, "A hand annotating a printed financial chart with a pen, a calculator alongside."),
  "business-registration": m(catRegistration, "A person signing a document at a desk."),
  "ecommerce-support": m(catEcommerce, "A laptop showing an online storefront, a payment card resting beside it."),
};

/**
 * Keyed by service slug. `trademark-registration` is intentionally absent:
 * every brand/logo image search returned a real registered trademark
 * (Jaguar, Porsche, Apple), and reproducing another proprietor's mark on a
 * page selling trademark registration is inappropriate. That page falls back
 * to the brand motif. See docs/media-credits.md.
 */
export const serviceMedia: Record<string, Media> = {
  "income-tax-filing": m(incomeTaxFiling, "A sheet headed \u201cTax Return\u201d rolled into a typewriter."),
  "gst-services": m(gstServices, "Ring binders of filed records stacked on a shelf, coloured dividers visible between the pages."),
  "tds-services": m(tdsServices, "Close-up of a calculator keypad on a sheet of ruled working paper."),
  "digital-signature": m(digitalSignature, "A USB cryptographic token beside a laptop, used to hold a digital signature certificate."),
  "corporate-governance": m(corporateGovernance, "An empty boardroom with a long dark table, leather chairs and daylight from a window."),
  "non-resident-services": m(nonResidentServices, "Travellers silhouetted against the glass wall of an airport terminal walkway."),
  "accounting-services": m(accountingServices, "A printed bar-chart report lying beside a laptop keyboard."),
  "audit-services": m(auditServices, "A magnifying glass held over a column of handwritten figures in a ledger."),
  "corporate-services": m(corporateServices, "Two people working through paperwork together at a desk, notebook and coffee to one side."),
  "corporate-finance": m(corporateFinance, "A laptop screen displaying line and pie charts of financial performance."),
  "amazon-seller-onboarding": m(amazonSellerOnboarding, "Plain cardboard shipping cartons stacked against a pale background."),
  "import-export-code": m(importExportCode, "Container cranes at a shipping port silhouetted against a clouded sky."),
};

/** Keyed by the audience titles used on /who-we-help and the homepage. */
export const audienceMedia: Record<string, Media> = {
  "Individuals & professionals": m(audIndividuals, "A person working at a laptop by a window in natural light."),
  "Businesses & companies": m(audBusinesses, "The interior of a small retail shop, goods arranged on lit display shelves."),
  "E-commerce & Amazon sellers": m(audEcommerce, "Two parcels wrapped in plain paper and tied with string, ready to be dispatched."),
  "Non-residents & cross-border clients": m(audNri, "Travellers with luggage silhouetted against an airport window at sunrise."),
};
