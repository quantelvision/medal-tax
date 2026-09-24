import Link from "next/link";
import { Phone, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { telHref, whatsappHref } from "@/lib/data/site";
import { Icon } from "@/components/icons";

/**
 * PrimaryCTA and SecondaryCTA both hardcode a default bg/text pair and
 * append `className` after it in the same string — but that string ORDER
 * has no effect on which one wins. Tailwind resolves same-specificity
 * conflicts by each utility's position in the COMPILED stylesheet, which is
 * NOT the order classes appear in a `class` attribute. Measured directly in
 * the built CSS: `.bg-brass-2{...}` and `.bg-brass-light{...}` both land
 * BEFORE `.bg-navy{...}`, so `bg-navy` was silently winning over every
 * color-changing `className` override passed to these two components —
 * multiple "Get Started" buttons across the site rendered plain navy
 * instead of their intended gold for several rounds before this was caught
 * by computed-style inspection (not visible at normal screenshot scale).
 * Any className passed here that changes bg/text/border color MUST use
 * Tailwind's `!` important prefix (e.g. `!bg-brass-2`, `!text-navy`) to
 * reliably win — a plain override is not guaranteed to apply. Layout-only
 * classes (padding, flex, etc.) are unaffected and don't need it.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-[15px] font-medium transition-colors duration-(--dur-base) ease-standard focus-visible:outline-2";

export function PrimaryCTA({
  href,
  children,
  eventName,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  eventName?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      data-analytics-event={eventName}
      className={`${base} bg-navy text-paper hover:bg-navy-2 ${className}`}
    >
      {children}
    </Link>
  );
}

export function SecondaryCTA({
  href,
  children,
  eventName,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  eventName?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      data-analytics-event={eventName}
      className={`${base} border border-navy/30 text-navy hover:border-navy hover:bg-navy/5 ${className}`}
    >
      {children}
    </Link>
  );
}

export function CallButton({
  phone,
  label = "Call",
  className = "",
}: {
  phone: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={telHref(phone)}
      data-analytics-event="phone_click"
      className={`${base} border border-brass/50 text-brass-2 hover:bg-brass/10 ${className}`}
    >
      <Icon icon={Phone} size="xs" /> {label}
    </a>
  );
}

export function WhatsAppButton({
  waNumber,
  message,
  label = "WhatsApp",
  className = "",
}: {
  waNumber: string;
  message: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={whatsappHref(waNumber, message)}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-event="whatsapp_click"
      className={`${base} bg-brass-2 text-white hover:brightness-110 ${className}`}
    >
      <Icon icon={WhatsappLogo} size="xs" weight="fill" /> {label}
    </a>
  );
}export { telHref, whatsappHref };
