import Link from "next/link";
import { Phone, WhatsappLogo, ArrowRight } from "@phosphor-icons/react/ssr";
import { site, telHref, whatsappHref } from "@/lib/data/site";
import { Icon } from "@/components/icons";

export function StickyMobileActions() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-paper/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={telHref(site.phones.primary)}
        data-analytics-event="phone_click"
        className="flex flex-col items-center justify-center gap-1 border-r border-line py-2.5 text-xs font-medium text-navy"
      >
        <Icon icon={Phone} size="sm" />
        Call
      </a>
      <a
        href={whatsappHref(site.whatsappGeneral, "Hi, I would like help with my tax and compliance needs.")}
        target="_blank"
        rel="noopener noreferrer"
        data-analytics-event="whatsapp_click"
        className="flex flex-col items-center justify-center gap-1 border-r border-line py-2.5 text-xs font-medium text-brass-2"
      >
        <Icon icon={WhatsappLogo} size="sm" weight="fill" />
        WhatsApp
      </a>
      <Link
        href="/contact"
        data-analytics-event="get_started_click"
        className="flex flex-col items-center justify-center gap-1 bg-navy py-2.5 text-xs font-semibold text-paper"
      >
        <Icon icon={ArrowRight} size="sm" />
        Get Started
      </Link>
    </div>
  );
}
