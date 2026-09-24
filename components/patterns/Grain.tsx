/**
 * Full-bleed noise texture. References the shared filters in PatternDefs —
 * see that file for the verified contrast ceiling (peak alpha 0.05) and why
 * it is tone-aware rather than a single flat overlay.
 *
 * Verified pairings (WCAG AA normal text = 4.5:1):
 *   grain-light, 0.05 peak, on bg-paper-2/50 vs brass-2 link (thinnest real
 *     pairing on this site): 4.843 -> 4.89  (improves; white lightens an
 *     already-light surface, widening the gap to dark text)
 *   grain-light, 0.05 peak, on bg-paper-2/50 vs slate body:   ->  5.22
 *   grain-dark,  0.05 peak, on bg-navy vs paper/75 hero copy: 9.24 -> 9.35
 *   grain-dark,  0.05 peak, on bg-navy vs brass-light eyebrow: 8.53 -> 8.62
 * All comfortably clear of threshold; margins computed in Phase 4 notes.
 *
 * `tone` must match the surface it sits on, not the text colour — pick
 * "light" for paper/paper-2 sections, "dark" for navy sections.
 */
export function Grain({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ filter: `url(#grain-${tone})` }}
    />
  );
}
