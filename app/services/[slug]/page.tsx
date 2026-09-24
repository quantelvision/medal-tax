import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/data/services";
import { site } from "@/lib/data/site";
import { Breadcrumb } from "@/components/content/Breadcrumb";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { ServiceContact } from "@/components/content/ServiceContact";
import { NumberedList, PlainList, DocumentsGrid, RelatedServices } from "@/components/content/ServiceSections";
import { PrimaryCTA, CallButton, WhatsAppButton } from "@/components/conversion/Buttons";
import { ServiceSchema } from "@/components/seo/StructuredData";
import { Reveal } from "@/components/content/Reveal";
import { HeroMedia } from "@/components/media/HeroMedia";
import { BrandMotif } from "@/components/media/BrandMotif";
import { serviceMedia } from "@/lib/media";
import { serviceIcons } from "@/components/icons/services";
import { Grain, HeroPattern } from "@/components/patterns";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | Medal Tax`,
      description: service.shortDescription,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const waMessage = `Hi, I would like help with ${service.name}.`;
  // Trademark Registration has no photograph by design — see lib/media.ts.
  const hero = serviceMedia[service.slug];
  const ServiceIcon = serviceIcons[service.slug];

  return (
    <div>
      <ServiceSchema name={service.name} description={service.shortDescription} url={`/services/${service.slug}`} />
      <Breadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.name, url: `/services/${service.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-navy text-paper">
        {hero ? (
          <HeroMedia media={hero} />
        ) : (
          <BrandMotif
            tone="inverse"
            className="pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] opacity-40"
          />
        )}
        {/* Applies regardless of which branch above rendered — every one of
            the 13 service pages gets the same hero treatment. */}
        {/* stampCollection: registrations/certificates — fits a page about
            one specific compliance service */}
        <HeroPattern id="service-hero-pattern" variant="stampCollection" fill="var(--color-brass-light)" opacity={0.06} scale={0.85} />
        <Grain tone="dark" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-3xl">
            {/* Decorative: service.name renders as the H1 immediately below,
                so it is already the accessible label for this icon. */}
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-md border border-paper/30">
              <ServiceIcon size="lg" />
            </div>
            <p className="text-[14.5px] text-brass-light">{service.eyebrow}</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.1] md:text-5xl">{service.name}</h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-paper/75">{service.heroDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryCTA href="/contact" eventName="service_cta_click" className="!bg-brass-2 hover:!brightness-110">
                Get Started
              </PrimaryCTA>
              <CallButton phone={site.phones.primary} label="Call us" className="!border-paper/40 !text-paper hover:!bg-white/10" />
              <WhatsAppButton waNumber={site.whatsappGeneral} message={waMessage} label="WhatsApp" />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[var(--container-page)] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-16 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div className="space-y-16 prose-medal">
            <Reveal>
              <PlainList items={service.whoNeedsIt} title="Who this is for" />
            </Reveal>

            <Reveal>
              <PlainList items={service.commonSituations} title="Common situations" />
            </Reveal>

            <Reveal>
              <NumberedList items={service.whatWeHandle} title="What Medal Tax handles" />
            </Reveal>

            {service.process && (
              <Reveal>
                <NumberedList items={service.process} title="How the process works" />
              </Reveal>
            )}

            {service.documents && (
              <Reveal>
                <DocumentsGrid documents={service.documents} />
              </Reveal>
            )}

            {service.benefits && (
              <Reveal>
                <PlainList items={service.benefits} title="Why this matters" />
              </Reveal>
            )}

            {service.considerations && (
              <Reveal>
                <div className="border-l-2 border-brass/50 pl-6">
                  <h2 className="font-display text-2xl text-navy">Important considerations</h2>
                  <ul className="mt-4 space-y-3">
                    {service.considerations.map((c) => (
                      <li key={c} className="text-[14.5px] leading-relaxed text-slate">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            <Reveal>
              <FAQAccordion faqs={service.faqs} />
            </Reveal>

            {/* No <Reveal> wrapper here: RelatedServices renders its own
                RevealGroup internally, staggering each card individually
                rather than fading the whole block in as one unit. */}
            <RelatedServices service={service} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {service.contactTeamName && (
              <ServiceContact
                serviceName={service.name}
                serviceSlug={service.slug}
                contactName={service.contactTeamName}
              />
            )}
            <div className="rounded-md border border-line p-7">
              <p className="font-display text-xl text-navy">Ready to get started?</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-slate">
                Tell us about your situation and our team will follow up by
                call or WhatsApp with next steps.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <PrimaryCTA href="/contact" eventName="service_cta_click">
                  Get Started
                </PrimaryCTA>
                <CallButton phone={site.phones.primary} label="Call Medal Tax" />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Large CTA */}
      <section className="relative overflow-hidden border-t border-line bg-paper-2">
        <Grain tone="light" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-16 text-center md:px-8">
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            Talk to Medal Tax about {service.name.toLowerCase()}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15.5px] text-slate">
            Call, message us on WhatsApp, or send an enquiry — our team will
            follow up with clear next steps.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <PrimaryCTA href="/contact" eventName="service_cta_click">Get Started</PrimaryCTA>
            <CallButton phone={site.phones.primary} label="Call us" />
            <WhatsAppButton waNumber={site.whatsappGeneral} message={waMessage} />
          </div>
        </div>
      </section>
    </div>
  );
}
