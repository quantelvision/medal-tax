"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const EASE_STANDARD = [0.2, 0, 0, 1] as const;

/**
 * Wraps route content so navigating between pages gets a short, deliberate
 * fade rather than an instant hard cut — but never at the cost of the first
 * load, which is what `initial={false}` on <AnimatePresence> is for: it
 * skips the enter animation for whatever is mounted the FIRST time this
 * component renders, so the very first page a visitor lands on appears at
 * its final, fully-painted state immediately. Nothing here can delay LCP,
 * because nothing here animates on first load — only on the transition
 * BETWEEN two already-loaded pages.
 *
 * Keyed on the full pathname rather than using app/template.tsx: a
 * root-level template.tsx in this app's route tree would NOT remount for
 * this site's most common navigation — /services -> /services/[slug] only
 * changes a nested segment, and Next's own template remount rules
 * (node_modules/next/dist/docs/.../template.md) only remount a template
 * when ITS OWN segment level changes. Keying directly on pathname here
 * covers every distinct URL, including that case and service-to-service
 * sibling navigation.
 *
 * transform + opacity only; duration and easing use the same tokens as
 * everything else in this file's family.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE_STANDARD } }}
        exit={{ opacity: 0, y: -8, transition: { duration: 0.16, ease: EASE_STANDARD } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
