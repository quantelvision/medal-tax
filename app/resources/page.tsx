import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/data/services";
import { Breadcrumb } from "@/components/content/Breadcrumb";
import { PrimaryCTA } from "@/components/conversion/Buttons";
import { HeroMedia } from "@/components/media/HeroMedia";
import { media } from "@/lib/media";
import { Grain, HeroPattern, GradientMesh } from "@/components/patterns";
import { serviceIcons } from "@/components/icons/services";
import { Icon } from "@/components/icons";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { RevealItem } from "@/components/motion/RevealItem";

export const metadata: Metadata = {
  title: "Resources & Insights",
  description: "Practical guidance on income tax, GST, TDS and business compliance from Medal Tax.",
  alternates: { canonical: "/resources" },
};

// No blog/resource articles were found on the live medaltax.com site during
// the audit, so none are fabricated here. This page is built as a working
// shell — service explainers and FAQs already live on each /services/[slug]
// page and can be promoted into standalone articles here once Medal Tax has
// real published content to add.
export default function ResourcesPage() {
  return (
    <div>
      <Breadcrumb items={[{ name: "Home", url: "/" }, { name: "Resources", url: "/resources" }]} />

      <section className="relative overflow-hidden border-b border-line bg-navy text-paper">
        <HeroMedia media={media.resourcesHero} />
        {/* texture: paper grain — fits a page about reading/articles */}
        <HeroPattern id="resources-hero-pattern" variant="texture" fill="var(--color-brass-light)" opacity={0.09} scale={3} />
        <Grain tone="dark" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-(--space-section-sm) md:px-8 md:py-(--space-section-lg)">
          <h1 className="font-display text-4xl leading-tight md:text-5xl">Resources &amp; Insights</h1>
          <p className="mt-5 max-w-xl text-step-11 leading-relaxed text-paper/75">
            Practical explanations of income tax, GST, TDS and business
            compliance topics — starting with the guidance built into each
            service page below.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Grain tone="light" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-(--space-section-sm) md:px-8">
          <h2 className="font-display text-2xl text-navy">Start with a service explainer</h2>
          <p className="mt-3 max-w-xl text-step-7 text-slate">
            Each service page includes a plain-language explanation, common
            situations, required documents and FAQs.
          </p>
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const ServiceIcon = serviceIcons[s.slug];
              return (
                <RevealItem key={s.slug} className="h-full">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col rounded-md border border-line bg-paper p-6 transition-[transform,box-shadow,border-color] duration-(--dur-base) ease-standard hover:-translate-y-0.5 hover:border-brass/50 hover:shadow-md"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-navy text-brass-light">
                      <ServiceIcon size="sm" />
                    </span>
                    <p className="mt-4 text-step-4 text-slate">{s.eyebrow}</p>
                    <p className="mt-1.5 font-display text-lg text-navy transition-colors duration-(--dur-base) ease-standard group-hover:text-brass-2">{s.name}</p>
                    <p className="mt-2 text-step-6 leading-relaxed text-slate">{s.shortDescription}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-step-5 font-medium text-brass-2 transition-colors duration-(--dur-base) ease-standard group-hover:text-brass">
                      Read the explainer
                      <Icon icon={ArrowRight} size="xs" className="transition-transform duration-(--dur-base) ease-standard group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Paper-toned, not navy: this band sits directly above the (navy)
          Footer with no divider between them — see the same fix on the
          homepage closing band. */}
      <section className="relative overflow-hidden border-y border-line bg-paper-2">
        <GradientMesh variant="corner" color="var(--color-brass)" peakOpacity={0.12} />
        <Grain tone="light" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-(--space-section-sm) text-center md:px-8">
          <h2 className="font-display text-3xl text-navy md:text-4xl">Have a specific question?</h2>
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
