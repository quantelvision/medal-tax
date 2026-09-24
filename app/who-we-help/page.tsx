import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/content/Breadcrumb";
import { PrimaryCTA } from "@/components/conversion/Buttons";
import { audienceMedia } from "@/lib/media";
import { audiences } from "@/lib/data/audiences";
import { audienceIcons } from "@/components/icons/audiences";
import { Icon } from "@/components/icons";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { BrandMotif } from "@/components/media/BrandMotif";
import { serviceIcons } from "@/components/icons/services";
import { Grain, HeroPattern } from "@/components/patterns";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { RevealItem } from "@/components/motion/RevealItem";

export const metadata: Metadata = {
  title: "Who We Help",
  description: "Medal Tax works with individuals, businesses, e-commerce sellers and non-resident clients across their tax and compliance needs.",
  alternates: { canonical: "/who-we-help" },
};

export default function WhoWeHelpPage() {
  return (
    <div>
      <Breadcrumb items={[{ name: "Home", url: "/" }, { name: "Who We Help", url: "/who-we-help" }]} />

      <section className="relative overflow-hidden border-b border-line bg-navy text-paper">
        <BrandMotif tone="inverse" className="pointer-events-none absolute -right-20 -top-28 h-[420px] w-[420px] opacity-40" />
        {/* circlesAndSquares: varied shapes for varied audiences */}
        <HeroPattern id="whowehelp-hero-pattern" variant="circlesAndSquares" fill="var(--color-brass-light)" opacity={0.06} scale={1.1} />
        <Grain tone="dark" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-16 md:px-8 md:py-24">
          <h1 className="font-display text-4xl leading-tight md:text-5xl">Who We Help</h1>
          <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-paper/75">
            Different clients bring different compliance needs — here&rsquo;s how
            Medal Tax supports each of them.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Grain tone="light" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-20 md:px-8">
          <RevealGroup className="grid gap-8 md:grid-cols-2">
            {audiences.map((a) => {
              const AudienceIcon = audienceIcons[a.slug];
              const photo = audienceMedia[a.title];
              return (
                <RevealItem key={a.slug}>
                  <div
                    id={a.slug}
                    className="group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-md border border-line bg-paper transition-[transform,box-shadow,border-color] duration-(--dur-base) ease-standard hover:-translate-y-0.5 hover:border-brass/50 hover:shadow-md"
                  >
                    {photo && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          placeholder="blur"
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-(--dur-slow) ease-standard group-hover:scale-[1.03]"
                        />
                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/65 via-navy/0 to-transparent" />
                        <span aria-hidden="true" className="absolute bottom-4 left-5 flex h-11 w-11 items-center justify-center rounded-sm bg-navy text-brass-light shadow-md">
                          <Icon icon={AudienceIcon} size="sm" />
                        </span>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-7">
                      <h2 className="font-display text-2xl text-navy">{a.title}</h2>
                      <p className="mt-3 text-[15px] leading-relaxed text-slate">{a.body}</p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {a.services.map((s) => {
                          const ServiceIcon = serviceIcons[s.slug];
                          return (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}`}
                              className="flex items-center gap-1.5 rounded-sm border border-line px-3 py-1.5 text-[13px] font-medium text-navy transition-colors duration-(--dur-base) ease-standard hover:border-brass/60 hover:text-brass-2"
                            >
                              <ServiceIcon size="xs" className="shrink-0 text-brass-2" />
                              {s.name}
                            </Link>
                          );
                        })}
                      </div>

                      <div className="mt-auto pt-6">
                        <Link
                          href="/contact"
                          data-analytics-event="service_cta_click"
                          className="inline-flex items-center gap-1.5 font-medium text-brass-2 transition-colors duration-(--dur-base) ease-standard hover:text-brass"
                        >
                          Talk to us about this
                          <Icon icon={ArrowRight} size="xs" className="transition-transform duration-(--dur-base) ease-standard group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line bg-paper-2/50">
        <Grain tone="light" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-16 text-center md:px-8">
          <h2 className="font-display text-3xl text-navy">Don&rsquo;t see your situation here?</h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] text-slate">
            Get in touch and we&rsquo;ll tell you plainly whether — and how — we
            can help.
          </p>
          <div className="mt-7 flex justify-center">
            <PrimaryCTA href="/contact" eventName="get_started_click">Get Started</PrimaryCTA>
          </div>
        </div>
      </section>
    </div>
  );
}
