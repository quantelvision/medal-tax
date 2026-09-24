"use client";

import { motion } from "framer-motion";

const EASE_ENTRANCE = [0.05, 0.7, 0.1, 1] as const;

/**
 * One item inside a <RevealGroup>. Never used standalone — `hidden` and
 * `delay` are injected by the group via cloneElement, not passed by hand.
 *
 * Carries the same safety contract as Reveal.tsx: `hidden` defaults to
 * `false`, so on its own (or before the group has decided anything) this
 * renders fully visible, never a server-baked hidden state. `initial={false}`
 * for the same reason described there.
 */
export function RevealItem({
  children,
  className = "",
  hidden = false,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Injected by the parent RevealGroup. */
  hidden?: boolean;
  /** Injected by the parent RevealGroup — this item's stagger offset, in seconds. */
  delay?: number;
}) {
  return (
    <motion.div
      initial={false}
      animate={hidden ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
      transition={hidden ? { duration: 0 } : { duration: 0.45, ease: EASE_ENTRANCE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
