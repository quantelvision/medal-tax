import type { ComponentProps } from "react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

/**
 * Icon system — Phosphor Icons, one weight, four sizes.
 * =====================================================================
 *
 * DEFAULT WEIGHT: `regular`.
 *
 * Everything on this site is UI chrome — phone, WhatsApp, carets, menu,
 * form state. At the 16-20px those live at, `duotone` collapses into mud and
 * `bold` fights the hairline borders and the light serif display face.
 * `regular` matches the stroke weight of the existing rules and the body
 * text. It is the default and needs no justification at the call site.
 *
 * WHEN ANOTHER WEIGHT IS ALLOWED — these are the only three cases:
 *
 *   `bold`     Only at 16px and below, and only for an interactive
 *              affordance whose job is to be spotted (an accordion caret, a
 *              dropdown chevron). Below 16px `regular` reads as a smudge.
 *   `fill`     Only to signal a selected / active / success state, where the
 *              shift from outline to solid IS the state change. Never
 *              decorative.
 *   `duotone`  Only at 32px and above, for a large feature mark. There is
 *              currently no such usage: service iconography is bespoke (see
 *              components/icons/services) and must not be mixed with
 *              Phosphor inside one component.
 *
 * Anything else is a bug. `thin`, `light` and `bold`-at-large-sizes are not
 * used anywhere.
 *
 * COLOUR: always `currentColor`. Icons inherit from their container so they
 * stay correct on navy, on paper, and in every hover state automatically.
 * Never pass a literal colour.
 *
 * ACCESSIBILITY: an icon is decorative unless it is the ONLY carrier of its
 * meaning. Decorative is the default and yields `aria-hidden`. Passing a
 * `label` makes it meaningful and yields `role="img"` + `aria-label`. An
 * icon-only control should use `IconButton`, not a bare `Icon`.
 */

/** The only sizes in the system. No arbitrary pixel values. */
export const ICON_SIZE = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
} as const;

export type IconSize = keyof typeof ICON_SIZE;
export type IconWeight = "regular" | "bold" | "fill" | "duotone";

type IconProps = {
  /** The Phosphor glyph, imported from "@phosphor-icons/react/ssr". */
  icon: PhosphorIcon;
  size?: IconSize;
  weight?: IconWeight;
  /** Supplying this marks the icon as meaningful and labels it. */
  label?: string;
  className?: string;
} & Omit<ComponentProps<"svg">, "ref" | "width" | "height" | "color">;

export function Icon({
  icon: Glyph,
  size = "xs",
  weight = "regular",
  label,
  className = "",
  ...rest
}: IconProps) {
  const px = ICON_SIZE[size];

  return (
    <Glyph
      width={px}
      height={px}
      weight={weight}
      color="currentColor"
      className={`shrink-0 ${className}`}
      {...(label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true, focusable: false })}
      {...rest}
    />
  );
}
