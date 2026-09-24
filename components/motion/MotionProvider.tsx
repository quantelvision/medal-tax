"use client";

import { MotionConfig } from "framer-motion";

/**
 * The mandatory global prefers-reduced-motion guard for every Framer Motion
 * animation sitewide (Reveal, RevealGroup/RevealItem, PageTransition).
 *
 * `reducedMotion="user"` is Framer Motion's own built-in behaviour for
 * exactly this requirement: when the OS-level `prefers-reduced-motion:
 * reduce` media query is active, it automatically disables every
 * transform-driven animation this library renders and keeps opacity-only
 * transitions — without each component needing its own check. Every reveal
 * and transition in this codebase also carries its own explicit
 * `useReducedMotion()` check as a second, independent layer (see
 * Reveal.tsx / RevealGroup.tsx) — this provider is the mandatory *global*
 * layer the brief calls for, not the only layer.
 *
 * This does not touch the separate CSS-only reduced-motion rule already in
 * globals.css, which governs plain CSS transitions (hover/focus feedback)
 * that never go through Framer Motion at all — both guards are required
 * because they cover different animation systems.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
