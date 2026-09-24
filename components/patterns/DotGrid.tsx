/**
 * Dot-matrix texture — same shared-tile technique as LineGrid, same
 * verified opacity contract (a flat-opacity fill's worst case IS its set
 * opacity; see LineGrid.tsx for the measured navy-section contrast table,
 * which applies identically here since both are flat-alpha shape overlays,
 * not turbulence). Reserved for navy sections for the same reason.
 */
export function DotGrid({
  id,
  fill = "currentColor",
  opacity = 0.08,
  size = 24,
  radius = 1.2,
  className = "",
}: {
  id: string;
  fill?: string;
  opacity?: number;
  size?: number;
  radius?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <circle cx={size / 2} cy={size / 2} r={radius} fill={fill} opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
