import type { Metadata } from "next";
import { services } from "@/lib/data/services";
import { serviceIcons } from "@/components/icons/services";
import { ICON_SIZE } from "@/components/icons/Icon";

/**
 * Internal review page for the Phase 3 bespoke service icon set — not a
 * marketing route. Deliberately unlinked from any nav, footer or
 * sitemap.ts, and marked noindex here so nothing surfaces it publicly.
 *
 * Shows every icon at the sizes it is actually used at (24 and 32), plus a
 * large rendering for checking the linework itself, side by side with its
 * service name so a mismatch is obvious at a glance.
 */
export const metadata: Metadata = {
  title: "Icon sheet (internal)",
  robots: { index: false, follow: false },
};

// The 96px row is a pure CSS zoom of the "lg" (32px) token render, purely to
// inspect linework up close — it never passes a size outside the Phase 2
// token set (16/20/24/32) to the component itself.
const REVIEW_SIZES = [
  { key: "lg", px: ICON_SIZE.lg, label: "32px — service cards", scale: 1 },
  { key: "md", px: ICON_SIZE.md, label: "24px — legibility floor", scale: 1 },
  { key: "xl", px: ICON_SIZE.lg, label: "96px — linework detail (3x zoom of 32px)", scale: 3 },
] as const;

export default function IconSheetPage() {
  return (
    <div className="mx-auto max-w-[var(--container-page)] px-5 py-16 md:px-8">
      <h1 className="font-display text-3xl text-navy">Service icon set — contact sheet</h1>
      <p className="mt-2 max-w-2xl text-[14.5px] text-slate">
        Internal review only. 48×48 viewBox, 2px stroke, round caps/joins,
        currentColor, fill:none throughout — one shape language across all 13.
        Not linked from navigation and excluded from the sitemap.
      </p>

      <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const ServiceIcon = serviceIcons[s.slug];
          return (
            <div key={s.slug} className="flex flex-col gap-5 bg-paper p-6">
              <div>
                <p className="font-display text-lg text-navy">{s.name}</p>
                <p className="text-[12.5px] text-slate">{s.slug}</p>
              </div>
              <div className="flex flex-wrap items-end gap-6">
                {REVIEW_SIZES.map((r) => (
                  <div key={r.key} className="flex flex-col items-center gap-2">
                    <div
                      className="flex items-center justify-center overflow-hidden border border-line text-navy"
                      style={{ width: r.px * r.scale + 16, height: r.px * r.scale + 16 }}
                    >
                      <span style={{ transform: `scale(${r.scale})` }}>
                        <ServiceIcon size={r.key === "md" ? "md" : "lg"} />
                      </span>
                    </div>
                    <p className="text-[11px] text-slate">{r.label}</p>
                  </div>
                ))}
                {/* On paper's dark counterpart, to check the currentColor
                    contract actually holds against a navy background. */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center bg-navy text-paper">
                    <ServiceIcon size="md" />
                  </div>
                  <p className="text-[11px] text-slate">on navy</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
