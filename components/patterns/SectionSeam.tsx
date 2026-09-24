/**
 * A masked section divider — a soft asymmetric curve standing in for a hard
 * straight border where two sections meet. Deliberately used sparingly (2
 * places sitewide, both on the homepage): every other section boundary on
 * the site keeps its plain hairline, per the "substrate, not subject" rule.
 * Using this at every one of the ~50 section seams across the site would be
 * the opposite of restrained; used at the two highest-traffic transitions
 * (the very first scroll on the site, and the tone change out of the video
 * band) it reads as a deliberate accent.
 *
 * Implementation: a solid-filled SVG shape painted at the BOTTOM of the
 * section it belongs to, in the colour of the section that follows — so the
 * curve reads as the next section's surface rising into this one, rather
 * than a shape drawn on top of unrelated content. It is fully opaque, so it
 * needs no contrast check of its own; it simply replaces the flat colour
 * beneath it for the height of the curve. `preserveAspectRatio="none"` lets
 * one fluid path scale to any container width without distortion, since
 * this is a soft wave rather than fixed-aspect artwork.
 */
export function SectionSeam({
  fill,
  flip = false,
  className = "",
}: {
  /** The colour of the section that follows. */
  fill: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full md:h-16 ${flip ? "-scale-x-100" : ""} ${className}`}
    >
      <path d="M0 64 L0 22 C 360 2, 1080 42, 1440 14 L1440 64 Z" fill={fill} />
    </svg>
  );
}
