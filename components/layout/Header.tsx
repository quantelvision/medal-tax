"use client";

import Link from "next/link";
import Image from "next/image";
import brandLogo from "@/public/images/brand/brand-logo.png";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { categories, servicesByCategory, type Category } from "@/lib/data/services";
import { CaretDown, List, X } from "@phosphor-icons/react/ssr";
import { Icon, IconButton } from "@/components/icons";
import { serviceIcons } from "@/components/icons/services";

const EASE_STANDARD = [0.2, 0, 0, 1] as const;

const navLinks = [
  { href: "/about", label: "Who We Are" },
  { href: "/who-we-help", label: "Who We Help" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

const categoryOrder: Category[] = [
  "tax-compliance",
  "accounting-financial",
  "business-registration",
  "ecommerce-support",
];

export function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  // Second independent guard alongside the global MotionConfig — see
  // FAQAccordion.tsx's comment: height is a layout animation, not a
  // transform, so the global "strip transforms" behaviour doesn't cover it.
  const reduceMotion = useReducedMotion();
  const t = (duration: number) => (reduceMotion ? { duration: 0 } : { duration, ease: EASE_STANDARD });

  const closeServices = (refocus: boolean) => {
    setServicesOpen(false);
    if (refocus) servicesTriggerRef.current?.focus();
  };

  // Document-level, not a bubbled onKeyDown on the trigger's own wrapper:
  // the menu opens on hover, which never moves focus anywhere, so a keydown
  // handler scoped to that DOM subtree would never receive the Escape press
  // at all (confirmed via CDP — dispatching Escape after a hover-only open
  // did nothing, because document.activeElement was still <body>).
  useEffect(() => {
    if (!servicesOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeServices(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [servicesOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      {/* `relative` lives here, not on the trigger below — the mega menu
          panel centers itself against this full header row (and, since this
          row is itself mx-auto-centered, against the viewport). Centering it
          against the small trigger button instead was the root cause of a
          measured bug (Phase 3 audit): at 1280px the panel's first column
          sat 69px off-screen, because the trigger sits left-of-center in the
          header, not at its middle. */}
      <div className="relative mx-auto flex max-w-[var(--container-page)] items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src={brandLogo} alt="" priority className="h-8 w-auto" />
          <span className="font-display text-2xl tracking-tight text-navy">Medal Tax</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          <div
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              ref={servicesTriggerRef}
              className="flex items-center gap-1 py-2 text-[15px] text-ink transition-colors duration-(--dur-base) ease-standard hover:text-brass-2"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              aria-controls="services-menu"
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
              <span
                aria-hidden="true"
                className="transition-transform duration-(--dur-base) ease-standard"
                style={{ transform: servicesOpen ? "rotate(180deg)" : undefined }}
              >
                <Icon icon={CaretDown} size="xs" weight="bold" />
              </span>
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  id="services-menu"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={t(0.16)}
                  className="absolute left-1/2 top-full w-[min(55rem,calc(100vw-4rem))] -translate-x-1/2 rounded-md border border-line bg-paper p-8 shadow-xl"
                >
                  <div className="grid grid-cols-4 gap-8">
                    {categoryOrder.map((catKey) => {
                      const cat = categories[catKey];
                      const items = servicesByCategory(catKey);
                      return (
                        <div key={catKey}>
                          <p className="mb-3 font-display text-[15px] text-navy">{cat.name}</p>
                          <ul className="space-y-2.5">
                            {items.map((s) => {
                              const ServiceIcon = serviceIcons[s.slug];
                              return (
                                <li key={s.slug}>
                                  <Link
                                    href={`/services/${s.slug}`}
                                    className="group flex items-center gap-2.5 text-[14px] leading-snug text-slate transition-colors duration-(--dur-base) ease-standard hover:text-brass-2"
                                    onClick={() => setServicesOpen(false)}
                                  >
                                    <ServiceIcon size="sm" className="shrink-0 text-brass-2/70 transition-colors duration-(--dur-base) ease-standard group-hover:text-brass-2" />
                                    {s.navLabel}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 border-t border-line pt-4">
                    <Link
                      href="/services"
                      className="text-[14px] font-medium text-navy transition-colors duration-(--dur-base) ease-standard hover:text-brass-2"
                      onClick={() => setServicesOpen(false)}
                    >
                      View all services
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="py-2 text-[15px] text-ink transition-colors duration-(--dur-base) ease-standard hover:text-brass-2"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* One primary CTA in the navbar — Call/WhatsApp live in the hero,
            the closing band, and (on mobile) the persistent sticky bar, so
            they're never actually unreachable, just not duplicated here. */}
        <Link
          href="/contact"
          data-analytics-event="get_started_click"
          className="hidden rounded-sm bg-brass-2 px-5 py-2.5 text-[15px] font-medium text-white transition-colors duration-(--dur-base) ease-standard hover:brightness-110 lg:inline-block"
        >
          Get Started
        </Link>

        {/* Mobile toggle */}
        <IconButton
          icon={mobileOpen ? X : List}
          label={mobileOpen ? "Close menu" : "Open menu"}
          size="md"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          tooltipSide="bottom-end"
          wrapperClassName="lg:hidden"
          className="p-2"
        />
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={t(0.2)}
            className="overflow-hidden border-t border-line bg-paper lg:hidden"
          >
            <div className="px-5 py-6">
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                <MobileServicesAccordion onNavigate={() => setMobileOpen(false)} />
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="border-b border-line py-3 text-[16px] text-ink transition-colors duration-(--dur-base) ease-standard active:text-brass-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-5">
                <Link
                  href="/contact"
                  className="block rounded-sm bg-brass-2 py-3 text-center text-[15px] font-medium text-white transition-colors duration-(--dur-base) ease-standard hover:brightness-110"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileServicesAccordion({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  return (
    <div className="border-b border-line">
      <button
        className="flex w-full items-center justify-between py-3 text-[16px] text-ink"
        aria-expanded={open}
        aria-controls="mobile-services-panel"
        onClick={() => setOpen((v) => !v)}
      >
        Services
        <span
          aria-hidden="true"
          className="transition-transform duration-(--dur-base) ease-standard"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        >
          <Icon icon={CaretDown} size="xs" weight="bold" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-services-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: EASE_STANDARD }}
            className="overflow-hidden"
          >
            <div className="pb-3 pl-2">
              {categoryOrder.map((catKey) => (
                <div key={catKey} className="mb-3">
                  <p className="mb-1.5 text-[13px] font-medium text-slate">{categories[catKey].name}</p>
                  <ul>
                    {servicesByCategory(catKey).map((s) => {
                      const ServiceIcon = serviceIcons[s.slug];
                      return (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="flex items-center gap-2.5 py-1.5 text-[15px] text-ink transition-colors duration-(--dur-base) ease-standard active:text-brass-2"
                            onClick={onNavigate}
                          >
                            <ServiceIcon size="sm" className="shrink-0 text-brass-2/70" />
                            {s.navLabel}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
