import type { ComponentProps, ReactNode } from "react";
import { ICON_SIZE, type IconSize } from "@/components/icons/Icon";

/**
 * Shared frame for the bespoke service icon set (Phase 3) — one per service
 * in lib/data/services.ts.
 *
 * The visual language is enforced structurally, not by convention, so no
 * individual icon can quietly drift from it:
 *   - 48x48 viewBox, drawn on a live area of roughly (6,6)-(42,42)
 *   - 2px stroke, round caps and round joins, currentColor
 *   - fill: none, ALWAYS — no filled accents, no gradients, no raster.
 *     One hard rule beats a set of icons that are "mostly" consistent.
 *
 * Every icon component renders <ServiceIconFrame>...linework...</ServiceIconFrame>
 * and supplies only its inner shapes; it cannot opt out of the shared
 * stroke/fill contract.
 *
 * These icons represent a SERVICE's identity and are never interchangeable
 * with a Phosphor icon standing in for that same service — Phosphor (see
 * components/icons/Icon.tsx) owns a different concern entirely: UI chrome
 * (carets, phone, WhatsApp, arrows) that has nothing to do with which
 * service is being referenced. The two systems are not mixed within a
 * single referenced-service context.
 */
export type ServiceIconProps = {
  size?: IconSize;
  /** Decorative by default — the adjacent service name is always the label. */
  label?: string;
  className?: string;
} & Omit<ComponentProps<"svg">, "width" | "height" | "color" | "ref" | "children">;

export function ServiceIconFrame({
  size = "md",
  label,
  className = "",
  children,
  ...rest
}: ServiceIconProps & { children: ReactNode }) {
  const px = ICON_SIZE[size];
  return (
    <svg
      viewBox="0 0 48 48"
      width={px}
      height={px}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      {...(label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true, focusable: false })}
      {...rest}
    >
      {children}
    </svg>
  );
}
