import type { Metadata } from "next";
import { site } from "@/lib/data/site";
import { Breadcrumb } from "@/components/content/Breadcrumb";
import { CallButton, WhatsAppButton } from "@/components/conversion/Buttons";
import { ContactForm } from "@/components/content/ContactForm";
import { BrandMotif } from "@/components/media/BrandMotif";
import { Phone, EnvelopeSimple, MapPin } from "@phosphor-icons/react/ssr";
import { Icon } from "@/components/icons";
import { Grain, HeroPattern } from "@/components/patterns";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Call, WhatsApp or send an enquiry to Medal Tax — offices in Chennai and Tirupathur, Tamil Nadu.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div>
      <Breadcrumb items={[{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]} />

      <section className="relative overflow-hidden border-b border-line bg-navy text-paper">
        <BrandMotif tone="inverse" className="pointer-events-none absolute -right-20 -top-28 h-[420px] w-[420px] opacity-40" />
        {/* connections: literally named for this one */}
        <HeroPattern id="contact-hero-pattern" variant="connections" fill="var(--color-brass-light)" opacity={0.06} scale={1.2} />
        <Grain tone="dark" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-(--space-section-sm) md:px-8 md:py-(--space-section)">
          <h1 className="font-display text-4xl leading-tight md:text-5xl">Contact Medal Tax</h1>
          <p className="mt-5 max-w-xl text-step-11 leading-relaxed text-paper/75">
            Reach us directly, or send a short enquiry below and we&rsquo;ll follow
            up with next steps.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton phone={site.phones.primary} label={`Call ${site.phones.primary}`} className="!border-paper/40 !text-paper hover:!bg-white/10" />
            <WhatsAppButton waNumber={site.whatsappGeneral} message="Hi, I would like to get in touch with Medal Tax." />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Grain tone="light" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-(--space-section-sm) md:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="font-display text-2xl text-navy">Send an enquiry</h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <h2 className="font-display text-2xl text-navy">Get in touch</h2>
                <div className="mt-5 space-y-2.5 text-step-8 text-ink">
                  <p className="flex items-center gap-2.5">
                    <Icon icon={Phone} size="xs" className="text-brass-2" />
                    {site.phones.primary}
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Icon icon={Phone} size="xs" className="text-brass-2" />
                    {site.phones.secondary}
                  </p>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 text-brass-2">
                    <Icon icon={EnvelopeSimple} size="xs" />
                    {site.email}
                  </a>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {site.offices.map((o) => (
                  <div key={o.label}>
                    <p className="flex items-center gap-2 font-display text-lg text-navy">
                      <Icon icon={MapPin} size="xs" className="text-brass-2" />
                      {o.label}
                    </p>
                    <address className="mt-2 text-step-7 leading-relaxed text-slate not-italic">
                      {o.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                    <a href={o.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-step-5 font-medium text-brass-2">
                      View on map
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
