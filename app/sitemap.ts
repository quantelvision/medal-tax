import type { MetadataRoute } from "next";
import { services } from "@/lib/data/services";

const BASE = "https://www.medaltax.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // terms-of-use and disclaimer are deliberately excluded — both carry
  // `robots: { index: false }` (their content is still generic boilerplate
  // pending Medal Tax/counsel review), and a noindex page listed in the
  // sitemap is a real, if minor, contradiction search engines flag.
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/who-we-help",
    "/resources",
    "/contact",
    "/privacy-policy",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: s.featured ? 0.9 : 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
