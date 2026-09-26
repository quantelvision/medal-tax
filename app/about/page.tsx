import type { Metadata } from "next";
import { aboutCopy, team, site } from "@/lib/data/site";
import { Breadcrumb } from "@/components/content/Breadcrumb";
import { CallButton, WhatsAppButton, PrimaryCTA } from "@/components/conversion/Buttons";
import { Reveal } from "@/components/content/Reveal";
import { HeroMedia } from "@/components/media/HeroMedia";
import { media } from "@/lib/media";
import Image from "next/image";
import { Grain, HeroPattern, GradientMesh } from "@/components/patterns";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Medal Tax is a tax consultancy firm established in 2016, providing audit, tax consulting, accounting and corporate compliance services.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div>
      <Breadcrumb items={[{ name: "Home", url: "/" }, { name: "Who We Are", url: "/about" }]} />

      <section className="relative overflow-hidden border-b border-line bg-navy text-paper">
        <HeroMedia media={media.aboutHero} />
        {/* overlappingCircles: connection, a team — fits Who We Are */}
        <HeroPattern id="about-hero-pattern" variant="overlappingCircles" fill="var(--color-brass-light)" opacity={0.06} scale={0.9} />
        <Grain tone="dark" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-(--space-section-sm) md:px-8 md:py-(--space-section-lg)">
          <div className="max-w-2xl">
            <p className="text-step-7 text-brass-light">Since {site.establishedYear}</p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">Who We Are</h1>
            <p className="mt-6 text-step-12 leading-relaxed text-paper/75">{aboutCopy.intro}</p>
          </div>
        </div>
      </section>

      {/* Rebuilt as one cohesive two-column layout — the image used to be a
          disconnected full-width banner sandwiched between two separate
          stacked text blocks (Our team/approach, then Vision/Mission below
          it), which made it read as oversized relative to the copy around
          it. It's now paired directly with all four short text blocks. */}
      <section className="relative overflow-hidden border-b border-line">
        <Grain tone="light" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-(--space-section) md:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal className="lg:sticky lg:top-24">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-line">
                <Image
                  src={media.aboutPrinciples.src}
                  alt={media.aboutPrinciples.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div className="space-y-10">
              <Reveal>
                <h2 className="font-display text-2xl text-navy">Our team</h2>
                <p className="mt-4 text-step-9 leading-relaxed text-slate">{aboutCopy.team}</p>
              </Reveal>
              <Reveal>
                <h2 className="font-display text-2xl text-navy">Our approach</h2>
                <p className="mt-4 text-step-9 leading-relaxed text-slate">{aboutCopy.positioning}</p>
              </Reveal>
              <div className="grid gap-8 border-t border-line pt-10 sm:grid-cols-2">
                <Reveal>
                  <p className="font-display text-xl text-navy">Vision</p>
                  <p className="mt-3 text-step-8 leading-relaxed text-slate">{aboutCopy.vision}</p>
                </Reveal>
                <Reveal>
                  <p className="font-display text-xl text-navy">Mission</p>
                  <p className="mt-3 text-step-8 leading-relaxed text-slate">{aboutCopy.mission}</p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team — typography-led, since no verified photography exists */}
      <section id="team" className="relative overflow-hidden border-b border-line bg-paper-2/50">
        <Grain tone="light" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-(--space-section) md:px-8">
          <h2 className="font-display text-3xl text-navy md:text-4xl">The people you&rsquo;ll speak with</h2>
          <p className="mt-3 max-w-xl text-step-8 leading-relaxed text-slate">
            An individual can create an impact, but a team can achieve the
            extraordinary. Reach any team member directly by call or
            WhatsApp.
          </p>

          <div className="mt-12 divide-y divide-line border-y border-line">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-2xl text-navy">{member.name}</p>
                  <p className="mt-1 text-step-7 text-slate">{member.role}</p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <CallButton phone={member.phone} label="Call" />
                  <WhatsAppButton
                    waNumber={member.whatsapp}
                    message={`Hi ${member.name}, I would like help with ${member.role}.`}
                    label="WhatsApp"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paper-toned, not navy: this band sits directly above the (navy)
          Footer with no divider between them — see the same fix on the
          homepage closing band. */}
      <section className="relative overflow-hidden border-b border-line bg-paper-2">
        <GradientMesh variant="corner" color="var(--color-brass)" peakOpacity={0.12} />
        <Grain tone="light" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-(--space-section) text-center md:px-8">
          <h2 className="font-display text-3xl text-navy md:text-4xl">Have a question for our team?</h2>
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
