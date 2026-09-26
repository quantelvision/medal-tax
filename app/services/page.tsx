import type { Metadata } from "next";
import Link from "next/link";
import { categories, servicesByCategory, featuredServices, type Category } from "@/lib/data/services";
import { Breadcrumb } from "@/components/content/Breadcrumb";
import { PrimaryCTA } from "@/components/conversion/Buttons";
import { HeroMedia } from "@/components/media/HeroMedia";
import { media, categoryMedia } from "@/lib/media";
import Image from "next/image";
import { serviceIcons } from "@/components/icons/services";
import { Grain, HeroPattern, GradientMesh } from "@/components/patterns";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { RevealItem } from "@/components/motion/RevealItem";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Income tax, GST, TDS, accounting, audit, corporate and e-commerce compliance services from Medal Tax.",
  alternates: { canonical: "/services" },
};

const categoryOrder: Category[] = [
  "tax-compliance",
  "accounting-financial",
  "business-registration",
  "ecommerce-support",
];

export default function ServicesPage() {
  return (
    <div>
      <Breadcrumb items={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }]} />

      <section className="relative overflow-hidden border-b border-line bg-navy text-paper">
        <HeroMedia media={media.servicesHero} />
        {/* boxes: an itemized catalogue — fits the services directory */}
        <HeroPattern id="services-hero-pattern" variant="boxes" fill="var(--color-brass-light)" opacity={0.06} scale={1.5} />
        <Grain tone="dark" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-(--space-section-sm) md:px-8 md:py-(--space-section-lg)">
          <div className="max-w-2xl">
            <p className="text-step-7 text-brass-light">Services</p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              Tax, compliance and business services, organised the way you need them.
            </h1>
            <p className="mt-5 text-step-10 leading-relaxed text-paper/75">
              From routine filing to registrations and business-support work,
              every service below is handled by the Medal Tax team directly —
              call, message on WhatsApp, or send an enquiry to get started.
            </p>
          </div>
        </div>
      </section>

      {/* Featured row */}
      <section className="relative overflow-hidden border-b border-line">
        <Grain tone="light" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-(--space-section-xs) md:px-8">
          <h2 className="font-display text-2xl text-navy">Most requested</h2>
          <RevealGroup className="mt-7 grid gap-5 md:grid-cols-2">
            {featuredServices.map((s, i) => {
              const ServiceIcon = serviceIcons[s.slug];
              return (
                <RevealItem key={s.slug} className={i === 0 ? "md:col-span-2" : ""}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group block h-full rounded-md border border-line p-8 transition-colors duration-(--dur-base) ease-standard hover:border-brass/60"
                  >
                    <ServiceIcon size="lg" className="text-brass-2" />
                    <p className="mt-4 text-step-4 text-slate">{s.eyebrow}</p>
                    <p className="mt-2 font-display text-2xl text-navy transition-colors duration-(--dur-base) ease-standard group-hover:text-brass-2 md:text-3xl">
                      {s.name}
                    </p>
                    <p className="mt-3 max-w-lg text-step-8 leading-relaxed text-slate">{s.shortDescription}</p>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* By category */}
      <section className="relative overflow-hidden">
        <Grain tone="light" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-(--space-section-sm) md:px-8">
          <div className="space-y-16">
            {categoryOrder.map((catKey) => {
              const cat = categories[catKey];
              const items = servicesByCategory(catKey);
              return (
                <div key={catKey} className="grid gap-8 md:grid-cols-[280px_1fr]">
                  <div>
                    {categoryMedia[catKey] && (
                      <Image
                        src={categoryMedia[catKey].src}
                        alt={categoryMedia[catKey].alt}
                        placeholder="blur"
                        sizes="(min-width: 768px) 280px, 100vw"
                        className="mb-5 h-auto w-full rounded-lg border border-line"
                      />
                    )}
                    <h2 className="font-display text-2xl text-navy">{cat.name}</h2>
                    <p className="mt-2 max-w-xs text-step-7 leading-relaxed text-slate">{cat.description}</p>
                  </div>
                  <RevealGroup className="divide-y divide-line border-y border-line" stagger={0.05}>
                    {items.map((s) => {
                      const ServiceIcon = serviceIcons[s.slug];
                      return (
                        <RevealItem key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="group flex flex-col justify-between gap-2 py-5 transition-colors duration-(--dur-base) ease-standard sm:flex-row sm:items-center"
                          >
                            <div className="flex items-start gap-3.5">
                              <ServiceIcon size="md" className="mt-0.5 shrink-0 text-brass-2" />
                              <div>
                                <p className="font-display text-lg text-ink transition-colors duration-(--dur-base) ease-standard group-hover:text-brass-2">{s.name}</p>
                                <p className="mt-1 max-w-md text-step-6 text-slate">{s.shortDescription}</p>
                              </div>
                            </div>
                            <span className="text-step-6 font-medium text-brass-2 sm:whitespace-nowrap">
                              View service
                            </span>
                          </Link>
                        </RevealItem>
                      );
                    })}
                  </RevealGroup>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line bg-navy text-paper">
        <GradientMesh variant="corner" color="var(--color-brass)" peakOpacity={0.09} />
        <Grain tone="dark" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-(--space-section-sm) text-center md:px-8">
          <h2 className="font-display text-3xl md:text-4xl">Not sure which service you need?</h2>
          <p className="mx-auto mt-4 max-w-xl text-step-9 text-paper/70">
            Describe your situation and our team will point you to the right
            service — or handle more than one together.
          </p>
          <div className="mt-7 flex justify-center">
            <PrimaryCTA href="/contact" eventName="get_started_click" className="!bg-brass-2 hover:!brightness-110">
              Get Started
            </PrimaryCTA>
          </div>
        </div>
      </section>
    </div>
  );
}
