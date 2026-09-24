import Link from "next/link";
import { services, categories } from "@/lib/data/services";
import { site } from "@/lib/data/site";
import { serviceIcons } from "@/components/icons/services";
import { Grain, GradientMesh, HeroPattern } from "@/components/patterns";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-navy text-paper/90">
      <HeroPattern id="footer-banknote" variant="bankNote" fill="var(--color-brass-light)" opacity={0.05} scale={1.6} />
      <GradientMesh variant="center" color="var(--color-brass)" peakOpacity={0.06} />
      <Grain tone="dark" />
      <div className="relative mx-auto max-w-[var(--container-page)] px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-2xl text-paper">Medal Tax</p>
            <p className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-paper/70">
              Income tax, GST, TDS, accounting, audit and business registration
              services — provided by a tax consultancy firm working with
              individuals and businesses since {site.establishedYear}.
            </p>
            <div className="mt-6 flex flex-col gap-1 text-[14.5px] text-paper/80">
              <a href={`mailto:${site.email}`} className="transition-colors duration-(--dur-base) ease-standard hover:text-brass-light">
                {site.email}
              </a>
              <a href={`tel:${site.phones.primary.replace(/\s+/g, "")}`} className="transition-colors duration-(--dur-base) ease-standard hover:text-brass-light">
                {site.phones.primary}
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-[14px] font-medium text-paper">Company</p>
            <ul className="space-y-2.5 text-[14.5px] text-paper/70">
              <li><Link href="/about" className="transition-colors duration-(--dur-base) ease-standard hover:text-brass-light">Who We Are</Link></li>
              <li><Link href="/about#team" className="transition-colors duration-(--dur-base) ease-standard hover:text-brass-light">Team</Link></li>
              <li><Link href="/contact" className="transition-colors duration-(--dur-base) ease-standard hover:text-brass-light">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[14px] font-medium text-paper">Services</p>
            <ul className="space-y-2.5 text-[14.5px] text-paper/70">
              {services.slice(0, 6).map((s) => {
                const ServiceIcon = serviceIcons[s.slug];
                return (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="flex items-center gap-2 transition-colors duration-(--dur-base) ease-standard hover:text-brass-light">
                      <ServiceIcon size="sm" className="shrink-0 text-paper/50" />
                      {s.navLabel}
                    </Link>
                  </li>
                );
              })}
              <li><Link href="/services" className="text-brass-light">View all services</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[14px] font-medium text-paper">Offices</p>
            <div className="space-y-4 text-[14.5px] text-paper/70">
              {site.offices.map((o) => (
                <div key={o.label}>
                  <p className="text-paper/90">{o.label}</p>
                  {o.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[13px] text-paper/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Medal Tax. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="transition-colors duration-(--dur-base) ease-standard hover:text-brass-light">Privacy Policy</Link>
            <Link href="/terms-of-use" className="transition-colors duration-(--dur-base) ease-standard hover:text-brass-light">Terms of Use</Link>
            <Link href="/disclaimer" className="transition-colors duration-(--dur-base) ease-standard hover:text-brass-light">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const _categoriesRef = categories;
