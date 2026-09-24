import { ServiceIconFrame, type ServiceIconProps } from "./ServiceIconBase";

/**
 * TDS Services — a funnel, tax withheld as it passes through at the source.
 *
 * First pass used a circle with a stemmed arrow above it, which read as a
 * stopwatch (that exact silhouette is the standard "timer" glyph almost
 * everywhere) rather than anything to do with tax. A funnel has no such
 * collision and states "deducted at source" directly.
 */
export function TdsServicesIcon(props: ServiceIconProps) {
  return (
    <ServiceIconFrame {...props}>
      <path d="M9 9 H39 L27 27 H21 Z" />
      <line x1="24" y1="27" x2="24" y2="35" />
      <circle cx="24" cy="39" r="3" />
    </ServiceIconFrame>
  );
}
