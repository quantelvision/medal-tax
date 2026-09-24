import type { ComponentProps } from "react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Icon, type IconSize, type IconWeight } from "./Icon";

/**
 * A control whose only content is an icon.
 *
 * Carries two separate affordances, because they serve different people:
 *   - `aria-label` on the button, for assistive technology.
 *   - a visible text tooltip on hover AND on keyboard focus, for anyone who
 *     cannot tell what the glyph means. `title` is deliberately not used —
 *     it never appears on focus, so keyboard users never see it.
 *
 * The tooltip is `aria-hidden`; the accessible name comes from `aria-label`
 * alone, so screen readers do not announce the same string twice.
 */
export function IconButton({
  icon,
  label,
  size = "md",
  weight = "regular",
  tooltipSide = "bottom",
  className = "",
  wrapperClassName = "",
  ...rest
}: {
  icon: PhosphorIcon;
  /** Accessible name AND the tooltip text. */
  label: string;
  size?: IconSize;
  weight?: IconWeight;
  /** "bottom-end" right-aligns the tooltip, for buttons near a screen edge. */
  tooltipSide?: "bottom" | "bottom-end" | "left";
  className?: string;
  /**
   * Layout classes for the wrapper. Visibility and positioning belong here,
   * not on `className` — that only styles the button, so a `lg:hidden` there
   * would hide the button while leaving the wrapper and tooltip occupying
   * space (and overflowing the viewport).
   */
  wrapperClassName?: string;
} & Omit<ComponentProps<"button">, "aria-label" | "children">) {
  const place =
    tooltipSide === "left"
      ? "right-full top-1/2 mr-2 -translate-y-1/2"
      : tooltipSide === "bottom-end"
        ? "right-0 top-full mt-2"
        : "left-1/2 top-full mt-2 -translate-x-1/2";

  return (
    <span className={`group/iconbtn relative inline-flex ${wrapperClassName}`}>
      <button
        type="button"
        aria-label={label}
        className={`inline-flex items-center justify-center ${className}`}
        {...rest}
      >
        <Icon icon={icon} size={size} weight={weight} />
      </button>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-sm border border-line-dark bg-navy px-2 py-1 text-[12px] font-medium text-paper opacity-0 transition-opacity duration-(--dur-fast) ease-standard group-hover/iconbtn:opacity-100 group-focus-within/iconbtn:opacity-100 ${place}`}
      >
        {label}
      </span>
    </span>
  );
}
