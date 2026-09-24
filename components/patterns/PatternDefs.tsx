/**
 * Shared SVG filter definitions for the grain texture — rendered exactly
 * once (in app/layout.tsx) so every <Grain> instance sitewide references the
 * same two <filter> nodes instead of repeating feTurbulence markup per use.
 *
 * Two filters, tone-aware:
 *   grain-light — white fleck, for paper/paper-2 surfaces
 *   grain-dark  — black fleck, for navy surfaces
 *
 * The peak alpha (the "0.05" in each feColorMatrix) is not a stylistic
 * choice — it is the verified ceiling. Measured against the thinnest real
 * text/background pairing already on this site (brass-2 links at 4.63:1 on
 * a bg-paper-2/50 section, see components/patterns/Grain.tsx for the full
 * numbers): BLACK grain at this exact surface starts failing WCAG AA
 * (<4.5:1) at just 5% peak alpha, while WHITE grain at the same 5% *raises*
 * that pairing to 4.89:1. That asymmetry is why the two filters exist
 * instead of one — darkening an already-light surface erodes contrast
 * against dark text; lightening it does not.
 *
 * feTurbulence with no `in` attribute is generative — it fills its filter
 * region on its own regardless of the filtered element's own pixels, which
 * is what lets <Grain> apply this to an empty, fully transparent div.
 * `stitchTiles="stitch"` keeps the noise seamless at its tile boundary.
 */
export function PatternDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="grain-light" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0" />
        </filter>
        <filter id="grain-dark" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0" />
        </filter>
      </defs>
    </svg>
  );
}
