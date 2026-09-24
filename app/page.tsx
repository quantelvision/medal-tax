import Link from "next/link";
import { services, featuredServices } from "@/lib/data/services";
import { site, team, telHref, whatsappHref } from "@/lib/data/site";
import { PrimaryCTA, CallButton, WhatsAppButton } from "@/components/conversion/Buttons";
import { HomepageVideo } from "@/components/media/HomepageVideo";
import { Reveal } from "@/components/content/Reveal";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { HeroMedia } from "@/components/media/HeroMedia";
import { media } from "@/lib/media";
import Image from "next/image";
import { serviceIcons } from "@/components/icons/services";
import { Grain, HeroPattern, DotGrid, GradientMesh, SectionSeam } from "@/components/patterns";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { RevealItem } from "@/components/motion/RevealItem";
import { Icon } from "@/components/icons";
import { Phone, WhatsappLogo, Buildings, IdentificationBadge, CalendarBlank, ArrowRight } from "@phosphor-icons/react/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { audiences } from "@/lib/data/audiences";
import { audienceIcons } from "@/components/icons/audiences";

const videoHighlights = [
  {
    icon: IdentificationBadge,
    label: "A named specialist per service",
    body: "Reach the person handling your service directly, not a general queue.",
  },
  {
    icon: Buildings,
    label: "Two offices in Tamil Nadu",
    body: "Head office in Maduravoyal, Chennai, plus a branch in Tirupathur.",
  },
  {
    icon: CalendarBlank,
    label: `Advising clients since ${site.establishedYear}`,
    body: `${services.length} services under one firm.`,
  },
];

const homeFaqs = [
  {
    q: "What does Medal Tax do?",
    a: "Medal Tax is a tax consultancy firm providing income tax, GST, TDS, accounting, audit, corporate compliance, secretarial services, digital signatures, and business/e-commerce support for individuals and companies.",
  },
  {
    q: "Where is Medal Tax located?",
    a: `Medal Tax's head office is in Maduravoyal, Chennai, with a branch office in Tirupathur, Tamil Nadu. Clients across India are supported by phone, WhatsApp and email.`,
  },
  {
    q: "How do I get started?",
    a: "Call or WhatsApp our team directly, or fill in the short enquiry form on our Contact page describing what you need — we'll follow up with next steps.",
  },
  {
    q: "Is my information kept confidential?",
    a: "Yes. Client information is used only to provide the requested services and is handled in line with our Privacy Policy.",
  },
];

