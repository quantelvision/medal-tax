/**
 * Structural line/dot pattern — blueprint grid, graph-paper crosshatch, or a
 * single-direction hatch, built from one shared SVG <pattern> tile.
 *
 * Reserved for NAVY sections only (see Grain.tsx for why): a flat-opacity
 * stroke or fill is its own worst case (unlike noise, there's no "peak"
 * above the set opacity — wherever a line sits, that pixel gets exactly
 * this alpha), so `opacity` below IS the verified figure, not an average.
 *
 * Verified (WCAG AA normal text = 4.5:1, large/eyebrow text = 3:1), stroke
 * at up to 0.12 opacity against real navy-section text:
 *   paper stroke       vs paper/75 hero copy:   8.37 -> 6.64 across the range
 *   paper stroke       vs brass-light eyebrow:   7.72 -> 6.12
 *   brass-light stroke vs paper/75 hero copy:    8.68 -> 7.44
 *   brass-light stroke vs brass-light eyebrow:   8.01 -> 6.87
 * All ranges stay far above 4.5:1 even at 0.12; every usage here sits at
 * 0.05-0.08 for visual restraint, well inside the verified margin.
 *
 * `id` is required rather than generated (e.g. via useId) so this stays a
 * plain server component — each call site names its own tile explicitly.
 */
export function LineGrid({
  id,
  variant = "grid",
  stroke = "currentColor",
  opacity = 0.06,
  size = 40,
  strokeWidth = 1,
  className = "",
}: {
  id: string;
  /** "grid" = crossing horizontal/vertical lines (graph paper / blueprint).
   *  "diagonal" = a single 45deg hatch direction — used more sparingly. */
  variant?: "grid" | "diagonal";
  stroke?: string;
  opacity?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const d = variant === "grid" ? `M ${size} 0 L 0 0 0 ${size}` : `M 0 ${size} L ${size} 0`;
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
