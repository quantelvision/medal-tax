/**
 * An engine-turned rosette — the guilloché pattern used on certificates and
 * struck medals. It is the one place the "Medal" in Medal Tax is acknowledged,
 * and deliberately stops short of literal medal iconography.
 *
 * Used where a photograph would be filler or inappropriate: the legal pages,
 * the 404, and the Trademark Registration service page (see lib/media.ts for
 * why that one carries no photo).
 *
 * Server component, no runtime cost: pure inline SVG that inherits colour from
 * its container and is hidden from assistive technology.
 */
const RAYS = 72;
const RINGS = [1, 0.86, 0.72, 0.52, 0.34, 0.18];

export function BrandMotif({
  className = "",
  tone = "accent",
}: {
  className?: string;
  tone?: "accent" | "inverse";
}) {
  const stroke = tone === "inverse" ? "#d7b06b" : "#a9793b";

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke={stroke} fill="none" strokeWidth="0.75">
        {RINGS.map((r) => (
          <circle key={r} cx="200" cy="200" r={190 * r} opacity={0.15 + (1 - r) * 0.25} />
        ))}
        <g opacity="0.3">
          {Array.from({ length: RAYS }, (_, i) => {
            const a = (i / RAYS) * Math.PI * 2;
            const inner = i % 6 === 0 ? 34 : 66;
            return (
              <line
                key={i}
                x1={200 + Math.cos(a) * inner}
                y1={200 + Math.sin(a) * inner}
                x2={200 + Math.cos(a) * 190}
                y2={200 + Math.sin(a) * 190}
              />
            );
          })}
        </g>
        {/* Interference curves — what gives guilloché its woven look. */}
        <g opacity="0.45">
          {Array.from({ length: 24 }, (_, i) => {
            const a = (i / 24) * Math.PI * 2;
            return (
              <circle
                key={i}
                cx={200 + Math.cos(a) * 62}
                cy={200 + Math.sin(a) * 62}
                r="104"
              />
            );
          })}
        </g>
      </g>
    </svg>
  );
}
