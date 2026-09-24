/**
 * Real patterns from Steve Schoger's Hero Patterns (heropatterns.com, CC BY
 * 4.0 — exact path data taken from https://github.com/lowmess/hero-patterns,
 * an MIT-licensed port of the same designs, fetched and URL-decoded rather
 * than approximated from memory). Credited in docs/media-credits.md. Built
 * the same way as LineGrid/DotGrid (one shared SVG <pattern> tile) rather
 * than pulling in the `hero-patterns` npm package, which only exists to
 * wrap these same SVG strings as CSS background-image data URIs — not worth
 * a dependency for a handful of constants.
 *
 * Same verified-opacity contract as LineGrid/DotGrid (see LineGrid.tsx for
 * the full measured navy-section contrast table): this is the identical
 * "flat-alpha fill" category — a shape at a fixed opacity has no turbulence
 * "peak" the way Grain's noise does, so the set opacity IS the worst case,
 * and that table's headroom (safe up to 0.12, used here at 0.05-0.07)
 * applies unchanged regardless of which shape is being tiled. Reserved for
 * NAVY sections only, same reason as LineGrid/DotGrid — a paper-section
 * version would need its own fresh contrast check before use there.
 *
 * One pattern per hero section sitewide (see call sites), chosen for fit
 * rather than assigned arbitrarily:
 *   home            hexagons            — structure, an organized system
 *   about           overlappingCircles  — people, connection, a team
 *   who-we-help     circlesAndSquares   — varied shapes for varied audiences
 *   services        boxes               — an itemized catalogue
 *   services/[slug] stampCollection     — registrations, certificates, tax stamps
 *   resources       texture             — paper grain, reading
 *   contact         connections         — literally named for this one
 *   footer          bankNote            — currency motif, sitewide surface
 */
const TILES = {
  hexagons: {
    w: 28,
    h: 49,
    viewBox: "0 0 28 49",
    fillRule: "nonzero" as const,
    path: "M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z",
  },
  overlappingCircles: {
    w: 80,
    h: 80,
    viewBox: "0 0 80 80",
    fillRule: "evenodd" as const,
    path: "M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z",
  },
  boxes: {
    w: 20,
    h: 20,
    viewBox: "0 0 20 20",
    fillRule: "evenodd" as const,
    path: "M0 0h20L0 20z",
  },
  stampCollection: {
    w: 77,
    h: 107,
    viewBox: "0 0 77 107",
    fillRule: "evenodd" as const,
    path: "M46 101a5 5 0 0 1 5 5h5a5 5 0 0 1 10 0h5a5 5 0 0 1 5-5v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10V6a5 5 0 0 1-5-5h-5a5 5 0 0 1-10 0h-5a5 5 0 0 1-10 0h-5a5 5 0 0 1-10 0h-5a5 5 0 0 1-10 0H6a5 5 0 0 1-5 5v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 5 5h5a5 5 0 0 1 10 0h5a5 5 0 0 1 10 0h5a5 5 0 0 1 5-5zm15-2a7 7 0 0 0-6.71 5h-1.58a7 7 0 0 0-13.42 0h-1.58a7 7 0 0 0-13.42 0h-1.58a7 7 0 0 0-13.42 0H7.71A7.01 7.01 0 0 0 3 99.29v-1.58a7 7 0 0 0 0-13.42v-1.58a7 7 0 0 0 0-13.42v-1.58a7 7 0 0 0 0-13.42v-1.58a7 7 0 0 0 0-13.42v-1.58a7 7 0 0 0 0-13.42v-1.58A7 7 0 0 0 3 9.29V7.71A7.02 7.02 0 0 0 7.71 3h1.58a7 7 0 0 0 13.42 0h1.58a7 7 0 0 0 13.42 0h1.58a7 7 0 0 0 13.42 0h1.58a7 7 0 0 0 13.42 0h1.58A7.02 7.02 0 0 0 74 7.71v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7.01 7.01 0 0 0-4.71 4.71h-1.58A7 7 0 0 0 61 99zM12 12h53v83H12V12zm51 81H14V14h49v79z",
  },
  texture: {
    w: 4,
    h: 4,
    viewBox: "0 0 4 4",
    fillRule: "nonzero" as const,
    path: "M1 3h1v1H1V3zm2-2h1v1H3V1z",
  },
  connections: {
    w: 36,
    h: 36,
    viewBox: "0 0 36 36",
    fillRule: "evenodd" as const,
    path: "M36 0H0v36h36V0zM15.126 2H2v13.126c.367.094.714.24 1.032.428L15.554 3.032c-.188-.318-.334-.665-.428-1.032zM18 4.874V18H4.874c-.094-.367-.24-.714-.428-1.032L16.968 4.446c.318.188.665.334 1.032.428zM22.874 2h11.712L20 16.586V4.874c1.406-.362 2.512-1.468 2.874-2.874zm10.252 18H20v13.126c.367.094.714.24 1.032.428l12.522-12.522c-.188-.318-.334-.665-.428-1.032zM36 22.874V36H22.874c-.094-.367-.24-.714-.428-1.032l12.522-12.522c.318.188.665.334 1.032.428zm0-7.748V3.414L21.414 18h11.712c.362-1.406 1.468-2.512 2.874-2.874zm-18 18V21.414L3.414 36h11.712c.362-1.406 1.468-2.512 2.874-2.874zM4.874 20h11.712L2 34.586V22.874c1.406-.362 2.512-1.468 2.874-2.874z",
  },
  circlesAndSquares: {
    w: 40,
    h: 40,
    viewBox: "0 0 40 40",
    fillRule: "evenodd" as const,
    path: "M0 0h20v20H0V0zm10 17c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm20 0c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zM10 37c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm10-17h20v20H20V20zm10 17c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z",
  },
  bankNote: {
    w: 100,
    h: 20,
    viewBox: "0 0 100 20",
    fillRule: "evenodd" as const,
    path: "M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z",
  },
  diagonalLines: {
    w: 6,
    h: 6,
    viewBox: "0 0 6 6",
    fillRule: "evenodd" as const,
    path: "M5 0h1L0 6V5zM6 5v1H5z",
  },
};

export function HeroPattern({
  id,
  variant = "bankNote",
  fill = "currentColor",
  opacity = 0.06,
  scale = 1,
  className = "",
}: {
  id: string;
  variant?: keyof typeof TILES;
  fill?: string;
  opacity?: number;
  /** Multiplies the tile's native pixel size. */
  scale?: number;
  className?: string;
}) {
  const t = TILES[variant];
  const w = t.w * scale;
  const h = t.h * scale;

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse">
          <svg width={w} height={h} viewBox={t.viewBox}>
            <path d={t.path} fill={fill} fillOpacity={opacity} fillRule={t.fillRule} />
          </svg>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