export default function HomePage() {
  const FeaturedIcon = serviceIcons[featuredServices[0].slug];

  return (
    <div>
      {/* Hero */}
      {/* No border-b here: SectionSeam below already performs the divider
          role at this boundary — a hairline underneath it would double up. */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <HeroMedia media={media.homeHero} priority />
        {/* hexagons: structure, an organized system — fits a flagship hero */}
        <HeroPattern id="home-hero-pattern" variant="hexagons" fill="var(--color-brass-light)" opacity={0.06} scale={1.3} />
        <Grain tone="dark" />
        <SectionSeam fill="var(--color-paper)" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-20 md:px-8 md:py-32">
          <div className="max-w-3xl">
            <p className="text-[14.5px] text-brass-light">Tax consultancy &amp; business advisory · Since {site.establishedYear}</p>
            <h1 className="mt-5 font-display text-[2.6rem] leading-[1.08] md:text-6xl">
              Tax and business compliance, handled properly.
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-paper/75">
              Medal Tax manages income tax, GST, TDS, accounting, audit and
              business registration for individuals and companies —
              so filings are accurate, deadlines are met, and questions get
              answered by a person, not a portal.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              {/* Golden, specifically requested for this one hero button —
                  bg-brass-light with dark navy text (8.53:1, verified),
                  not white-on-gold (1.84:1, would fail badly). Every other
                  "Get Started" sitewide stays on bg-brass-2/white, the fix
                  from the previous round. */}
              <PrimaryCTA href="/contact" eventName="get_started_click" className="!bg-brass-light !text-navy hover:!bg-brass">
                Get Started
              </PrimaryCTA>
              {/* Lighter-weight than a second full button — the closing band
                  further down the page is the one place Call/WhatsApp/Get
                  Started appear together as equal-weight options; here
                  they're a fallback for anyone who'd rather not fill a form. */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-paper/65">
                <a
                  href={telHref(site.phones.primary)}
                  data-analytics-event="phone_click"
                  className="inline-flex items-center gap-1.5 transition-colors duration-(--dur-base) ease-standard hover:text-paper"
                >
                  <Icon icon={Phone} size="xs" /> {site.phones.primary}
                </a>
                <span aria-hidden="true" className="text-paper/30">·</span>
                <a
                  href={whatsappHref(site.whatsappGeneral, "Hi, I would like help with my tax and compliance needs.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="whatsapp_click"
                  className="inline-flex items-center gap-1.5 transition-colors duration-(--dur-base) ease-standard hover:text-paper"
                >
                  <Icon icon={WhatsappLogo} size="xs" weight="fill" /> WhatsApp us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction — image paired directly with the copy it sits beside,
          not a full-width banner underneath both text columns (that read as
          oversized relative to the modest amount of text above it). */}
      <section className="relative overflow-hidden border-b border-line">
        <Grain tone="light" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-20 md:px-8">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-line">
                <Image
                  src={media.homeIntro.src}
                  alt={media.homeIntro.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-3xl leading-snug text-navy md:text-4xl">
                A tax consultancy firm built around compliance you can rely on.
              </h2>
              <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-slate">
                <p>
                  Medal Tax provides audit, tax consulting, management
                  advisory, accounting, and corporate compliance and
                  secretarial services, backed by a team of GST
                  practitioners, corporate financial advisors and tax
                  consultants.
                </p>
                <p>
                  We stay current with tax laws, amendments and rulings so
                  clients receive up-to-date, strategic, compliance-driven
                  guidance — whether that&rsquo;s a straightforward annual filing
                  or a more complex registration or advisory matter.
                </p>
                <Link href="/about" className="inline-block font-medium text-brass-2 transition-colors duration-(--dur-base) ease-standard hover:text-brass">
                  More about Medal Tax
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services discovery — editorial mix, not identical cards */}
      <section className="relative overflow-hidden border-b border-line bg-paper-2/50">
        {/* Grain only here, deliberately: the brass-2 "View all services" link
            below sits directly on this bg-paper-2/50 surface at a measured
            4.63:1 baseline contrast — the thinnest real margin on the site.
            A stronger dot/grid pattern is reserved for navy sections, which
            carry 6-9:1 of headroom; see components/patterns/Grain.tsx for
            the verified numbers behind that split. */}
        <Grain tone="light" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-20 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl text-navy md:text-4xl">What we handle</h2>
            <Link href="/services" className="font-medium text-brass-2 transition-colors duration-(--dur-base) ease-standard hover:text-brass">
              View all services
            </Link>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {/* Large featured panel */}
            <Reveal className="lg:col-span-2">
              <Link
                href={`/services/${featuredServices[0].slug}`}
                className="group flex h-full flex-col justify-between rounded-md border border-line bg-navy p-10 text-paper transition-colors duration-(--dur-base) ease-standard hover:border-brass/60"
              >
                <div>
                  <FeaturedIcon size="lg" className="text-brass-light" />
                  <p className="mt-4 text-[13.5px] text-brass-light">{featuredServices[0].eyebrow}</p>
                  <p className="mt-3 font-display text-3xl leading-snug md:text-4xl">
                    {featuredServices[0].name}
                  </p>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-paper/70">
                    {featuredServices[0].shortDescription}
                  </p>
                </div>
                <span className="mt-8 inline-block text-[14.5px] font-medium text-brass-light transition-colors duration-(--dur-base) ease-standard group-hover:text-brass-light/80">
                  Explore this service
                </span>
              </Link>
            </Reveal>

            {/* Compact stacked list */}
            <RevealGroup className="flex h-full flex-col divide-y divide-line overflow-hidden rounded-md border border-line">
              {services.slice(1, 5).map((s) => {
                const ServiceIcon = serviceIcons[s.slug];
                return (
                  <RevealItem key={s.slug} className="flex flex-1">
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex flex-1 items-center gap-3.5 px-6 py-5 transition-colors duration-(--dur-base) ease-standard hover:bg-paper"
                    >
                      <ServiceIcon size="md" className="shrink-0 text-brass-2" />
                      <div>
                        <p className="font-display text-lg text-ink transition-colors duration-(--dur-base) ease-standard group-hover:text-brass-2">{s.navLabel}</p>
                        <p className="mt-1 text-[13.5px] text-slate">{s.eyebrow}</p>
                      </div>
                    </Link>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>

          {/* Three individual cards — each with its own border/shadow, not
              three columns sharing one outer card border (which read as a
              single card split into thirds rather than three distinct
              services). */}
          <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-3">
            {featuredServices.slice(1, 4).map((s) => {
              const ServiceIcon = serviceIcons[s.slug];
              return (
                <RevealItem key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col rounded-md border border-line bg-paper p-6 transition-[transform,box-shadow,border-color] duration-(--dur-base) ease-standard hover:-translate-y-0.5 hover:border-brass/50 hover:shadow-md"
                  >
                    <ServiceIcon size="md" className="text-brass-2" />
                    <p className="mt-3 font-display text-xl text-navy transition-colors duration-(--dur-base) ease-standard group-hover:text-brass-2">{s.name}</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate">{s.shortDescription}</p>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Homepage video — paired with what it's illustrating rather than
          floating alone in the section. No border-b: SectionSeam below
          already performs the divider role at this boundary. */}
      <section className="relative overflow-hidden bg-navy">
        <DotGrid id="home-video-dots" fill="var(--color-brass-light)" opacity={0.07} size={26} radius={1.1} />
        <Grain tone="dark" />
        <SectionSeam fill="var(--color-paper)" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-20 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <Reveal>
              <div className="relative">
                {/* Offset outline, not a second border on the video itself —
                    a restrained "framed" cue rather than an actual frame,
                    so it reads as presentation, not clutter. */}
                <div aria-hidden="true" className="pointer-events-none absolute -inset-3 rounded-lg border border-brass-light/15 max-lg:hidden" />
                <div className="relative rounded-lg">
                  <HomepageVideo />
                </div>
              </div>
            </Reveal>
            <Reveal>
              <p className="text-[14.5px] text-brass-light">Medal Tax, in brief</p>
              <h2 className="mt-3 font-display text-3xl text-paper md:text-4xl">See how we work</h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-paper/70">
                A tax consultancy built around direct access, not ticket
                queues.
              </p>
              <ul className="mt-8 space-y-5">
                {videoHighlights.map((h) => (
                  <li key={h.label} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-white/10 text-brass-light">
                      <Icon icon={h.icon} size="sm" />
                    </span>
                    <div>
                      <p className="font-display text-[16px] text-paper">{h.label}</p>
                      <p className="mt-0.5 text-[13.5px] leading-relaxed text-paper/60">{h.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Who Medal Tax helps */}
      <section className="relative overflow-hidden border-b border-line">
        <Grain tone="light" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-20 md:px-8">
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <h2 className="font-display text-3xl text-navy md:text-4xl">Who we help</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate">
                Individuals, businesses and cross-border clients, each with
                different compliance needs.
              </p>
              <Link href="/who-we-help" className="mt-5 inline-block font-medium text-brass-2 transition-colors duration-(--dur-base) ease-standard hover:text-brass">
                More on who we help
              </Link>
            </Reveal>
            <RevealGroup className="grid gap-5 sm:grid-cols-2">
              {audiences.map((a) => (
                <RevealItem key={a.slug}>
                  <AudienceCard icon={audienceIcons[a.slug]} title={a.title} body={a.teaser} slug={a.slug} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative overflow-hidden border-b border-line bg-paper-2/50">
        <Grain tone="light" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-20 md:px-8">
          <h2 className="font-display text-3xl text-navy md:text-4xl">Speak with the right person</h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate">
            Our specialists work on specific services — reach the right
            person directly by call or WhatsApp.
          </p>
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <RevealItem>
              <TeamCard name="Karthik" role="Income Tax Filing" phone="+91 96294 73631" whatsapp="919629473631" service="Income Tax Filing" serviceSlug="income-tax-filing" />
            </RevealItem>
            <RevealItem>
              <TeamCard name="Imran" role="Amazon Seller Onboarding" phone="+91 97315 62158" whatsapp="919731562158" service="Amazon Seller Onboarding" serviceSlug="amazon-seller-onboarding" />
            </RevealItem>
            <RevealItem>
              <TeamCard name={team[0].name} role={team[0].role} phone={team[0].phone} whatsapp={team[0].whatsapp} service="general tax and compliance queries" />
            </RevealItem>
          </RevealGroup>
          <div className="mt-8">
            <Link href="/about#team" className="font-medium text-brass-2 transition-colors duration-(--dur-base) ease-standard hover:text-brass">
              Meet the full team
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden border-b border-line">
        <Grain tone="light" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-20 md:px-8">
          <div className="grid gap-12 md:grid-cols-[1fr_1.6fr]">
            <Reveal>
              <h2 className="font-display text-3xl text-navy md:text-4xl">Questions, answered</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate">
                A few common questions before you get in touch.
              </p>
            </Reveal>
            <Reveal>
              <FAQAccordion faqs={homeFaqs} title="" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Large CTA — paper-toned, deliberately NOT navy: this band sits
          directly above the (navy) Footer with no divider between them, and
          a navy-on-navy pairing there read as one undifferentiated block. */}
      <section className="relative overflow-hidden border-b border-line bg-paper-2">
        <GradientMesh variant="corner" color="var(--color-brass)" peakOpacity={0.12} />
        <Grain tone="light" />
        <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-24 text-center md:px-8">
          <h2 className="font-display text-4xl text-navy md:text-5xl">Let&rsquo;s sort your tax and compliance work.</h2>
          <p className="mx-auto mt-5 max-w-lg text-[16px] text-slate">
            Call, message us on WhatsApp, or send a short enquiry — we&rsquo;ll
            follow up with clear next steps.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <PrimaryCTA href="/contact" eventName="get_started_click" className="!bg-brass-2 hover:!brightness-110">
              Get Started
            </PrimaryCTA>
            <CallButton phone={site.phones.primary} label="Call us" />
            <WhatsAppButton waNumber={site.whatsappGeneral} message="Hi, I would like help with my tax and compliance needs." />
          </div>
        </div>
      </section>
    </div>
  );
}

function AudienceCard({
  icon,
  title,
  body,
  slug,
}: {
  icon: PhosphorIcon;
  title: string;
  body: string;
  slug: string;
}) {
  return (
    <Link
      href={`/who-we-help#${slug}`}
      className="group flex h-full flex-col rounded-md border border-line bg-paper p-6 transition-[transform,box-shadow,border-color] duration-(--dur-base) ease-standard hover:-translate-y-0.5 hover:border-brass/50 hover:shadow-md"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-navy text-brass-light">
        <Icon icon={icon} size="sm" />
      </span>
      <p className="mt-4 font-display text-lg text-navy">{title}</p>
      <p className="mt-1.5 text-[14px] leading-relaxed text-slate">{body}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-brass-2 transition-colors duration-(--dur-base) ease-standard group-hover:text-brass">
        Learn more
        <Icon icon={ArrowRight} size="xs" className="transition-transform duration-(--dur-base) ease-standard group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function TeamCard({
  name,
  role,
  phone,
  whatsapp,
  service,
  serviceSlug,
}: {
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
  service: string;
  /** Only set when `role` names one specific, real service (see call sites). */
  serviceSlug?: string;
}) {
  const message = `Hi ${name}, I would like help with ${service}.`;
  const ServiceIcon = serviceSlug ? serviceIcons[serviceSlug] : undefined;
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="group flex h-full flex-col rounded-md border border-line bg-paper p-7 transition-[transform,box-shadow,border-color] duration-(--dur-base) ease-standard hover:-translate-y-0.5 hover:border-brass/50 hover:shadow-md">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-navy font-display text-lg text-brass-light" aria-hidden="true">
          {initials}
        </span>
        <div>
          <p className="font-display text-xl text-navy">{name}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[13.5px] text-slate">
            {ServiceIcon && <ServiceIcon size="xs" className="shrink-0 text-brass-2" />}
            {role}
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-1 items-end gap-2.5 border-t border-line pt-5">
        <CallButton phone={phone} label="Call" className="flex-1 justify-center" />
        <WhatsAppButton waNumber={whatsapp} message={message} label="WhatsApp" className="flex-1 justify-center" />
      </div>
    </div>
  );
}
