import type { MetadataRoute } from "next";
import { services } from "@/lib/data/services";

const BASE = "https://www.medaltax.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/who-we-help",
    "/resources",
    "/contact",
    "/privacy-policy",
    "/terms-of-use",
    "/disclaimer",
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
